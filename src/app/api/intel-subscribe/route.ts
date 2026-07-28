import { NextRequest, NextResponse } from 'next/server';
import { addIntelligenceLayerFreeSubscriber } from '@/lib/services/mailer';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { handleCors } from '@/lib/utils/cors';
import { isValidEmail } from '@/lib/utils/validation';
import type { IntelSubscribeRequest, IntelSubscribeResponse } from '@/types/intel-subscribe';

export async function POST(req: NextRequest): Promise<NextResponse<IntelSubscribeResponse>> {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 10, 60, 'intel-subscribe');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = (await req.json()) as IntelSubscribeRequest;
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();

    if (!email || !isValidEmail(email)) {
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
