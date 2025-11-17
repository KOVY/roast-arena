const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Configure Turbopack to work with the project
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@/design-kit": path.resolve(__dirname, "../design-kit"),
    };
    return config;
  },
};

module.exports = nextConfig;
