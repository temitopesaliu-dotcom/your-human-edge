import { NextRequest, NextResponse } from 'next/server';
import { writeAnalyticsEventsBatch } from '@/lib/kv';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Always return 200 — analytics never breaks UX
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 60, 60, 'track'); // 60 req/min per IP
  if (!allowed) return NextResponse.json({ ok: false }); // silent drop
  try {
    const payload = await req.json();

    // Normalise: accept either a single event or a batch array
    const events = Array.isArray(payload) ? payload : [payload];

    const records = events
      .filter((e: Record<string, unknown>) => e.event)
      .map((e: Record<string, unknown>) => ({
        ...e,
        ip,
        server_ts: Date.now(),
      }));

    if (records.length === 0) return NextResponse.json({ ok: false });

    await writeAnalyticsEventsBatch(records);
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
