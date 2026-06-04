import { NextRequest, NextResponse } from 'next/server';
import { writeAnalyticsEvent } from '@/lib/kv';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  // Always return 200 — analytics never breaks UX
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 30, 60);
  if (!allowed) return NextResponse.json({ ok: false }); // silent drop
  try {
    const payload = await req.json();
    if (!payload.event) return NextResponse.json({ ok: false });

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    await writeAnalyticsEvent({ ...payload, ip, server_ts: Date.now() });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
