import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Paid PDFs live in private-assets/ rather than public/ so no URL serves them
  // without a payment check. Files outside public/ are not bundled into a
  // serverless function unless traced explicitly, and a missing trace fails
  // only in production, so both reading routes are listed here.
  outputFileTracingIncludes: {
    '/api/story-to-income/download': ['./private-assets/pdfs/**'],
    '/api/playbook/pdf': ['./private-assets/pdfs/**'],
  },
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
      { source: '/book', destination: '/book.html' },
      { source: '/your-business', destination: '/your-business.html' },
      { source: '/youre-ready', destination: '/youre-ready.html' },
      { source: '/ai-operator-suite', destination: '/ai-operator-suite.html' },
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
