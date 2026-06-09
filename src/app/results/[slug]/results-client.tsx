"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArchetypeBySlug } from "@/lib/archetypes";
import CreativeAmplifierPage from "@/components/results/creative-amplifier";
import GrowthCatalystPage from "@/components/results/growth-catalyst";
import SystemsArchitectPage from "@/components/results/systems-architect";
import { track, handleBuy as buyPlaybook } from "@/lib/funnel";

// ─── Human Bridge (H) inline data ────────────────────────────────────

const H_CAREERS = [
  { title: "AI Life Coach (Augmented)", desc: "Use AI for session prep, notes and content. You stay fully present.", earn: "$1k–$5k/mo" },
  { title: "AI Community Architect", desc: "Build and run a paid community. AI handles content; you hold the space.", earn: "$2k–$10k/mo" },
  { title: "AI Corporate Wellbeing Trainer", desc: "Run workshops on psychological safety, empathy and AI transition.", earn: "$2k–$10k/day" },
  { title: "AI Relationship Coach", desc: "Coach individuals and couples using AI to prep and scale your practice.", earn: "$800–$3k/mo" },
  { title: "AI Educator / Course Creator", desc: "Package your knowledge into courses. AI builds the infrastructure.", earn: "$500–$50k/launch" },
  { title: "AI Career Transition Coach", desc: "Help people rebuild identity and direction after layoffs.", earn: "$1k–$3k/client" },
];

const H_CORE = [
  "Empathy & Emotional Intelligence",
  "Building Trust Rapidly",
  "Creating Psychological Safety",
  "Deep Listening",
  "Making People Feel Seen",
  "Holding Space for Complexity",
  "Connecting Across Difference",
];

const H_BEFORE_AFTER = [
  { before: "1:1 coaching: you can only trade time for money", after: "Group coaching + digital products: AI helps you deliver at scale without losing the human touch" },
  { before: "Workshop prep: hours of manual research and personalisation", after: "15 minutes: AI builds the research and personalisation backbone" },
  { before: "Content: sharing your wisdom requires writing everything from scratch", after: "1 voice memo → 5 pieces of content in your voice" },
  { before: "Client notes: manual, scattered, easy to lose", after: "AI handles all session summaries, follow-ups, and insights" },
  { before: "Course creation: months of curriculum design and recording", after: "Full course structure in 2 days with AI" },
];

const H_CASE_STUDIES = [
  {
    name: "Sofia A.",
    role: "Life Coach",
    location: "Nigeria",
    result: "Grew from 3 to 18 coaching clients in 6 weeks using AI-augmented outreach and content systems.",
    quote: "I was spending 15 hours a week on content and getting nothing back. Now I spend 3 hours and get 10x the engagement.",
  },
  {
    name: "Michael O.",
    role: "HR Leader",
    location: "UK",
    result: "Secured a fractional Chief Wellbeing Officer role paying £4,200/month.",
    quote: "The AI archetype assessment showed me exactly where my human skills are most valuable in the AI economy.",
  },
  {
    name: "Tolu E.",
    role: "Therapist",
    location: "Canada",
    result: "Launched a paid community for mental wellness ($49/month, 87 members in 90 days).",
    quote: "I never thought I could build an online community. AI handled the content engine; I just showed up and held the space.",
  },
];

const H_INCOME_PATHS = [
  {
    label: "The Coach",
    title: "High-Touch Premium",
    range: "$5k – $15k/month",
    items: [
      "1:1 coaching packages: $2k–$5k per 4–6 week engagement",
      "Group coaching programmes: $500–$2k per person per cohort",
      "Paid community membership: $97–$297/month recurring",
      "VIP intensive day: $3k–$8k per session",
    ],
  },
  {
    label: "The Consultant",
    title: "Organisational Impact",
    range: "$8k – $25k/month",
    items: [
      "Fractional C-suite roles: $5k–$15k/month per engagement",
      "Advisory board roles: equity + $2k–$5k monthly retainer",
      "Market entry consulting: $5k–$20k per project",
      "Executive training and workshops: $2k–$10k per day",
    ],
  },
];

// ─── Styles for H page ───────────────────────────────────────────────


// ─── Main Component ──────────────────────────────────────────────────

