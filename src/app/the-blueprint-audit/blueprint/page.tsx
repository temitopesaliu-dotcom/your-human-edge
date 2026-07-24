import AiosNav from "../_components/AiosNav";
import AiosFooter from "../_components/AiosFooter";
import AiosScripts from "../_components/AiosScripts";
import Link from "next/link";

export default function BlueprintPage() {
  return (
    <>
      <AiosScripts />
      <AiosNav variant="blueprint" />

      {/* HERO */}
      <section className="hero hero-inner-page" id="hero" aria-label="Blueprint hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-grid-lines" aria-hidden="true"></div>

        <div className="hero-inner">
          <div className="hero-label fade-up">
            <div className="hero-label-dot"></div>
            <span className="label">The First Step</span>
          </div>
          <h1 className="hero-title fade-up delay-1">
            AI Operating System
            <br />
            <em>Blueprint Session</em>
          </h1>
          <p className="hero-subtitle fade-up delay-2">
            A 90-minute consulting engagement where we map your business,
            identify every AI opportunity, and design the architecture of your
            operating system. Not a sales call. A deliverable.
          </p>
          <div className="hero-ctas fade-up delay-3">
            <Link href="/the-blueprint-audit/apply" className="btn btn-primary btn-lg btn-arrow">
              Apply to Book
            </Link>
            <a href="#what-you-receive" className="btn btn-ghost btn-arrow">
              What you receive
            </a>
          </div>
          <p className="hero-note fade-up delay-3">
            $1,000 · Credited in full toward implementation
          </p>
        </div>
      </section>

      {/* WHAT IS THIS SECTION */}
      <section className="section" id="what-is-this" aria-labelledby="what-is-this-heading">
        <div className="container">
          <div className="two-col-layout">
            <div className="fade-up">
              <p className="label mb-3">What This Is</p>
              <h2 className="heading-1" id="what-is-this-heading">
                This is not a discovery call. It is a consulting engagement.
              </h2>
            </div>
            <div className="fade-up delay-1">
              <p className="body-lg mb-4">
                Most agencies offer free calls. We don&apos;t. Because a free
                call is a sales conversation dressed up as strategy. You walk
                away with a pitch, not a plan.
              </p>
              <p className="body-md mb-4">
                The Blueprint is a paid consulting engagement with one
                deliverable: a complete, written strategy document that tells
                you exactly what your AI Operating System should look like, what
                to build first, what tools to use, what it will cost, and what
                the ROI looks like.
              </p>
              <p className="body-md">
                That document has value whether or not you proceed with
                implementation. If you do proceed, the $1,000 is credited in full
                toward your project. It is not a deposit. It is not a fee. It is
                consulting work that you keep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU RECEIVE */}
      <section className="section" id="what-you-receive" aria-labelledby="receive-heading">
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">The Deliverables</p>
            <h2 className="heading-1" id="receive-heading">
              What you receive from the Blueprint.
            </h2>
            <p className="body-lg mt-3">
              Delivered within 5 business days of your session. Written.
              Actionable. Yours to keep.
            </p>
          </div>

          <div className="deliverables-grid fade-up delay-1">
            {[
              {
                num: "01",
                title: "Business Workflow Map",
                desc: "A documented map of every significant workflow in your business — lead flow, client onboarding, delivery, communication, knowledge management and team coordination. Your operations made visible.",
              },
              {
                num: "02",
                title: "AI Opportunity Assessment",
                desc: "Every process evaluated for AI potential. Where AI should act, where it should assist, where it should be absent. Prioritised by impact and effort, not by what is technically possible.",
              },
              {
                num: "03",
                title: "Automation Architecture",
                desc: "The design of your AI OS — how information flows, where decisions are made, how AI layers connect your existing tools into a coherent, functioning system. Not a list of tools. An architecture.",
              },
              {
                num: "04",
                title: "Technology Recommendations",
                desc: "Specific tool recommendations for your situation — CRM, automation platform, AI models, knowledge management, communication tools. Why each, how they integrate, what to avoid.",
              },
              {
                num: "05",
                title: "Implementation Roadmap",
                desc: "A phased implementation plan. What to build first, what to build second, what can wait. Why the order matters. Dependencies mapped. Timeline estimated.",
              },
              {
                num: "06",
                title: "ROI Opportunity Map",
                desc: "A quantified view of the return. Hours recovered. Decisions automated. Revenue per founder hour before and after. The financial case for your operating system, specific to your business.",
              },
              {
                num: "07",
                title: "Priority Matrix",
                desc: "Every AI opportunity ranked by impact, effort and urgency. A decision tool for where to start. Useful whether you implement with us or independently.",
              },
              {
                num: "08",
                title: "Investment Estimate",
                desc: "A scoped investment figure for your specific implementation if you choose to proceed. No surprises. No sliding scale. A number attached to a defined scope of work.",
              },
            ].map((item) => (
              <div className="deliverable-feature-card" key={item.num}>
                <div className="deliverable-feature-number">{item.num}</div>
                <h3 className="deliverable-feature-title">{item.title}</h3>
                <p className="deliverable-feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section-sm" id="who" aria-labelledby="who-heading">
        <div className="container">
          <div className="two-col-layout">
            <div className="fade-up">
              <p className="label mb-3">Who This Is For</p>
              <h2 className="heading-2" id="who-heading">
                The Blueprint is designed for one kind of business.
              </h2>
            </div>
            <div className="fade-up delay-1">
              <p className="body-lg mb-5">
                Founder-led. Revenue-generating. Operationally bottlenecked.
                Ready to change that.
              </p>
              <div className="who-grid">
                {[
                  "Coaches with 1:1 practices or group programs",
                  "Consultants with established client bases",
                  "Agency owners managing delivery for clients",
                  "Founders with 1–15 person teams",
                  "Service businesses with repeatable delivery models",
                  "Creators monetizing knowledge or community",
                  "Business owners ready to invest in infrastructure",
                ].map((item, i) => (
                  <div className="who-item" key={i}>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#C8A96E" strokeWidth="1.2" />
                      <path d="M5 8l2 2 4-4" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
                {[
                  "Pre-revenue businesses with no established process",
                  "Businesses seeking a sub-$3,500 solution",
                ].map((item, i) => (
                  <div className="who-item not-fit" key={`nf-${i}`}>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SESSION ITSELF */}
      <section className="section" id="the-session" aria-labelledby="session-heading">
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">The 90 Minutes</p>
            <h2 className="heading-1" id="session-heading">
              How the session is structured.
            </h2>
            <p className="body-lg mt-3">
              We use every minute. Come prepared. Leave with clarity.
            </p>
          </div>

          <div className="session-structure fade-up delay-1">
            {[
              {
                time: "0–20 min",
                title: "Business Mapping",
                desc: "We walk through your business from the ground up. Every process, every flow, every decision point. Where are you involved? Where are you the only person who can act? We document as we go.",
              },
              {
                time: "20–45 min",
                title: "AI Opportunity Identification",
                desc: "Every workflow examined through the lens of AI leverage. What can be fully automated? What should be AI-assisted? Where does human judgment remain irreplaceable? We map each decision.",
              },
              {
                time: "45–70 min",
                title: "Architecture Design",
                desc: "We sketch the architecture of your AI OS. Which tools connect. How information flows. Where the AI layer sits. What the system looks like when it's running.",
              },
              {
                time: "70–90 min",
                title: "Roadmap & Priority",
                desc: "What to build first, second, third. Why. Expected outcomes. Investment range. Questions answered. The session closes with a clear decision framework for your next step.",
              },
            ].map((block, i) => (
              <div className="session-block" key={i}>
                <div className="session-block-time">{block.time}</div>
                <div className="session-block-content">
                  <h3 className="session-block-title">{block.title}</h3>
                  <p className="session-block-desc">{block.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT + CREDIT SECTION */}
      <section className="section-sm" id="investment" aria-labelledby="investment-heading">
        <div className="container">
          <div className="blueprint-grid">
            <div className="fade-up">
              <p className="label mb-3">The Investment</p>
              <h2 className="heading-1" id="investment-heading">
                $1,000 for a consulting session with a written deliverable.
              </h2>
              <p className="body-lg mt-4 mb-5">
                Most businesses spend weeks — and tens of thousands of dollars —
                building AI tools that don&apos;t connect or deliver results. The
                Blueprint costs $1,000 and gives you a complete, written
                architecture for your AI OS before a single tool is built.
              </p>

              {[
                {
                  title: "The full $1,000 is credited toward implementation",
                  desc: "If you proceed with implementation within 30 days, the Blueprint fee is credited in full. No partial credit. No conditions. 100% applied.",
                },
                {
                  title: "The Blueprint is yours regardless",
                  desc: "The written Blueprint document, roadmap, and all recommendations belong to you. Implement with us, implement independently, or file it for later. No obligation.",
                },
                {
                  title: "Not everyone is accepted",
                  desc: "Applications are reviewed first. If the Blueprint is not the right fit for where your business is, we tell you clearly and point you toward better options. This protects your $1,000 and your time.",
                },
              ].map((point, i) => (
                <div className={`investment-point ${i < 2 ? "mb-4" : ""}`} key={i}>
                  <div className="investment-point-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#C8A96E" strokeWidth="1.3" />
                      <path d="M9 12l2 2 4-4" stroke="#C8A96E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="investment-point-title">{point.title}</p>
                    <p className="body-sm" style={{ color: "var(--text-2)" }}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="blueprint-pricing-card fade-up delay-1">
              <p className="label mb-4">AI Operating System Blueprint</p>
              <div style={{ marginBottom: "var(--space-3)" }}>
                <span className="price-currency">$</span>
                <span className="price-amount">1,000</span>
              </div>
              <p className="body-sm mb-5" style={{ color: "var(--text-2)" }}>
                One consulting engagement. One written deliverable. Credited in
                full if you proceed.
              </p>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "var(--space-4)",
                  marginBottom: "var(--space-5)",
                }}
              >
                {[
                  "90-minute consulting session",
                  "Business workflow map",
                  "AI opportunity assessment",
                  "Automation architecture design",
                  "Technology recommendations",
                  "Phased implementation roadmap",
                  "ROI opportunity map",
                  "Written Blueprint document (delivered in 5 days)",
                ].map((item, i) => (
                  <div className={`deliverable-item ${i < 7 ? "mb-2" : ""}`} key={i}>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#C8A96E" strokeWidth="1.2" />
                      <path d="M5 8l2 2 4-4" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/the-blueprint-audit/apply"
                className="btn btn-primary btn-lg btn-arrow"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Apply to Book Your Blueprint
              </Link>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--text-3)",
                  marginTop: "var(--space-3)",
                }}
              >
                Not all applications are accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section-sm" aria-label="Client result">
        <div className="container">
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <div className="testimonial-card fade-up" style={{ background: "transparent", border: "none", padding: 0 }}>
              <div className="testimonial-quote-mark" style={{ fontSize: 80, textAlign: "center" }}>
                &ldquo;
              </div>
              <p
                className="testimonial-text"
                style={{
                  fontSize: 22,
                  lineHeight: 1.5,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                }}
              >
                The Blueprint alone was worth the $1,000. I got clarity on what to
                build and in what order. We&apos;d been spinning our wheels with
                tools for 18 months. In 90 minutes we had a clear architecture.
                That decision alone saved us months.
              </p>
              <div
                className="testimonial-author"
                style={{ justifyContent: "center", marginTop: "var(--space-5)" }}
              >
                <div className="testimonial-avatar"></div>
                <div style={{ textAlign: "left" }}>
                  <p className="testimonial-name">Priya K.</p>
                  <p className="testimonial-role">Founder, 12-person agency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" aria-labelledby="blueprint-cta-heading">
        <div className="final-cta-bg" aria-hidden="true"></div>
        <div className="final-cta-inner fade-up">
          <p className="label mb-4">Apply Now</p>
          <h2
            className="heading-1"
            id="blueprint-cta-heading"
            style={{
              maxWidth: 580,
              margin: "0 auto var(--space-5)",
            }}
          >
            The Blueprint is where operational clarity begins.
          </h2>
          <Link
            href="/the-blueprint-audit/apply"
            className="btn btn-primary btn-lg btn-arrow"
          >
            Apply for Your Blueprint
          </Link>
          <p className="final-cta-note">
            $1,000 · Credited in full if you proceed · Not all applications
            accepted
          </p>
        </div>
      </section>

      <AiosFooter variant="blueprint" />
    </>
  );
}
