import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const ALLOWED_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!await rateLimit(ip, 10, 60)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const name = (body.name || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    const waitlistGroup = process.env.MAILERLITE_WAITLIST_GROUP_ID;

    if (!apiKey) {
      console.warn('[waitlist] MAILERLITE_API_KEY not set — skipping');
      return NextResponse.json({ success: true });
    }

    const groups: string[] = [];
    if (waitlistGroup) groups.push(waitlistGroup);

    try {
      const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: { name, signup_source: 'community_waitlist' },
          groups,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('[waitlist] MailerLite add failed:', res.status, errText);
      } else {
        console.log(`[waitlist] ${email} added to waitlist group`);
      }
    } catch (err: unknown) {
      console.warn('[waitlist] MailerLite error:', err instanceof Error ? err.message : String(err));
    }

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
