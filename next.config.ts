import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones de rendimiento
  experimental: {
    optimizePackageImports: ['react-icons'],
  },

  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: "https", hostname: "ftp3.syscom.mx", pathname: "/**" },
      { protocol: "https", hostname: "nextuipro.nyc3.cdn.digitaloceanspaces.com", pathname: "/**" },
      { protocol: "https", hostname: "i.pravatar.cc", pathname: "/**" },
      { protocol: "https", hostname: "company.com", pathname: "/**" },
      { protocol: "https", hostname: "support.company.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
      { protocol: "https", hostname: "www.example.com", pathname: "/**" },
    ],
  },

  // Optimización de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
