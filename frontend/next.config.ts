/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next"
import withPWA from "next-pwa"

const runtimeCaching = [
  {
    urlPattern: /^https?:\/\/fonts\.googleapis\.com\/.*/i,
    handler: "StaleWhileRevalidate",
    options: { cacheName: "google-fonts-stylesheets" },
  },
  {
    urlPattern: /^https?:\/\/fonts\.gstatic\.com\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "google-fonts-webfonts",
      expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 365 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: /^https?:\/\/[^/]+\/_next\/static\/.*/i,
    handler: "CacheFirst",
    options: {
      cacheName: "next-static-chunks",
      expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: /^\/_next\/image\?url=.+$/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "next-image-optimizer",
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
    handler: "CacheFirst",
    options: {
      cacheName: "image-assets",
      expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: /^https?:\/\/[^/]+\/api\/.*/i,
    handler: "NetworkFirst",
    method: "GET",
    options: {
      cacheName: "api-cache",
      networkTimeoutSeconds: 10,
      expiration: { maxEntries: 100, maxAgeSeconds: 60 * 5 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
]

const withPWAMiddleware = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: runtimeCaching as any,
})

const nextConfig: NextConfig = { reactStrictMode: true }

export default withPWAMiddleware(nextConfig as any)
