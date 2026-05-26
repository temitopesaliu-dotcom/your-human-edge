import { NextRequest, NextResponse } from 'next/server';
import { writeAnalyticsEvent } from '@/lib/kv';

export async function POST(req: NextRequest) {
  // Always return 200 — analytics never breaks UX
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
