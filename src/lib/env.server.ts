import "server-only";
import { clean } from "./env";

// Server-only secrets, cleaned the same way as the public values (see env.ts).
// Never log these.

export function supabaseServiceRoleKey(): string | undefined {
  return clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function turnstileSecretKey(): string | undefined {
  return clean(process.env.TURNSTILE_SECRET_KEY);
}

export function resendApiKey(): string | undefined {
  return clean(process.env.RESEND_API_KEY);
}
