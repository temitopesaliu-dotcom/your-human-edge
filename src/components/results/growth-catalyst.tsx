"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";

const CSS = `:root{
  --blue:#1565C0;--blue2:#1A73E8;--blue-soft:#E8F0FE;
  --ink:#1A0F38;--soft:#4a3f6b;
  --ivory:#FAF8F4;--paper:#F2EDE5;
  --coral:#D85A30;--gold:#C8940A;--gold2:#E8A020;
  --teal:#0C6B51;--teal-soft:#E1F5EE;
  --border:#E4DDD4;
}
.growth-catalyst *{margin:0;padding:0;box-sizing:border-box}
.growth-catalyst{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
.growth-catalyst a{text-decoration:none;color:inherit}
.growth-catalyst .wrap{max-width:860px;margin:0 auto;padding:0 28px}
/* ── NAV ─────────────────────────────────────── */
.growth-catalyst nav {
  position:fixed; top:0; left:0; right:0; z-index:99;
  background:rgba(21,101,192,.96); backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,.1);
  padding:0 32px; display:flex; align-items:center; justify-content:space-between;
  height:62px;
}
.growth-catalyst .nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:1.15rem;
  font-weight:500; color:#fff; letter-spacing:.06em;
}
.growth-catalyst .nav-links {
  display:flex; gap:24px; list-style:none; margin:0;
}
.growth-catalyst .nav-links a {
  color:rgba(255,255,255,.75); font-size:.85rem;
  font-family:'DM Sans',sans-serif; transition:color .2s;
}
.growth-catalyst .nav-links a:hover { color:#fff; }
.growth-catalyst .nav-cta {
  background:var(--coral); color:#fff; font-family:'DM Sans',sans-serif;
  font-size:.82rem; font-weight:500; padding:9px 22px; border-radius:40px;
  border:none; cursor:pointer; transition:all .2s; text-decoration:none;
}
.growth-catalyst .nav-cta:hover { background:#fff; color:var(--ink); transform:translateY(-1px); }
/* ── HERO ────────────────────────────────────── */
.growth-catalyst .hero{
  background:linear-gradient(145deg,#0D2B6B 0%,var(--blue) 55%,#534AB7 100%);
  padding:104px 28px 60px;text-align:center;
  position:relative;overflow:hidden;
}
.growth-catalyst .hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.13),transparent 60%);
}
.growth-catalyst .hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.growth-catalyst .hero-greeting{
  font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px;
}
.growth-catalyst .hero-icon{font-size:3rem;display:block;margin-bottom:12px;
  animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.growth-catalyst .hero-eyebrow{
  font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px;
}
.growth-catalyst .hero-name{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;
  color:#fff;line-height:1.05;margin-bottom:10px;
}
.growth-catalyst .hero-tagline{
  font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px;
}
.growth-catalyst .hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.growth-catalyst .hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.growth-catalyst .hero-sep .dot{color:var(--gold2);font-size:.8rem}
/* Ceiling box */
.growth-catalyst .ceiling-box{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);
  border-radius:14px;padding:20px 26px;text-align:left;
}
.growth-catalyst .ceiling-label{
  font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold2);font-weight:600;margin-bottom:8px;display:block;
}
.growth-catalyst .ceiling-box p{
  font-family:'DM Sans',sans-serif;font-size:.96rem;
  color:rgba(255,255,255,.82);line-height:1.76;
}
.growth-catalyst .ceiling-box strong{color:#fff;font-weight:600}
.growth-catalyst .ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}
/* ── SECTION UTILS ───────────────────────────── */
.growth-catalyst section{padding:60px 0}
.growth-catalyst .sec-alt{background:var(--paper)}
.growth-catalyst .sec-eye{
  font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;gap:8px;margin-bottom:10px;
}
.growth-catalyst .sec-eye::before{content:'◆';font-size:.52rem}
.growth-catalyst .eye-blue{color:var(--blue)}.growth-catalyst .eye-blue::before{color:var(--blue)}
.growth-catalyst .eye-coral{color:var(--coral)}.growth-catalyst .eye-coral::before{color:var(--coral)}
.growth-catalyst .eye-gold{color:var(--gold)}.growth-catalyst .eye-gold::before{color:var(--gold)}
.growth-catalyst .eye-teal{color:var(--teal)}.growth-catalyst .eye-teal::before{color:var(--teal)}
.growth-catalyst .sec-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;
  color:var(--ink);line-height:1.12;margin-bottom:12px;
}
.growth-catalyst .sec-title em{font-style:italic;color:var(--blue)}
.growth-catalyst .sec-sub{
  font-size:.97rem;color:var(--soft);line-height:1.82;
  max-width:580px;margin-bottom:32px;
}
.growth-catalyst .card-wrap{
  background:#fff;border:1px solid var(--border);
  border-radius:14px;padding:28px 32px;
}
/* ── NATURAL STRENGTHS ───────────────────────── */
.growth-catalyst .chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.growth-catalyst .chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;
  background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);
  font-family:'DM Sans',sans-serif;letter-spacing:.01em;
  transition:all .18s;
}
.growth-catalyst .chip:hover{background:var(--blue-soft);border-color:var(--blue);color:var(--blue)}
.growth-catalyst .who-text{
  font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);
  line-height:1.82;margin-bottom:22px;
}
/* ── LEVERAGE MATRIX ─────────────────────────── */
.growth-catalyst .matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.growth-catalyst .matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.growth-catalyst .mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.growth-catalyst .mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.growth-catalyst .mh.after{color:var(--gold2)}
.growth-catalyst .matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.growth-catalyst .matrix-row:last-child{border-bottom:none}
.growth-catalyst .matrix-row:hover .mc{background:#FAFCFF}
.growth-catalyst .mc{padding:15px 20px;font-size:.9rem;line-height:1.55;
  display:flex;align-items:flex-start;gap:10px}
.growth-catalyst .mc.before{color:var(--soft);border-right:1px solid var(--border)}
.growth-catalyst .mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.growth-catalyst .mc.after{color:var(--ink);font-weight:500}
.growth-catalyst .mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.growth-catalyst .matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--blue-soft)}
.growth-catalyst .mf{padding:16px 20px;text-align:center}
.growth-catalyst .mf.before{border-right:1px solid var(--border)}
.growth-catalyst .mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.growth-catalyst .mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.growth-catalyst .mf.before .mf-val{color:#E53935}
.growth-catalyst .mf.after .mf-val{color:var(--teal)}
/* ── CAREER PATHS TABLE ──────────────────────── */
.growth-catalyst .career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.growth-catalyst .career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.growth-catalyst .career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.growth-catalyst .career-table tr:last-child td{border-bottom:none}
.growth-catalyst .career-table tr:hover td{background:var(--ivory)}
.growth-catalyst .career-table td:first-child{font-weight:600;color:var(--ink)}
.growth-catalyst .career-table td:last-child{white-space:nowrap}
.growth-catalyst .earn-pill{
  display:inline-block;background:var(--blue-soft);color:var(--blue);
  border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600;
}
/* ── TESTIMONIALS ────────────────────────────── */
.growth-catalyst .testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.growth-catalyst .testi{
  background:#fff;border:1px solid var(--border);border-radius:14px;
  padding:22px 24px;border-left:4px solid var(--blue);
}
.growth-catalyst .testi:nth-child(2){border-left-color:var(--teal)}
.growth-catalyst .testi:nth-child(3){border-left-color:var(--gold)}
.growth-catalyst .testi-quote{
  font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;
  color:var(--ink);line-height:1.7;margin-bottom:14px;
}
.growth-catalyst .testi-meta{display:flex;align-items:center;gap:12px}
.growth-catalyst .testi-avatar{
  width:38px;height:38px;border-radius:50%;background:var(--blue-soft);
  display:flex;align-items:center;justify-content:center;
  font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;
  color:var(--blue);flex-shrink:0;
}
.growth-catalyst .testi:nth-child(2) .testi-avatar{background:var(--teal-soft);color:var(--teal)}
.growth-catalyst .testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.growth-catalyst .testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.growth-catalyst .testi-role{font-size:.78rem;color:var(--soft)}
.growth-catalyst .testi-result{
  margin-top:10px;padding:7px 14px;border-radius:8px;
  background:var(--blue-soft);display:inline-flex;align-items:center;gap:6px;
  font-size:.78rem;font-weight:600;color:var(--blue);
}
.growth-catalyst .testi:nth-child(2) .testi-result{background:var(--teal-soft);color:var(--teal)}
.growth-catalyst .testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.growth-catalyst .testi-result::before{content:'◆';font-size:.52rem}
/* ── HOW YOU MAKE MONEY ──────────────────────── */
.growth-catalyst .income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.growth-catalyst .income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.growth-catalyst .income-card.exec{border-top:4px solid var(--blue)}
.growth-catalyst .income-card.coach{border-top:4px solid var(--teal)}
.growth-catalyst .income-card.creator{border-top:4px solid var(--coral)}
.growth-catalyst .income-card.operator{border-top:4px solid #534AB7}
.growth-catalyst .ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.growth-catalyst .income-card.exec .ic-label{color:var(--blue)}
.growth-catalyst .income-card.coach .ic-label{color:var(--teal)}
.growth-catalyst .income-card.creator .ic-label{color:var(--coral)}
.growth-catalyst .income-card.operator .ic-label{color:#534AB7}
.growth-catalyst .ic-title{
  font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;
  color:var(--ink);margin-bottom:5px;
}
.growth-catalyst .ic-range{
  font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px;
}
.growth-catalyst .income-card.exec .ic-range{color:var(--blue)}
.growth-catalyst .income-card.coach .ic-range{color:var(--teal)}
.growth-catalyst .income-card.creator .ic-range{color:var(--coral)}
.growth-catalyst .income-card.operator .ic-range{color:#534AB7}
.growth-catalyst .ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.growth-catalyst .ic-list{list-style:none}
.growth-catalyst .ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.growth-catalyst .ic-list li:last-child{border-bottom:none}
.growth-catalyst .ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.growth-catalyst .income-card.exec .ic-list li::before{color:var(--blue)}
.growth-catalyst .income-card.coach .ic-list li::before{color:var(--teal)}
.growth-catalyst .income-card.creator .ic-list li::before{color:var(--coral)}
.growth-catalyst .income-card.operator .ic-list li::before{color:#534AB7}
/* blur */
.growth-catalyst .income-blur-wrap{position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}
.growth-catalyst .blur-overlay{
  position:absolute;bottom:0;left:0;right:0;height:58%;
  background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);
  z-index:2;pointer-events:none;
}
/* ── PAYWALL ─────────────────────────────────── */
.growth-catalyst #paywall{background:var(--ink);padding:64px 28px;scroll-margin-top:70px}
.growth-catalyst .paywall-inner{
  max-width:680px;margin:0 auto;text-align:center;
}
.growth-catalyst .pw-pre{
  font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;
  color:var(--gold2);font-weight:600;margin-bottom:14px;
}
.growth-catalyst .pw-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2rem,5vw,3.2rem);font-weight:700;
  color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em;
}
.growth-catalyst .pw-title em{font-style:italic;color:var(--gold2)}
.growth-catalyst .pw-sub{
  font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;
  max-width:500px;margin:0 auto 36px;
}
.growth-catalyst .pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.growth-catalyst .pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.growth-catalyst .pw-price{
  font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;
  color:var(--gold2);line-height:1;margin-bottom:14px;
}
.growth-catalyst .pw-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);
  border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;
  color:var(--gold2);margin-bottom:28px;
}
.growth-catalyst .btn-buy{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--blue2);color:#fff;font-family:'DM Sans',sans-serif;
  font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;
  border:none;cursor:pointer;transition:all .25s;text-decoration:none;
  letter-spacing:.02em;
}
.growth-catalyst .btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(21,101,192,.35)}
.growth-catalyst .pw-trust{
  font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;
  font-family:'DM Sans',sans-serif;
}
/* ── FOOTER ──────────────────────────────────── */
.growth-catalyst footer {
  background:var(--ink); border-top:1px solid rgba(255,255,255,.06);
  color:rgba(255,255,255,.4); padding:20px 32px;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:12px;
}
.growth-catalyst .footer-brand {
  font-family:'Cormorant Garamond',serif; font-size:1rem;
  font-weight:500; color:rgba(255,255,255,.7);
}
.growth-catalyst .footer-brand span { color:var(--gold2); }
.growth-catalyst footer .footer-brand + div { font-size:.7rem; opacity:0.25; }
@media(max-width:600px){
  .growth-catalyst .income-grid{grid-template-columns:1fr}
  .growth-catalyst .matrix-head,.growth-catalyst .matrix-row,.growth-catalyst .matrix-foot{grid-template-columns:1fr}
  .growth-catalyst .mh.before,.growth-catalyst .mc.before,.growth-catalyst .mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  .growth-catalyst nav{padding:0 14px;height:56px;gap:8px}
  .growth-catalyst .nav-links{display:none}
  .growth-catalyst .nav-logo{font-size:.95rem}
  .growth-catalyst .nav-cta{font-size:.74rem;padding:7px 14px}
  .growth-catalyst .hero{padding:88px 16px 40px}
  .growth-catalyst section{padding:36px 0}
  .growth-catalyst .wrap{padding:0 16px}
  .growth-catalyst .card-wrap{padding:22px 18px}
  .growth-catalyst .ceiling-box{padding:16px 18px}
  .growth-catalyst .testi{padding:18px 16px}
  .growth-catalyst .income-card{padding:18px}
  .growth-catalyst .paywall-inner{padding:0}
  .growth-catalyst .pw-sub{margin-bottom:24px}
  .growth-catalyst .btn-buy{padding:14px 32px;font-size:.95rem;width:100%;justify-content:center}
  .growth-catalyst .pw-price{font-size:3rem}
  .growth-catalyst section:last-of-type{padding-bottom:12px}
  .growth-catalyst #paywall{padding:12px 16px;scroll-margin-top:56px}
  .growth-catalyst footer{padding:16px 14px;flex-direction:column;text-align:center;gap:6px}
}`;

