"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";

const CSS = `
:root {
  --teal:#0C6B51; --teal2:#0F8A68; --teal-soft:#E1F5EE;
  --ink:#1A0F38; --soft:#4a3f6b;
  --ivory:#FAF8F4; --paper:#F2EDE5;
  --coral:#D85A30; --gold:#C8940A; --gold2:#E8A020;
  --blue:#1565C0; --blue-soft:#E8F0FE;
  --purple:#534AB7;
  --border:#E4DDD4;
}
.human-bridge *{margin:0;padding:0;box-sizing:border-box}
.human-bridge{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
.human-bridge a{text-decoration:none;color:inherit}
.human-bridge .wrap{max-width:860px;margin:0 auto;padding:0 28px}

/* ── NAV (teal, similar to CreativeAmplifierPage) ───────────────── */
.human-bridge nav {
  position:fixed; top:0; left:0; right:0; z-index:99;
  background:rgba(12,107,81,.96); backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,.1);
  padding:0 32px; display:flex; align-items:center; justify-content:space-between;
  height:62px;
}
.human-bridge .nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:1.15rem;
  font-weight:500; color:#fff; letter-spacing:.06em;
}
.human-bridge .nav-links {
  display:flex; gap:24px; list-style:none; margin:0;
}
.human-bridge .nav-links a {
  color:rgba(255,255,255,.75); font-size:.85rem;
  font-family:'DM Sans',sans-serif; transition:color .2s;
}
.human-bridge .nav-links a:hover { color:#fff; }
.human-bridge .nav-cta {
  background:var(--coral); color:#fff; font-family:'DM Sans',sans-serif;
  font-size:.82rem; font-weight:500; padding:9px 22px; border-radius:40px;
  border:none; cursor:pointer; transition:all .2s; text-decoration:none;
}
.human-bridge .nav-cta:hover { background:#fff; color:var(--ink); transform:translateY(-1px); }

/* ── HERO ────────────────────────────────────────────────────── */
.human-bridge .hero{background:linear-gradient(145deg,#064332 0%,var(--teal) 55%,#1B6B8A 100%);padding:104px 28px 60px;text-align:center;position:relative;overflow:hidden}
.human-bridge .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.12),transparent 60%)}
.human-bridge .hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.human-bridge .hero-greeting{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px}
.human-bridge .hero-icon{font-size:3rem;display:block;margin-bottom:12px;animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.human-bridge .hero-eyebrow{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px}
.human-bridge .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;color:#fff;line-height:1.05;margin-bottom:10px}
.human-bridge .hero-tagline{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px}
.human-bridge .hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.human-bridge .hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.human-bridge .hero-sep .dot{color:var(--gold2);font-size:.8rem}
.human-bridge .ceiling-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:20px 26px;text-align:left}
.human-bridge .ceiling-label{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:8px;display:block}
.human-bridge .ceiling-box p{font-family:'DM Sans',sans-serif;font-size:.96rem;color:rgba(255,255,255,.82);line-height:1.76}
.human-bridge .ceiling-box strong{color:#fff;font-weight:600}
.human-bridge .ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}

/* ── SECTIONS & CARDS ────────────────────────────────────────── */
.human-bridge section{padding:60px 0}
.human-bridge .sec-alt{background:var(--paper)}
.human-bridge .sec-eye{font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:10px}
.human-bridge .sec-eye::before{content:'◆';font-size:.52rem}
.human-bridge .eye-teal{color:var(--teal)}.human-bridge .eye-teal::before{color:var(--teal)}
.human-bridge .eye-coral{color:var(--coral)}.human-bridge .eye-coral::before{color:var(--coral)}
.human-bridge .eye-gold{color:var(--gold)}.human-bridge .eye-gold::before{color:var(--gold)}
.human-bridge .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;color:var(--ink);line-height:1.12;margin-bottom:12px}
.human-bridge .sec-title em{font-style:italic;color:var(--teal)}
.human-bridge .sec-sub{font-size:.97rem;color:var(--soft);line-height:1.82;max-width:580px;margin-bottom:32px}
.human-bridge .card-wrap{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px 32px}
.human-bridge .who-text{font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);line-height:1.82;margin-bottom:22px}
.human-bridge .chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.human-bridge .chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);transition:all .18s}
.human-bridge .chip:hover{background:var(--teal-soft);border-color:var(--teal);color:var(--teal)}

/* MATRIX */
.human-bridge .matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.human-bridge .matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.human-bridge .mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.human-bridge .mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.human-bridge .mh.after{color:var(--gold2)}
.human-bridge .matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.human-bridge .matrix-row:last-child{border-bottom:none}
.human-bridge .matrix-row:hover .mc{background:#F5FBF8}
.human-bridge .mc{padding:15px 20px;font-size:.9rem;line-height:1.55;display:flex;align-items:flex-start;gap:10px}
.human-bridge .mc.before{color:var(--soft);border-right:1px solid var(--border)}
.human-bridge .mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.human-bridge .mc.after{color:var(--ink);font-weight:500}
.human-bridge .mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.human-bridge .matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--teal-soft)}
.human-bridge .mf{padding:16px 20px;text-align:center}
.human-bridge .mf.before{border-right:1px solid var(--border)}
.human-bridge .mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.human-bridge .mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.human-bridge .mf.before .mf-val{color:#E53935}
.human-bridge .mf.after .mf-val{color:var(--teal)}

/* CAREER TABLE */
.human-bridge .career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.human-bridge .career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.human-bridge .career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.human-bridge .career-table tr:last-child td{border-bottom:none}
.human-bridge .career-table tr:hover td{background:var(--ivory)}
.human-bridge .career-table td:first-child{font-weight:600;color:var(--ink)}
.human-bridge .earn-pill{display:inline-block;background:var(--teal-soft);color:var(--teal);border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600}

/* TESTIMONIALS */
.human-bridge .testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.human-bridge .testi{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px 24px;border-left:4px solid var(--teal)}
.human-bridge .testi:nth-child(2){border-left-color:#1B6B8A}
.human-bridge .testi:nth-child(3){border-left-color:var(--gold)}
.human-bridge .testi-quote{font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;color:var(--ink);line-height:1.7;margin-bottom:14px}
.human-bridge .testi-meta{display:flex;align-items:center;gap:12px}
.human-bridge .testi-avatar{width:38px;height:38px;border-radius:50%;background:var(--teal-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;color:var(--teal);flex-shrink:0}
.human-bridge .testi:nth-child(2) .testi-avatar{background:#E3F5FF;color:#1B6B8A}
.human-bridge .testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.human-bridge .testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.human-bridge .testi-role{font-size:.78rem;color:var(--soft)}
.human-bridge .testi-result{margin-top:10px;padding:7px 14px;border-radius:8px;background:var(--teal-soft);display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;color:var(--teal)}
.human-bridge .testi:nth-child(2) .testi-result{background:#E3F5FF;color:#1B6B8A}
.human-bridge .testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.human-bridge .testi-result::before{content:'◆';font-size:.52rem}

/* INCOME GRID */
.human-bridge .income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.human-bridge .income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.human-bridge .income-card.coach{border-top:4px solid var(--teal)}
.human-bridge .income-card.comm{border-top:4px solid #1B6B8A}
.human-bridge .income-card.trainer{border-top:4px solid var(--coral)}
.human-bridge .income-card.counselor{border-top:4px solid var(--purple)}
.human-bridge .ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.human-bridge .income-card.coach .ic-label{color:var(--teal)}
.human-bridge .income-card.comm .ic-label{color:#1B6B8A}
.human-bridge .income-card.trainer .ic-label{color:var(--coral)}
.human-bridge .income-card.counselor .ic-label{color:var(--purple)}
.human-bridge .ic-title{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;color:var(--ink);margin-bottom:5px}
.human-bridge .ic-range{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px}
.human-bridge .income-card.coach .ic-range{color:var(--teal)}
.human-bridge .income-card.comm .ic-range{color:#1B6B8A}
.human-bridge .income-card.trainer .ic-range{color:var(--coral)}
.human-bridge .income-card.counselor .ic-range{color:var(--purple)}
.human-bridge .ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.human-bridge .ic-list{list-style:none}
.human-bridge .ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.human-bridge .ic-list li:last-child{border-bottom:none}
.human-bridge .ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.human-bridge .income-card.coach .ic-list li::before{color:var(--teal)}
.human-bridge .income-card.comm .ic-list li::before{color:#1B6B8A}
.human-bridge .income-card.trainer .ic-list li::before{color:var(--coral)}
.human-bridge .income-card.counselor .ic-list li::before{color:var(--purple)}
.human-bridge .income-blur-wrap{position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}
.human-bridge .blur-overlay{position:absolute;bottom:0;left:0;right:0;height:58%;background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);z-index:2;pointer-events:none}

/* PAYWALL & FOOTER */
.human-bridge #paywall{background:var(--ink);padding:64px 28px;scroll-margin-top:70px}
.human-bridge .paywall-inner{max-width:680px;margin:0 auto;text-align:center}
.human-bridge .pw-pre{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:14px}
.human-bridge .pw-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em}
.human-bridge .pw-title em{font-style:italic;color:var(--gold2)}
.human-bridge .pw-sub{font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;max-width:500px;margin:0 auto 36px}
.human-bridge .pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.human-bridge .pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.human-bridge .pw-price{font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;color:var(--gold2);line-height:1;margin-bottom:14px}
.human-bridge .pw-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;color:var(--gold2);margin-bottom:28px}
.human-bridge .btn-buy{display:inline-flex;align-items:center;gap:10px;background:var(--teal2);color:#fff;font-family:'DM Sans',sans-serif;font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;text-decoration:none;letter-spacing:.02em}
.human-bridge .btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(12,107,81,.4)}
.human-bridge .pw-trust{font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;font-family:'DM Sans',sans-serif}

/* FOOTER */
.human-bridge footer {
  background:var(--ink); border-top:1px solid rgba(255,255,255,.06);
  color:rgba(255,255,255,.4); padding:20px 32px;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:12px;
}
.human-bridge .footer-brand {
  font-family:'Cormorant Garamond',serif; font-size:1rem;
  font-weight:500; color:rgba(255,255,255,.7);
}
.human-bridge .footer-brand span { color:var(--gold2); }
.human-bridge footer .footer-brand + div { font-size:.7rem; opacity:0.25; }

@media(max-width:600px){
  .human-bridge .income-grid{grid-template-columns:1fr}
  .human-bridge .matrix-head,.human-bridge .matrix-row,.human-bridge .matrix-foot{grid-template-columns:1fr}
  .human-bridge .mh.before,.human-bridge .mc.before,.human-bridge .mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  .human-bridge nav{padding:0 14px;height:56px;gap:8px}
  .human-bridge .nav-links{display:none}
  .human-bridge .nav-logo{font-size:.95rem}
  .human-bridge .nav-cta{font-size:.74rem;padding:7px 14px}
  .human-bridge .hero{padding:88px 16px 40px}
  .human-bridge section{padding:36px 0}
  .human-bridge .wrap{padding:0 16px}
  .human-bridge .card-wrap{padding:22px 18px}
  .human-bridge .ceiling-box{padding:16px 18px}
  .human-bridge .testi{padding:18px 16px}
  .human-bridge .income-card{padding:18px}
  .human-bridge .paywall-inner{padding:0}
  .human-bridge .pw-sub{margin-bottom:24px}
  .human-bridge .btn-buy{padding:14px 32px;font-size:.95rem;width:100%;justify-content:center}
  .human-bridge .pw-price{font-size:3rem}
  .human-bridge section:last-of-type{padding-bottom:12px}
  .human-bridge #paywall{padding:12px 16px;scroll-margin-top:56px}
  .human-bridge footer{padding:16px 14px;flex-direction:column;text-align:center;gap:6px}
}
`;

