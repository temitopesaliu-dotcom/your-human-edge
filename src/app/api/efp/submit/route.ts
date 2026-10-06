import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { sendMetaEvent } from '@/lib/services/meta-capi';
import {
  BUYERS, CLIENTS_FROM, DOMAINS, PAID, PAID_ECHO, QUIZ_VERSION, SELL, SITUATIONS, YEARS, currencyFor,
} from '@/lib/efp/data';
import { parseAnswers, type EfpResultRecord } from '@/lib/efp/types';
import { generateBuild } from '@/lib/efp/generate';
import { saveResult } from '@/lib/efp/store';
import { sendToSheet } from '@/lib/efp/sheets';
import { addEfpFailedSubscriber, addEfpSubscriber } from '@/lib/efp/mailerlite';

/** The AI call takes 15 to 30 seconds; leave headroom for the Sheet and MailerLite writes. */
export const maxDuration = 60;

const randomCode = (bytes: number) => randomBytes(bytes).toString('hex');

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const allowed = await rateLimit(ip, 5, 60, 'efp-submit').catch(() => true);
  if (!allowed) return NextResponse.json({ error: 'Too many attempts. Please wait a minute and try again.' }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }); }
  const parsed = parseAnswers(body);
  if (!parsed.ok) return NextResponse.json({ error: `Please check: ${parsed.field}` }, { status: 400 });
  const a = parsed.answers;
  // The quiz page tries twice before showing an error. Only the final failure sends the try-again email.
  const finalAttempt = (body as { attempt?: unknown }).attempt === 2;

  const submissionId = `efp_${randomCode(8)}`;
  const code = randomCode(12);
  const siteUrl = resolveSiteUrl(req).replace(/\/$/, '');
  const resultsUrl = `${siteUrl}/expert-framework-profile/results/${code}`;
  const currency = currencyFor(a.country);

  // Answers go to the Sheet first, so they are kept even if anything later fails.
  const sheetAppend = sendToSheet({
    action: 'append',
    row: {
      submitted_at: new Date().toISOString(),
      submission_id: submissionId,
      quiz_version: QUIZ_VERSION,
      first_name: a.firstName,
      last_name: a.lastName,
      email: a.email,
      consent: 'yes',
      domain: DOMAINS[a.domain],
      domain_other: a.domainOther || '',
      years: YEARS[a.years],
      situation: SITUATIONS[a.situation],
      country: a.country,
      city: a.city,
      clients_from: CLIENTS_FROM[a.clientsFrom],
      buyer: BUYERS[a.buyer],
      buyer_other: a.buyerOther || '',
      problem_in_their_words: a.problem,
      already_tried: a.tried,
      best_result: a.result || '',
      no_result_yet: a.noResultYet ? 'yes' : 'no',
      paid_outside_job: PAID[a.paid],
      sell_first: SELL[a.sellFirst],
      utm_source: a.utm?.source || '',
      utm_medium: a.utm?.medium || '',
      utm_campaign: a.utm?.campaign || '',
      referrer: a.referrer || '',
      results_code: code,
    },
  });
  const gen = await generateBuild(a);

  if (!gen.build) {
    console.error('[efp-submit] AI build failed:', gen.error);
    // Answers are already in the Sheet. Mark the row and let the Sheet script email Temitope.
    await sheetAppend;
    await sendToSheet({
      action: 'update',
      submission_id: submissionId,
      fields: {
        build_status: 'failed',
        currency,
        ai_tokens_in: gen.tokensIn ?? '',
        ai_tokens_out: gen.tokensOut ?? '',
        // Not a Sheet column: the Sheet script puts it in the alert email.
        build_error: (gen.error || 'unknown').slice(0, 300),
      },
    });
    if (finalAttempt) await addEfpFailedSubscriber(a.email, a.firstName, a.lastName);
    return NextResponse.json({ error: 'We couldn’t finish your build just now. Please try again.' }, { status: 502 });
  }
  const build = gen.build;

  const record: EfpResultRecord = {
    code,
    submissionId,
    createdAt: new Date().toISOString(),
    firstName: a.firstName,
    lastName: a.lastName,
    siteSlug: `${a.firstName}${a.lastName}`.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g, '') || 'yourname',
    currency,
    paidEcho: PAID_ECHO[a.paid],
    source: 'ai',
    build,
  };

  try {
    await saveResult(record);
  } catch (err) {
    console.error('[efp-submit] could not save result', err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: 'We could not save your results. Please try again.' }, { status: 500 });
  }

  // The append must land before the update can find the row.
  await sheetAppend;
  await Promise.allSettled([
    sendToSheet({
      action: 'update',
      submission_id: submissionId,
      fields: {
        build_status: 'ai',
        offer_name: build.brand,
        currency,
        core_price: build.tiers[1]?.price || '',
        ai_tokens_in: gen.tokensIn ?? '',
        ai_tokens_out: gen.tokensOut ?? '',
      },
    }),
    // Only people who got a results page join the group, because the email links to it.
    addEfpSubscriber(a.email, a.firstName, a.lastName, resultsUrl),
    sendMetaEvent({
      eventName: 'Lead',
      eventId: submissionId,
      eventSourceUrl: `${siteUrl}/expert-framework-profile`,
      email: a.email,
      clientIp: ip,
      userAgent: req.headers.get('user-agent') || undefined,
      customData: { content_name: 'Expert Framework Profile' },
    }),
  ]);

  const res = NextResponse.json({ code, submissionId });
  // Lets the workshop checkout link a purchase back to this quiz submission.
  res.cookies.set('efp_sid', submissionId, {
    httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}
