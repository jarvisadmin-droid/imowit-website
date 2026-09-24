import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth/admin";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminHome() {
  const { displayName, user } = await requireAdmin();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-sm text-[#333333]">
        Signed in as {displayName} ({user.email}). Assessment requests and estimates arrive in a
        later milestone.
      </p>
    </div>
  );
}
