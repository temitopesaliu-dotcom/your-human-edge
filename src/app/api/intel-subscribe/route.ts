import { NextRequest, NextResponse } from 'next/server';
import { addIntelligenceLayerFreeSubscriber } from '@/lib/mailer';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { handleCors } from '@/lib/cors';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 10, 60, 'intel-subscribe');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = ((body?.email as string) || '').trim().toLowerCase();
    const name = ((body?.name as string) || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    await addIntelligenceLayerFreeSubscriber(email, name);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleCors(req);
}
