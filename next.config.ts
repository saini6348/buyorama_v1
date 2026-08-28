import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Sub-path the site is deployed under; "" for domain root / subdomain.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
