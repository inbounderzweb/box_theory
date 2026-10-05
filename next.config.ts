import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Server actions default to a 1 MB request cap, which would reject the 5 MB PDF/reference uploads
    // (enquiry forms) before the action runs. The actions enforce their own 5 MB file limit.
    serverActions: { bodySizeLimit: "6mb" },
  },
  images: {
    qualities: [75, 80],
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
