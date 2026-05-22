import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "preview-chat-050efac2-1ea5-4b80-a8a8-0cd7dae70cfc.space-z.ai",
  ],
};

export default nextConfig;
