import { NextRequest, NextResponse } from 'next/server';
import { validatePlaybookAccess } from '@/lib/playbook-access';
import {
  accessCookieForProduct,
  isValidSessionId,
  PURCHASE_COOKIE_MAX_AGE,
} from '@/lib/products';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || '';

  if (!isValidSessionId(sessionId)) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 403 });
  }

  const access = await validatePlaybookAccess(sessionId);
  if (!access.ok) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const res = NextResponse.json({
    ok: true,
    archetype: access.archetype,
  });

  res.cookies.set(accessCookieForProduct('playbook'), sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: PURCHASE_COOKIE_MAX_AGE,
    path: '/',
  });

  return res;
}
