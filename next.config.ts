import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/perosnalwebsite",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
