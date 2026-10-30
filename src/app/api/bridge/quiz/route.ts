import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { sendMetaEvent } from '@/lib/services/meta-capi';
import { clean, EMAIL_RE, sendToBridgeSheet } from '@/lib/bridge/sheet';

/** The Bridge quiz: called after each answer and again at the email step. */
const ANSWER_IDS = ['role', 'paid', 'teach', 'who', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'gap'];
const SID_RE = /^[a-z0-9]{8,40}$/;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  // A full quiz is about 14 calls, so allow a generous burst.
  if (!(await rateLimit(ip, 60, 60, 'bridge-quiz').catch(() => true))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = (await req.json()) as Record<string, unknown>; } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }

  const sid = clean(body.sid, 40);
  if (!SID_RE.test(sid)) return NextResponse.json({ error: 'Invalid session' }, { status: 400 });

  const rawAnswers = (body.answers && typeof body.answers === 'object' ? body.answers : {}) as Record<string, unknown>;
  const answers: Record<string, string> = {};
  for (const id of ANSWER_IDS) if (rawAnswers[id] !== undefined) answers[id] = clean(rawAnswers[id], 300);

  const email = clean(body.email, 200).toLowerCase();
  const completed = body.completed === true;
  const firstName = clean(body.first_name, 80);

  // Answers go to the Sheet first. If it fails we log it and the visitor still gets their results.
  await sendToBridgeSheet({
    action: 'quiz',
    sid,
    step_no: Math.min(Number(body.step_no) || 0, 30),
    last_step: clean(body.last_step, 40),
    completed,
    first_name: firstName,
    email: EMAIL_RE.test(email) ? email : '',
    answers,
    under: Math.min(Number(body.under) || 0, 7),
    over: Math.min(Number(body.over) || 0, 7),
    result: clean(body.result, 60),
    tz: clean(body.tz, 60),
    source: clean(body.source, 200),
  });

  if (completed && EMAIL_RE.test(email)) {
    const siteUrl = resolveSiteUrl(req).replace(/\/$/, '');
    await sendMetaEvent({
      eventName: 'Lead',
      eventId: `bridge_${sid}`,
      eventSourceUrl: `${siteUrl}/bridge`,
      email,
      clientIp: ip,
      userAgent: req.headers.get('user-agent') || undefined,
      customData: { content_name: 'The Bridge quiz' },
    });
  }
  return NextResponse.json({ ok: true });
}
