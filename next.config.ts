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
      // Short links for the Story to Income launch emails. The full UTM-tagged
      // URL was too long to print in a plain-text email, so /story/one lands on
      // the sales page tagged utm_campaign=email-one. Only the listed ids
      // match, so nothing arbitrary reaches analytics. Temporary (307) so the
      // target can change without browsers caching it.
      {
        source: '/story/:id(zero|one|two|three|four|five|one-resend|five-resend)',
        destination:
          '/story-to-income?utm_source=mailerlite&utm_medium=email&utm_campaign=email-:id',
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
