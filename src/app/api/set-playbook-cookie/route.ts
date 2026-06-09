import { NextRequest, NextResponse } from 'next/server';
import { validatePlaybookAccess } from '@/lib/playbook-access';
import {
  accessCookieForProduct,
  isValidSessionId,
  PURCHASE_COOKIE_MAX_AGE,
} from '@/lib/products';

/**
 * Sets the playbook cookie and redirects to /playbook.
 * This is needed because cookies can only be modified
 * in a Route Handler or Server Action (not a Server Component).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || '';

  if (!isValidSessionId(sessionId)) {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  const access = await validatePlaybookAccess(sessionId);
  if (!access.ok) {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  const res = NextResponse.redirect(new URL('/playbook', req.url));

  res.cookies.set(accessCookieForProduct('playbook'), sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: PURCHASE_COOKIE_MAX_AGE,
    path: '/',
  });

  return res;
}
