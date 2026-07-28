/** Extract the best available client IP from Next.js request headers. */
export function getClientIp(headers: Headers): string {
  // Check a variety of common headers (Vercel, Cloudflare, Fastly, proxies).
  const candidates = [
    headers.get('x-forwarded-for'),
    headers.get('x-real-ip'),
    headers.get('cf-connecting-ip'),
    headers.get('x-client-ip'),
    headers.get('fastly-client-ip'),
    headers.get('true-client-ip'),
  ];

  for (const h of candidates) {
    if (!h) continue;
    const part = h.split(',')[0]?.trim();
    if (part) return part;
  }

  return 'unknown';
}
