import { NextRequest, NextResponse } from 'next/server';
import { writeAnalyticsEvent } from '@/lib/kv';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Always return 200 — analytics never breaks UX
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 30, 60, 'track');
  if (!allowed) return NextResponse.json({ ok: false }); // silent drop
  try {
    const payload = await req.json();
    if (!payload.event) return NextResponse.json({ ok: false });

    const ipAddr = getClientIp(req.headers);
    await writeAnalyticsEvent({ ...payload, ip: ipAddr, server_ts: Date.now() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') || '';
  const allowed = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const corsOrigin = origin === allowed ? allowed : (allowed || '*');
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    },
  });
}

