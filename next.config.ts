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
      { source: '/your-business', destination: '/your-business.html' },
      { source: '/youre-ready', destination: '/youre-ready.html' },
    ];
  },
  async redirects() {
    return [
      // /apply was the pre-payment application form. The funnel now takes
      // payment first, so anyone landing there belongs on the details form.
      { source: '/apply', destination: '/your-business', permanent: true },
    ];
  },
};
export default nextConfig;
