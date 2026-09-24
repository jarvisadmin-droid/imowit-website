"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/safe-next";
import { supabaseAnonKey, supabaseUrl } from "@/lib/env";

export type SignInState = { error: string | null };

const UNAVAILABLE = "Sign-in is unavailable right now. Please try again later.";
const NO_ACCESS = "This account doesn't have admin access.";

// Email + password sign-in for admin.imowit.com. Only active admins may stay
// signed in: anyone else is signed out again immediately.
export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (!supabaseUrl() || !supabaseAnonKey()) {
    console.error("admin sign-in: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
    return { error: UNAVAILABLE };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    // Only a real credentials failure says "incorrect". Anything else (bad API
    // key, wrong URL, network, Supabase outage) is a setup/service problem:
    // log it and say sign-in is unavailable, so it isn't mistaken for a typo.
    if (error.code === "invalid_credentials") {
      return { error: "Incorrect email or password." };
    }
    if (error.status === 429 || error.code === "over_request_rate_limit") {
      return { error: "Too many sign-in attempts. Wait a few minutes and try again." };
    }
    if (error.code === "user_banned" || error.code === "email_not_confirmed") {
      return { error: NO_ACCESS };
    }
    console.error(
      `admin sign-in failed status=${error.status ?? "none"} code=${error.code ?? "none"} ` +
        `name=${error.name} message=${JSON.stringify(error.message.slice(0, 200))}`,
    );
    return { error: UNAVAILABLE };
  }

  const { data: role, error: roleError } = await supabase.rpc("current_app_role");
  if (roleError) {
    console.error(
      `admin sign-in: current_app_role failed code=${roleError.code || "none"} ` +
        `message=${JSON.stringify((roleError.message ?? "").slice(0, 200))}`,
    );
    await supabase.auth.signOut({ scope: "local" });
    return { error: UNAVAILABLE };
  }
  if (role !== "admin") {
    await supabase.auth.signOut({ scope: "local" });
    return { error: NO_ACCESS };
  }

  redirect(next);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  redirect("/login");
}
