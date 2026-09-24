import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Marketing and admin have separate root layouts, so unmatched URLs need
    // app/global-not-found.tsx for a styled 404.
    globalNotFound: true,
  },
};

export default nextConfig;
