import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (and any static host).
 * Cloudinary handles product/campaign media; the brand logo stays in /public.
 *
 * Project Pages URL: https://USER.github.io/REPO → basePath = /REPO
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ||
  (process.env.GITHUB_PAGES === "true" && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Expose base path to client code (logo, etc.) — next/image alone is not enough
  // for every case when unoptimized + static export.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
