// Where to send an admin after sign-in. Only same-site relative paths are
// allowed, so ?next= can't be used to redirect to another site
// ("//evil.com", "/\evil.com", "https://…") or back to the login page.
export function safeNextPath(value: unknown): string {
  if (typeof value !== "string" || value.length === 0 || value.length > 500) return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  if (/[\u0000-\u001f\u007f]/.test(value)) return "/";
  if (value === "/login" || value.startsWith("/login?")) return "/";
  return value;
}
