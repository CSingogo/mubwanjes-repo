import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (and any static host).
 * Cloudinary handles image/video transforms — Next Image uses unoptimized
 * so build does not need a Node image optimizer (required for `output: "export"`).
 *
 * For project pages (username.github.io/repo-name), set in CI:
 *   GITHUB_PAGES=true
 * Or locally:
 *   NEXT_PUBLIC_BASE_PATH=/your-repo-name
 */
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ||
  (process.env.GITHUB_PAGES === "true" && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
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
