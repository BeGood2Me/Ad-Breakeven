import type { NextConfig } from "next";
import path from "path";
import { buildImageAssetRewrites, buildOgImageRewrites } from "./lib/og-image-rewrites";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [...buildOgImageRewrites(), ...buildImageAssetRewrites()];
  },
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
