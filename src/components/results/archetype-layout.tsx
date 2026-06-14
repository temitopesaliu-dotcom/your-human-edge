"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { track, handleBuy as buyPlaybook } from "@/lib/funnel";
import SiteNav from "@/components/site-nav";

/* ── Types ──────────────────────────────────────────────────────── */

export interface CareerPath {
  title: string;
  desc: string;
  earn: string;
}

export interface BeforeAfterRow {
  before: string;
  after: string;
}

export interface CaseStudy {
  name: string;
  role: string;
  location: string;
  result: string;
  quote: string;
}

export interface IncomeCard {
  label: string;
  title: string;
  range: string;
  desc: string;
  items: string[];
  className: string;
  blurred?: boolean;
}

export interface ArchetypeConfig {
  /** Archetype key for tracking & checkout (e.g. "C", "G", "H", "S") */
  archetypeKey: string;
  /** Full CSS string for this archetype */
  css: string;
  /** Wrapper className (e.g. "cr-amplifier", "human-bridge") */
  wrapperClass: string;

  /* Hero */
  icon: string;
  name: string;
  tagline: string;
  ceilingLabel: string;
  /** HTML content for the ceiling box paragraph */
  ceilingContent: string;

  /* Who you are */
  whoYouAre: string;
  whoEyeColor: string;
  strengths: string[];
  strengthsEyeColor: string;

  /* Career paths */
  careerSubtitle: string;
  careers: CareerPath[];

  /* Leverage matrix */
  matrixSectionTitle: string;
  matrixTitle: string;
  matrixSubheading: string;
  matrixEyeColor: string;
  matrixBeforeHeader?: string;
  matrixAfterHeader?: string;
  beforeAfter: BeforeAfterRow[];
  matrixFoot: {
    before: { label: string; value: string };
    after: { label: string; value: string };
  };

  /* Testimonials */
  testimonialsEyebrow: string;
  testimonialsEyeColor: string;
  caseStudies: CaseStudy[];

  /* Income model */
  incomeEyeColor: string;
  incomeTitle: string;
  incomeSubheading: string;
  incomePaths: IncomeCard[];
}

/* ── Helper ─────────────────────────────────────────────────────── */

function getNameFromURL() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
}

/* ── Component ──────────────────────────────────────────────────── */

