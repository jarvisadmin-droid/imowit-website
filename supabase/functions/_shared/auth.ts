import { createClient } from "@supabase/supabase-js";
import { error } from "./http.ts";

// The gateway's default JWT verification has already rejected requests without
// a valid token. Here we also require the caller to be an active customer, using
// the same current_app_role() the app routes on, called with the caller's own
// token so it reflects their RLS identity. Returns a Response to send back when
// the caller isn't allowed, or null when they are.
export async function requireCustomer(req: Request): Promise<Response | null> {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return error(401, "unauthorized");
  }

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!url || !anonKey) {
    console.error("missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return error(500, "server_misconfigured");
  }

  const supabase = createClient(url, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: role, error: rpcError } = await supabase.rpc("current_app_role");
  if (rpcError) {
    console.error("current_app_role failed", rpcError.code);
    return error(401, "unauthorized");
  }
  if (role !== "customer") {
    return error(403, "forbidden");
  }
  return null;
}
