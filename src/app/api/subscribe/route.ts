import { NextRequest, NextResponse } from 'next/server';
import { getDay1Email, sendEmail } from '@/lib/email-sender';
import { addSubscriberToMailerLite } from '@/lib/mailer';
import { setSequenceRecord } from '@/lib/kv';
import { type ArchetypeKey } from '@/lib/archetypes';

const VALID_ARCHETYPES: ArchetypeKey[] = ['H', 'C', 'S', 'G'];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();
    let archetype = (body.archetype || 'H').trim().toUpperCase() as ArchetypeKey;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!VALID_ARCHETYPES.includes(archetype)) archetype = 'H';

    // 1. Add to MailerLite — segmented by archetype (KPI #4)
    await addSubscriberToMailerLite(email, name, archetype).catch(() => {});

    // 2. Write sequence tracking record to KV
    try {
      await setSequenceRecord(email, {
        email,
        name,
        archetype,
        signupAt: Date.now(),
        emailsSent: 1,
        lastSentAt: Date.now(),
        active: true,
      });
    } catch (e) {
      console.error('[subscribe] KV write error (non-fatal):', e);
    }

    // 3. Send Day 1 email immediately
    try {
      const { subject, html } = getDay1Email(name, archetype);
      const result = await sendEmail(email, subject, html);
      if (!result.success) console.error('[subscribe] Day 1 email failed:', result.error);
    } catch (e) {
      console.error('[subscribe] Day 1 email error:', e);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
