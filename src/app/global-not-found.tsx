import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MarketingFooter from "@/components/MarketingFooter";

// With separate root layouts for (marketing) and (admin) there is no
// top-level layout to wrap a 404 in, so unmatched URLs render this page
// instead (experimental.globalNotFound in next.config.ts). It keeps the
// marketing chrome the 404 had before the split. Unknown paths on
// admin.imowit.com never reach it: they're rewritten into /admin/*, which has
// its own not-found handling.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Page not found - iMowiT",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        <Navbar />
        <main className="flex-1">
          <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-semibold text-[#001F51]">404: This page could not be found.</h1>
          </div>
        </main>
        <MarketingFooter />
      </body>
    </html>
  );
}
