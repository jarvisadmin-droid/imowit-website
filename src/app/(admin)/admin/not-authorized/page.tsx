import type { Metadata } from "next";
import { signOut } from "../actions";

export const metadata: Metadata = { title: "Not authorized" };

// Shown to a signed-in user who isn't an active admin (e.g. an admin account
// that was deactivated mid-session). Offers a way to switch accounts.
export default function NotAuthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h1 className="text-xl font-semibold">Not authorized</h1>
        <p className="mt-2 text-sm text-[#333333]">This account doesn&apos;t have admin access.</p>
        <form action={signOut} className="mt-6">
          <button
            type="submit"
            className="w-full bg-[#56C70B] text-[#001F51] px-4 py-2 rounded-lg font-semibold hover:bg-[#4ab309] transition-colors"
          >
            Sign in with a different account
          </button>
        </form>
      </div>
    </div>
  );
}
