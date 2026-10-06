import { NextRequest, NextResponse } from 'next/server';
import { getResult } from '@/lib/efp/store';

/**
 * The private link from the results email. Sets a cookie with the code, then
 * sends the person to one clean address, so analytics, the Meta pixel and
 * Clarity only ever see /expert-framework-profile/results, never the code.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const record = await getResult(code);
  const target = new URL(record ? '/expert-framework-profile/results' : '/expert-framework-profile', req.url);
  const res = NextResponse.redirect(target, 303);
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.headers.set('Referrer-Policy', 'no-referrer');
  if (record) {
    res.cookies.set('efp_r', record.code, {
      httpOnly: true, secure: true, sameSite: 'lax', path: '/expert-framework-profile', maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}
