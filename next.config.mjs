/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const isProduction = process.env.NODE_ENV === 'production';

let nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: isProduction ? '/cv-beautifier' : '',
  assetPrefix: isProduction ? '/cv-beautifier' : '',
  async rewrites() {
    const backendOrigin = process.env.BACKEND_ORIGIN || 'http://localhost:4000';
    return [
      {
        source: '/cv-beautifier-backend/:path*',
        destination: `${backendOrigin}/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://raphaelrbr.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

const withVanillaExtract = createVanillaExtractPlugin();
nextConfig = withVanillaExtract(nextConfig);

export default nextConfig;

