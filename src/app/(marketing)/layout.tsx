import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import MarketingFooter from "@/components/MarketingFooter";

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
        <MarketingFooter />
      </body>
    </html>
  );
}