import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";

// Service-role Supabase client: bypasses RLS and can do anything, so it is
// server-only and should be used as narrowly as possible. Today its only use
// is submit_inquiry() from the website's inquiry Server Action (that function
// is deliberately not callable with the public anon key; see
// supabase/migrations/20260924090000_inquiries.sql). Returns null when the key
// isn't configured, so callers can fail closed.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is not set");
    return null;
  }
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
