'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import { TESTIMONIALS } from '@/components/features/workshop/testimonials.data';
import './expert-framework.css';

/**
 * The Expert Framework, Self-Paced — sales page.
 *
 * Built on the unified design system: .ds-light wrapper, shared SiteNav /
 * SiteFooter, and only --ds-* tokens (globals.css). Converted from the
 * standalone expert-framework.html comp; the site's own header and footer
 * replace the comp's nav/footer, everything else follows the comp.
 *
 * One page, one job: sell the Expert Framework recording as a self-paced
 * course, ending in the 100-companies list. Same funnel shape as before,
 * with UTM + coupon forwarding into Stripe so each sale records what sent
 * the buyer.
 *
 * Price lives in api/intelligence-layer-course/create-checkout. PRICE_LABEL
 * below is only what the page renders; if one changes the other must change
 * with it.
 */

const PRICE_LABEL = '$157';

/**
 * Carries the email's UTM tags and any ?coupon= code through to Stripe, so
 * every sale records which email it came from and at what discount. The API
 * re-validates everything, so this is a convenience, not a trust boundary.
 */
function readUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = q.get(k);
    if (v) out[k] = v;
  }
  const coupon = q.get('coupon');
  if (coupon) out.coupon = coupon;
  return out;
}

/** Arrow glyph shared by the primary CTAs and the hero proof strip. */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function IntelligenceLayerCoursePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  const buy = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/intelligence-layer-course/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(readUtm()),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        setError(
          data?.error ||
            'Something went wrong starting checkout. Please try again.'
        );
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  }, []);

  // The sticky bar appears only once the hero button has scrolled away, so
  // it never sits on top of the button it duplicates.
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: '-10px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reveal-on-scroll: sections tagged .ilcs-reveal fade up the first time
  // they enter the viewport, then never animate again.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.ilcs-reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('ilcs-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('ilcs-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const buyCta = (
    <button className="ilcs-btn" onClick={buy} disabled={loading}>
      {loading ? (
        'Opening checkout…'
      ) : (
        <>
          Get instant access, {PRICE_LABEL} <ArrowIcon />
        </>
      )}
    </button>
  );

  const playingVideo = TESTIMONIALS.find((t) => t.id === playingId);

  // While the lightbox is open: Escape closes it and the page behind
  // stops scrolling.
  useEffect(() => {
    if (!playingId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlayingId(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [playingId]);

  return (
    <div className="ds-light ilcs-page">
      <SiteNav ctaLabel="Get the course" onCtaClick={buy} />

      {/* ================= HERO ================= */}
      <header className="ilcs-hero">
        <span className="ilcs-eyebrow">
          <i aria-hidden="true" />
          The Expert Framework, Self-Paced.
        </span>
        <h1>
          From expertise to a <em>live offer.</em>
        </h1>
        <p className="ilcs-hero-tagline">
          Turn your skills and expertise to a consulting business
        </p>
        <p className="ilcs-sub">
          The full Expert Framework + AI working session — the one built live
          over <strong>five hours</strong> with a room of experts with{' '}
          <strong>5–30+ years of experience</strong> — is now a private,
          self-paced course you can watch in <strong>under an hour</strong>.
          Same builds, same original prompts, plus 100 companies you can
          immediately send your offer to.
        </p>

        {/* The four steps as one connected line. */}
        <ol className="ilcs-path">
          <li>
            <span className="ilcs-path-dot">1</span>
            <span>Map your expert layer</span>
          </li>
          <li>
            <span className="ilcs-path-dot">2</span>
            <span>Choose your offer</span>
          </li>
          <li>
            <span className="ilcs-path-dot">3</span>
            <span>Launch your website</span>
          </li>
          <li>
            <span className="ilcs-path-dot">4</span>
            <span>Get 100 companies to send it to</span>
          </li>
        </ol>

        <div className="ilcs-price-line">
          <span className="now">{PRICE_LABEL}</span>
          <span className="then">One payment. Lifetime access.</span>
        </div>

        <div ref={heroCtaRef}>{buyCta}</div>
        {error && <div className="ilcs-err">{error}</div>}

        <div className="ilcs-proof">
          <div>
            <span className="ilcs-proof-lbl">Live workshop</span>
            <b>5 hours</b>
          </div>
          <span className="ilcs-proof-arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
          <div>
            <span className="ilcs-proof-lbl">Self-paced recording</span>
            <b>Under 1 hour</b>
          </div>
        </div>
      </header>

      {/* ================= TESTIMONIALS ================= */}
      <section className="ilcs-section ilcs-tint">
        <div className="ilcs-wrap ilcs-wrap--wide">
          <div className="ilcs-head ilcs-reveal">
            <span className="ilcs-kicker">From the room</span>
            <h2>
              Hear it from people who have <em>sat in the room.</em>
            </h2>
            <p className="ilcs-lead">
              Real reactions from people who walked in with expertise and
              walked out with a priced, built offer.
            </p>
          </div>

          {/* One masonry wall: video clips and written screenshots flow
              together. Videos come from the shared workshop testimonial
              data; screenshots from /public/testimonials. */}
          <div className="ilcs-wall">
            {TESTIMONIALS.map((video) => (
              <div
                key={video.id}
                className={`ilcs-wall-item ilcs-wall-item--${video.aspect}`}
              >
                <button
                  type="button"
                  className="ilcs-testimonial-thumb"
                  onClick={() => setPlayingId(video.id)}
                  aria-label="Play testimonial video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail host isn't registered with next/image */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt=""
                    className="ilcs-testimonial-img"
                    loading="lazy"
                  />
                  <span className="ilcs-testimonial-play">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>
            ))}
            <figure className="ilcs-wall-item ilcs-wall-shot">
              <img
                src="/PHOTO-2026-10-09-17-38-29.jpg"
                alt="Screenshot message from a workshop attendee"
                loading="lazy"
              />
            </figure>
            <figure className="ilcs-wall-item ilcs-wall-shot">
              <img
                src="/testimonials/PHOTO-2026-10-01-09-14-13%202.jpg"
                alt="Screenshot message from a workshop attendee"
                loading="lazy"
              />
            </figure>
            <figure className="ilcs-wall-item ilcs-wall-shot">
              <img
                src="/testimonials/PHOTO-2026-10-01-09-14-13%203.jpg"
                alt="Screenshot message from a workshop attendee"
                loading="lazy"
              />
            </figure>
            <figure className="ilcs-wall-item ilcs-wall-shot">
              <img
                src="/testimonials/PHOTO-2026-10-01-09-14-13.jpg"
                alt="Screenshot message from a workshop attendee"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU GET ================= */}
      <section className="ilcs-section">
        <div className="ilcs-wrap ilcs-wrap--wide">
          <div className="ilcs-head ilcs-reveal">
            <span className="ilcs-kicker">What you get</span>
            <h2>
              Not a lecture to fall asleep to.{' '}
              <em>A working session you implement as you go.</em>
            </h2>
          </div>

          <div className="ilcs-cards">
            <article className="ilcs-card ilcs-reveal">
              <span className="ilcs-card-n" aria-hidden="true">
                01
              </span>
              <div className="ilcs-card-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l9 5-9 5-9-5 9-5z" />
                  <path d="M3 12l9 5 9-5" />
                  <path d="M3 17l9 5 9-5" />
                </svg>
              </div>
              <h3>Your expert layer, mapped.</h3>
              <p>
                The exercise that turns years of accumulated skills and
                judgement into a structured framework AI can actually use.
              </p>
            </article>
            <article className="ilcs-card ilcs-reveal">
              <span className="ilcs-card-n" aria-hidden="true">
                02
              </span>
              <div className="ilcs-card-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" />
                </svg>
              </div>
              <h3>Your offer, chosen.</h3>
              <p>
                Your expertise turned into one clear offer businesses can say
                yes to, worked through on the recording so you produce yours
                alongside it.
              </p>
            </article>
            <article className="ilcs-card ilcs-reveal">
              <span className="ilcs-card-n" aria-hidden="true">
                03
              </span>
              <div className="ilcs-card-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M7 6.5h.01M10 6.5h.01" />
                </svg>
              </div>
              <h3>Your website, launched.</h3>
              <p>
                Every build from the live session, shown start to finish with
                the exact prompts. You pause, you build, and your offer has a
                home online.
              </p>
            </article>
            <article className="ilcs-card ilcs-card--feature ilcs-reveal">
              <span className="ilcs-card-n" aria-hidden="true">
                04
              </span>
              <div className="ilcs-card-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8l7-5 7 5v13" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <h3>100 companies to send your offer to.</h3>
              <p>
                The prompt that generates 100 companies matched to what you
                built. You finish with a list to reach out to, not a blank
                page.
              </p>
            </article>
          </div>

          <div className="ilcs-prompts ilcs-reveal">
            <span className="ilcs-prompts-plus" aria-hidden="true">
              +
            </span>
            <p>
              <strong>Every original working prompt.</strong> The same prompts
              live attendees walked away with. Nothing held back for the room.
              The recording is the room.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHO IT'S FOR ================= */}
      <section className="ilcs-section">
        <div className="ilcs-wrap ilcs-wrap--wide">
          <div className="ilcs-head ilcs-reveal">
            <span className="ilcs-kicker">Who this is for</span>
            <h2>
              Built for people who <em>already know their field.</em>
            </h2>
            <p className="ilcs-lead">
              The recording has one requirement: that you intend to do it.
            </p>
          </div>

          <div className="ilcs-who-grid">
            <div className="ilcs-who-main ilcs-reveal">
              <span className="ilcs-who-tag">Most of the room</span>
              <h3>Experts who want their own business on the side.</h3>
              <p>
                You have years of skill in your field. This is where you
                convert it into a consulting business that works with
                businesses, small and large.
              </p>
            </div>
            <ul className="ilcs-who-list ilcs-reveal">
              <li>
                Business owners ready to turn what they know into a new offer.
              </li>
              <li>
                Experts, consultants and founders whose AI output is fine, and
                who are tired of fine.
              </li>
              <li>
                Anyone who missed the live workshop and keeps meaning to catch
                the next one.
              </li>
              <li>
                People who buy courses and actually do them. This one is built
                to be done, not watched.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= BUY ================= */}
      <section className="ilcs-buy ilcs-section" id="get-it">
        <div className="ilcs-wrap ilcs-wrap--wide">
          <div className="ilcs-buy-copy ilcs-reveal">
            <span className="ilcs-kicker">Get the course</span>
            <h2>
              Your expertise. A live offer.{' '}
              <em>100 companies to send it to.</em>
            </h2>
            <p className="ilcs-lead">
              Five hours of live building, cut to under one. On your schedule,
              as many times as you need it.
            </p>
          </div>
          <div className="ilcs-box ilcs-reveal">
            <div className="ilcs-box-name">The Expert Framework, Self-Paced.</div>
            <div className="ilcs-box-amount">
              <strong>{PRICE_LABEL}</strong>
            </div>
            <div className="ilcs-box-once">one payment</div>
            <ul>
              <li>Private, self-paced video course, under an hour</li>
              <li>The full expert layer mapping exercise</li>
              <li>Choose your offer and launch your website</li>
              <li>Every AI build, start to finish</li>
              <li>
                The prompt that generates 100 companies to send your offer to
              </li>
              <li>Every original working prompt</li>
              <li>Lifetime access</li>
            </ul>
            {buyCta}
            {error && <div className="ilcs-err">{error}</div>}
            <div className="ilcs-secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              Secure checkout by Stripe
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="ilcs-section">
        <div className="ilcs-wrap">
          <div className="ilcs-head ilcs-reveal">
            <span className="ilcs-kicker">Questions</span>
            <h2>The honest answers.</h2>
          </div>
          <div className="ilcs-faq">
            <details>
              <summary>What exactly do I get, in plain terms?</summary>
              <p>
                The full Expert Framework + AI workshop as a private video
                course you can watch in under an hour. Inside are the expert
                layer mapping exercise, choosing your offer, every AI build
                shown start to finish so your website goes live, the prompt
                that generates 100 companies to send your offer to, and all
                the original working prompts.
              </p>
            </details>
            <details>
              <summary>How is this different from the live workshop?</summary>
              <p>
                Same builds, two formats. The live session ran five hours on
                Zoom with me in the room answering questions. The self-paced
                course is that session with the Q&amp;A and live pauses taken
                out, which is how five hours becomes under one. What it does
                not have is live Q&amp;A, and that is what the price reflects.
              </p>
            </details>
            <details>
              <summary>I attended the live workshop. Is this for me?</summary>
              <p>
                You already have the recording and the prompts, so no need to
                buy this one. This page is for everyone who was not in the
                room.
              </p>
            </details>
            <details>
              <summary>How long do I have access?</summary>
              <p>
                Lifetime. Watch it this weekend or next quarter. The framework
                you build does not expire.
              </p>
            </details>
            <details>
              <summary>Is there a refund?</summary>
              <p>
                Because the full course is delivered instantly and consumed on
                the spot, this purchase is non-refundable. Everything you are
                buying is described plainly on this page, so please buy only
                if the description above is what you want.
              </p>
            </details>
            <details>
              <summary>Can I share it with my team?</summary>
              <p>
                The purchase is one viewing seat. If you want it running across
                a team, email{' '}
                <a href="mailto:ts@temitopesaliu.com?subject=Expert%20Framework%20for%20teams">
                  ts@temitopesaliu.com
                </a>{' '}
                and team pricing can be sorted properly.
              </p>
            </details>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ================= TESTIMONIAL LIGHTBOX ================= */}
      {/* Videos play large in an overlay, not inside their small wall
          tiles — clicking the backdrop or × closes. */}
      {playingId && (
        <div
          className="ilcs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Workshop testimonial video"
          onClick={() => setPlayingId(null)}
        >
          <button
            type="button"
            className="ilcs-lightbox-close"
            onClick={() => setPlayingId(null)}
            aria-label="Close video"
          >
            ×
          </button>
          <div
            className={`ilcs-lightbox-inner${playingVideo?.aspect === 'vertical' ? ' ilcs-lightbox-inner--vertical' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${playingId}?autoplay=1&rel=0`}
              title="Workshop testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ================= STICKY ================= */}
      <div className={`ilcs-sticky${showSticky ? ' show' : ''}`}>
        <span className="ilcs-sticky-price">
          <b>{PRICE_LABEL}</b>
        </span>
        <button className="ilcs-btn" onClick={buy} disabled={loading}>
          {loading ? 'Opening…' : 'Get the course'}
        </button>
      </div>
    </div>
  );
}
