const path = require('path');
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

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
    resolveAlias: {
      "next-intl/config": "./i18n.ts"
    }
  },
  webpack: (config) => {
    config.resolve.alias["next-intl/config"] = path.resolve(__dirname, "./i18n.ts");
    return config;
  },
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return [
      { source: "/mission",  destination: "/about",   permanent: true },
      { source: "/connect",  destination: "/partner", permanent: true },
      { source: "/programs", destination: "/about",   permanent: true },
      { source: "/events",   destination: "/about",   permanent: true },
    ];
  },
}

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  withNextIntl(nextConfig),
  {
    org: "your-org",
    project: "techmission-rio",
    silent: true,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);