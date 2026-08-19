import type { NextConfig } from "next";
import path from "path";
import { buildImageAssetRewrites, buildOgImageRewrites } from "./lib/og-image-rewrites";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  async rewrites() {
    return [...buildOgImageRewrites(), ...buildImageAssetRewrites()];
  },
  async redirects() {
    return [
      {
        source: "/api-docs",
        destination: "/widgets",
        permanent: true,
      },
      {
        source: "/api",
        destination: "/widgets",
        permanent: true,
      },
      {
        source: "/api/v1/:path*",
        destination: "/widgets",
        permanent: true,
      },
      {
        source: "/embed",
        destination: "/widgets",
        permanent: true,
      },
      {
        source: "/embed/widget.js",
        destination: "/widgets/widget.js",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/widgets/widget.js",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
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
