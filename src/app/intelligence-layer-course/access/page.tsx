import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import PurchaseTracker from '@/components/purchase-tracker';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';
import { getPaidCheckout } from '@/lib/services/paid-checkout';
import '../intelligence-layer-course.css';

export const metadata: Metadata = {
  title: 'Your course: The Intelligence Layer — Self-Paced',
  // Never indexed: the only public page is the sales page.
  robots: 'noindex, nofollow',
};

/**
 * Post-payment delivery page for The Intelligence Layer — Self-Paced.
 *
 * Security model, in order:
 *   1. The YouTube video is UNLISTED, so it is not searchable and has no
 *      public watch page listed anywhere.
 *   2. The video ID is not in the codebase, the git history or the client
 *      bundle. It lives in the YOUTUBE_COURSE_VIDEO_ID env var and is read
 *      here, on the server, only AFTER validatePurchaseAccess has confirmed
 *      with Stripe that this exact checkout session was paid for THIS
 *      product. An unverified visitor reaches the locked branch below and
 *      the ID is never even read, let alone sent.
 *   3. The embed loads from youtube-nocookie.com, which reduces tracking and
 *      does not change the access model.
 *
 * Residual risk (accepted): a payer can read the video ID out of the player
 * and share the raw YouTube URL. Unlisted means anyone with that URL can
 * watch. This is the trade-off chosen over Vimeo domain-locking; revisit if
 * the link is ever found loose in the wild. A paid private-unlisted listing
 * and disabling embeds elsewhere tighten it further.
 *
 * Because the video renders server-side per request, sharing THIS page's
 * URL does nothing: the session id is validated against Stripe every visit.
 */

export default async function IntelligenceLayerCourseAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; c?: string }>;
}) {
  const { session_id: sessionId, c } = await searchParams;
  // Campaign tag from checkout (e.g. email-one), re-checked here because it
  // arrives in the URL. Only used to label the GA4 purchase event.
  const campaign = c && /^[a-z0-9][a-z0-9_-]{0,39}$/.test(c) ? c : undefined;

  const access = sessionId
    ? await validatePurchaseAccess(sessionId, 'intelligence-layer-course')
    : { ok: false as const };

  if (!access.ok) {
    return (
      <div className="ds-light ilcs-page">
        <SiteNav />
        <section className="ilc-locked">
          <div className="ilc-lock-card">
            <div className="ilc-lock-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h1>This course is locked</h1>
            <p>
              Access opens the moment your payment clears. This page verifies
              every checkout link with Stripe before it shows anything, so a
              borrowed or guessed link opens nothing.
            </p>
            <p>
              If you have just paid and landed here by accident, nothing is
              lost: your Stripe receipt is proof of purchase. Send it to{' '}
              <a href="mailto:hello@temitopesaliu.com?subject=Intelligence%20Layer%20course%20access">
                hello@temitopesaliu.com
              </a>{' '}
              and access will be sorted straight away.
            </p>
            <Link href="/intelligence-layer-course" className="ilcs-btn ilc-btn-sm">
              Back to the course page
            </Link>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  const firstName = access.name ? access.name.split(' ')[0] : '';
  const paid = await getPaidCheckout(access.sessionId);

  // Read only after the payment check above. Never imported into a client
  // component, never prefixed NEXT_PUBLIC_: the ID must not reach the bundle.
  const videoId = process.env.YOUTUBE_COURSE_VIDEO_ID ?? '';

  return (
    <div className="ds-light ilcs-page">
      {paid && (
        <PurchaseTracker
          productId="intelligence-layer-course"
          productName="The Intelligence Layer — Self-Paced Course"
          value={paid.value}
          currency={paid.currency}
          transactionId={paid.sessionId}
          extraParams={campaign ? { campaign } : undefined}
        />
      )}

      <SiteNav />

      <section className="ilc-access">
        <div className="ilcs-wrap">
          <div className="ilc-welcome">
            <div className="ilc-tick" aria-hidden="true">✓</div>
            <h1>{firstName ? `It's yours, ${firstName}.` : "It's yours."}</h1>
            <p>
              The Intelligence Layer, self-paced. One video, the full working
              session. Bookmark this page: it keeps working with your checkout
              link, on any device.
            </p>
          </div>

          {videoId ? (
            <div className="ilc-player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                title="The Intelligence Layer — Self-Paced Course"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="ilc-player ilc-player-missing">
              <p>
                <strong>Video not configured yet.</strong> Set the
                YOUTUBE_COURSE_VIDEO_ID environment variable to the unlisted
                YouTube video ID and redeploy. Your payment is safe; this note
                is visible to you only because your checkout link verified.
              </p>
            </div>
          )}

          <div className="ilc-notes">
            <div className="ilc-note">
              <h2>Watch it like a working session</h2>
              <p>
                This is not a lecture to put on in the background. Pause at
                every build and do the step in your own AI tool before moving
                on. The value is in the doing.
              </p>
            </div>
            <div className="ilc-note">
              <h2>Your access, your link</h2>
              <p>
                This page is tied to your purchase and checked with Stripe on
                every visit, so keep your checkout link or this bookmark. If
                you ever lose it, your Stripe receipt to{' '}
                <a href="mailto:hello@temitopesaliu.com?subject=Intelligence%20Layer%20course%20access">
                  hello@temitopesaliu.com
                </a>{' '}
                gets you back in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
