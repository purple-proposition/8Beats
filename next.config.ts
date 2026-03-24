import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/", destination: "/8beats.html" }];
  },
};

export default nextConfig;
