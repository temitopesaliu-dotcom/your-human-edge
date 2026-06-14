import { NextRequest, NextResponse } from 'next/server';
import { addSubscriberToMailerLite, addFreeResourceSubscriberToMailerLite, isMailerLiteBuyer } from '@/lib/mailer';
import { getSubscriber, setSubscriber } from '@/lib/kv';
import { type ArchetypeKey } from '@/lib/archetypes';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { handleCors } from '@/lib/cors';

const VALID_ARCHETYPES: ArchetypeKey[] = ['H', 'C', 'S', 'G'];

/** Sources that can trigger a subscription. */
type SubscriberSource = 'quiz' | 'paths' | 'b2b-prompt' | string;

/** Validate and parse the request body. */
function parseSubscribeBody(body: unknown): { email: string; name: string; source: SubscriberSource; isCompany: boolean; archetype: ArchetypeKey } | null {
  const data = body as Record<string, unknown>;
  const email = ((data?.email as string) || '').trim().toLowerCase();
  const name = ((data?.name as string) || '').trim();
  const source = ((data?.source as string) || 'quiz').trim() as SubscriberSource;
  const isCompany = data?.isCompany === true || data?.isCompany === 'true';
  let archetype = ((data?.archetype as string) || 'H').trim().toUpperCase() as ArchetypeKey;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!VALID_ARCHETYPES.includes(archetype)) archetype = 'H';

  return { email, name, source, isCompany, archetype };
}

/** Handle MailerLite logic for existing subscribers. */
async function handleExistingSubscriber(email: string, name: string, source: SubscriberSource, isCompany: boolean): Promise<void> {
  if ((source === 'paths' || source === 'b2b-prompt') && isCompany) {
    try {
      await addFreeResourceSubscriberToMailerLite(email, name, true);
    } catch (err: unknown) {
      console.error('[subscribe] Company group add failed:', err instanceof Error ? err.message : String(err));
    }
  }
}

/** Handle MailerLite logic for new subscribers. */
async function handleNewSubscriber(email: string, name: string, source: SubscriberSource, isCompany: boolean, archetype: ArchetypeKey): Promise<void> {
  if (source === 'paths' || source === 'b2b-prompt') {
    try {
      await addFreeResourceSubscriberToMailerLite(email, name, isCompany);
    } catch (err: unknown) {
      console.error('[subscribe] Free resource MailerLite add failed:', err instanceof Error ? err.message : String(err));
    }
  } else {
    try {
      const alreadyBuyer = await isMailerLiteBuyer(email);
      await addSubscriberToMailerLite(email, name, archetype, alreadyBuyer);
    } catch (err: unknown) {
      console.error('[subscribe] MailerLite add failed:', err instanceof Error ? err.message : String(err));
    }
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 10, 60, 'subscribe');
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = parseSubscribeBody(body);
    if (!parsed) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const { email, name, source, isCompany, archetype } = parsed;
    const existing = await getSubscriber(email);

    if (existing) {
      await handleExistingSubscriber(email, name, source, isCompany);
    } else {
      await handleNewSubscriber(email, name, source, isCompany, archetype);
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
    }

    return NextResponse.json({ success: true, isNew: !existing });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return handleCors(req);
}

