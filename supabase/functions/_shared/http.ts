// Small response helpers shared by the edge functions. Errors are returned as
// { error: "<stable_code>" } so the app can match on them; details go to logs,
// never to the client, and nothing here ever includes the Google key.

export function json(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

export function error(status: number, code: string): Response {
  return json({ error: code }, status);
}

// Reads a required secret. Returns null (and logs the name only) when it's
// missing, so callers fail closed with a 500 instead of calling Google unsigned
// or without a key.
export function requireEnv(name: string): string | null {
  const value = Deno.env.get(name);
  if (!value) {
    console.error(`missing required secret ${name}`);
    return null;
  }
  return value;
}

export const UPSTREAM_TIMEOUT_MS = 8000;
