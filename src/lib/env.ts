// Environment values, cleaned. Every value we read is a single token (a URL or
// a key), so any whitespace in it is a copy-paste accident: hidden line breaks
// in pasted keys have already broken Supabase and Turnstile twice. clean()
// removes all whitespace (spaces, tabs, line breaks, non-breaking and
// zero-width spaces) and treats an empty result as unset.
//
// Each getter reads process.env.NAME literally: Next.js only inlines
// NEXT_PUBLIC_* values into the build when accessed that way.
// Server-only secrets live in env.server.ts.

export function clean(value: string | undefined): string | undefined {
  const cleaned = value?.replace(/[\s​-‍﻿]/g, "");
  return cleaned ? cleaned : undefined;
}

export function supabaseUrl(): string | undefined {
  return clean(process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/+$/, "");
}

export function supabaseAnonKey(): string | undefined {
  return clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function turnstileSiteKey(): string | undefined {
  return clean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