export default function ResultsClient({ slug }: { slug: string }) {
  const arch = getArchetypeBySlug(slug);
  if (!arch) return notFound();
  const archKey = arch.key;

  // For C, G, S — render the new dedicated component
  if (archKey === "C") return <CreativeAmplifierPage />;
  if (archKey === "G") return <GrowthCatalystPage />;
  if (archKey === "S") return <SystemsArchitectPage />;

  // ─── H (Human Bridge) — render inline ──────────────────────────────
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");

  useEffect(() => {
    track("result_view", { archetype: archKey });
  }, [archKey]);

  async function onBuy() {
    setBuyError("");
    setBuying(true);
    try {
      const url = await buyPlaybook(archKey);
      window.location.href = url;
    } catch (err: unknown) {
      setBuying(false);
      setBuyError(err instanceof Error ? err.message : "Checkout unavailable.");
    }
  }

  return (
    <div className="result-page" style={{ background: "var(--ivory)", fontFamily: "'DM Sans', sans-serif", color: "var(--ink)", overflowX: "hidden", lineHeight: 1.72 }}>
      <style>{`
        :root{--coral:#D85A30;--coral2:#E06040;--coral-soft:#FEF0EA;--ink:#1A0F38;--soft:#4a3f6b;--ivory:#FAF8F4;--paper:#F2EDE5;--gold:#C8940A;--gold2:#E8A020;--teal:#0C6B51;--teal-soft:#E1F5EE;--purple:#534AB7;--purple-soft:#EEEDFE;--blue:#1565C0;--blue-soft:#E8F0FE;--border:#E4DDD4;}
        html{scroll-behavior:smooth}
        a{text-decoration:none;color:inherit}
        .tw{max-width:860px;margin:0 auto;padding:0 28px}
        .h-hero{background:linear-gradient(145deg,#2D1050 0%,#534AB7 55%,#1565C0 100%);padding:104px 28px 60px;text-align:center;position:relative;overflow:hidden}
        .h-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.12),transparent 60%)}
        .h-hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
        .h-hero .dot{color:var(--gold2);font-size:.8rem}
        .h-section{padding:60px 0}
        .h-sec-alt{background:var(--paper)}
        .h-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px 32px}
        .h-eye{font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:10px}
        .h-eye::before{content:"◆";font-size:.52rem}
        .h-title{font-family:"Cormorant Garamond",serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;line-height:1.12;margin-bottom:12px}
        .h-sub{font-size:.97rem;color:var(--soft);line-height:1.82;max-width:580px;margin-bottom:32px}
        .h-chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:40px;font-size:.85rem;background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);transition:all .18s}
        .h-chip:hover{background:var(--purple-soft);border-color:var(--purple);color:var(--purple)}
        @keyframes h-pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
      `}</style>

      {/* NAV */}
      <nav>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
        <ul className="nav-links">
          <li><Link href="/quiz">Home</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <Link href="#paywall" className="nav-cta">Get the Playbook →</Link>
      </nav>

      {/* HERO */}
      <div className="h-hero">
        <div className="h-hero-inner">
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", color: "rgba(255,255,255,.55)", marginBottom: "10px" }}>Your result is in.</div>
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px", animation: "h-pop .5s cubic-bezier(.4,0,.2,1) both" }}>{arch.emoji}</span>
          <div style={{ fontSize: ".68rem", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", fontWeight: 500, marginBottom: "8px" }}>Your AI Archetype</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem,7vw,4.4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.05, marginBottom: "10px" }}>{arch.name}</h1>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", color: "rgba(255,255,255,.65)", marginBottom: "28px" }}>{arch.tagline}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "26px" }}>
            <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,.2)" }}></div>
            <div className="dot">◆</div>
            <div style={{ width: "60px", height: "1px", background: "rgba(255,255,255,.2)" }}></div>
          </div>
          <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", borderRadius: "14px", padding: "20px 26px", textAlign: "left" }}>
            <span style={{ fontSize: ".66rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold2)", fontWeight: 600, marginBottom: "8px", display: "block" }}>Your human edge · and your current ceiling</span>
            <div style={{ fontSize: ".96rem", color: "rgba(255,255,255,.82)", lineHeight: 1.76 }}>{arch.reframe}</div>
          </div>
        </div>
      </div>

      {/* WHO YOU ARE */}
      <section className="h-section">
        <div className="tw">
          <div className="h-card">
            <div className="h-eye" style={{ color: "var(--purple)" }}>Who you are</div>
            <p style={{ fontSize: ".97rem", color: "var(--soft)", lineHeight: 1.82, marginBottom: "22px" }}>{arch.fear}</p>
            <div className="h-eye" style={{ color: "var(--purple)", marginTop: "22px" }}>Natural Strengths</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
              {H_CORE.map((s) => (<span key={s} className="h-chip">{s}</span>))}
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="h-section h-sec-alt">
        <div className="tw">
          <div className="h-eye" style={{ color: "var(--purple)" }}>The leverage gap</div>
          <h2 className="h-title">What AI actually changes<br />for <em style={{ fontStyle: "italic", color: "var(--purple)" }}>your specific archetype</em></h2>
          <p className="h-sub">This is not a tool list. This is the exact before and after for a Human Bridge who implements the playbook in 90 days.</p>
          <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--ink)" }}>
              <div style={{ padding: "13px 20px", fontSize: ".68rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", textAlign: "center", color: "rgba(255,255,255,.4)", borderRight: "1px solid rgba(255,255,255,.08)" }}>Without the playbook</div>
              <div style={{ padding: "13px 20px", fontSize: ".68rem", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", textAlign: "center", color: "var(--gold2)" }}>With the playbook ◆</div>
            </div>
            {H_BEFORE_AFTER.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff", borderBottom: i < H_BEFORE_AFTER.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ padding: "15px 20px", fontSize: ".9rem", lineHeight: 1.55, display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--soft)", borderRight: "1px solid var(--border)" }}>
                  <span style={{ color: "#E53935", fontSize: ".82rem", flexShrink: 0, fontWeight: 700, marginTop: "2px" }}>✗</span>{row.before}
                </div>
                <div style={{ padding: "15px 20px", fontSize: ".9rem", lineHeight: 1.55, display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--ink)", fontWeight: 500 }}>
                  <span style={{ color: "var(--teal)", fontSize: ".82rem", flexShrink: 0, fontWeight: 700, marginTop: "2px" }}>✓</span>{row.after}
                </div>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--purple-soft)" }}>
              <div style={{ padding: "16px 20px", textAlign: "center", borderRight: "1px solid var(--border)" }}>
                <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: "4px" }}>Current income ceiling</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", fontWeight: 700, color: "#E53935" }}>$1k – $3k/mo</div>
              </div>
              <div style={{ padding: "16px 20px", textAlign: "center" }}>
                <div style={{ fontSize: ".65rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--soft)", marginBottom: "4px" }}>AI-amplified capacity</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", fontWeight: 700, color: "var(--teal)" }}>$8k – $15k/mo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAREER PATHS */}
      <section className="h-section">
        <div className="tw">
          <div className="h-eye" style={{ color: "var(--gold)" }}>AI career paths for your archetype</div>
          <h2 className="h-title">Roles built for<br /><em style={{ fontStyle: "italic", color: "var(--purple)" }}>exactly how you relate</em></h2>
          <p className="h-sub">These are real roles Human Bridges with your skills are filling and earning from today.</p>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <thead>
              <tr style={{ background: "var(--ink)", color: "#fff" }}>
                <th style={{ padding: "11px 16px", textAlign: "left", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>Career Path</th>
                <th style={{ padding: "11px 16px", textAlign: "left", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>What You Do</th>
                <th style={{ padding: "11px 16px", textAlign: "left", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>Earning Range</th>
              </tr>
            </thead>
            <tbody>
              {H_CAREERS.map((c) => (
                <tr key={c.title}>
                  <td style={{ padding: "13px 16px", borderBottom: "1px solid var(--border)", fontSize: ".9rem", fontWeight: 600, color: "var(--ink)" }}>{c.title}</td>
                  <td style={{ padding: "13px 16px", borderBottom: "1px solid var(--border)", fontSize: ".88rem", color: "var(--soft)" }}>{c.desc}</td>
                  <td style={{ padding: "13px 16px", borderBottom: "1px solid var(--border)", fontSize: ".9rem" }}>
                    <span style={{ display: "inline-block", background: "var(--purple-soft)", color: "var(--purple)", borderRadius: "6px", padding: "3px 10px", fontSize: ".78rem", fontWeight: 600 }}>{c.earn}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="h-section h-sec-alt">
        <div className="tw">
          <div className="h-eye" style={{ color: "var(--gold)" }}>Real human bridges. Real results.</div>
          <h2 className="h-title">They were where you are.<br />Here is what <em style={{ fontStyle: "italic", color: "var(--purple)" }}>changed.</em></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "4px" }}>
            {H_CASE_STUDIES.map((cs, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "14px", padding: "22px 24px", borderLeft: `4px solid ${["var(--purple)", "var(--teal)", "var(--gold)"][i] || "var(--purple)"}` }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.06rem", fontStyle: "italic", color: "var(--ink)", lineHeight: 1.7, marginBottom: "14px" }}>&ldquo;{cs.quote}&rdquo;</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "var(--purple-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--purple)", flexShrink: 0 }}>{cs.name[0]}</div>
                  <div><div style={{ fontWeight: 500, fontSize: ".88rem", color: "var(--ink)" }}>{cs.name}</div><div style={{ fontSize: ".78rem", color: "var(--soft)" }}>{cs.role} · {cs.location}</div></div>
                </div>
                <div style={{ marginTop: "10px", padding: "7px 14px", borderRadius: "8px", background: "var(--purple-soft)", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: ".78rem", fontWeight: 600, color: "var(--purple)" }}>
                  ◆ {cs.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCOME */}
      <section className="h-section">
        <div className="tw">
          <div className="h-eye" style={{ color: "var(--teal)" }}>Your income model</div>
          <h2 className="h-title">How Human Bridges<br /><em style={{ fontStyle: "italic", color: "var(--purple)" }}>actually</em> earn with AI</h2>
          <p className="h-sub">Four income paths. Each one specific to how your archetype operates. Full breakdown inside the playbook.</p>
          <div style={{ position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {H_INCOME_PATHS.map((p) => (
                <div key={p.label} style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "14px", padding: "22px", borderTop: `4px solid var(--purple)` }}>
                  <div style={{ fontSize: ".64rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: "5px", color: "var(--purple)" }}>{p.label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.12rem", fontWeight: 700, color: "var(--ink)", marginBottom: "5px" }}>{p.title}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.38rem", fontWeight: 700, marginBottom: "8px", color: "var(--purple)" }}>{p.range}</div>
                  <ul style={{ listStyle: "none" }}>
                    {p.items.map((item) => (
                      <li key={item} style={{ fontSize: ".8rem", color: "var(--soft)", padding: "5px 0 5px 15px", position: "relative", borderBottom: "1px solid var(--border)", lineHeight: 1.45 }}>
                        <span style={{ position: "absolute", left: 0, fontSize: ".72rem", color: "var(--purple)" }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "58%", background: "linear-gradient(to bottom, transparent 0%, rgba(250,248,244,.96) 50%, var(--ivory) 100%)", zIndex: 2, pointerEvents: "none" }}></div>
          </div>
        </div>
      </section>

      {/* PAYWALL */}
      <div id="paywall" style={{ background: "var(--ink)", padding: "64px 28px 100px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: ".66rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold2)", fontWeight: 600, marginBottom: "14px" }}>Your Personal Playbook · $9.99</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: "16px", letterSpacing: "-.01em" }}>Your Path to your first<br /><em style={{ fontStyle: "italic", color: "var(--gold2)" }}>$10,000 month</em> using AI</h2>
          <p style={{ fontSize: ".97rem", color: "rgba(255,255,255,.58)", lineHeight: 1.82, maxWidth: "500px", margin: "0 auto 36px" }}>Your free results show you <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.85)" }}>who</em> you are. The Playbook shows you exactly <em style={{ fontStyle: "italic", color: "rgba(255,255,255,.85)" }}>what to do</em> — every AI career path, income strategy, tool stack made for your brain, and 90-day action plan built for {arch.name}.</p>
          <div style={{ fontSize: ".88rem", color: "rgba(255,255,255,.28)", textDecoration: "line-through", marginBottom: "5px" }}>Valued at $57</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", fontWeight: 700, color: "var(--gold2)", lineHeight: 1, marginBottom: "14px" }}>$9.99</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(232,160,32,.1)", border: "1px solid rgba(232,160,32,.28)", borderRadius: "40px", padding: "6px 18px", fontSize: ".8rem", fontWeight: 600, color: "var(--gold2)", marginBottom: "28px" }}>🔥 Launch Price — Valid for the first 10 Buyers</div>
          <div><button onClick={onBuy} disabled={buying} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--coral)", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "1.08rem", fontWeight: 600, padding: "17px 48px", borderRadius: "50px", border: "none", cursor: buying ? "not-allowed" : "pointer", opacity: buying ? 0.6 : 1, transition: "all .25s", textDecoration: "none", letterSpacing: ".02em" }}>{buying ? "Preparing checkout…" : "Buy Playbook →"}</button>{buyError && <div role="alert" style={{ color: "#ffcdd2", fontSize: ".8rem", marginTop: "8px" }}>{buyError}</div>}</div>
          <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.35)", marginTop: "16px" }}>More income paths, tool stack, and 90 day plan inside the playbook</div>
        </div>
      </div>

      {/* FOOTER */}
            <footer>
        <div className="footer-brand">human<span>+</span>ai</div>

        <div style={{ fontSize: ".7rem", opacity: 0.25 }}>© 2026</div>
      </footer>
    </div>
  );
}
