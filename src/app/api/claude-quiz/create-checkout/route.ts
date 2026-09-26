import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
import { resolveSiteUrl } from '@/lib/utils/resolve-site-url';
import { rateLimit } from '@/lib/services/rate-limit';
import { getClientIp } from '@/lib/utils/get-client-ip';
import { isValidEmail } from '@/lib/utils/validation';
import { levelFromNumber, WORKBOOK_PRICE_CENTS } from '@/lib/claude-quiz/levels';

/**
 * Checkout for the four Claude workbooks ($9.99 each).
 *
 * Built inline with price_data, like Storytelling to Income, so the price the
 * page shows and the price Stripe charges both come from WORKBOOK_PRICE_CENTS.
 * metadata.product (claude-workbook-N) is what the webhook and the workbook
 * page key off. Card only, so the webhook always sees payment_status 'paid'.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!(await rateLimit(ip, 10, 60, 'claude-quiz-checkout'))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const level = levelFromNumber(body?.level);
  if (!level) return NextResponse.json({ error: 'Unknown workbook.' }, { status: 400 });
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  try {
    const siteUrl = resolveSiteUrl(req);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      adaptive_pricing: { enabled: false },
      ...(isValidEmail(email) ? { customer_email: email } : {}),
      metadata: {
        product: level.product,
        source: 'claude-quiz',
        claude_level: String(level.n),
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: WORKBOOK_PRICE_CENTS,
            product_data: {
              name: level.workbook,
              description: `${level.workbookDesc} Level ${level.n} of the Claude Level Quiz. Online workbook with lessons, prompts, exercises and a 7-day plan. Digital product: non-refundable.`,
            },
          },
        },
      ],
      success_url: `${siteUrl}/claude-quiz/workbook?session_id={CHECKOUT_SESSION_ID}&level=${level.n}`,
      cancel_url: `${siteUrl}/claude-quiz/result/${level.slug}`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe did not return a checkout URL.' }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[claude-quiz/create-checkout] Stripe error:', message);
    return NextResponse.json(
      { error: process.env.NODE_ENV === 'production' ? 'Failed to start checkout.' : message },
      { status: 500 }
    );
  }
}
