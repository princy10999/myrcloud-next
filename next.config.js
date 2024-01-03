/** @type {import('next').NextConfig} */

//const withTM = require('next-transpile-modules')(['mui-rte']);
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  basePath: process.env.BASE_PATH || "",
  output: "standalone",
  assetPrefix: process.env.BASE_PATH || "",
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || "",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://myrcloud-dev.zinghr.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/user-verification",
        destination: "/verification",
        permanent: false,
      },
    ];
  },
  i18n: i18n,
};
module.exports = nextConfig;
