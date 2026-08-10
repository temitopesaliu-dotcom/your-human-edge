import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['temitopesaliu.com', 'www.temitopesaliu.com'],
    },
  },
  async rewrites() { return [{ source: '/for-lifecoaches', destination: '/for-lifecoaches.html' }, { source: '/get-this-built', destination: '/get-this-built.html' }]; },
};
export default nextConfig;
