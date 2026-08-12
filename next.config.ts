import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['temitopesaliu.com', 'www.temitopesaliu.com'],
    },
  },
  async rewrites() {
    return [
      { source: '/for-lifecoaches', destination: '/for-lifecoaches.html' },
      { source: '/get-this-built', destination: '/get-this-built.html' },
      { source: '/appreciate', destination: '/appreciate.html' },
      { source: '/appreciated', destination: '/appreciated.html' },
      { source: '/apply', destination: '/apply.html' },
    ];
  },
};
export default nextConfig;
