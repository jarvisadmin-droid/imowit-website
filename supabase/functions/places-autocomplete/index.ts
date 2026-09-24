// Address search for customer onboarding, via Google Places API (New).
//
// POST { "action": "autocomplete", "input": "...", "sessionToken": "<uuid>" }
//   -> [{ placeId, text }]
// POST { "action": "details", "placeId": "...", "sessionToken": "<uuid>" }
//   -> { placeId, formattedAddress, addressLine1, addressLine2, city, state,
//        postalCode, latitude, longitude }
//
// The app creates one session token per search and passes it to both calls, so
// Google bills them as one session. Active customers only (see _shared/auth.ts).
// The key is read from GOOGLE_MAPS_API_KEY and never returned or logged.
// Results are Google content: responses are no-store, and the app shows the
// address back to the customer to confirm or correct before anything is saved.

import { requireCustomer } from "../_shared/auth.ts";
import { error, json, requireEnv, UPSTREAM_TIMEOUT_MS } from "../_shared/http.ts";

const PLACES_BASE = "https://places.googleapis.com/v1";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Google place IDs are URL-safe; this also keeps the ID from altering the path.
const PLACE_ID_RE = /^[A-Za-z0-9_-]{1,300}$/;

type AddressComponent = { longText?: string; shortText?: string; types?: string[] };

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return error(405, "method_not_allowed");
  }

  const denied = await requireCustomer(req);
  if (denied) return denied;

  const apiKey = requireEnv("GOOGLE_MAPS_API_KEY");
  if (!apiKey) return error(500, "server_misconfigured");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return error(400, "invalid_json");
  }
  if (!body || typeof body !== "object") return error(400, "invalid_json");

  const sessionToken = body.sessionToken;
  if (typeof sessionToken !== "string" || !UUID_RE.test(sessionToken)) {
    return error(400, "invalid_session_token");
  }

  switch (body.action) {
    case "autocomplete":
      return await autocomplete(apiKey, body.input, sessionToken);
    case "details":
      return await details(apiKey, body.placeId, sessionToken);
    default:
      return error(400, "invalid_action");
  }
});

async function autocomplete(apiKey: string, input: unknown, sessionToken: string): Promise<Response> {
  if (typeof input !== "string") return error(400, "invalid_input");
  const trimmed = input.trim();
  if (trimmed.length < 3 || trimmed.length > 200) return error(400, "invalid_input");

  const res = await callGoogle(`${PLACES_BASE}/places:autocomplete`, apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text",
    },
    body: JSON.stringify({
      input: trimmed,
      sessionToken,
      includedRegionCodes: ["us"],
      // Address-type results only: no businesses, landmarks or regions.
      includedPrimaryTypes: ["street_address", "premise", "subpremise"],
    }),
  });
  if (res instanceof Response) return res;

  const suggestions = (res.suggestions ?? []) as Array<{
    placePrediction?: { placeId?: string; text?: { text?: string } };
  }>;
  const results = suggestions
    .map((s) => s.placePrediction)
    .filter((p): p is { placeId: string; text: { text: string } } =>
      typeof p?.placeId === "string" && typeof p?.text?.text === "string"
    )
    .map((p) => ({ placeId: p.placeId, text: p.text.text }));

  return json(results);
}

async function details(apiKey: string, placeId: unknown, sessionToken: string): Promise<Response> {
  if (typeof placeId !== "string" || !PLACE_ID_RE.test(placeId)) {
    return error(400, "invalid_place_id");
  }

  const url = `${PLACES_BASE}/places/${placeId}?sessionToken=${encodeURIComponent(sessionToken)}`;
  const res = await callGoogle(url, apiKey, {
    method: "GET",
    // Minimal field mask: only what onboarding needs (and bills for).
    headers: { "X-Goog-FieldMask": "id,formattedAddress,addressComponents,location" },
  });
  if (res instanceof Response) return res;

  const components = (res.addressComponents ?? []) as AddressComponent[];
  const find = (...types: string[]) => {
    for (const type of types) {
      const c = components.find((c) => c.types?.includes(type));
      if (c) return c;
    }
    return undefined;
  };

  const streetNumber = find("street_number")?.longText;
  const route = find("route")?.shortText ?? find("route")?.longText;
  const addressLine1 = [streetNumber, route].filter(Boolean).join(" ") || null;
  const addressLine2 = find("subpremise")?.longText ?? null;
  const city = find("locality", "postal_town", "sublocality_level_1", "administrative_area_level_3")?.longText ?? null;
  const state = find("administrative_area_level_1")?.shortText ?? null;
  const postalCode = find("postal_code")?.longText ?? null;
  const location = res.location as { latitude?: number; longitude?: number } | undefined;

  return json({
    placeId: typeof res.id === "string" ? res.id : placeId,
    formattedAddress: typeof res.formattedAddress === "string" ? res.formattedAddress : null,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    // For showing the satellite image in this session only. Not stored: the
    // app passes null coordinates to request_property_assessment().
    latitude: typeof location?.latitude === "number" ? location.latitude : null,
    longitude: typeof location?.longitude === "number" ? location.longitude : null,
  });
}

// Calls Google and returns the parsed JSON body, or a Response to send back.
// Logs only the status, never the request (which carries the key header).
async function callGoogle(
  url: string,
  apiKey: string,
  init: { method: string; headers: Record<string, string>; body?: string },
): Promise<Record<string, unknown> | Response> {
  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: { ...init.headers, "X-Goog-Api-Key": apiKey },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (e) {
    console.error("places request failed", e instanceof Error ? e.name : "unknown");
    return error(502, "upstream_unavailable");
  }

  if (res.status === 404 || res.status === 400) {
    console.error("places rejected request", res.status);
    await res.body?.cancel();
    return error(400, "invalid_request");
  }
  if (!res.ok) {
    console.error("places upstream status", res.status);
    await res.body?.cancel();
    return error(502, "upstream_error");
  }
  return (await res.json()) as Record<string, unknown>;
}
