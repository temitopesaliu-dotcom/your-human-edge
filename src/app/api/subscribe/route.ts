import { NextRequest, NextResponse } from 'next/server';
import { addSubscriberToMailerLite, addFreeResourceSubscriberToMailerLite, isMailerLiteBuyer } from '@/lib/mailer';
import { getSubscriber, setSubscriber } from '@/lib/kv';
import { type ArchetypeKey } from '@/lib/archetypes';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// The single origin allowed for cross-origin requests (e.g. the live site).
const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

const VALID_ARCHETYPES: ArchetypeKey[] = ['H', 'C', 'S', 'G'];

/** Sources that can trigger a subscription. */
type SubscriberSource = 'quiz' | 'paths' | 'b2b-prompt' | string;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 10, 60, 'subscribe');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    const source = (body.source || 'quiz').trim() as SubscriberSource;
    const isCompany = body.isCompany === true || body.isCompany === 'true';
    let archetype = (body.archetype || 'H').trim().toUpperCase() as ArchetypeKey;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!VALID_ARCHETYPES.includes(archetype)) archetype = 'H';

    // Check if already subscribed (prevents duplicate MailerLite calls).
    const existing = await getSubscriber(email);

    if (existing) {
      // Already in KV — record this new source, but still ensure the
      // company free resource group is applied if applicable.
      // If the user selected Company on a free resource gate, ensure they
      // get added to the company free resource MailerLite group even if
      // they already exist in KV (e.g. from a previous quiz signup).
      if ((source === 'paths' || source === 'b2b-prompt') && isCompany) {
        try {
          await addFreeResourceSubscriberToMailerLite(email, name, true);
        } catch (err: unknown) {
          console.error('[subscribe] Company group add failed:', err instanceof Error ? err.message : String(err));
        }
      }
    } else {
      // First time: add to MailerLite and record in KV.
      // Free resource gates (paths, b2b-prompt) use addFreeResourceSubscriberToMailerLite
      // so we can route companies to a separate group. Quiz signups use the original flow.
      if (source === 'paths' || source === 'b2b-prompt') {
        try {
          await addFreeResourceSubscriberToMailerLite(email, name, isCompany);
        } catch (err: unknown) {
          console.error('[subscribe] Free resource MailerLite add failed:', err instanceof Error ? err.message : String(err));
        }
      } else {
        try {
          // Check buyer status to prevent re-adding buyers to the drip group
          const alreadyBuyer = await isMailerLiteBuyer(email);
          await addSubscriberToMailerLite(email, name, archetype, alreadyBuyer);
        } catch (err: unknown) {
          console.error('[subscribe] MailerLite add failed:', err instanceof Error ? err.message : String(err));
        }
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

