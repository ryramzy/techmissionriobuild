/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable static optimization for error pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Skip error pages during static generation
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['127.0.0.1'],
}

module.exports = nextConfig