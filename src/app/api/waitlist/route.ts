import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
