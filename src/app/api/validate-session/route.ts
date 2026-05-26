import { NextRequest, NextResponse } from 'next/server';
import { getSession, setSession } from '@/lib/kv';

const STRIPE_SESSION_PATTERN = /^cs_(live|test)_[A-Za-z0-9]{40,}$/;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id') || '';

  if (!STRIPE_SESSION_PATTERN.test(sessionId)) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 403 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  // Check KV first (returning visitors)
  const record = await getSession(sessionId).catch(() => null);

  if (record?.paid) {
    const ageMs = Date.now() - record.createdAt;
    const withinGrace = ageMs < 15 * 60 * 1000;

    if (withinGrace || record.firstIP === ip) {
      // Update visit metadata
      await setSession(sessionId, {
        ...record,
        visitCount: record.visitCount + 1,
        lastVisit: Date.now(),
        lastIP: ip,
      }).catch(() => {});
      return NextResponse.json({ ok: true });
    }

    // Different IP past grace window — deny
    return NextResponse.json({ error: 'Access restricted' }, { status: 403 });
  }

  // Not in KV — verify directly with Stripe (first visit)
  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Stripe-Version': '2023-10-16',
        },
      }
    );

    if (!stripeRes.ok) return NextResponse.json({ error: 'Session not found' }, { status: 403 });

    const session = await stripeRes.json();
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not confirmed' }, { status: 403 });
    }

    // Write to KV for future visits
    await setSession(sessionId, {
      createdAt: Date.now(),
      visitCount: 1,
      lastVisit: Date.now(),
      firstIP: ip,
      lastIP: ip,
      email: session.customer_email || session.customer_details?.email || '',
      name: session.customer_details?.name || '',
      archetype: session.metadata?.archetype || 'H',
      paid: true,
      webhookSource: false,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
