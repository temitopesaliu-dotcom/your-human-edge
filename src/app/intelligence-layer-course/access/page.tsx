import Link from 'next/link';
import type { Metadata } from 'next';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import PurchaseTracker from '@/components/purchase-tracker';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';
import { getPaidCheckout } from '@/lib/services/paid-checkout';
import '../intelligence-layer-course.css';

/** "Find Prompts Here" from the delivery email — the working prompts doc
 *  attendees build from. Swap the URL here if the doc ever moves. */
const PROMPTS_URL =
  'https://docs.google.com/document/d/1KQiuHeLd6r7h9-vA1nxSxwNKj7z6r_gtE0mDoszsZXM/edit?usp=drivesdk';

/** Post-payment next step for this funnel. Not indexed (page robots), and
 *  the target is a static presale page, so a plain <a> is correct here —
 *  no client-side router involved. */
const AI_OPERATOR_SUITE_URL = '/ai-operator-suite';

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
              <a href="mailto:ts@temitopesaliu.com?subject=Intelligence%20Layer%20course%20access">
                ts@temitopesaliu.com
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
              The Intelligence Layer, self-paced. Everything below is your
              full work kit, start to finish, at your own pace — the video,
              the tools, the prompts and the order to do them in.
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

          {/* Bookmark banner — the single most-read line on this page. It
              frames the save as protecting their purchase, not as a favour
              to us. */}
          <aside className="ilc-bookmark" aria-label="Save this page">
            <div className="ilc-bookmark-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <p>
              <strong>Bookmark this page right now</strong> — before you press
              play. It is tied to your purchase and re-checked with Stripe on
              every visit, so the bookmark is your standing key back in: same
              video, same kit, any device, whenever you sit down to build.
              Your checkout link works too, but this page is the one to keep.
            </p>
          </aside>

          {/* The work kit, in the order the email gives it: tools signed in
              first, prompts open, then the video above as the build itself. */}
          <div className="ilc-kit">
            <div className="ilc-kit-step ilc-kit-step--first">
              <div className="ilc-kit-head">
                <span className="ilc-kit-num">Step 1</span>
                <h2>Before you press play</h2>
              </div>
              <p className="ilc-kit-lead">
                Open, sign in to and test every one of these. All of them
                logged in and open in tabs before the video starts. The
                session moves; you do not want to be creating accounts
                mid-build.
              </p>
              <div className="ilc-tools">
                <a
                  className="ilc-tool"
                  href="/expert-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ilc-tool-head">
                    <span className="ilc-tool-name">Your expert profile</span>
                    <span className="ilc-tool-tag ilc-tool-tag--req">Required</span>
                  </span>
                  <span className="ilc-tool-desc">
                    temitopesaliu.com/expert-profile — this is what you build
                    with. Complete it first; it is non-negotiable.
                  </span>
                  <span className="ilc-tool-open">Open in a new tab →</span>
                </a>
                <a
                  className="ilc-tool"
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ilc-tool-head">
                    <span className="ilc-tool-name">Claude</span>
                    <span className="ilc-tool-tag">claude.ai</span>
                  </span>
                  <span className="ilc-tool-desc">
                    Pro recommended. The builds run fastest and cleanest on a
                    paid plan, but free works to start.
                  </span>
                  <span className="ilc-tool-open">Open in a new tab →</span>
                </a>
                <a
                  className="ilc-tool"
                  href="https://tally.so"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ilc-tool-head">
                    <span className="ilc-tool-name">Tally</span>
                    <span className="ilc-tool-tag">tally.so</span>
                  </span>
                  <span className="ilc-tool-desc">
                    Free. The forms layer of the build — sign in and have it
                    ready.
                  </span>
                  <span className="ilc-tool-open">Open in a new tab →</span>
                </a>
                <a
                  className="ilc-tool"
                  href="https://sheets.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ilc-tool-head">
                    <span className="ilc-tool-name">Google Sheets</span>
                    <span className="ilc-tool-tag">sheets.google.com</span>
                  </span>
                  <span className="ilc-tool-desc">
                    Sign in with your Google email — the same one you want the
                    automations writing into.
                  </span>
                  <span className="ilc-tool-open">Open in a new tab →</span>
                </a>
                <a
                  className="ilc-tool"
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ilc-tool-head">
                    <span className="ilc-tool-name">Vercel</span>
                    <span className="ilc-tool-tag">vercel.com</span>
                  </span>
                  <span className="ilc-tool-desc">
                    Free. This is where what you build gets deployed and stays
                    up.
                  </span>
                  <span className="ilc-tool-open">Open in a new tab →</span>
                </a>
              </div>
            </div>

            <div className="ilc-kit-step">
              <div className="ilc-kit-head">
                <span className="ilc-kit-num">Step 2</span>
                <h2>Open the prompts</h2>
              </div>
              <p className="ilc-kit-lead">
                Every prompt used in the session lives in this document. Have
                it open in its own tab so you can copy as you go — pausing the
                video to retype a prompt from the screen is time you do not
                need to spend.
              </p>
              <a
                className="ilcs-btn ilc-btn-sm"
                href={PROMPTS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the prompts document →
              </a>
            </div>

            <div className="ilc-kit-step">
              <div className="ilc-kit-head">
                <span className="ilc-kit-num">Step 3</span>
                <h2>Watch the session, build alongside</h2>
              </div>
              <p className="ilc-kit-lead">
                The video above is the full working session. Watch it once
                straight through, then go back and build alongside the parts
                you paused on. It is not a lecture for the background: pause at
                every build and do the step in your own tools before moving on.
                The value is in the doing.
              </p>
            </div>
          </div>

          {/* What comes next — the email's upsell, for people who finished the
              video or want the roadmap before starting. */}
          <section className="ilc-next">
            <div className="ilc-next-eyebrow">What comes next</div>
            <h2>
              The workshop built the first piece. <em>The suite builds the business.</em>
            </h2>
            <p className="ilc-next-sub">
              The AI Operator Suite is six self-paced modules that turn this
              session into an actual AI-driven business — Personality
              Intelligence for Sales, Leads &amp; Sales Engine, AI Staff &amp;
              Agentic Automations, Content to Client, AI Clone Operator, plus
              the Advanced Build on AI Business Audits &amp; Architecture. The
              AI Consultant Framework comes free with any purchase.
            </p>
            <ul className="ilc-next-list">
              <li>Content unlocks 6 October 2026</li>
              <li>Buying now locks in your spot at presale pricing</li>
            </ul>
            <a className="ilcs-btn" href={AI_OPERATOR_SUITE_URL}>
              See the AI Operator Suite →
            </a>
          </section>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
