import { NextRequest, NextResponse } from 'next/server';
import { addSubscriberToMailerLite } from '@/lib/mailer';
import { type ArchetypeKey } from '@/lib/archetypes';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// The single origin allowed for cross-origin requests (e.g. the live site).
const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

const VALID_ARCHETYPES: ArchetypeKey[] = ['H', 'C', 'S', 'G'];

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 10, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    let archetype = (body.archetype || 'H').trim().toUpperCase() as ArchetypeKey;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!VALID_ARCHETYPES.includes(archetype)) archetype = 'H';

    // MailerLite: quiz-taker groups + automations handle Day 1 and Days 2–5 drip.
    // Buyers: separate MailerLite buyers-group automation (post-purchase daily emails).
    await addSubscriberToMailerLite(email, name, archetype).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function OPTIONS(req: NextRequest) {
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
