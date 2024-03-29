const { join } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, "src/styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.starlightcms.io",
        port: "",
      },
    ],
  },
  eslint: {
    // TODO: remove before fixing all eslint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
