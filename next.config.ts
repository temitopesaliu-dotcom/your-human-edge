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
  async headers() {
    return [
      // Personal results pages stay out of search engines.
      {
        source: '/expert-framework-profile/results/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
      {
        source: '/expert-framework-profile/results',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },
  async redirects() {
    return [
      // /apply was the pre-payment application form. The funnel now takes
      // payment first, so anyone landing there belongs on the details form.
      { source: '/apply', destination: '/your-business', permanent: true },
      // The free quiz moved from /intelligence-layer to the Expert Framework
      // Profile. Permanent (308), and query strings (UTM tags) survive the hop,
      // so every link already printed in emails and posts keeps working.
      { source: '/intelligence-layer', destination: '/expert-framework-profile', permanent: true },
      // The live workshop is retired; its sales page now belongs to the
      // Expert Framework course.
      {
        source: '/workshop',
        destination: '/expert-framework',
        permanent: true,
      },
      // The Expert Framework course page used to live at
      // /intelligence-layer-course. Permanent (308) so it is cached, and
      // query strings (session_id, UTM tags) survive the hop, so access
      // links already sent to buyers keep working.
      {
        source: '/intelligence-layer-course/:path*',
        destination: '/expert-framework/:path*',
        permanent: true,
      },
      // Short links for the Expert Framework launch emails. /ef/one lands on
      // /expert-framework tagged utm_campaign=ef-email-one, so the address in the
      // email is short and clean and each email still traces to its own sale.
      // Only the listed ids match. Temporary (307) so the target can change.
      {
        source: '/ef/:id(one|two|three|four|five|six|seven|eight|nine|ten|one-resend|two-resend|three-resend|four-resend|five-resend|two-a|two-b|three-a|three-b|four-a|four-b|five-a|five-b|six-a|six-b)',
        destination:
          '/expert-framework?utm_source=mailerlite&utm_medium=email&utm_campaign=ef-email-:id',
        permanent: false,
      },
      // Short links for the Expert Framework Profile invite emails. /efp/1a-r
      // lands on the quiz tagged utm_campaign=efp-1a-r (email 1, variant A,
      // retake track; n = new track), so each email traces to its own quiz-takers.
      // Only the listed ids match. Temporary (307) so the target can change.
      {
        source: '/efp/:id(1a-r|1a-n|1b-r|1b-n|2a-r|2a-n|2b-r|2b-n|3a-r|3a-n|3b-r|3b-n|4a-r|4a-n|4b-r|4b-n|5a-r|5a-n|5b-r|5b-n)',
        destination:
          '/expert-framework-profile?utm_source=mailerlite&utm_medium=email&utm_campaign=efp-:id',
        permanent: false,
      },
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
