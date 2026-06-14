"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";

const CSS = `
:root {
  --purple:#534AB7; --purple2:#6B63C8; --purple-soft:#EEEDFE;
  --ink:#1A0F38; --soft:#4a3f6b;
  --ivory:#FAF8F4; --paper:#F2EDE5;
  --gold:#C8940A; --gold2:#E8A020;
  --teal:#0C6B51; --teal-soft:#E1F5EE;
  --blue:#1565C0; --blue-soft:#E8F0FE;
  --coral:#D85A30;
  --border:#E4DDD4;
}
.systems-architect *{margin:0;padding:0;box-sizing:border-box}
.systems-architect{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
.systems-architect a{text-decoration:none;color:inherit}
.systems-architect .wrap{max-width:860px;margin:0 auto;padding:0 28px}

/* ── NAV ─────────────────────────────────────── */
.systems-architect nav {
  position:fixed; top:0; left:0; right:0; z-index:99;
  background:rgba(83,74,183,.96); backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,.1);
  padding:0 32px; display:flex; align-items:center; justify-content:space-between;
  height:62px;
}
.systems-architect .nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:1.15rem;
  font-weight:500; color:#fff; letter-spacing:.06em;
}
.systems-architect .nav-links {
  display:flex; gap:24px; list-style:none; margin:0;
}
.systems-architect .nav-links a {
  color:rgba(255,255,255,.75); font-size:.85rem;
  font-family:'DM Sans',sans-serif; transition:color .2s;
}
.systems-architect .nav-links a:hover { color:#fff; }
.systems-architect .nav-cta {
  background:var(--gold2); color:var(--ink); font-family:'DM Sans',sans-serif;
  font-size:.82rem; font-weight:500; padding:9px 22px; border-radius:40px;
  border:none; cursor:pointer; transition:all .2s; text-decoration:none;
}
.systems-architect .nav-cta:hover { background:#fff; color:var(--ink); transform:translateY(-1px); }

/* ── HERO ────────────────────────────────────── */
.systems-architect .hero{
  background:linear-gradient(145deg,#2A2470 0%,var(--purple) 55%,#8B7FD4 100%);
  padding:104px 28px 60px;text-align:center;
  position:relative;overflow:hidden;
}
.systems-architect .hero::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.12),transparent 60%);
}
.systems-architect .hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.systems-architect .hero-greeting{
  font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px;
}
.systems-architect .hero-icon{font-size:3rem;display:block;margin-bottom:12px;
  animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.systems-architect .hero-eyebrow{
  font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px;
}
.systems-architect .hero-name{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;
  color:#fff;line-height:1.05;margin-bottom:10px;
}
.systems-architect .hero-tagline{
  font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;
  font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px;
}
.systems-architect .hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.systems-architect .hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.systems-architect .hero-sep .dot{color:var(--gold2);font-size:.8rem}
.systems-architect .ceiling-box{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);
  border-radius:14px;padding:20px 26px;text-align:left;
}
.systems-architect .ceiling-label{
  font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold2);font-weight:600;margin-bottom:8px;display:block;
}
.systems-architect .ceiling-box p{
  font-family:'DM Sans',sans-serif;font-size:.96rem;
  color:rgba(255,255,255,.82);line-height:1.76;
}
.systems-architect .ceiling-box strong{color:#fff;font-weight:600}
.systems-architect .ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}

/* ── SECTIONS & CARDS ────────────────────────── */
.systems-architect section{padding:60px 0}
.systems-architect .sec-alt{background:var(--paper)}
.systems-architect .sec-eye{
  font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  display:flex;align-items:center;gap:8px;margin-bottom:10px;
}
.systems-architect .sec-eye::before{content:'◆';font-size:.52rem}
.systems-architect .eye-purple{color:var(--purple)}.systems-architect .eye-purple::before{color:var(--purple)}
.systems-architect .eye-gold{color:var(--gold)}.systems-architect .eye-gold::before{color:var(--gold)}
.systems-architect .eye-teal{color:var(--teal)}.systems-architect .eye-teal::before{color:var(--teal)}
.systems-architect .sec-title{
  font-family:'Cormorant Garamond',serif;
  font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;
  color:var(--ink);line-height:1.12;margin-bottom:12px;
}
.systems-architect .sec-title em{font-style:italic;color:var(--purple)}
.systems-architect .sec-sub{
  font-size:.97rem;color:var(--soft);line-height:1.82;
  max-width:580px;margin-bottom:32px;
}
.systems-architect .card-wrap{
  background:#fff;border:1px solid var(--border);
  border-radius:14px;padding:28px 32px;
}
.systems-architect .who-text{
  font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);
  line-height:1.82;margin-bottom:22px;
}
.systems-architect .chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.systems-architect .chip{
  display:inline-flex;align-items:center;gap:6px;
  padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;
  background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);
  transition:all .18s;
}
.systems-architect .chip:hover{background:var(--purple-soft);border-color:var(--purple);color:var(--purple)}

/* MATRIX */
.systems-architect .matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.systems-architect .matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.systems-architect .mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.systems-architect .mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.systems-architect .mh.after{color:var(--gold2)}
.systems-architect .matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.systems-architect .matrix-row:last-child{border-bottom:none}
.systems-architect .matrix-row:hover .mc{background:#F5F3FF}
.systems-architect .mc{padding:15px 20px;font-size:.9rem;line-height:1.55;display:flex;align-items:flex-start;gap:10px}
.systems-architect .mc.before{color:var(--soft);border-right:1px solid var(--border)}
.systems-architect .mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.systems-architect .mc.after{color:var(--ink);font-weight:500}
.systems-architect .mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.systems-architect .matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--purple-soft)}
.systems-architect .mf{padding:16px 20px;text-align:center}
.systems-architect .mf.before{border-right:1px solid var(--border)}
.systems-architect .mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.systems-architect .mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.systems-architect .mf.before .mf-val{color:#E53935}
.systems-architect .mf.after .mf-val{color:var(--teal)}

/* CAREER TABLE */
.systems-architect .career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.systems-architect .career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.systems-architect .career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.systems-architect .career-table tr:last-child td{border-bottom:none}
.systems-architect .career-table tr:hover td{background:var(--ivory)}
.systems-architect .career-table td:first-child{font-weight:600;color:var(--ink)}
.systems-architect .earn-pill{display:inline-block;background:var(--purple-soft);color:var(--purple);border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600}

/* TESTIMONIALS */
.systems-architect .testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.systems-architect .testi{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px 24px;border-left:4px solid var(--purple)}
.systems-architect .testi:nth-child(2){border-left-color:var(--teal)}
.systems-architect .testi:nth-child(3){border-left-color:var(--gold)}
.systems-architect .testi-quote{font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;color:var(--ink);line-height:1.7;margin-bottom:14px}
.systems-architect .testi-meta{display:flex;align-items:center;gap:12px}
.systems-architect .testi-avatar{width:38px;height:38px;border-radius:50%;background:var(--purple-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;color:var(--purple);flex-shrink:0}
.systems-architect .testi:nth-child(2) .testi-avatar{background:var(--teal-soft);color:var(--teal)}
.systems-architect .testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.systems-architect .testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.systems-architect .testi-role{font-size:.78rem;color:var(--soft)}
.systems-architect .testi-result{margin-top:10px;padding:7px 14px;border-radius:8px;background:var(--purple-soft);display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;color:var(--purple)}
.systems-architect .testi:nth-child(2) .testi-result{background:var(--teal-soft);color:var(--teal)}
.systems-architect .testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.systems-architect .testi-result::before{content:'◆';font-size:.52rem}

/* INCOME GRID */
.systems-architect .income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.systems-architect .income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.systems-architect .income-card.automation{border-top:4px solid var(--purple)}
.systems-architect .income-card.saas{border-top:4px solid var(--blue)}
.systems-architect .income-card.enterprise{border-top:4px solid var(--teal)}
.systems-architect .income-card.training{border-top:4px solid var(--coral)}
.systems-architect .ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.systems-architect .income-card.automation .ic-label{color:var(--purple)}
.systems-architect .income-card.saas .ic-label{color:var(--blue)}
.systems-architect .income-card.enterprise .ic-label{color:var(--teal)}
.systems-architect .income-card.training .ic-label{color:var(--coral)}
.systems-architect .ic-title{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;color:var(--ink);margin-bottom:5px}
.systems-architect .ic-range{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px}
.systems-architect .income-card.automation .ic-range{color:var(--purple)}
.systems-architect .income-card.saas .ic-range{color:var(--blue)}
.systems-architect .income-card.enterprise .ic-range{color:var(--teal)}
.systems-architect .income-card.training .ic-range{color:var(--coral)}
.systems-architect .ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.systems-architect .ic-list{list-style:none}
.systems-architect .ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.systems-architect .ic-list li:last-child{border-bottom:none}
.systems-architect .ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.systems-architect .income-card.automation .ic-list li::before{color:var(--purple)}
.systems-architect .income-card.saas .ic-list li::before{color:var(--blue)}
.systems-architect .income-card.enterprise .ic-list li::before{color:var(--teal)}
.systems-architect .income-card.training .ic-list li::before{color:var(--coral)}
.systems-architect .income-blur-wrap{position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}
.systems-architect .blur-overlay{position:absolute;bottom:0;left:0;right:0;height:58%;background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);z-index:2;pointer-events:none}

/* PAYWALL & FOOTER */
.systems-architect #paywall{background:var(--ink);padding:64px 28px;scroll-margin-top:70px}
.systems-architect .paywall-inner{max-width:680px;margin:0 auto;text-align:center}
.systems-architect .pw-pre{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:14px}
.systems-architect .pw-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em}
.systems-architect .pw-title em{font-style:italic;color:var(--gold2)}
.systems-architect .pw-sub{font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;max-width:500px;margin:0 auto 36px}
.systems-architect .pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.systems-architect .pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.systems-architect .pw-price{font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;color:var(--gold2);line-height:1;margin-bottom:14px}
.systems-architect .pw-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;color:var(--gold2);margin-bottom:28px}
.systems-architect .btn-buy{display:inline-flex;align-items:center;gap:10px;background:var(--purple);color:#fff;font-family:'DM Sans',sans-serif;font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;text-decoration:none;letter-spacing:.02em}
.systems-architect .btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(83,74,183,.4)}
.systems-architect .pw-trust{font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;font-family:'DM Sans',sans-serif}

/* FOOTER */
.systems-architect footer {
  background:var(--ink); border-top:1px solid rgba(255,255,255,.06);
  color:rgba(255,255,255,.4); padding:20px 32px;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:12px;
}
.systems-architect .footer-brand {
  font-family:'Cormorant Garamond',serif; font-size:1rem;
  font-weight:500; color:rgba(255,255,255,.7);
}
.systems-architect .footer-brand span { color:var(--gold2); }
.systems-architect footer .footer-brand + div { font-size:.7rem; opacity:0.25; }

@media(max-width:600px){
  .systems-architect .income-grid{grid-template-columns:1fr}
  .systems-architect .matrix-head,.systems-architect .matrix-row,.systems-architect .matrix-foot{grid-template-columns:1fr}
  .systems-architect .mh.before,.systems-architect .mc.before,.systems-architect .mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  .systems-architect nav{padding:0 14px;height:56px;gap:8px}
  .systems-architect .nav-links{display:none}
  .systems-architect .nav-logo{font-size:.95rem}
  .systems-architect .nav-cta{font-size:.74rem;padding:7px 14px}
  .systems-architect .hero{padding:88px 16px 40px}
  .systems-architect section{padding:36px 0}
  .systems-architect .wrap{padding:0 16px}
  .systems-architect .card-wrap{padding:22px 18px}
  .systems-architect .ceiling-box{padding:16px 18px}
  .systems-architect .testi{padding:18px 16px}
  .systems-architect .income-card{padding:18px}
  .systems-architect .paywall-inner{padding:0}
  .systems-architect .pw-sub{margin-bottom:24px}
  .systems-architect .btn-buy{padding:14px 32px;font-size:.95rem;width:100%;justify-content:center}
  .systems-architect .pw-price{font-size:3rem}
  .systems-architect section:last-of-type{padding-bottom:12px}
  .systems-architect #paywall{padding:12px 16px;scroll-margin-top:56px}
  .systems-architect footer{padding:16px 14px;flex-direction:column;text-align:center;gap:6px}
}`;

