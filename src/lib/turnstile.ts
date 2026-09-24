import "server-only";
import { turnstileSecretKey } from "@/lib/env.server";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

// Verifies a Cloudflare Turnstile token server-side. Tokens are single-use and
// expire after 5 minutes. Fails closed: a missing secret, a network error or
// any non-success answer counts as "not verified".
//
// Cloudflare returns its reason in "error-codes" on both 200 and 400 answers
// (an invalid secret comes back as HTTP 400 "invalid-input-secret"), so the
// body is always read and the codes logged. The secret is never logged.
export async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = turnstileSecretKey();
  if (!secret) {
    console.error("turnstile: TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  if (!token || token.length > 2048) {
    console.warn("turnstile: no token submitted");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    console.error("turnstile: siteverify request failed", e instanceof Error ? e.name : "unknown");
    return false;
  }

  let result: { success?: boolean; "error-codes"?: unknown; hostname?: unknown } = {};
  try {
    result = await res.json();
  } catch {
    // Non-JSON answer; logged below with the status.
  }

  if (res.ok && result.success === true) return true;

  const codes = Array.isArray(result["error-codes"]) ? result["error-codes"].join(",") : "none";
  console.error(
    `turnstile: rejected status=${res.status} error-codes=${codes || "none"}` +
      (typeof result.hostname === "string" ? ` hostname=${result.hostname}` : ""),
  );
  return false;
}
