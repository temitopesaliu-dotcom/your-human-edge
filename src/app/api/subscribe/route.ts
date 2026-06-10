import { NextRequest, NextResponse } from 'next/server';
import { addSubscriberToMailerLite } from '@/lib/mailer';
import { getSubscriber, setSubscriber } from '@/lib/kv';
import { type ArchetypeKey } from '@/lib/archetypes';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// The single origin allowed for cross-origin requests (e.g. the live site).
const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

const VALID_ARCHETYPES: ArchetypeKey[] = ['H', 'C', 'S', 'G'];

/** Sources that can trigger a subscription. */
type SubscriberSource = 'quiz' | 'paths' | string;

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
    const source = (body.source || 'quiz').trim() as SubscriberSource;
    let archetype = (body.archetype || 'H').trim().toUpperCase() as ArchetypeKey;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!VALID_ARCHETYPES.includes(archetype)) archetype = 'H';

    // Check if already subscribed (prevents duplicate MailerLite calls).
    const existing = await getSubscriber(email);

    if (existing) {
      // Already in MailerLite — just record this new source.
      console.log(`[subscribe] ${email} already subscribed via ${existing.source}; skipping MailerLite.`);
    } else {
      // First time: add to MailerLite and record in KV.
      try {
        await addSubscriberToMailerLite(email, name, archetype);
      } catch (err: unknown) {
        console.error('[subscribe] MailerLite add failed:', err instanceof Error ? err.message : String(err));
      }
    }

    // Always upsert the KV record so we track the earliest source.
    try {
      await setSubscriber(email, {
        email,
        name,
        subscribedAt: existing?.subscribedAt ?? Date.now(),
        source: existing?.source ?? source,
      });
    } catch (err: unknown) {
      console.error('[subscribe] KV setSubscriber failed:', err instanceof Error ? err.message : String(err));
      // Non-fatal: keep going, but surface the issue in logs.
    }

    return NextResponse.json({ success: true, isNew: !existing });
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
