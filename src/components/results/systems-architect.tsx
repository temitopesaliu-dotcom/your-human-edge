"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { track, handleBuy as buyPlaybook } from "@/lib/funnel";

const CSS = `:root{
  --purple:#4B43AD;--purple2:#6B63CD;--purple-soft:#EEEDFE;
  --ink:#1A0F38;--soft:#4a3f6b;
  --ivory:#FAF8F4;--paper:#F2EDE5;
  --coral:#D85A30;--gold:#C8940A;--gold2:#E8A020;
  --teal:#0C6B51;--teal-soft:#E1F5EE;
  --blue:#1565C0;--blue-soft:#E8F0FE;
  --border:#E4DDD4;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
a{text-decoration:none;color:inherit}
.wrap{max-width:860px;margin:0 auto;padding:0 28px}
/* ── NAV ─────────────────────────────────────── */
nav{
  position:fixed;top:0;left:0;right:0;z-index:99;
  background:rgba(75,67,173,.96);backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,.1);
  padding:0 32px;display:flex;align-items:center;justify-content:space-between;
  height:62px;
}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:500;color:#fff;letter-spacing:.06em}
.nav-links{display:flex;gap:24px;list-style:none;margin:0}
.nav-links a{color:rgba(255,255,255,.75);font-size:.85rem;font-family:'DM Sans',sans-serif;transition:color .2s}
.nav-links a:hover{color:#fff}
.nav-cta{
  background:var(--ink);color:#fff;font-family:'DM Sans',sans-serif;
  font-size:.82rem;font-weight:500;padding:9px 22px;border-radius:40px;
  border:none;cursor:pointer;transition:all .2s;text-decoration:none;
}
.nav-cta:hover{background:#fff;color:var(--ink);transform:translateY(-1px)}
.hero{background:linear-gradient(145deg,#1A1060 0%,var(--purple) 55%,#7B5EA7 100%);padding:104px 28px 60px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.12),transparent 60%)}
.hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.hero-greeting{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px}
.hero-icon{font-size:3rem;display:block;margin-bottom:12px;animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.hero-eyebrow{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px}
.hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;color:#fff;line-height:1.05;margin-bottom:10px}
.hero-tagline{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px}
.hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.hero-sep .dot{color:var(--gold2);font-size:.8rem}
.ceiling-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:20px 26px;text-align:left}
.ceiling-label{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:8px;display:block}
.ceiling-box p{font-family:'DM Sans',sans-serif;font-size:.96rem;color:rgba(255,255,255,.82);line-height:1.76}
.ceiling-box strong{color:#fff;font-weight:600}
.ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}
section{padding:60px 0}
.sec-alt{background:var(--paper)}
.sec-eye{font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:10px}
.sec-eye::before{content:'◆';font-size:.52rem}
.eye-purple{color:var(--purple)}.eye-purple::before{color:var(--purple)}
.eye-coral{color:var(--coral)}.eye-coral::before{color:var(--coral)}
.eye-gold{color:var(--gold)}.eye-gold::before{color:var(--gold)}
.eye-teal{color:var(--teal)}.eye-teal::before{color:var(--teal)}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;color:var(--ink);line-height:1.12;margin-bottom:12px}
.sec-title em{font-style:italic;color:var(--purple)}
.sec-sub{font-size:.97rem;color:var(--soft);line-height:1.82;max-width:580px;margin-bottom:32px}
.card-wrap{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px 32px}
.who-text{font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);line-height:1.82;margin-bottom:22px}
.chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);transition:all .18s}
.chip:hover{background:var(--purple-soft);border-color:var(--purple);color:var(--purple)}
.matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.mh.after{color:var(--gold2)}
.matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.matrix-row:last-child{border-bottom:none}
.matrix-row:hover .mc{background:#F8F7FF}
.mc{padding:15px 20px;font-size:.9rem;line-height:1.55;display:flex;align-items:flex-start;gap:10px}
.mc.before{color:var(--soft);border-right:1px solid var(--border)}
.mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.mc.after{color:var(--ink);font-weight:500}
.mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--purple-soft)}
.mf{padding:16px 20px;text-align:center}
.mf.before{border-right:1px solid var(--border)}
.mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.mf.before .mf-val{color:#E53935}
.mf.after .mf-val{color:var(--teal)}
.career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.career-table tr:last-child td{border-bottom:none}
.career-table tr:hover td{background:var(--ivory)}
.career-table td:first-child{font-weight:600;color:var(--ink)}
.career-table td:last-child{white-space:nowrap}
.career-table{min-width:480px}
.earn-pill{display:inline-block;background:var(--purple-soft);color:var(--purple);border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600}
.testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.testi{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px 24px;border-left:4px solid var(--purple)}
.testi:nth-child(2){border-left-color:var(--teal)}
.testi:nth-child(3){border-left-color:var(--gold)}
.testi-quote{font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;color:var(--ink);line-height:1.7;margin-bottom:14px}
.testi-meta{display:flex;align-items:center;gap:12px}
.testi-avatar{width:38px;height:38px;border-radius:50%;background:var(--purple-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;color:var(--purple);flex-shrink:0}
.testi:nth-child(2) .testi-avatar{background:var(--teal-soft);color:var(--teal)}
.testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.testi-role{font-size:.78rem;color:var(--soft)}
.testi-result{margin-top:10px;padding:7px 14px;border-radius:8px;background:var(--purple-soft);display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;color:var(--purple)}
.testi:nth-child(2) .testi-result{background:var(--teal-soft);color:var(--teal)}
.testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.testi-result::before{content:'◆';font-size:.52rem}
.income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.income-card.ops{border-top:4px solid var(--purple)}
.income-card.pm{border-top:4px solid var(--teal)}
.income-card.data{border-top:4px solid var(--blue)}
.income-card.admin{border-top:4px solid var(--coral)}
.ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.income-card.ops .ic-label{color:var(--purple)}
.income-card.pm .ic-label{color:var(--teal)}
.income-card.data .ic-label{color:var(--blue)}
.income-card.admin .ic-label{color:var(--coral)}
.ic-title{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;color:var(--ink);margin-bottom:5px}
.ic-range{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px}
.income-card.ops .ic-range{color:var(--purple)}
.income-card.pm .ic-range{color:var(--teal)}
.income-card.data .ic-range{color:var(--blue)}
.income-card.admin .ic-range{color:var(--coral)}
.ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.ic-list{list-style:none}
.ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.ic-list li:last-child{border-bottom:none}
.ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.income-card.ops .ic-list li::before{color:var(--purple)}
.income-card.pm .ic-list li::before{color:var(--teal)}
.income-card.data .ic-list li::before{color:var(--blue)}
.income-card.admin .ic-list li::before{color:var(--coral)}
.income-blur-wrap{position:relative}
.blur-overlay{position:absolute;bottom:0;left:0;right:0;height:58%;background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);z-index:2;pointer-events:none}
#paywall{background:var(--ink);padding:64px 28px 100px}
.paywall-inner{max-width:680px;margin:0 auto;text-align:center}
.pw-pre{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:14px}
.pw-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em}
.pw-title em{font-style:italic;color:var(--gold2)}
.pw-sub{font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;max-width:500px;margin:0 auto 36px}
.pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.pw-price{font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;color:var(--gold2);line-height:1;margin-bottom:14px}
.pw-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;color:var(--gold2);margin-bottom:28px}
.btn-buy{display:inline-flex;align-items:center;gap:10px;background:var(--purple);color:#fff;font-family:'DM Sans',sans-serif;font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;text-decoration:none;letter-spacing:.02em}
.btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(75,67,173,.4)}
.pw-trust{font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;font-family:'DM Sans',sans-serif}
footer{
  background:var(--ink);border-top:1px solid rgba(255,255,255,.06);
  color:rgba(255,255,255,.4);padding:20px 32px;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:12px;
}
.footer-brand{font-family:'Cormorant Garamond',serif;font-size:1rem;font-weight:500;color:rgba(255,255,255,.7)}
.footer-brand span{color:var(--gold2)}
footer strong{color:rgba(255,255,255,.8);font-family:'Cormorant Garamond',serif;font-size:12px}
@media(max-width:600px){
  .income-grid{grid-template-columns:1fr}
  .matrix-head,.matrix-row,.matrix-foot{grid-template-columns:1fr}
  .mh.before,.mc.before,.mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  nav{padding:0 14px;height:56px;gap:8px}
  .nav-links{display:none}
  .nav-logo{font-size:.95rem}
  .nav-cta{font-size:.74rem;padding:7px 14px}
  .hero{padding:88px 16px 40px}
  section{padding:36px 0}
  .wrap{padding:0 16px}
  .card-wrap{padding:22px 18px}
  .ceiling-box{padding:16px 18px}
  .testi{padding:18px 16px}
  .income-card{padding:18px}
  .paywall-inner{padding:0}
  .pw-sub{margin-bottom:24px}
  .btn-buy{padding:14px 32px;font-size:.95rem;width:100%;justify-content:center}
  .pw-price{font-size:3rem}
  footer{padding:16px 14px;flex-direction:column;text-align:center;gap:6px}
  .sec-cta-link{width:100%;display:block;text-align:center;box-sizing:border-box}
}`;

