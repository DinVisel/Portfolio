import type { NextConfig } from "next";

// Deployed to GitHub Pages as a project site at /Portfolio.
// basePath is only applied in production builds so local dev stays at "/".
const isProd = process.env.NODE_ENV === "production";
const repoBasePath = "/Portfolio";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` for GitHub Pages.
  output: "export",
  basePath: isProd ? repoBasePath : undefined,
  // GitHub Pages serves directories, so emit `route/index.html` files.
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
