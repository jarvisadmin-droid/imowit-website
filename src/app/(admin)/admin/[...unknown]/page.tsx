import { notFound } from "next/navigation";

// Unknown paths on admin.imowit.com are rewritten to /admin/<path> by
// src/proxy.ts. Catch them here so they get the admin 404 (inside the admin
// layout) instead of the marketing global-not-found page.
export default function UnknownAdminPath() {
  notFound();
}
