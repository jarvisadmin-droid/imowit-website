"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/safe-next";

export type SignInState = { error: string | null };

// Email + password sign-in for admin.imowit.com. Only active admins may stay
// signed in: anyone else is signed out again immediately.
export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.status === 429) {
      return { error: "Too many sign-in attempts. Wait a few minutes and try again." };
    }
    return { error: "Incorrect email or password." };
  }

  const { data: role } = await supabase.rpc("current_app_role");
  if (role !== "admin") {
    await supabase.auth.signOut({ scope: "local" });
    return { error: "This account doesn't have admin access." };
  }

  redirect(next);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/login");
}