export default function ArchetypeResultLayout({ config }: { config: ArchetypeConfig }) {
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [fallbackEmail, setFallbackEmail] = useState("");

  useEffect(() => {
    track("result_view", { archetype: config.archetypeKey });
  }, [config.archetypeKey]);

  async function onBuy(email?: string) {
    setBuyError("");
    setShowEmailInput(false);
    setBuying(true);
    try {
      const url = await buyPlaybook(config.archetypeKey, email);
      window.location.href = url;
    } catch (err: unknown) {
      setBuying(false);
      if (err instanceof Error && err.message === "EMAIL_REQUIRED") {
        setShowEmailInput(true);
      } else {
        setBuyError(err instanceof Error ? err.message : "Checkout unavailable.");
      }
    }
  }

  const name = useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    getNameFromURL,
    () => null
  );
  const greeting = name ? `${name}, meet your archetype.` : "Your result is in.";

  return (
    <div className={config.wrapperClass}>
      <style>{config.css}</style>

      {/* ── Nav ── */}
      <SiteNav ctaLabel="Get the Playbook →" ctaHref="#paywall" />

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-greeting">{greeting}</div>
          <span className="hero-icon">{config.icon}</span>
          <div className="hero-eyebrow">Your AI Archetype</div>
          <h1 className="hero-name">The {config.name}</h1>
          <div className="hero-tagline">"{config.tagline}"</div>
          <div className="hero-sep">
            <div className="line"></div>
            <div className="dot">◆</div>
            <div className="line"></div>
          </div>
          <div className="ceiling-box">
            <span className="ceiling-label">{config.ceilingLabel}</span>
            <p dangerouslySetInnerHTML={{ __html: config.ceilingContent }} />
          </div>
        </div>
      </div>

      {/* ── Who you are ── */}
      <section>
        <div className="wrap">
          <div className="card-wrap">
            <div className={`sec-eye ${config.whoEyeColor}`}>Who you are</div>
            <p className="who-text">{config.whoYouAre}</p>
            <div className={`sec-eye ${config.strengthsEyeColor}`} style={{ marginTop: "22px" }}>Natural Strengths</div>
            <div className="chip-row">
              {config.strengths.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Career paths ── */}
      <section>
        <div className="wrap">
          <div className="sec-eye eye-gold">AI career paths for your archetype</div>
          <h2 className="sec-title">Roles built for<br /><em>{config.careerSubtitle}</em></h2>
          <p className="sec-sub">These are real paths {config.name}s are building and earning from today.</p>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", maxWidth: "100%" }}>
            <table className="career-table">
              <thead>
                <tr><th>Career Path</th><th>What You Do</th><th>Earning Range</th></tr>
              </thead>
              <tbody>
                {config.careers.map((c) => (
                  <tr key={c.title}>
                    <td>{c.title}</td>
                    <td style={{ color: "var(--soft)", fontSize: ".88rem" }}>{c.desc}</td>
                    <td><span className="earn-pill">{c.earn}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <Link href="#paywall" className="nav-cta" style={{ display: "inline-block", padding: "12px 32px", fontSize: ".95rem" }}>Get the Playbook →</Link>
          </div>
        </div>
      </section>

      {/* ── Leverage matrix ── */}
      <section className="sec-alt">
        <div className="wrap">
          <div className={`sec-eye ${config.matrixEyeColor}`}>{config.matrixSectionTitle}</div>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: config.matrixTitle }} />
          <p className="sec-sub">{config.matrixSubheading}</p>
          <div className="matrix">
            <div className="matrix-head">
              <div className="mh before">{config.matrixBeforeHeader ?? "Without the playbook"}</div>
              <div className="mh after">{config.matrixAfterHeader ?? "With the playbook ◆"}</div>
            </div>
            {config.beforeAfter.map((row, i) => (
              <div key={i} className="matrix-row">
                <div className="mc before">{row.before}</div>
                <div className="mc after">{row.after}</div>
              </div>
            ))}
            <div className="matrix-foot">
              <div className="mf before">
                <div className="mf-label">{config.matrixFoot.before.label}</div>
                <div className="mf-val">{config.matrixFoot.before.value}</div>
              </div>
              <div className="mf after">
                <div className="mf-label">{config.matrixFoot.after.label}</div>
                <div className="mf-val">{config.matrixFoot.after.value}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="sec-alt">
        <div className="wrap">
          <div className={`sec-eye ${config.testimonialsEyeColor}`}>{config.testimonialsEyebrow}</div>
          <h2 className="sec-title">They were where you are.<br />Here is what <em>changed.</em></h2>
          <div className="testimonials">
            {config.caseStudies.map((cs, idx) => (
              <div key={idx} className="testi">
                <div className="testi-quote">{cs.quote}</div>
                <div className="testi-meta">
                  <div className="testi-avatar">{cs.name[0]}</div>
                  <div>
                    <div className="testi-name">{cs.name}</div>
                    <div className="testi-role">{cs.role} · {cs.location}</div>
                  </div>
                </div>
                <div className="testi-result">{cs.result}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "28px" }}>
            <Link href="#paywall" className="nav-cta" style={{ display: "inline-block", padding: "12px 32px", fontSize: ".95rem" }}>Get the Playbook →</Link>
          </div>
        </div>
      </section>

      {/* ── Income model ── */}
      <section>
        <div className="wrap">
          <div className={`sec-eye ${config.incomeEyeColor}`}>Your income model</div>
          <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: config.incomeTitle }} />
          <p className="sec-sub">{config.incomeSubheading}</p>
          <div className="income-blur-wrap">
            <div className="income-grid">
              {config.incomePaths.map((path, idx) => (
                <div
                  key={idx}
                  className={`income-card ${path.className}`}
                  style={path.blurred ? { filter: "blur(5px)", userSelect: "none", pointerEvents: "none" } : undefined}
                >
                  <div className="ic-label">{path.label}</div>
                  <div className="ic-title">{path.title}</div>
                  <div className="ic-range">{path.range}</div>
                  <div className="ic-desc">{path.desc}</div>
                  <ul className="ic-list">
                    {path.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="blur-overlay"></div>
          </div>
        </div>
      </section>

      {/* ── Paywall ── */}
      <div id="paywall">
        <div className="paywall-inner">
          <div className="pw-pre">Your Personal Playbook · $19.99</div>
          <h2 className="pw-title">The Step-by-Step Blueprint to Your First<br /><em>5 Figure Month</em> using AI</h2>
          <p className="pw-sub">
            Your free results show you <em>who</em> you are. The Playbook shows you exactly <em>what to do</em> — every AI career path, income strategy, tool stack made for your brain, and 90-day action plan built for The {config.name}.
          </p>
          <div className="pw-price-was">Valued at $57</div>
          <div className="pw-price">$19.99</div>
          <div className="pw-badge">🔥 Launch Price — Valid for the first 10 Buyers</div>
          <div>
            {showEmailInput && (
              <div style={{ marginBottom: "16px" }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={fallbackEmail}
                  onChange={(e) => setFallbackEmail(e.target.value)}
                  style={{
                    padding: "10px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(255,255,255,.08)", color: "#fff", fontSize: ".9rem",
                    width: "100%", maxWidth: "320px", outline: "none", fontFamily: "'DM Sans',sans-serif"
                  }}
                />
                <button
                  onClick={() => {
                    const email = fallbackEmail.trim();
                    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      localStorage.setItem("yhe_email", email);
                      setFallbackEmail("");
                      onBuy(email);
                    }
                  }}
                  style={{
                    display: "block", margin: "8px auto 0", padding: "10px 24px", borderRadius: "8px",
                    border: "none", background: "var(--coral)", color: "#fff", fontSize: ".85rem",
                    fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
                  }}
                >
                  Continue to Checkout
                </button>
              </div>
            )}
            <button
              onClick={() => onBuy()}
              disabled={buying}
              className="btn-buy"
              style={{ opacity: buying ? 0.6 : 1, cursor: buying ? "not-allowed" : "pointer" }}
            >
              {buying ? "Preparing checkout…" : "Buy Playbook →"}
            </button>
            {buyError && <div role="alert" style={{ color: "#ffcdd2", fontSize: ".8rem", marginTop: "8px" }}>{buyError}</div>}
          </div>
          <div className="pw-trust">More income paths, tool stack, and 90 day plan inside the playbook</div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>
        <div style={{ fontSize: ".7rem", opacity: 0.25 }}>© 2026</div>
      </footer>
    </div>
  );
}