const CONFIG: ArchetypeConfig = {
  archetypeKey: "H",
  css: CSS,
  wrapperClass: "human-bridge",

  icon: "🌿",
  name: "Human Bridge",
  tagline: "You are the person people call when they need to feel understood. AI is here to make sure you always have enough left to give.",
  ceilingLabel: "Your human edge · and your current bottleneck",
  ceilingContent: `You pour your best self into the people you serve. You remember details, show up fully, and hold space in a way most people never learn to do. But right now, <strong>the admin, the emails, the content, the follow-ups</strong> — they are stealing the hours that should go to people. You finish your days <em>empty instead of fulfilled.</em> You do not have a people problem. You have an infrastructure problem.`,

  whoYouAre: "You lead with empathy, not authority. People trust you before they know why. They open up to you faster than to anyone else in the room — and you actually care about what they share. That combination of presence and genuine interest is extraordinarily rare. In a world being automated, the human who makes people feel truly seen is more valuable than ever.",
  whoEyeColor: "eye-teal",
  strengths: ["Deep Listening", "Natural Trust-Builder", "Community Creation", "Emotional Intelligence", "Natural Teaching", "Consistent Presence"],
  strengthsEyeColor: "eye-teal",

  careerSubtitle: "exactly how you connect",
  careers: [
    { title: "1:1 Transformation Coach", desc: "Guide individuals through career, life, or business pivots. AI prepares every session and handles all follow-up.", earn: "$3k–$10k/mo" },
    { title: "Paid Community Founder", desc: "Build a recurring membership space. Two live sessions a month. AI runs everything between them.", earn: "$2k–$8k/mo" },
    { title: "Corporate Wellbeing Trainer", desc: "Facilitate emotional intelligence and resilience workshops for teams. AI builds all materials.", earn: "$1k–$8k/day" },
    { title: "Group Programme Facilitator", desc: "Run cohorts of 8 to 12 through a structured transformation. One delivery, multiple fees.", earn: "$3k–$12k/launch" },
    { title: "Online Course Creator", desc: "Package your methodology into a course. AI structures the curriculum. You deliver the wisdom.", earn: "$97–$1k per sale" },
    { title: "Counselor or Wellbeing Guide", desc: "Support individuals through grief, transition, or mental health. AI handles all admin between sessions.", earn: "$3k–$12k/mo" },
  ],

  matrixSectionTitle: "The leverage gap",
  matrixTitle: `What AI actually frees up<br /><em>for your specific archetype</em>`,
  matrixSubheading: "This is not a tool list. This is the exact before and after for a Human Bridge who implements the playbook in 90 days.",
  matrixEyeColor: "eye-teal",
  beforeAfter: [
    { before: "Session notes: 45 minutes writing up after every call", after: "Session notes: 5 minutes — Claude drafts from your voice memo" },
    { before: "Follow-up emails: sitting in drafts, often unsent for days", after: "Follow-up: warm, personal email sent within the hour, in your voice" },
    { before: "Content creation: hours of effort, inconsistent, often skipped", after: "Weekly newsletter and social posts drafted in 20 minutes from a voice memo" },
    { before: "Scheduling: back-and-forth emails, mental load, missed sessions", after: "Booking link handles everything — clients schedule themselves automatically" },
    { before: "Session prep: arriving tired, under-prepared, distracted by admin", after: "Session prep: 15 minutes with Claude — arrive with the right questions ready" },
  ],
  matrixFoot: {
    before: { label: "Current capacity", value: "Empty by 4pm" },
    after: { label: "AI-protected capacity", value: "Full. Present. Paid." },
  },

  testimonialsEyebrow: "Real Human Bridges. Real results.",
  testimonialsEyeColor: "eye-gold",
  caseStudies: [
    {
      name: "Sade A.",
      role: "Life Coach",
      location: "Lagos",
      result: "$750 in week one from work she was giving away free",
      quote: "I had been coaching informally for three years. Free sessions for friends, underpriced packages for anyone who found me. I wrote my offer, priced it at $250 for four sessions, and messaged six people I had been supporting for free. Three of them said yes that same day. I sat in my car and cried. Not from happiness — from the grief of realising what I had been giving away.",
    },
    {
      name: "Funmi O.",
      role: "Grief Facilitator turned Corporate Trainer",
      location: "Nigeria",
      result: "$4,500 first corporate contract",
      quote: "I ran free grief support groups for three years. An HR director pulled me aside after a session and told me her company paid $2,000 a day for the kind of facilitation I did for free. I used Claude to write my first corporate proposal. It landed. First contract: $4,500 for a half-day workshop. The prep took 90 minutes.",
    },
    {
      name: "Ngozi M.",
      role: "Wellbeing Community Founder",
      location: "UK",
      result: "$3,332/month recurring from a community she holds twice a month",
      quote: "I launched my paid community with 11 founding members at $49 a month. By month six I had 68 members. I run two live sessions a month. Claude writes the weekly content between sessions. I spend about four hours a month on the community. It earns $3,332 every month and it is the most joyful income I have ever made.",
    },
  ],

  incomeEyeColor: "eye-coral",
  incomeTitle: `How Human Bridges<br /><em>actually</em> earn with AI`,
  incomeSubheading: "Four income paths. Each one specific to how your archetype gives. Full breakdown inside the playbook.",
  incomePaths: [
    {
      label: "The 1:1 Coach",
      title: "Depth Premium",
      range: "$3k to $10k/month",
      desc: "Your clients pay for transformation, not time. AI elevates every session — deeper prep, richer follow-up, more consistent between-session support.",
      className: "coach",
      items: [
        "4-session packages: $250 to $500 to start",
        "Monthly retainer coaching: $500 to $2,000 per client",
        "VIP intensive day: $1,500 to $5,000",
        "6-month transformation programme: $3,000 to $8,000",
      ],
    },
    {
      label: "The Community Builder",
      title: "Recurring Belonging",
      range: "$2k to $8k/month",
      desc: "Your income recurs every month without acquiring new clients. You grow the community and the income grows with it.",
      className: "comm",
      items: [
        "Paid membership: $49 to $149/month per member",
        "20 members: $1,000 to $3,000/month recurring",
        "50 members: $2,500 to $7,500/month recurring",
        "Annual membership: 10 to 20% discount, full year upfront",
      ],
    },
    {
      label: "The Trainer",
      title: "Group Impact Premium",
      range: "$4k to $15k/month",
      desc: "One delivery serves many. AI builds your materials and handles all communication. You earn more per hour than any 1:1 model.",
      className: "trainer",
      blurred: true,
      items: [
        "Half-day corporate workshop: $1,500 to $5,000",
        "Full-day facilitation: $3,000 to $10,000",
        "Group programme: $500 to $2,000 per participant",
        "Ongoing training contract: $2,000 to $5,000/month",
      ],
    },
    {
      label: "The Counselor",
      title: "Trusted Practice",
      range: "$3k to $12k/month",
      desc: "Your work commands premium rates because trust is the barrier to entry. AI handles everything outside the session so you hold more without sacrificing quality.",
      className: "counselor",
      blurred: true,
      items: [
        "Individual sessions: $120 to $300 per session",
        "8-session programme: $1,200 to $2,400",
        "Corporate wellbeing contract: $2,000 to $6,000/month",
        "Group healing programme: $200 to $500 per participant",
      ],
    },
  ],
};

export default function HumanBridgePage() {
  return <ArchetypeResultLayout config={CONFIG} />;
}