function getNameFromURL() {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  return p.get("name");
}

export default function SystemsArchitectPage() {
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");

  useEffect(() => {
    track("result_view", { archetype: "S" });
  }, []);

  async function onBuy() {
    setBuyError("");
    setBuying(true);
    try {
      const url = await buyPlaybook("S");
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
    <span className="hero-icon">⚙️</span>
    <div className="hero-eyebrow">Your AI Archetype</div>
    <h1 className="hero-name">The Systems Architect</h1>
    <div className="hero-tagline">"You see structure where others see chaos. AI is the execution layer your systems have always needed."</div>
    <div className="hero-sep"><div className="line"></div><div className="dot">◆</div><div className="line"></div></div>
    <div className="ceiling-box">
      <span className="ceiling-label">Your human edge · and your current bottleneck</span>
      <p>You look at chaos and immediately see the structure that should be there. You have been deploying this intelligence your entire career — mostly for other people, often for free, almost always for a salary that does not reflect what you actually contributed. <strong>The system you built is running their business.</strong> But it is not earning you what it is worth. You do not have a capability problem. You have an <em>ownership problem.</em> That ends today.</p>
    </div>
  </div>
</div>
<section>
  <div className="wrap">
    <div className="card-wrap">
      <div className="sec-eye eye-purple">Who you are</div>
      <p className="who-text">You are the person who walks into a broken operation and sees what needs to happen in the first five minutes. The checklist already exists in your head. The process map is forming before anyone else has identified the problem. That ability — to see structure inside complexity — is one of the rarest and most commercially valuable skills in the current economy. You have been lending it to other people's organisations. It is time to own what you build.</p>
      <div className="sec-eye eye-purple" style={{marginTop: 22}}>Natural Strengths</div>
      <div className="chip-row">
        <span className="chip">Systems Thinking</span>
        <span className="chip">Precision and Accuracy</span>
        <span className="chip">Problem Decomposition</span>
        <span className="chip">Documentation and Clarity</span>
        <span className="chip">Pattern Recognition</span>
        <span className="chip">Reliable Delivery</span>
      </div>
    </div>
  </div>
</section>
<section>
  <div className="wrap">
    <div className="sec-eye eye-gold">AI career paths for your archetype</div>
    <h2 className="sec-title">Roles built for<br /><em>exactly how you think</em></h2>
    <p className="sec-sub">These are real paths Systems Architects are filling and earning from today.</p>
    <div style={{overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
    <table className="career-table">
      <thead>
        <tr><th>Career Path</th><th>What You Do</th><th>Earning Range</th></tr>
      </thead>
      <tbody>
        <tr><td>Operations Consultant</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Audit business operations, diagnose inefficiencies, deliver a clear action plan.</td><td><span className="earn-pill">$1k–$5k/project</span></td></tr>
        <tr><td>Fractional COO</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Part-time operations leader for 2 to 3 growing businesses. AI handles all documentation and reporting.</td><td><span className="earn-pill">$3k–$8k/mo each</span></td></tr>
        <tr><td>SOP and Docs Specialist</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Write the processes that make businesses scalable. Claude produces them 3x faster.</td><td><span className="earn-pill">$300–$1,500 per SOP</span></td></tr>
        <tr><td>Business Automation Consultant</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Build Make.com and Zapier automations for businesses. $1k to $5k per project.</td><td><span className="earn-pill">$2k–$10k/mo</span></td></tr>
        <tr><td>Data and Reporting Analyst</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Turn business data into clear narratives and dashboards leaders can act on.</td><td><span className="earn-pill">$3k–$10k/mo</span></td></tr>
        <tr><td>Systems Template Creator</td><td style={{color: 'var(--soft)', fontSize: '.88rem'}}>Package your systems into Notion or Airtable templates. Build once, sell to many.</td><td><span className="earn-pill">$97–$997 per product</span></td></tr>
      </tbody>
    </table>
  </div>
    <div style={{textAlign:'center', marginTop:'28px'}}>
      <Link href="#paywall" className="nav-cta" style={{display:'inline-block', padding:'12px 32px', fontSize:'.95rem'}}>Get the Playbook →</Link>
    </div>
  </div>
</section>
<section className="sec-alt">
  <div className="wrap">
    <div className="sec-eye eye-purple">The leverage gap</div>
    <h2 className="sec-title">What AI actually unlocks<br />for <em>your specific archetype</em></h2>
    <p className="sec-sub">This is not a tool list. This is the exact before and after for a Systems Architect who implements the playbook in 90 days.</p>
    <div className="matrix">
      <div className="matrix-head">
        <div className="mh before">Without the playbook</div>
        <div className="mh after">With the playbook ◆</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">SOP writing: 4 to 6 hours per procedure, from scratch</div>
        <div className="mc after">SOP writing: 30 minutes — describe the process, Claude documents it</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Client proposal: 3 hours of writing from a blank page</div>
        <div className="mc after">Client proposal: 20 minutes using your Claude prompt template</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Automation build: requires technical knowledge or a developer</div>
        <div className="mc after">Automation build: Make.com + Claude — no code, delivered in hours</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Data report: hours of analysis and manual narrative writing</div>
        <div className="mc after">Data report: paste the data, Claude finds patterns and writes the story</div>
      </div>
      <div className="matrix-row">
        <div className="mc before">Client delivery: 1 person, 1 engagement, capped by your hours</div>
        <div className="mc after">Client delivery: 3 to 5 retainers simultaneously, AI handles documentation</div>
      </div>
      <div className="matrix-foot">
        <div className="mf before">
          <div className="mf-label">Current income ceiling</div>
          <div className="mf-val">$2k – $5k/mo</div>
        </div>
        <div className="mf after">
          <div className="mf-label">AI-amplified income capacity</div>
          <div className="mf-val">$8k – $20k/mo</div>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="sec-alt">
  <div className="wrap">
    <div className="sec-eye eye-gold">Real Systems Architects. Real results.</div>
    <h2 className="sec-title">They were where you are.<br />Here is what <em>changed.</em></h2>
    <div className="testimonials">
      <div className="testi">
        <div className="testi-quote">"I had been restructuring business operations as a favour for years. Someone offered to pay me $1,000 for what I had done for free dozens of times. I almost said no. They paid without negotiating. I sat in my car afterwards and cried. Not from happiness — from the grief of realising I had been giving away something valuable for years without knowing it."</div>
        <div className="testi-meta">
          <div className="testi-avatar">K</div>
          <div><div className="testi-name">Kemi A.</div><div className="testi-role">Operations Consultant · Nigeria</div></div>
        </div>
        <div className="testi-result">$1,000 first paid engagement · $8,400 by month three</div>
      </div>
      <div className="testi">
        <div className="testi-quote">"I built a Notion template library for a client. They paid me $1,200 for 8 templates. I listed the same templates on Gumroad. In the first month, 23 businesses bought the pack at $97 each. That is $2,231 from work I had already done. It keeps selling every month without me doing anything."</div>
        <div className="testi-meta">
          <div className="testi-avatar">T</div>
          <div><div className="testi-name">Taiwo B.</div><div className="testi-role">Systems Template Creator</div></div>
        </div>
        <div className="testi-result">$2,231/month recurring from templates already built</div>
      </div>
      <div className="testi">
        <div className="testi-quote">"I was managing projects for one employer at a salary that did not reflect my value. I took on two fractional PM clients alongside my job. Within six months I had replaced my salary with client income and left. I now hold three retainers at $3,500 each. I work less than I did before and earn more than I ever have."</div>
        <div className="testi-meta">
          <div className="testi-avatar">E</div>
          <div><div className="testi-name">Emeka O.</div><div className="testi-role">Fractional Project Manager · UK</div></div>
        </div>
        <div className="testi-result">3 retainers · $10,500/month · left full-time employment</div>
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
    <h2 className="sec-title">How Systems Architects<br /><em>actually</em> earn with AI</h2>
    <p className="sec-sub">Four income paths. Each one specific to how your archetype operates. Full breakdown inside the playbook.</p>
    <div className="income-blur-wrap">
      <div className="income-grid">
        <div className="income-card ops">
          <div className="ic-label">The Ops Specialist</div>
          <div className="ic-title">Systems Premium</div>
          <div className="ic-range">$5k to $15k/month</div>
          <div className="ic-desc">Growing companies are operationally broken at scale. You are the diagnosis and the solution. AI lets you deliver faster and hold more clients simultaneously.</div>
          <ul className="ic-list">
            <li>Operations audit: $1,500 to $5,000 per project</li>
            <li>Fractional COO retainer: $3,000 to $8,000/month</li>
            <li>Process redesign project: $2,000 to $8,000</li>
            <li>Automation build: $1,000 to $5,000 per system</li>
          </ul>
        </div>
        <div className="income-card pm">
          <div className="ic-label">The Project Manager</div>
          <div className="ic-title">Delivery Certainty</div>
          <div className="ic-range">$4k to $12k/month</div>
          <div className="ic-desc">Organisations pay premium rates for someone who guarantees a project lands on time. AI builds your plans and tracks progress. You manage the humans.</div>
          <ul className="ic-list">
            <li>Fractional PM retainer: $2,500 to $6,000/month</li>
            <li>Project rescue engagement: $3,000 to $8,000</li>
            <li>Delivery audit and plan: $1,500 to $4,000</li>
            <li>PM training for teams: $2,000 to $5,000/day</li>
          </ul>
        </div>
        <div className="income-card data" style={{filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none'}}>
          <div className="ic-label">The Data Analyst</div>
          <div className="ic-title">Insight Premium</div>
          <div className="ic-range">$4k to $14k/month</div>
          <div className="ic-desc">Data without interpretation is noise. You are the interpreter. AI handles the analysis mechanics. You provide the strategic narrative that helps organisations decide.</div>
          <ul className="ic-list">
            <li>Monthly reporting retainer: $1,500 to $4,000/month</li>
            <li>Dashboard build: $1,000 to $3,500</li>
            <li>Data audit and recommendations: $2,000 to $6,000</li>
            <li>Data storytelling workshops: $2,000 to $6,000/day</li>
          </ul>
        </div>
        <div className="income-card admin" style={{filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none'}}>
          <div className="ic-label">The Admin Architect</div>
          <div className="ic-title">Infrastructure Value</div>
          <div className="ic-range">$3k to $10k/month</div>
          <div className="ic-desc">Every growing business needs documented systems. Most do not have them. You build the invisible infrastructure that makes everything else scalable.</div>
          <ul className="ic-list">
            <li>SOP writing: $300 to $1,500 per procedure</li>
            <li>Full systems documentation: $2,000 to $8,000</li>
            <li>Template library: $500 to $2,000 per set</li>
            <li>Automation build: $1,000 to $5,000 per workflow</li>
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
    <p className="pw-sub">Your free results show you <em>who</em> you are. The Playbook shows you exactly <em>what to do</em> — every AI career path, income strategy, tool stack made for your brain, and 90-day action plan built for The Systems Architect.</p>
    <div className="pw-price-was">Valued at $57</div>
    <div className="pw-price">$9.99</div>
    <div className="pw-badge">🔥 Launch Price — Valid for the first 10 Buyers</div>
    <div><button onClick={onBuy} disabled={buying} className="btn-buy" style={{ opacity: buying ? 0.6 : 1, cursor: buying ? "not-allowed" : "pointer" }}>{buying ? "Preparing checkout…" : "Buy Playbook →"}</button>{buyError && <div role="alert" style={{ color: "#ffcdd2", fontSize: ".8rem", marginTop: "8px" }}>{buyError}</div>}</div>
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
