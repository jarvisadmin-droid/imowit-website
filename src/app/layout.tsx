import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iMowiT - Autonomous Lawn Mowing",
  description: "Professional autonomous lawn mowing services",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-white`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-[#001F51] text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm">© 2026 iMowiT. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}