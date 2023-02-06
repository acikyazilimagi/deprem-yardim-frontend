const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: "node_modules/leaflet/dist/images",
            to: path.resolve(__dirname, "public", "leaflet", "images"),
          },
        ],
      })
    );
    return config;
  },
});
