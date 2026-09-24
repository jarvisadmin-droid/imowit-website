// Satellite photo of a property for onboarding ("Is this your property?"),
// via the Google Maps Static API.
//
// GET ?lat=<n>&lng=<n>   or   GET ?address=<text>   (exactly one form)
//   -> image/png bytes
//
// Everything else is fixed here (satellite, zoom, size, one marker), so the
// caller can't use this as a general Static Maps proxy. Active customers only
// (see _shared/auth.ts). Requests are signed with GOOGLE_MAPS_URL_SIGNING_SECRET
// (required: without it the function refuses to call Google), so the API key
// alone is not enough to use Static Maps if it ever leaks. Neither secret is
// returned or logged.

import { requireCustomer } from "../_shared/auth.ts";
import { error, requireEnv, UPSTREAM_TIMEOUT_MS } from "../_shared/http.ts";
import { signUrlPath as sign } from "../_shared/url-signing.ts";

const STATIC_MAPS_ORIGIN = "https://maps.googleapis.com";
const STATIC_MAPS_PATH = "/maps/api/staticmap";
const COORD_RE = /^-?\d{1,3}(\.\d{1,10})?$/;
// Our cap on how long the app may cache an image, even if Google allows longer.
const MAX_CACHE_SECONDS = 86400;

Deno.serve(async (req) => {
  if (req.method !== "GET") {
    return error(405, "method_not_allowed");
  }

  const denied = await requireCustomer(req);
  if (denied) return denied;

  const apiKey = requireEnv("GOOGLE_MAPS_API_KEY");
  const signingSecret = requireEnv("GOOGLE_MAPS_URL_SIGNING_SECRET");
  if (!apiKey || !signingSecret) return error(500, "server_misconfigured");

  const center = parseCenter(new URL(req.url).searchParams);
  if (center instanceof Response) return center;

  const params = new URLSearchParams({
    center,
    zoom: "20",
    size: "640x640",
    scale: "2",
    maptype: "satellite",
    format: "png",
    markers: `color:red|${center}`,
    key: apiKey,
  });
  const pathAndQuery = `${STATIC_MAPS_PATH}?${params.toString()}`;

  let signature: string;
  try {
    signature = await sign(pathAndQuery, signingSecret);
  } catch {
    console.error("GOOGLE_MAPS_URL_SIGNING_SECRET is not valid URL-safe base64");
    return error(500, "server_misconfigured");
  }

  let res: Response;
  try {
    res = await fetch(`${STATIC_MAPS_ORIGIN}${pathAndQuery}&signature=${signature}`, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (e) {
    console.error("static maps request failed", e instanceof Error ? e.name : "unknown");
    return error(502, "upstream_unavailable");
  }

  const contentType = res.headers.get("Content-Type") ?? "";
  if (!res.ok || !contentType.startsWith("image/")) {
    // Logs the status only: the URL carries the key.
    console.error("static maps upstream status", res.status);
    await res.body?.cancel();
    return error(502, "upstream_error");
  }

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControlFrom(res.headers.get("Cache-Control")),
    },
  });
});

// Returns the Static Maps `center` value, or a 400 Response.
function parseCenter(query: URLSearchParams): string | Response {
  const lat = query.get("lat");
  const lng = query.get("lng");
  const address = query.get("address");
  const hasCoords = lat !== null || lng !== null;

  if (hasCoords === (address !== null)) {
    return error(400, "provide_coordinates_or_address");
  }

  if (hasCoords) {
    if (lat === null || lng === null || !COORD_RE.test(lat) || !COORD_RE.test(lng)) {
      return error(400, "invalid_coordinates");
    }
    const latN = Number(lat);
    const lngN = Number(lng);
    // Roughly the US, including Alaska, Hawaii and Puerto Rico.
    if (latN < 17 || latN > 72 || lngN < -180 || lngN > -64) {
      return error(400, "invalid_coordinates");
    }
    return `${latN},${lngN}`;
  }

  const trimmed = address!.trim();
  // deno-lint-ignore no-control-regex
  if (trimmed.length < 3 || trimmed.length > 300 || /[\u0000-\u001f\u007f|]/.test(trimmed)) {
    return error(400, "invalid_address");
  }
  return trimmed;
}

// Follow Google's own cache header: the app may cache the image privately for
// as long as Google allows, capped at a day, and not at all if Google gives no
// max-age or forbids caching.
function cacheControlFrom(upstream: string | null): string {
  const directives = (upstream ?? "").toLowerCase();
  if (/\b(no-store|no-cache)\b/.test(directives)) return "private, no-store";
  const maxAge = /\bmax-age=(\d+)\b/.exec(directives);
  if (!maxAge) return "private, no-store";
  const seconds = Math.min(Number(maxAge[1]), MAX_CACHE_SECONDS);
  return seconds > 0 ? `private, max-age=${seconds}` : "private, no-store";
}
