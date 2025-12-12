const { join } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [join(__dirname, "src/styles")],
    silenceDeprecations: [
      "import",
      "color-functions",
      "global-builtin",
      "if-function",
    ],
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
};

module.exports = nextConfig;
