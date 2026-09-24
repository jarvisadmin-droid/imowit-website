import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

// Root layout for admin.imowit.com (reached via the rewrite in src/proxy.ts).
// Deliberately separate from the marketing root layout: no marketing Navbar or
// footer, and never indexed by search engines.
export const metadata: Metadata = {
  title: {
    default: "iMowiT Admin",
    template: "%s · iMowiT Admin",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full bg-[#F5F5F5] text-[#001F51]`}>
        {children}
      </body>
    </html>
  );
}
