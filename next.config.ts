import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/CV",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
