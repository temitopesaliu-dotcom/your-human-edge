"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { track, handleBuy as buyPlaybook } from "@/lib/funnel";

const CSS = `:root{
  --blue:#1565C0;--blue2:#1A73E8;--blue-soft:#E8F0FE;
  --ink:#1A0F38;--soft:#4a3f6b;
  --ivory:#FAF8F4;--paper:#F2EDE5;
  --coral:#D85A30;--gold:#C8940A;--gold2:#E8A020;
  --teal:#0C6B51;--teal-soft:#E1F5EE;
  --border:#E4DDD4;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
a{text-decoration:none;color:inherit}
.wrap{max-width:860px;margin:0 auto;padding:0 28px}
/* ── NAV ─────────────────────────────────────── */
@media(max-width:600px){}
/* ── HERO ────────────────────────────────────── */
.hero{
  background:linear-gradient(145deg,#0D2B6B 0%,var(--blue) 55%,#534AB7 100%);
  padding:104px 28px 60px;text-align:center;
  position:relative;overflow:hidden;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.13),transparent 60%);
}
.hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.hero-greeting{
  font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px;
}
.hero-icon{font-size:3rem;display:block;margin-bottom:12px;
  animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.hero-eyebrow{
  font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px;
}
.hero-name{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;
  color:#fff;line-height:1.05;margin-bottom:10px;
}
.hero-tagline{
  font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px;
}
.hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.hero-sep .dot{color:var(--gold2);font-size:.8rem}
/* Ceiling box */
.ceiling-box{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);
  border-radius:14px;padding:20px 26px;text-align:left;
}
.ceiling-label{
  font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold2);font-weight:600;margin-bottom:8px;display:block;
}
.ceiling-box p{
  font-family:'DM Sans',sans-serif;font-size:.96rem;
  color:rgba(255,255,255,.82);line-height:1.76;
}
.ceiling-box strong{color:#fff;font-weight:600}
.ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}
/* ── SECTION UTILS ───────────────────────────── */
section{padding:60px 0}
.sec-alt{background:var(--paper)}
.sec-eye{
  font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;gap:8px;margin-bottom:10px;
}
.sec-eye::before{content:'◆';font-size:.52rem}
.eye-blue{color:var(--blue)}.eye-blue::before{color:var(--blue)}
.eye-coral{color:var(--coral)}.eye-coral::before{color:var(--coral)}
.eye-gold{color:var(--gold)}.eye-gold::before{color:var(--gold)}
.eye-teal{color:var(--teal)}.eye-teal::before{color:var(--teal)}
.sec-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;
  color:var(--ink);line-height:1.12;margin-bottom:12px;
}
.sec-title em{font-style:italic;color:var(--blue)}
.sec-sub{
  font-size:.97rem;color:var(--soft);line-height:1.82;
  max-width:580px;margin-bottom:32px;
}
.card-wrap{
  background:#fff;border:1px solid var(--border);
  border-radius:14px;padding:28px 32px;
}
/* ── NATURAL STRENGTHS ───────────────────────── */
.chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;
  background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);
  font-family:'DM Sans',sans-serif;letter-spacing:.01em;
  transition:all .18s;
}
.chip:hover{background:var(--blue-soft);border-color:var(--blue);color:var(--blue)}
.who-text{
  font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);
  line-height:1.82;margin-bottom:22px;
}
/* ── LEVERAGE MATRIX ─────────────────────────── */
.matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.mh.after{color:var(--gold2)}
.matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.matrix-row:last-child{border-bottom:none}
.matrix-row:hover .mc{background:#FAFCFF}
.mc{padding:15px 20px;font-size:.9rem;line-height:1.55;
  display:flex;align-items:flex-start;gap:10px}
.mc.before{color:var(--soft);border-right:1px solid var(--border)}
.mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.mc.after{color:var(--ink);font-weight:500}
.mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--blue-soft)}
.mf{padding:16px 20px;text-align:center}
.mf.before{border-right:1px solid var(--border)}
.mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.mf.before .mf-val{color:#E53935}
.mf.after .mf-val{color:var(--teal)}
/* ── CAREER PATHS TABLE ──────────────────────── */
.career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.career-table tr:last-child td{border-bottom:none}
.career-table tr:hover td{background:var(--ivory)}
.career-table td:first-child{font-weight:600;color:var(--ink)}
.career-table td:last-child{white-space:nowrap}
.earn-pill{
  display:inline-block;background:var(--blue-soft);color:var(--blue);
  border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600;
}
/* ── TESTIMONIALS ────────────────────────────── */
.testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.testi{
  background:#fff;border:1px solid var(--border);border-radius:14px;
  padding:22px 24px;border-left:4px solid var(--blue);
}
.testi:nth-child(2){border-left-color:var(--teal)}
.testi:nth-child(3){border-left-color:var(--gold)}
.testi-quote{
  font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;
  color:var(--ink);line-height:1.7;margin-bottom:14px;
}
.testi-meta{display:flex;align-items:center;gap:12px}
.testi-avatar{
  width:38px;height:38px;border-radius:50%;background:var(--blue-soft);
  display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;
  color:var(--blue);flex-shrink:0;
}
.testi:nth-child(2) .testi-avatar{background:var(--teal-soft);color:var(--teal)}
.testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.testi-role{font-size:.78rem;color:var(--soft)}
.testi-result{
  margin-top:10px;padding:7px 14px;border-radius:8px;
  background:var(--blue-soft);display:inline-flex;align-items:center;gap:6px;
  font-size:.78rem;font-weight:600;color:var(--blue);
}
.testi:nth-child(2) .testi-result{background:var(--teal-soft);color:var(--teal)}
.testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.testi-result::before{content:'◆';font-size:.52rem}
/* ── HOW YOU MAKE MONEY ──────────────────────── */
.income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.income-card.exec{border-top:4px solid var(--blue)}
.income-card.coach{border-top:4px solid var(--teal)}
.income-card.creator{border-top:4px solid var(--coral)}
.income-card.operator{border-top:4px solid #534AB7}
.ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.income-card.exec .ic-label{color:var(--blue)}
.income-card.coach .ic-label{color:var(--teal)}
.income-card.creator .ic-label{color:var(--coral)}
.income-card.operator .ic-label{color:#534AB7}
.ic-title{
  font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;
  color:var(--ink);margin-bottom:5px;
}
.ic-range{
  font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px;
}
.income-card.exec .ic-range{color:var(--blue)}
.income-card.coach .ic-range{color:var(--teal)}
.income-card.creator .ic-range{color:var(--coral)}
.income-card.operator .ic-range{color:#534AB7}
.ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.ic-list{list-style:none}
.ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.ic-list li:last-child{border-bottom:none}
.ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.income-card.exec .ic-list li::before{color:var(--blue)}
.income-card.coach .ic-list li::before{color:var(--teal)}
.income-card.creator .ic-list li::before{color:var(--coral)}
.income-card.operator .ic-list li::before{color:#534AB7}
/* blur */
.income-blur-wrap{position:relative}
.blur-overlay{
  position:absolute;bottom:0;left:0;right:0;height:58%;
  background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);
  z-index:2;pointer-events:none;
}
/* ── PAYWALL ─────────────────────────────────── */
#paywall{background:var(--ink);padding:64px 28px 100px}
.paywall-inner{
  max-width:680px;margin:0 auto;text-align:center;
}
.pw-pre{
  font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold2);font-weight:600;margin-bottom:14px;
}
.pw-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,5vw,3.2rem);font-weight:700;
  color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em;
}
.pw-title em{font-style:italic;color:var(--gold2)}
.pw-sub{
  font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;
  max-width:500px;margin:0 auto 36px;
}
.pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.pw-price{
  font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;
  color:var(--gold2);line-height:1;margin-bottom:14px;
}
.pw-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);
  border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;
  color:var(--gold2);margin-bottom:28px;
}
.btn-buy{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--blue2);color:#fff;font-family:'DM Sans',sans-serif;
  font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;
  border:none;cursor:pointer;transition:all .25s;text-decoration:none;
  letter-spacing:.02em;
}
.btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(21,101,192,.35)}
.pw-trust{
  font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;
  font-family:'DM Sans',sans-serif;
}
/* ── FOOTER ──────────────────────────────────── */
footer strong{color:rgba(255,255,255,.8);font-family:'Cormorant Garamond',serif;font-size:12px}
@media(max-width:600px){
  .income-grid{grid-template-columns:1fr}
  .matrix-head,.matrix-row,.matrix-foot{grid-template-columns:1fr}
  .mh.before,.mc.before,.mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
}`;

