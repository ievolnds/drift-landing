import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/drift-landing";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        basePath: githubBasePath,
        assetPrefix: githubBasePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
