import { error } from "../_shared/http.ts";

// Plain decimal degrees only (no exponent, hex or whitespace). Up to 20
// decimal places: Google's Place Details returns raw doubles such as
// 44.987437199999995 (15 decimals), and a double never needs more than ~17
// significant digits, so this accepts anything Google sends while still
// rejecting junk.
const COORD_RE = /^-?\d{1,3}(\.\d{1,20})?$/;

// Returns the Static Maps `center` value, or a 400 Response.
export function parseCenter(query: URLSearchParams): string | Response {
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
    // 6 decimals is ~11 cm, far finer than a zoom-20 pixel; keeps the signed
    // URL short and gives the same image for the same point.
    return `${latN.toFixed(6)},${lngN.toFixed(6)}`;
  }

  const trimmed = address!.trim();
  // deno-lint-ignore no-control-regex
  if (trimmed.length < 3 || trimmed.length > 300 || /[\u0000-\u001f\u007f|]/.test(trimmed)) {
    return error(400, "invalid_address");
  }
  return trimmed;
}