const CONFIG: ArchetypeConfig = {
  archetypeKey: "S",
  css: CSS,
  wrapperClass: "systems-architect",

  icon: "⚙️",
  name: "Systems Architect",
  tagline: "You don't just use AI — you build the infrastructure others run on.",
  ceilingLabel: "Your human edge · and your current bottleneck",
  ceilingContent: `You see the inefficiency in everything. Not as a frustration — as a map. Every broken process, every repetitive task, every place where a human is doing something a machine should be doing — that is not a problem to you. That is an invitation. But right now, <strong>you are spending your systems brain on your own work instead of selling it.</strong> You automate for yourself but have not yet packaged what you know into a <em>repeatable, sellable offer.</em> You do not have a skills problem. You have a packaging problem.`,

  whoYouAre: "You think in workflows, not feelings. Every process you see, you mentally re-architect. You are the person who makes things run — not by doing more, but by building systems that do the work for everyone else. That invisible infrastructure is what keeps businesses alive, and it is worth far more than most people understand.",
  whoEyeColor: "eye-purple",
  strengths: ["Systems Thinking", "Pattern Recognition", "Process Mapping", "Debugging Mindset", "Documentation", "Technical Translation"],
  strengthsEyeColor: "eye-purple",

  careerSubtitle: "exactly how you build",
  careers: [
    { title: "AI Automation Consultant", desc: "Build and maintain automation workflows for businesses. The most in-demand technical AI role.", earn: "$1k–$8k/build" },
    { title: "AI Workflow Architect", desc: "Design the AI infrastructure organisations run on. Enterprise-level impact.", earn: "$3k–$15k/project" },
    { title: "AI No-Code SaaS Builder", desc: "Build and sell AI-powered software products. The highest-leverage income model.", earn: "$1k–$50k+ MRR" },
    { title: "AI Prompt Engineer", desc: "Design the AI instruction systems that power other people's businesses.", earn: "$500–$5k/engagement" },
    { title: "AI Customer Service Architect", desc: "Build the conversational AI systems that handle customer interaction at scale.", earn: "$2k–$10k/build" },
    { title: "AI Research Analyst", desc: "Use AI to synthesise intelligence faster than any team. Sell the insight.", earn: "$1k–$5k/retainer" },
  ],

  matrixSectionTitle: "The automation gap",
  matrixTitle: `What AI actually automates<br /><em>for your specific archetype</em>`,
  matrixSubheading: "This is not a tool list. This is the exact before and after for a Systems Architect who implements the playbook in 90 days.",
  matrixEyeColor: "eye-purple",
  beforeAfter: [
    { before: "Manual data entry: 3 hours daily across spreadsheets and forms", after: "Automated: Make.com captures, routes, and logs everything — zero manual steps" },
    { before: "Client onboarding: 5 emails, 2 documents, 1 call — every time", after: "Client onboarding: triggered workflow sends everything in sequence automatically" },
    { before: "Reporting: compile data from 4 tools into one dashboard weekly", after: "Reporting: live dashboard updates itself from connected API sources" },
    { before: "Repetitive tasks: 15+ hours/week on processes you know should be automated", after: "Repetitive tasks: under 2 hours/week — AI handles the rest while you build new systems" },
    { before: "Building alone: months of solo development, never shipping", after: "Building fast: first client workflow live in 2 weeks using Make + Claude" },
  ],
  matrixFoot: {
    before: { label: "Manual hours per week", value: "15+ hours" },
    after: { label: "Automated with AI", value: "Under 2 hours" },
  },

  testimonialsEyebrow: "Real Systems Architects. Real results.",
  testimonialsEyeColor: "eye-gold",
  caseStudies: [
    {
      name: "Emeka O.",
      role: "Operations Manager",
      location: "Lagos",
      result: "4 clients at $1,500–$3,000/mo within 6 months",
      quote: "I had been in operations for 11 years. When I heard about Make.com I spent a weekend learning it and immediately saw 8 workflows I could have automated years ago. I started consulting on the side while still employed. Within 6 months I had 4 clients paying me $1,500–$3,000 a month each. I handed in my notice.",
    },
    {
      name: "James K.",
      role: "Project Manager turned SaaS Builder",
      location: "UK",
      result: "40 paying customers at $49/mo — product runs without him",
      quote: "I did not know how to code. I still do not. I used Bubble and Make.com to build a client onboarding SaaS for agencies. It took me 3 months to build. I launched at $49 a month. Within 6 months I had 40 paying customers. The product runs without me.",
    },

  ],

  incomeEyeColor: "eye-teal",
  incomeTitle: `How Systems Architects<br /><em>actually</em> earn with AI`,
  incomeSubheading: "Four income paths. Each one specific to how your archetype builds. Full breakdown inside the playbook.",
  incomePaths: [
    {
      label: "The Automation Builder",
      title: "Workflow Revenue",
      range: "$1k to $8k per build",
      desc: "Project-based workflow builds for businesses. Most common entry point. Clean scope, clear deliverable.",
      className: "automation",
      items: [
        "Discovery audit: $500 (deducted from build)",
        "Build fee: $1k–$8k depending on complexity",
        "Monthly maintenance: $200–$500/mo",
      ],
    },
    {
      label: "The SaaS Builder",
      title: "Product Revenue",
      range: "$500 to $50k+ MRR",
      desc: "The highest-leverage model. Build once, sell many times. Your systems thinking becomes a product.",
      className: "saas",
      items: [
        "No-code tools: Bubble, Glide, Supabase",
        "Niche-specific workflow products",
        "Template marketplace products",
      ],
    },
    {
      label: "The Enterprise Implementer",
      title: "Enterprise Scale",
      range: "$5k to $30k per project",
      desc: "Larger organisations implementing AI infrastructure. High ticket, longer sales cycle, significant impact.",
      className: "enterprise",
      blurred: true,
      items: [
        "Scoped engagement with milestones",
        "Change management component included",
        "Ongoing retainer post-implementation",
      ],
    },
    {
      label: "The Technical Trainer",
      title: "Teaching Revenue",
      range: "$1k to $5k per programme",
      desc: "Teach other people to automate. Agencies, founders, operations teams. High demand.",
      className: "training",
      blurred: true,
      items: [
        "Workshop: $1k–$2.5k per session",
        "Online course: $97–$497",
        "Team training retainer: $1k–$3k/mo",
      ],
    },
  ],
};

export default function SystemsArchitectPage() {
  return <ArchetypeResultLayout config={CONFIG} />;
}
