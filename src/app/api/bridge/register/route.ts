import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { clean, EMAIL_RE, sendToBridgeSheet } from '@/lib/bridge/sheet';

/** The Bridge free live training sign-up: first name, email, WhatsApp with country code. */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'bridge-register').catch(() => true))) {
    return NextResponse.json({ error: 'Too many attempts. Please wait a minute and try again.' }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }

  const firstName = clean(body.first_name, 80);
  const email = clean(body.email, 200).toLowerCase();
  const whatsapp = clean(body.whatsapp, 20);
  const dialCode = clean(body.dial_code, 8);
  if (!firstName) return NextResponse.json({ error: 'Add your first name.' }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'That email looks incomplete.' }, { status: 400 });
  if (!/^\+\d{7,15}$/.test(whatsapp)) return NextResponse.json({ error: 'Check your WhatsApp number.' }, { status: 400 });

  const sessionUtc = clean(body.session_utc, 40);
  const ok = await sendToBridgeSheet({
    action: 'webinar',
    first_name: firstName,
    email,
    whatsapp,
    dial_code: dialCode,
    country_code: clean(body.country_code, 4),
    session_utc: Number.isNaN(Date.parse(sessionUtc)) ? '' : sessionUtc,
    local_time: clean(body.local_time, 120),
    tz: clean(body.tz, 60),
    source: clean(body.source, 200),
  });
  // The visitor still gets their seat page if the Sheet is down; the failure is logged above.
  return NextResponse.json({ ok: true, saved: ok });
}
