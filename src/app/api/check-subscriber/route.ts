import { NextRequest, NextResponse } from 'next/server';
import { getSubscriber } from '@/lib/services/kv';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { isValidEmail } from '@/lib/utils/validation';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 20, 60, 'check-subscriber');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ subscribed: false });
    }

    const existing = await getSubscriber(email);

    return NextResponse.json({ subscribed: !!existing });
  } catch {
    return NextResponse.json({ subscribed: false });
  }
}

