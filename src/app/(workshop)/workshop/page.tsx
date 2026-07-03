"use client";

import Link from "next/link";
import "../workshop.css";

export default function WorkshopPage() {
  return (
    <div className="ws-root">
      {/* NAV */}
      <nav className="ws-nav">
        <Link href="/" className="ws-nav-logo">
          Your Intelligence Layer + AI<span>.</span>
        </Link>
        <div className="ws-nav-right">
          <span className="ws-nav-date">July 25th · 2PM London BST.</span>
          <a
            href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
            target="_blank"
            rel="noopener noreferrer"
            className="ws-nav-cta"
          >
            Reserve seat — $97
          </a>
        </div>
      </nav>

      {/* COUNTDOWN */}
      <div className="ws-countdown">
        <strong>Early access pricing closes soon.</strong> Full price is $147.
        Lock in $97 now.
      </div>

      {/* HOOK */}
      <section className="ws-hook">
        <div className="ws-container">
          <div className="ws-hook-inner">
            <h2>
              You have spent years getting good at something. You have not
              spent a single day getting paid{" "}
              <em>what it is actually worth.</em>
            </h2>
            <p>
              The market does not reward expertise. It rewards packaged
              expertise. Right now, yours is not packaged. This workshop
              changes that — in three hours.
            </p>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="ws-hero">
        <div className="ws-container">
          <div className="ws-hero-inner">
            <div>
              <div className="ws-hero-eyebrow">
                <span className="ws-hero-eyebrow-dot" />
                Live Workshop · The Intelligence Layer
              </div>
              <h1>
                The Intelligence Layer:
                <br />
                Go <em>From Expertise</em>
                <br />to <span className="checkout-offer-color">Offer</span>
              </h1>
              <p className="ws-hero-sub">
                A 3-hour live working session for ambitious professionals
                who are done leaving money on the table. Walk in with
                expertise. Walk out with an AI-powered offer, a pricing
                strategy, and the infrastructure to deliver it.
              </p>
              <div className="ws-hero-meta">
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  July 25th, 2025
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  2:00 PM London BST.
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /></svg>
                  Live on Zoom
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  3 hours · Recording included
                </div>
              </div>
              <div className="ws-hero-actions">
                <a
                  href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ws-btn-checkout"
                >
                  Reserve my seat — $97
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <Link href="/" className="ws-btn-secondary">
                  Take the free profile quiz first
                </Link>
              </div>
              <div className="ws-hero-trust">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Powered by Stripe. Secure checkout. Recording sent within 24
                hours if you miss the live session.
              </div>
            </div>

            {/* CHECKOUT CARD */}
            <div className="ws-checkout-card">
              <div className="ws-checkout-card-top">
                <div className="ws-checkout-date">
                  July 25th · 2PM London BST · Live on Zoom.
                </div>
                <div className="ws-checkout-title">
                  The Intelligence Layer: Go From Expertise to <span className="checkout-offer-color">Offer.</span>
                </div>
                <div className="ws-checkout-sub">
                  The Intelligence Layer — 3-hour working session
                </div>
              </div>
              <div className="ws-checkout-body">
                <div>
                  <div className="ws-price-original">$147 full price</div>
                  <div className="ws-price-current">
                    <sup>$</sup>97
                  </div>
                  <div className="ws-price-badge">
                    Early access — closes soon
                  </div>
                </div>
                <div className="ws-seats-notice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  Limited seats available. This session stays small by
                  design.
                </div>
                <div>
                  <div className="ws-checkout-includes-label">
                    What is included
                  </div>
                  {[
                    "3-hour live working session on Zoom",
                    "Your Intelligence Layer mapped live",
                    "AI infrastructure built in the session",
                    "90-day GTM plan you leave with",
                    "Session recording within 24 hours",
                    "All working templates and frameworks",
                  ].map((item) => (
                    <div className="ws-include-item" key={item}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  className="ws-btn-checkout-full"
                  onClick={() =>
                    window.open(
                      "https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k",
                      "_blank"
                    )
                  }
                >
                  Reserve my seat — $97
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <div className="ws-checkout-trust">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Secure checkout via Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="ws-about-section ws-section">
        <div className="ws-container">
          <div className="ws-about-inner">
            <div className="ws-about-img-wrap">
              <img
                src="/PHOTO-2026-06-19-12-56-31.jpg"
                alt="Temitope Saliu"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="ws-about-img-tag">
                <div className="ws-about-img-tag-name">Temitope Saliu</div>
                <div className="ws-about-img-tag-role">
                  Solutions Architect, Strategist and Teacher
                </div>
              </div>
            </div>
            <div className="ws-about-content">
              <div className="ws-section-eyebrow">Who is running this</div>
              <h2>
                The system she wished existed when she started.
              </h2>
              <p>
                Temitope Saliu sits at the intersection of people, marketing &
                technology — building concepts & solutions architecture, GTM
                strategy for brands to increase revenue with the right people,
                structure and systems.
              </p>
              <p>
                In 2017, she sold a gold chain to fund her first digital
                marketing course.{" "}
                <strong>
                  That decision — and everything built from it — is why she
                  understands exactly what it costs to bet on yourself before
                  anyone else does.
                </strong>{" "}
                The Intelligence Layer is the structured methodology she built
                from that journey.
              </p>
              <p>
                She does not teach AI basics. She teaches ambitious people how
                to take what they already know and build something the market
                will pay a premium for.
              </p>
              <div className="ws-creds-grid">
                {[
                  "Google & Meta Elite Trainer — Trained 3000 professionals & Business Owners.",
                  "1 of 20 Google Digital Skills Partners",
                  "1 of 5 Microsoft Developer Programme Partner",
                  "USAID & Peace Corp Education Curriculum Developer & Trainer for Peace Ambassadors",
                  "Women Economic Forum Iconic Award Winner",
                  "UK Global Exceptional Talent",
                ].map((cred) => (
                  <div className="ws-cred-item" key={cred}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {cred}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-section-eyebrow">What happens in the room</div>
          <h2 className="ws-section-h2">
            Three hours.
          </h2>
          <p className="ws-section-sub">No fluff. You map what you know, build what delivers it, and leave with a priced offer and a 90-day plan to sell it. Everything you need. Nothing you do not.</p>
          <div className="ws-hours-grid">
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 01</div>
              <div className="ws-hour-title">Map</div>
              <div className="ws-hour-desc">Find the exact thing inside your head that the market will pay a premium for. Most people never name it. You will.</div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
                Documented expertise architecture
              </div>
            </div>
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 02</div>
              <div className="ws-hour-title">Model and Machine</div>
              <div className="ws-hour-desc">Turn it into an offer. Build the AI system that delivers it.</div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
              Infrastructure, not intentions.
              </div>
            </div>
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 03</div>
              <div className="ws-hour-title">Monetise and Move</div>
              <div className="ws-hour-desc">
                You will price your offer, package it, and map the first 90
                days of getting it to market. You leave with a concrete
                go-to-market plan, not a workbook you will never open.
              </div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
                90-day GTM plan, ready to execute
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="ws-for-section ws-section">
        <div className="ws-container">
          <div className="ws-for-grid">
            <div>
              <div className="ws-section-eyebrow">This room is for you if</div>
              <h2 className="ws-section-h2">
                You are ready to build.
                <br />
                Not just learn.
              </h2>
              <div className="ws-for-list">
                {[
                  "You have 3 or more years of expertise in your field and you know you are undercharging for it",
                  "You are employed, consulting, or coaching and want an AI-powered income stream without starting from scratch",
                  "You are done watching people with less experience charge more because they packaged themselves better",
                  "You want a structured methodology, not another pile of AI tool recommendations",
                ].map((item) => (
                  <div className="ws-for-item yes" key={item}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="ws-section-eyebrow">This is not for you if</div>
              <h2
                className="ws-section-h2"
                style={{ color: "var(--text-muted)" }}
              >
                Wrong room?
                <br />
                No problem.
              </h2>
              <div className="ws-for-list">
                <div className="ws-for-item no">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>
                    You are brand new to your field and looking for a shortcut
                  </span>
                </div>
                <div className="ws-for-item no">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>
                    You want passive income without putting in the thinking
                    work first
                  </span>
                </div>
                <div className="ws-for-item no">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  <span>
                    You are looking for a general AI tools overview or beginner
                    content
                  </span>
                </div>
                <div
                  className="ws-for-item no"
                  style={{
                    border: "1px solid var(--purple-mid)",
                    background: "var(--purple-light)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--purple)" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  <span style={{ color: "var(--purple)", fontWeight: 500 }}>
                    Not sure if this is for you?{" "}
                    <Link
                      href="/"
                      style={{
                        color: "var(--purple)",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      Take the free profile quiz first.
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WORKING SESSION */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-why-card">
            <div>
              <div className="ws-section-eyebrow">
                Why a working session and not a webinar
              </div>
              <h2>
                A webinar gives you information. This gives you a built offer.
              </h2>
              <p>
                Information without implementation is just content. This room
                is designed to end with something in your hands — not a
                notebook full of ideas and a Zoom fatigue headache.
              </p>
              <p style={{ marginTop: "1rem" }}>
                The level of specificity required to actually build your
                Intelligence Layer, price it correctly, and map the
                go-to-market requires a room that stays small. Seats are
                limited and will not reopen at this price once they close.
              </p>
            </div>
            <div className="ws-why-stats">
              <div className="ws-why-stat">
                <div className="ws-why-stat-val">3 hrs</div>
                <div className="ws-why-stat-label">
                  One focused working session — everything built in the room,
                  not as homework
                </div>
              </div>
              <div className="ws-why-stat">
                <div
                  className="ws-why-stat-val"
                  style={{ color: "var(--green)" }}
                >
                  $97
                </div>
                <div className="ws-why-stat-label">
                  Early access price. Goes to $147 when this closes. Next
                  session will be higher.
                </div>
              </div>
              <div className="ws-why-stat">
                <div className="ws-why-stat-val">24 hrs</div>
                <div className="ws-why-stat-label">
                  Recording delivered within 24 hours if you cannot attend live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-section-eyebrow">Common questions</div>
          <h2 className="ws-section-h2">Everything you need to know.</h2>
          <div className="ws-faq-grid">
            {[
              {
                q: "Is this session recorded?",
                a: "Yes. If you cannot attend live, the full recording and all working documents will be delivered within 24 hours. The live session is where the real work happens, but you will not lose your investment if your schedule shifts.",
              },
              {
                q: "What do I need to come prepared with?",
                a: "Your expertise and an honest answer to one question: what problem do you solve better than most people you know? Everything else gets built in the room. No prep slides, no pre-work required.",
              },
              {
                q: "Is $97 the final price?",
                a: "No. Early access closes when seats fill or when I decide it closes — whichever comes first. The full price is $147. After this session, when testimonials exist, future sessions will be priced higher.",
              },
              {
                q: "I already use AI in my work. Is this still relevant?",
                a: "Good. This session is not about learning AI basics. It is about building a structured, monetisable system around your specific expertise. If you already use AI tactically, this takes you to strategic.",
              },
              {
                q: "What platform is the session on?",
                a: "Zoom. Your link will be sent immediately after purchase with a confirmation email. You will receive a reminder 24 hours before the session and 1 hour before it starts.",
              },
              {
                q: "Do I need any technical background?",
                a: "None. This workshop is built for professionals who are expert in their field — not in technology. If you can use a laptop and have expertise worth monetising, you are ready.",
              },
            ].map((faq) => (
              <div className="ws-faq-item" key={faq.q}>
                <div className="ws-faq-q">{faq.q}</div>
                <div className="ws-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ws-final-cta ws-section">
        <div className="ws-container">
          <div className="ws-final-cta-inner">
            <h2>
              Limited seats. $97. July 25th
              <br />
              at 2PM <em>London BST.</em>
            </h2>
            <p>
              This is the room where your expertise stops being invisible.
            </p>
            <div style={{ marginBottom: "2rem" }}>
              <div className="ws-final-price-original">$147 full price</div>
              <div className="ws-final-price-current">$97</div>
              <div className="ws-final-price-badge">
                Early access — closes soon
              </div>
            </div>
            <a
              className="ws-btn-final"
              href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve my seat now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <div className="ws-final-trust">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Stripe checkout. Instant confirmation. Recording included.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-site-footer">
        <div className="ws-container">

          <div className="ws-footer-copy">
            2026 Temitope Saliu. The Intelligence Layer is a proprietary
            methodology. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
