import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    domains: ['cdn.pixabay.com'],  
  },
    typescript: {
    ignoreBuildErrors: true,
  },
    eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
