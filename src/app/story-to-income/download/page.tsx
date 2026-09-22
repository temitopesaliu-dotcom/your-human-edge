import Link from 'next/link';
import PurchaseTracker from '@/components/purchase-tracker';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';
import '../story-to-income.css';

export const metadata = {
  title: 'Your download: Storytelling to Income',
  robots: 'noindex, nofollow',
};

/**
 * Post-payment delivery page for Storytelling to Income.
 *
 * Deliberately NOT /payment-successful, which is hard-coded to the AI Stadium
 * Live Class and fires a $97 purchase event under "stadium-live". Sending
 * buyers there would log every $9.99 sale as a $97 stadium ticket in GA4 and
 * the Meta Pixel.
 *
 * The session is verified server-side against Stripe before the download link
 * renders, so the link is not exposed to anyone who simply guesses this URL.
 * PurchaseTracker is only mounted inside the verified branch for the same
 * reason: a failed verification must not log revenue that never happened.
 */

/**
 * Not a static file path. The PDF is served by a route that re-verifies the
 * Stripe session on every request, so the URL is useless to anyone who has not
 * paid, even if a buyer shares it.
 */
const downloadHref = (sessionId: string) =>
  `/api/story-to-income/download?session_id=${encodeURIComponent(sessionId)}`;

export default async function StoryToIncomeDownloadPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const access = sessionId
    ? await validatePurchaseAccess(sessionId, 'story-to-income')
    : { ok: false as const };

  if (!access.ok) {
    return (
      <div className="sti-page">
        <section className="sti-section">
          <div className="sti-wrap">
            <div className="sti-dl-card">
              <h2 style={{ fontSize: '26px' }}>We could not verify that payment</h2>
              <p style={{ marginTop: '14px' }}>
                This page needs a valid checkout link to release the download.
                If you have just paid and landed here, nothing is lost. Your
                Stripe receipt is proof of purchase.
              </p>
              <p>
                Send that receipt to{' '}
                <a
                  href="mailto:hello@temitopesaliu.com?subject=Storytelling%20to%20Income%20download"
                  style={{ color: '#6c4fd6', fontWeight: 700 }}
                >
                  hello@temitopesaliu.com
                </a>{' '}
                and the guide will be sent straight to you.
              </p>
              <p style={{ marginBottom: 0 }}>
                <Link href="/story-to-income" style={{ color: '#6c4fd6', fontWeight: 700 }}>
                  Back to the page
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const firstName = access.name ? access.name.split(' ')[0] : '';

  return (
    <div className="sti-page">
      <PurchaseTracker
        productId="story-to-income"
        productName="Storytelling to Income"
        value={9.99}
        currency="USD"
      />

      <section className="sti-section">
        <div className="sti-wrap">
          <div className="sti-dl-card">
            <div className="sti-dl-tick">✓</div>
            <h2 style={{ fontSize: '28px' }}>
              {firstName ? `It's yours, ${firstName}.` : "It's yours."}
            </h2>
            <p style={{ marginTop: '14px' }}>
              Storytelling to Income is ready. Save it to your phone
              preferably, or your laptop, you will be copying prompts out of it.
            </p>

            <div style={{ marginTop: '24px' }}>
              <a className="sti-btn" href={downloadHref(access.sessionId)}>
                Download the guide
              </a>
            </div>

            <p className="sti-btn-note" style={{ textAlign: 'center' }}>
              15-page PDF. Bookmark this page, the link keeps working.
            </p>
          </div>

          <div className="sti-card k3" style={{ marginTop: '26px' }}>
            <h3>Let me see what you make with it</h3>
            <p style={{ marginBottom: 0 }}>
              When you post your first one, tag me at{' '}
              <a
                href="https://www.instagram.com/temitopesaliu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#00918a', fontWeight: 700 }}
              >
                @temitopesaliu
              </a>
              . I share the ones that land with my own audience, so your work
              gets in front of people who would never have found you otherwise.
              That is the whole point of doing this in public.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
