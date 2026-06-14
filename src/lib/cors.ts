import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

/**
 * Handle CORS preflight for API routes.
 * Returns a 204 response for OPTIONS requests.
 */
export function handleCors(req: NextRequest): NextResponse {
  const origin = req.headers.get('origin') || '';
  const corsOrigin = origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '';

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin || ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    },
  });
}
