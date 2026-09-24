// Google's URL signing: HMAC-SHA1 of the path and query, keyed with the
// URL-safe-base64-decoded secret, then URL-safe base64 encoded.
export async function signUrlPath(pathAndQuery: string, secret: string): Promise<string> {
  const keyBytes = Uint8Array.from(
    atob(secret.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0),
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const mac = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(pathAndQuery)),
  );
  return btoa(String.fromCharCode(...mac)).replace(/\+/g, "-").replace(/\//g, "_");
}
