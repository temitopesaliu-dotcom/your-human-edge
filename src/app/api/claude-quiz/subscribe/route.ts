import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { isValidEmail } from '@/lib/utils/validation';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { addClaudeQuizTakerToMailerLite } from '@/lib/services/mailer';
import { scoreQuiz } from '@/lib/claude-quiz/levels';

/**
 * Claude Level Quiz email step.
 *
 * The level is re-scored here from the raw answers rather than trusted from
 * the browser, so the group a subscriber joins (and the email they get)
 * always matches what they answered. Joining the level group fires the
 * MailerLite automation that sends the result email.
 *
 * A MailerLite failure does not block the result: the person has already
 * answered 10 questions and should see what they came for. The failure is
 * logged and reported back as emailed:false.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 8, 60, 'claude-quiz-subscribe'))) {
    return NextResponse.json({ error: 'Too many attempts. Wait a minute and try again.' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim().slice(0, 60) : '';
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase().slice(0, 200) : '';
  const score = scoreQuiz(body?.answers);

  if (!name) return NextResponse.json({ error: 'Add your first name.' }, { status: 400 });
  if (!isValidEmail(email)) return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  if (!score) return NextResponse.json({ error: 'Answer all 10 questions first.' }, { status: 400 });

  const siteUrl = resolveSiteUrl(req);
  const resultLink = `${siteUrl}/claude-quiz/result/${score.level.slug}`;

  const emailed = await addClaudeQuizTakerToMailerLite(email, name, score.level.n, score.level.name, resultLink);

  return NextResponse.json({
    level: score.level.n,
    chatPct: score.chatPct,
    coworkPct: score.coworkPct,
    emailed,
  });
}