function getNameFromURL() {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  return p.get("name");
}

export default function GrowthCatalystPage() {
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");

  useEffect(() => {
    track("result_view", { archetype: "G" });
  }, []);

  async function onBuy() {
    setBuyError("");
    setBuying(true);
    try {
      const url = await buyPlaybook("G");
      window.location.href = url;
    } catch (err: unknown) {
      setBuying(false);
      setBuyError(err instanceof Error ? err.message : "Checkout unavailable.");
    }
  }

  const name = useSyncExternalStore(
    (cb) => { window.addEventListener("popstate", cb); return () => window.removeEventListener("popstate", cb); },
    getNameFromURL,
    () => null
  );
  const greeting = name ? `${name}, meet your archetype.` : "Your result is in.";

  return (
    <>
      <style>{CSS}</style>

      <nav>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
        <ul className="nav-links">
          <li><Link href="/quiz">Home</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <Link href="#paywall" className="nav-cta">Get the Playbook →</Link>
      </nav>

<div className="hero">
  <div className="hero-inner">
    <div className="hero-greeting">{greeting}</div>
    <span className="hero-icon">🚀</span>
    <div className="hero-eyebrow">Your AI Archetype</div>
    <h1 className="hero-name">The Growth Catalyst</h1>
    <div className="hero-tagline">"You see opportunity where others see chaos. AI just doubled the playing field."</div>
    <div className="hero-sep">
      <div className="line"></div><div className="dot">◆</div><div className="line"></div>
    </div>
    <div className="ceiling-box">
      <span className="ceiling-label">Your human edge · and your current bottleneck</span>
      <p>You see the opportunity before the room does. You close deals, move fast, and build things that matter. But right now, <strong>your execution speed cannot match your thinking speed.</strong> Research takes days. Outreach needs a team. The content in your head never makes it out. Your ideas are faster than your output — and that gap is <em>capping your income.</em> You do not have a talent problem. You have a leverage problem.</p>
    </div>
  </div>
</div>

<section>
  <div className="wrap">
    <div className="card-wrap">
      <div className="sec-eye eye-teal">Who you are</div>
      <p className="who-text">Every disruption creates a new leaderboard. The people who understood growth fundamentals before AI are the ones who will write the new rules. You are not behind — you are early. And with the right tools stacked onto the instincts you already have, the gap between where you are and where you are going closes fast.</p>
      <div className="sec-eye eye-teal" style={{marginTop: 22}}>Natural Strengths</div>
      <div className="chip-row">
        <span className="chip">Opportunity Identification</span>
        <span className="chip">Persuasion</span>
        <span className="chip">Results Orientation</span>
        <span className="chip">Relationship Compounding</span>
        <span className="chip">Strategic Prioritisation</span>
        <span className="chip">Speed to Action</span>
      </div>
    </div>
  </div>
</section>

<section>
  <div className="wrap">
    <div className="sec-eye eye-gold">AI career paths for your archetype</div>
    <h2 className="sec-title">Roles built for<br /><em>exactly how you think</em></h2>
    <p className="sec-sub">These are real roles Growth Catalysts with your skills are filling and earning from today.</p>
    <table className="career-table">
      <thead>
        <tr>
          <th>Career Path</th>
          <th>What You Do</th>
          <th>Earning Range</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>AI Growth Strategist</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Build AI-powered acquisition and retention systems for startups.</td>
          <td><span className="earn-pill">$5k–$20k/mo</span></td>
        </tr>
        <tr>
          <td>AI GTM Architect</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Design go-to-market systems using Clay, Apollo, AI for outbound.</td>
          <td><span className="earn-pill">$4k–$15k/mo</span></td>
        </tr>
        <tr>
          <td>Revenue Acceleration Consultant</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Audit and rebuild sales pipelines with AI tooling.</td>
          <td><span className="earn-pill">$8k–$25k/project</span></td>
        </tr>
        <tr>
          <td>AI Marketing Director</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Own performance, content, and lifecycle with AI-native strategy.</td>
          <td><span className="earn-pill">$120k–$250k/yr</span></td>
        </tr>
        <tr>
          <td>Fractional CMO (AI-native)</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Serve 3 to 5 companies simultaneously with AI as leverage.</td>
          <td><span className="earn-pill">$5k–$15k/mo each</span></td>
        </tr>
        <tr>
          <td>AI Affiliate / Growth Partner</td>
          <td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Build content and funnels to monetise AI tool referrals.</td>
          <td><span className="earn-pill">$2k–$50k/mo</span></td>
        </tr>
      </tbody>
    </table>
    <div style={{textAlign:'center', marginTop:'28px'}}>
      <Link href="#paywall" className="nav-cta" style={{display:'inline-block', padding:'12px 32px', fontSize:'.95rem'}}>Get the Playbook →</Link>
    </div>
  </div>
</section>

<section className="sec-alt">
  <div className="wrap">
    <div className="sec-eye eye-blue">The leverage gap</div>
    <h2 className="sec-title">What AI actually changes<br />for <em>your specific archetype</em></h2>
    <p className="sec-sub">This is not a tool list. This is the exact before and after for a Growth Catalyst who implements the playbook in 90 days.</p>
    <div className="matrix">
      <div className="matrix-head">
        <div className="mh before">Without the playbook</div>
        <div className="mh after">With the playbook ◆</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Research one prospect: 2 to 3 hours of manual work</div>
        <div className="mc after">Research 50 prospects: 40 minutes with Perplexity + Apollo</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Outreach: 15 to 20 emails per day, written manually</div>
        <div className="mc after">Outreach: 150 to 200 personalised emails per day, automated</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Proposal writing: 3 to 4 hours per client, from scratch</div>
        <div className="mc after">Proposal writing: 20 minutes using your Claude prompt template</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Content: 1 idea becomes 1 post, if you find the time</div>
        <div className="mc after">Content: 1 voice memo becomes 14 pieces across platforms</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Pipeline: scattered, missed follow-ups, lost deals</div>
        <div className="mc after">Pipeline: automated CRM updates, follow-ups triggered, nothing lost</div>
      </div>
      <div className="matrix-foot">
        <div className="mf before">
          <div className="mf-label">Current income ceiling</div>
          <div className="mf-val">$2k – $5k/mo</div>
        </div>
        <div className="mf after">
          <div className="mf-label">AI-amplified income capacity</div>
          <div className="mf-val">$10k – $25k/mo</div>
        </div>
      </div>
    </div>
  </div>
</section>


<section className="sec-alt">
  <div className="wrap">
    <div className="sec-eye eye-gold">Real Growth Catalysts. Real results.</div>
    <h2 className="sec-title">They were where you are.<br />Here is what <em>changed.</em></h2>
    <div className="testimonials">
      <div className="testi">
        <div className="testi-quote">"I have been in sales my whole life. Working with a Chinese company, trying to bridge their tech into Africa. Every AI conversation left me more confused. This gave me clarity in under 10 minutes. I found my specific lane. Now when people talk about AI, I won't be lost — I have my own area where I specialise. Even if it cost $50 I would have still paid."</div>
        <div className="testi-meta">
          <div className="testi-avatar">D</div>
          <div>
            <div className="testi-name">Daniel O.</div>
            <div className="testi-role">Sales Executive · China-Africa Market Specialist</div>
          </div>
        </div>
        <div className="testi-result">Clarity on his exact AI stack in one session</div>
      </div>
      <div className="testi">
        <div className="testi-quote">"I had been building my consulting offer for 18 months and calling it almost ready. I followed the 90-day system. Week two I sent my first real outreach campaign. By week four I had my first paid client at $1,200. By month two I was at $4,800. The only thing that changed was the infrastructure around my thinking."</div>
        <div className="testi-meta">
          <div className="testi-avatar">A</div>
          <div>
            <div className="testi-name">Adaeze N.</div>
            <div className="testi-role">Business Development Consultant · Lagos</div>
          </div>
        </div>
        <div className="testi-result">$4,800 in month two from zero</div>
      </div>
      <div className="testi">
        <div className="testi-quote">"I cut my prospect research time by 80%. I now reach five times more decision-makers in the same week. Before the playbook I was working evenings to keep up with my pipeline. Now the pipeline manages itself and I focus on the conversations that actually close."</div>
        <div className="testi-meta">
          <div className="testi-avatar">J</div>
          <div>
            <div className="testi-name">James T.</div>
            <div className="testi-role">Fractional CMO · United Kingdom</div>
          </div>
        </div>
        <div className="testi-result">80% less research time · 5x more outreach</div>
      </div>
    </div>
    <div style={{textAlign:'center', marginTop:'28px'}}>
      <Link href="#paywall" className="nav-cta" style={{display:'inline-block', padding:'12px 32px', fontSize:'.95rem'}}>Get the Playbook →</Link>
    </div>
  </div>
</section>

<section>
  <div className="wrap">
    <div className="sec-eye eye-coral">Your income model</div>
    <h2 className="sec-title">How Growth Catalysts<br /><em>actually</em> earn with AI</h2>
    <p className="sec-sub">Four income paths. Each one specific to how your archetype operates. Full breakdown inside the playbook.</p>
    <div className="income-blur-wrap">
      <div className="income-grid">
        <div className="income-card exec">
          <div className="ic-label">The Executive</div>
          <div className="ic-title">Corporate Leverage</div>
          <div className="ic-range">$8k to $25k/month</div>
          <div className="ic-desc">You bring strategic value and relationships organisations cannot build internally. AI multiplies your preparation and delivery speed.</div>
          <ul className="ic-list">
            <li>Fractional C-suite roles: $5k to $15k/month per engagement</li>
            <li>Advisory board roles: equity plus $2k to $5k monthly retainer</li>
            <li>Market entry consulting: $5k to $20k per project</li>
            <li>Executive training and workshops: $2k to $10k per day</li>
          </ul>
        </div>
        <div className="income-card coach">
          <div className="ic-label">The Coach</div>
          <div className="ic-title">Transformation Premium</div>
          <div className="ic-range">$5k to $15k/month</div>
          <div className="ic-desc">Your clients pay for the transformation, not the time. AI makes your delivery richer and your practice leaner.</div>
          <ul className="ic-list">
            <li>1:1 coaching packages: $2k to $5k per 4 to 6 week engagement</li>
            <li>Group coaching programmes: $500 to $2k per person</li>
            <li>Paid community membership: $97 to $297/month recurring</li>
            <li>VIP intensive day: $3k to $8k per session</li>
          </ul>
        </div>

        <div className="income-card creator" style={{filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none'}}>
          <div className="ic-label">The Creator</div>
          <div className="ic-title">Audience Leverage</div>
          <div className="ic-range">$3k to $50k/month</div>
          <div className="ic-desc">Your leverage is reach. AI compresses production time so you publish more, grow faster, and monetize the audience you build.</div>
          <ul className="ic-list">
            <li>Digital products and courses: $97 to $2k, no ceiling</li>
            <li>Newsletter sponsorships: $500 to $5k per placement</li>
            <li>Community memberships: $49 to $199/month</li>
            <li>Brand partnerships: $1k to $15k per deal</li>
          </ul>
        </div>
        <div className="income-card operator" style={{filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none'}}>
          <div className="ic-label">The Operator</div>
          <div className="ic-title">Results Retainer</div>
          <div className="ic-range">$6k to $20k/month</div>
          <div className="ic-desc">You are paid for outcomes. AI makes you faster and able to manage more clients without growing your team cost.</div>
          <ul className="ic-list">
            <li>Monthly agency retainers: $2k to $6k per client</li>
            <li>Productized service packages: $1k to $5k per project</li>
            <li>White-label delivery: $2k to $8k per month</li>
            <li>Performance-based: retainer plus revenue share</li>
          </ul>
        </div>
      </div>

      <div className="blur-overlay"></div>
    </div>
  </div>
</section>

<div id="paywall">
  <div className="paywall-inner">
    <div className="pw-pre">Your Personal Playbook · $9.99</div>
    <h2 className="pw-title">Your Path to your first<br /><em>$10,000 month</em> using AI</h2>
    <p className="pw-sub">Your free results show you <em>who</em> you are. The Playbook shows you exactly <em>what to do</em> — every AI career path, income strategy, tool stack made for your brain, and 90-day action plan built for The Growth Catalyst.</p>
    <div className="pw-price-was">Valued at $57</div>
    <div className="pw-price">$9.99</div>
    <div className="pw-badge">🔥 Launch Price — Valid for the first 10 Buyers</div>
    <div>
      <button onClick={onBuy} disabled={buying} className="btn-buy" style={{ opacity: buying ? 0.6 : 1, cursor: buying ? "not-allowed" : "pointer" }}>{buying ? "Preparing checkout…" : "Buy Playbook →"}</button>{buyError && <div role="alert" style={{ color: "#ffcdd2", fontSize: ".8rem", marginTop: "8px" }}>{buyError}</div>}
    </div>
    <div className="pw-trust">More income paths, tool stack, and 90 day plan inside the playbook</div>
  </div>
</div>

      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>

        <div style={{ fontSize: ".7rem", opacity: 0.25 }}>© 2026</div>
      </footer>
    </>
  );
}