const CONFIG: ArchetypeConfig = {
  archetypeKey: "G",
  css: CSS,
  wrapperClass: "growth-catalyst",

  icon: "🚀",
  name: "Growth Catalyst",
  tagline: "You see opportunity where others see chaos. AI just doubled the playing field.",
  ceilingLabel: "Your human edge · and your current bottleneck",
  ceilingContent: `You see the opportunity before the room does. You close deals, move fast, and build things that matter. But right now, <strong>your execution speed cannot match your thinking speed.</strong> Research takes days. Outreach needs a team. The content in your head never makes it out. Your ideas are faster than your output — and that gap is <em>capping your income.</em> You do not have a talent problem. You have a leverage problem.`,

  whoYouAre: "Every disruption creates a new leaderboard. The people who understood growth fundamentals before AI are the ones who will write the new rules. You are not behind — you are early. And with the right tools stacked onto the instincts you already have, the gap between where you are and where you are going closes fast.",
  whoEyeColor: "eye-teal",
  strengths: ["Opportunity Identification", "Persuasion", "Results Orientation", "Relationship Compounding", "Strategic Prioritisation", "Speed to Action"],
  strengthsEyeColor: "eye-teal",

  careerSubtitle: "exactly how you think",
  careers: [
    { title: "AI Growth Strategist", desc: "Build AI-powered acquisition and retention systems for startups.", earn: "$5k–$20k/mo" },
    { title: "AI GTM Architect", desc: "Design go-to-market systems using Clay, Apollo, AI for outbound.", earn: "$4k–$15k/mo" },
    { title: "Revenue Acceleration Consultant", desc: "Audit and rebuild sales pipelines with AI tooling.", earn: "$8k–$25k/project" },
    { title: "AI Marketing Director", desc: "Own performance, content, and lifecycle with AI-native strategy.", earn: "$120k–$250k/yr" },
    { title: "Fractional CMO (AI-native)", desc: "Serve 3 to 5 companies simultaneously with AI as leverage.", earn: "$5k–$15k/mo each" },
    { title: "AI Affiliate / Growth Partner", desc: "Build content and funnels to monetise AI tool referrals.", earn: "$2k–$50k/mo" },
  ],

  matrixSectionTitle: "The leverage gap",
  matrixTitle: `What AI actually changes<br /><em>for your specific archetype</em>`,
  matrixSubheading: "This is not a tool list. This is the exact before and after for a Growth Catalyst who implements the playbook in 90 days.",
  matrixEyeColor: "eye-blue",
  beforeAfter: [
    { before: "Research one prospect: 2 to 3 hours of manual work", after: "Research 50 prospects: 40 minutes with Perplexity + Apollo" },
    { before: "Outreach: 15 to 20 emails per day, written manually", after: "Outreach: 150 to 200 personalised emails per day, automated" },
    { before: "Proposal writing: 3 to 4 hours per client, from scratch", after: "Proposal writing: 20 minutes using your Claude prompt template" },
    { before: "Content: 1 idea becomes 1 post, if you find the time", after: "Content: 1 voice memo becomes 14 pieces across platforms" },
    { before: "Pipeline: scattered, missed follow-ups, lost deals", after: "Pipeline: automated CRM updates, follow-ups triggered, nothing lost" },
  ],
  matrixFoot: {
    before: { label: "Current income ceiling", value: "$2k – $5k/mo" },
    after: { label: "AI-amplified income capacity", value: "$10k – $25k/mo" },
  },

  testimonialsEyebrow: "Real Growth Catalysts. Real results.",
  testimonialsEyeColor: "eye-gold",
  caseStudies: [
    {
      name: "Daniel O.",
      role: "Sales Executive",
      location: "China-Africa Market Specialist",
      result: "Clarity on his exact AI stack in one session",
      quote: "I have been in sales my whole life. Working with a Chinese company, trying to bridge their tech into Africa. Every AI conversation left me more confused. This gave me clarity in under 10 minutes. I found my specific lane. Now when people talk about AI, I won't be lost — I have my own area where I specialise. Even if it cost $50 I would have still paid.",
    },
    {
      name: "Adaeze N.",
      role: "Business Development Consultant",
      location: "Lagos",
      result: "$4,800 in month two from zero",
      quote: "I had been building my consulting offer for 18 months and calling it almost ready. I followed the 90-day system. Week two I sent my first real outreach campaign. By week four I had my first paid client at $1,200. By month two I was at $4,800. The only thing that changed was the infrastructure around my thinking.",
    },
    {
      name: "James T.",
      role: "Fractional CMO",
      location: "United Kingdom",
      result: "80% less research time · 5x more outreach",
      quote: "I cut my prospect research time by 80%. I now reach five times more decision-makers in the same week. Before the playbook I was working evenings to keep up with my pipeline. Now the pipeline manages itself and I focus on the conversations that actually close.",
    },
  ],

  incomeEyeColor: "eye-coral",
  incomeTitle: `How Growth Catalysts<br /><em>actually</em> earn with AI`,
  incomeSubheading: "Four income paths. Each one specific to how your archetype operates. Full breakdown inside the playbook.",
  incomePaths: [
    {
      label: "The Executive",
      title: "Corporate Leverage",
      range: "$8k to $25k/month",
      desc: "You bring strategic value and relationships organisations cannot build internally. AI multiplies your preparation and delivery speed.",
      className: "exec",
      items: [
        "Fractional C-suite roles: $5k to $15k/month per engagement",
        "Advisory board roles: equity plus $2k to $5k monthly retainer",
        "Market entry consulting: $5k to $20k per project",
        "Executive training and workshops: $2k to $10k per day",
      ],
    },
    {
      label: "The Coach",
      title: "Transformation Premium",
      range: "$5k to $15k/month",
      desc: "Your clients pay for the transformation, not the time. AI makes your delivery richer and your practice leaner.",
      className: "coach",
      items: [
        "1:1 coaching packages: $2k to $5k per 4 to 6 week engagement",
        "Group coaching programmes: $500 to $2k per person",
        "Paid community membership: $97 to $297/month recurring",
        "VIP intensive day: $3k to $8k per session",
      ],
    },
    {
      label: "The Creator",
      title: "Audience Leverage",
      range: "$3k to $50k/month",
      desc: "Your leverage is reach. AI compresses production time so you publish more, grow faster, and monetize the audience you build.",
      className: "creator",
      blurred: true,
      items: [
        "Digital products and courses: $97 to $2k, no ceiling",
        "Newsletter sponsorships: $500 to $5k per placement",
        "Community memberships: $49 to $199/month",
        "Brand partnerships: $1k to $15k per deal",
      ],
    },
    {
      label: "The Operator",
      title: "Results Retainer",
      range: "$6k to $20k/month",
      desc: "You are paid for outcomes. AI makes you faster and able to manage more clients without growing your team cost.",
      className: "operator",
      blurred: true,
      items: [
        "Monthly agency retainers: $2k to $6k per client",
        "Productized service packages: $1k to $5k per project",
        "White-label delivery: $2k to $8k per month",
        "Performance-based: retainer plus revenue share",
      ],
    },
  ],
};

export default function GrowthCatalystPage() {
  return <ArchetypeResultLayout config={CONFIG} />;
}
