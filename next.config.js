/** @type {import('next').NextConfig} */
const path = require("path");
const withImages = require("next-images");
module.exports = withImages({
  exclude: path.resolve(__dirname, "src/public/svg"),
  webpack(config, options) {
    return config;
  },
});
