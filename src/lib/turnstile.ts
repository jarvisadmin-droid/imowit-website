import "server-only";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Verifies a Cloudflare Turnstile token server-side. Tokens are single-use and
// expire after 5 minutes. Fails closed: a missing secret, a network error or
// any non-success answer counts as "not verified".
export async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("turnstile siteverify status", res.status);
      return false;
    }
    const result = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) console.warn("turnstile rejected", result["error-codes"]);
    return result.success === true;
  } catch (e) {
    console.error("turnstile siteverify failed", e instanceof Error ? e.name : "unknown");
    return false;
  }
}
