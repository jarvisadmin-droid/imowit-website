import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// The single admin access check for admin.imowit.com. Call it at the top of
// every admin page and every admin Server Action: proxy.ts only redirects
// signed-out visitors, and layouts aren't re-run on every navigation, so
// neither is a security boundary on its own.
//
// Verifies the session with Supabase Auth (getUser, not just the cookie), then
// requires current_app_role() = 'admin' -- the same active-admin check RLS
// uses. Memoized per request, so pages and layouts can both call it.
export const requireAdmin = cache(async () => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: role, error } = await supabase.rpc("current_app_role");
  if (error || role !== "admin") redirect("/not-authorized");

  const [{ data: admin }, { data: profile }] = await Promise.all([
    supabase.from("admin_accounts").select("id, admin_role").eq("profile_id", user.id).single(),
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
  ]);
  if (!admin) redirect("/not-authorized");

  return {
    supabase,
    user,
    adminAccountId: admin.id,
    adminRole: admin.admin_role,
    displayName: profile?.full_name || user.email || "Admin",
  };
});
