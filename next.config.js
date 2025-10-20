/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/cv-beautifier',
};
nextConfig = createVanillaExtractPlugin()(nextConfig);
module.exports = nextConfig;

