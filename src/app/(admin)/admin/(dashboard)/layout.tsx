import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { signOut } from "../actions";

// Admin chrome for signed-in pages. requireAdmin() here only supplies the
// header data; each page must still call requireAdmin() itself, because
// layouts don't re-run on every navigation.
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { displayName, adminRole } = await requireAdmin();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#001F51] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <nav className="flex items-center gap-6">
            <Link href="/" className="font-semibold">iMowiT Admin</Link>
            <Link href="/inquiries" className="text-sm hover:text-[#56C70B]">Inquiries</Link>
          </nav>
          <div className="flex items-center gap-4 text-sm">
            <span>
              {displayName} <span className="text-white/60">· {adminRole.replace("_", " ")}</span>
            </span>
            <form action={signOut}>
              <button type="submit" className="underline hover:text-[#56C70B]">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
