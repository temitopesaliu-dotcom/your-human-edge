'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SiteNav from '@/components/site-nav';
import SiteFooter from '@/components/site-footer';
import './intelligence-layer-course.css';

/**
 * The Intelligence Layer — Self-Paced course sales page.
 *
 * Built on the unified design system: .ds-light wrapper, shared SiteNav /
 * SiteFooter, and only --ds-* tokens (globals.css). No page-specific colors.
 *
 * One page, one job: sell the workshop recording as a self-study course.
 * Same funnel shape as story-to-income (no lead-magnet step), with UTM
 * forwarding into Stripe so each sale records what sent the buyer.
 *
 * Price lives in api/intelligence-layer-course/create-checkout. PRICE_LABEL
 * below is only what the page renders; if one changes the other must change
 * with it.
 */

const PRICE_LABEL = '$99';

/**
 * Carries the email's UTM tags through to Stripe, so every sale records
 * which email it came from. The API re-validates everything, so this is a
 * convenience, not a trust boundary.
 */
function readUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = q.get(k);
    if (v) out[k] = v;
  }
  return out;
}

export default function IntelligenceLayerCoursePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
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

  return (
    <div className="ds-light ilcs-page">
      <SiteNav
        ctaLabel="Get the course"
        onCtaClick={buy}
      />

      {/* ================= HERO ================= */}
      <header className="ilcs-hero">
        <div className="ilcs-eyebrow">The Intelligence Layer — Self-Paced</div>
        <h1>
          The workshop, <em>on your clock.</em>
        </h1>
        <p className="ilcs-sub">
          The full Intelligence Layer + AI working session — the one built
          live with a room of experts — now a private, self-paced course.
          Same builds, same templates, same 90-day plan. You bring the
          afternoon; it brings the rest.
        </p>

        <div className="ilcs-chain">
          <span>Map your layer</span>
          <span>Build the AI stack</span>
          <span>90-day GTM plan</span>
          <span>Keep the templates</span>
        </div>

        <div className="ilcs-price-line">
          <span className="now">{PRICE_LABEL}</span>
          <span className="then">One payment. Lifetime access to the recording.</span>
        </div>

        <div ref={heroCtaRef}>
          <button className="ilcs-btn" onClick={buy} disabled={loading}>
            {loading ? 'Opening checkout…' : `Get instant access, ${PRICE_LABEL}`}
          </button>
        </div>
        {error && <div className="ilcs-err">{error}</div>}
        <p className="ilcs-btn-note">
          Watch privately on this site, the moment you pay. No waiting on email.
        </p>
      </header>

      {/* ================= WHAT YOU GET ================= */}
      <section className="ilcs-section">
        <div className="ilcs-wrap">
          <h2>What you get</h2>
          <p className="ilcs-lead">
            Not a lecture to fall asleep to. A working session you do.
          </p>
          <div className="ilcs-cards">
            <div className="ilcs-card">
              <span className="ilcs-num">01</span>
              <h3>Your Intelligence Layer, mapped</h3>
              <p>
                The exercise that turns ten years of accumulated judgement into
                a structured layer an AI can actually use — the thing that
                makes its output sound like you on a good day, not like a
                chatbot.
              </p>
            </div>
            <div className="ilcs-card">
              <span className="ilcs-num">02</span>
              <h3>The AI infrastructure, built with you</h3>
              <p>
                Every build from the live session, shown start to finish, with
                the exact prompts. You pause, you build, you have it forever.
              </p>
            </div>
            <div className="ilcs-card">
              <span className="ilcs-num">03</span>
              <h3>The 90-day go-to-market plan</h3>
              <p>
                The plan that turns the layer into offers, content and
                conversations. Worked through on the recording so you can
                produce yours alongside it.
              </p>
            </div>
            <div className="ilcs-card">
              <span className="ilcs-num">04</span>
              <h3>Every working template</h3>
              <p>
                The same templates live attendees walked away with. Nothing
                held back for the room — the recording is the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE VS SELF-PACED ================= */}
      <section className="ilcs-band">
        <div className="ilcs-band-inner">
          <div className="ilcs-eyebrow">Live was the first edition</div>
          <h2>Same material. Your pace. Your replay button.</h2>
          <p style={{ marginTop: 10 }}>
            The live session ran with a room of experts who paid the live
            price to be in it and built their layer in real time. This is that
            session: every exercise, every build, every template — minus the
            calendar commitment. <strong>Watch at midnight, at 2x, twice. It does not mind.</strong>
          </p>
        </div>
      </section>

      {/* ================= WHO IT'S FOR ================= */}
      <section className="ilcs-section">
        <div className="ilcs-wrap">
          <h2>Who this is for</h2>
          <p className="ilcs-lead">
            The recording has one requirement: that you intend to do it.
          </p>
          <ul className="ilcs-ticks">
            <li>
              Experts, consultants and founders whose AI output is fine, and
              who are tired of fine.
            </li>
            <li>
              Anyone who missed the live workshop and keeps meaning to catch
              the next one.
            </li>
            <li>
              People who buy courses and actually do them — this one is built
              to be done, not watched.
            </li>
            <li>
              Teams who want one shared way of briefing AI instead of eleven
              personal styles.
            </li>
          </ul>
        </div>
      </section>

      {/* ================= BUY ================= */}
      <section className="ilcs-section" id="get-it">
        <div className="ilcs-wrap">
          <div className="ilcs-buybox">
            <div>
              <div className="ilcs-eyebrow ilcs-buy-eyebrow">
                The Intelligence Layer — Self-Paced
              </div>
              <div className="ilcs-amount">
                {PRICE_LABEL}
                <small>one payment</small>
              </div>

              <div style={{ marginTop: 22 }}>
                <button className="ilcs-btn" onClick={buy} disabled={loading}>
                  {loading ? 'Opening checkout…' : `Get instant access, ${PRICE_LABEL}`}
                </button>
              </div>
              {error && <div className="ilcs-err" style={{ marginLeft: 0 }}>{error}</div>}
              <p className="ilcs-btn-note">
                Secure checkout by Stripe. The private viewing page opens the
                moment you pay.
              </p>
            </div>
            <ul className="ilcs-ticks" style={{ margin: 0 }}>
              <li>Private, self-paced video course</li>
              <li>Watch on this site immediately after payment</li>
              <li>The full Intelligence Layer mapping exercise</li>
              <li>Every AI build, start to finish</li>
              <li>The 90-day GTM plan + all working templates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="ilcs-band ilcs-band--faq">
        <div className="ilcs-wrap">
          <h2>Questions</h2>
          <p className="ilcs-lead">The honest answers.</p>
          <div className="ilcs-faq">
            <details>
              <summary>What exactly do I get, in plain terms?</summary>
              <p>
                The full Intelligence Layer + AI workshop as a private video
                course. The moment your payment clears you land on your own
                viewing page on this site, where the video plays. Inside are
                the layer-mapping exercise, every AI build shown start to
                finish, the 90-day go-to-market plan and all the working
                templates.
              </p>
            </details>
            <details>
              <summary>How do I watch it?</summary>
              <p>
                On a private page on this site, straight after checkout. Your
                link is tied to your purchase and keeps working, so bookmark
                it. If you ever lose it, your Stripe receipt gets you back in.
              </p>
            </details>
            <details>
              <summary>How is this different from the live workshop?</summary>
              <p>
                Same material, two formats. The live session was three hours on
                Zoom with me in the room answering questions. The self-paced
                course is the recording of that session: everything the room
                got, on your schedule, replayable forever. What it does not
                have is live Q&amp;A — that is what the price reflects.
              </p>
            </details>
            <details>
              <summary>I attended the live workshop. Is this for me?</summary>
              <p>
                You already have the recording and the templates, so no need to
                buy this one. This page is for everyone who was not in the room.
              </p>
            </details>
            <details>
              <summary>How long do I have access?</summary>
              <p>
                Your viewing link keeps working. Watch it this weekend or next
                quarter — the layer you build does not expire.
              </p>
            </details>
            <details>
              <summary>Is there a refund?</summary>
              <p>
                Because the full course is delivered instantly and consumed on
                the spot, this purchase is non-refundable. Everything you are
                buying is described plainly on this page, so please buy only if
                the description above is what you want.
              </p>
            </details>
            <details>
              <summary>Can I share it with my team?</summary>
              <p>
                The purchase is one viewing seat. If you want it running across
                a team, email{' '}
                <a href="mailto:ts@temitopesaliu.com?subject=Intelligence%20Layer%20for%20teams">
                  ts@temitopesaliu.com
                </a>{' '}
                and team pricing can be sorted properly.
              </p>
            </details>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* ================= STICKY (phone only) ================= */}
      <div className={`ilcs-sticky${showSticky ? ' show' : ''}`}>
        <span className="s-price">{PRICE_LABEL}</span>
        <button className="ilcs-btn" onClick={buy} disabled={loading}>
          {loading ? 'Opening…' : 'Get the course'}
        </button>
      </div>
    </div>
  );
}
