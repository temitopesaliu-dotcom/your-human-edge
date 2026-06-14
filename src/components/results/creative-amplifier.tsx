"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";

const CSS = `
:root {
  --coral:#C94F2A; --coral2:#E06040; --coral-soft:#FEF0EA;
  --ink:#1A0F38; --soft:#4a3f6b;
  --ivory:#FAF8F4; --paper:#F2EDE5;
  --gold:#C8940A; --gold2:#E8A020;
  --teal:#0C6B51; --teal-soft:#E1F5EE;
  --purple:#534AB7; --purple-soft:#EEEDFE;
  --blue:#1565C0; --blue-soft:#E8F0FE;
  --border:#E4DDD4;
}
.cr-amplifier *{margin:0;padding:0;box-sizing:border-box}
.cr-amplifier{font-family:'DM Sans',sans-serif;background:var(--ivory);color:var(--ink);overflow-x:hidden;line-height:1.72}
.cr-amplifier a{text-decoration:none;color:inherit}
.cr-amplifier .wrap{max-width:860px;margin:0 auto;padding:0 28px}

/* ── NAV (GrowthCatalyst style) ───────────────── */
.cr-amplifier nav {
  position:fixed; top:0; left:0; right:0; z-index:99;
  background:rgba(201,79,42,.96); backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,.1);
  padding:0 32px; display:flex; align-items:center; justify-content:space-between;
  height:62px;
}
.cr-amplifier .nav-logo {
  font-family:'Cormorant Garamond',serif; font-size:1.15rem;
  font-weight:500; color:#fff; letter-spacing:.06em;
}
.cr-amplifier .nav-links {
  display:flex; gap:24px; list-style:none; margin:0;
}
.cr-amplifier .nav-links a {
  color:rgba(255,255,255,.75); font-size:.85rem;
  font-family:'DM Sans',sans-serif; transition:color .2s;
}
.cr-amplifier .nav-links a:hover { color:#fff; }
.cr-amplifier .nav-cta {
  background:var(--ink); color:#fff; font-family:'DM Sans',sans-serif;
  font-size:.82rem; font-weight:500; padding:9px 22px; border-radius:40px;
  border:none; cursor:pointer; transition:all .2s; text-decoration:none;
}
.cr-amplifier .nav-cta:hover { background:#fff; color:var(--ink); transform:translateY(-1px); }

/* ── HERO (unchanged) ─────────────────────────── */
.cr-amplifier .hero{background:linear-gradient(145deg,#5C1A0A 0%,var(--coral) 55%,#D4824A 100%);padding:104px 28px 60px;text-align:center;position:relative;overflow:hidden}
.cr-amplifier .hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(255,255,255,.12),transparent 60%)}
.cr-amplifier .hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
.cr-amplifier .hero-greeting{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.55);margin-bottom:10px}
.cr-amplifier .hero-icon{font-size:3rem;display:block;margin-bottom:12px;animation:pop .5s cubic-bezier(.4,0,.2,1) both}
@keyframes pop{from{transform:scale(.2);opacity:0}to{transform:scale(1);opacity:1}}
.cr-amplifier .hero-eyebrow{font-size:.68rem;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.6);font-weight:500;margin-bottom:8px}
.cr-amplifier .hero-name{font-family:'Cormorant Garamond',serif;font-size:clamp(2.8rem,7vw,4.4rem);font-weight:700;color:#fff;line-height:1.05;margin-bottom:10px}
.cr-amplifier .hero-tagline{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:400;font-style:italic;color:rgba(255,255,255,.65);margin-bottom:28px}
.cr-amplifier .hero-sep{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:26px}
.cr-amplifier .hero-sep .line{width:60px;height:1px;background:rgba(255,255,255,.2)}
.cr-amplifier .hero-sep .dot{color:var(--gold2);font-size:.8rem}
.cr-amplifier .ceiling-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:20px 26px;text-align:left}
.cr-amplifier .ceiling-label{font-size:.66rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:8px;display:block}
.cr-amplifier .ceiling-box p{font-family:'DM Sans',sans-serif;font-size:.96rem;color:rgba(255,255,255,.82);line-height:1.76}
.cr-amplifier .ceiling-box strong{color:#fff;font-weight:600}
.cr-amplifier .ceiling-box em{color:var(--gold2);font-style:normal;font-weight:600}

/* ── SECTIONS & CARDS (unchanged) ─────────────── */
.cr-amplifier section{padding:60px 0}
.cr-amplifier .sec-alt{background:var(--paper)}
.cr-amplifier .sec-eye{font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:8px;margin-bottom:10px}
.cr-amplifier .sec-eye::before{content:'◆';font-size:.52rem}
.cr-amplifier .eye-coral{color:var(--coral)}.cr-amplifier .eye-coral::before{color:var(--coral)}
.cr-amplifier .eye-gold{color:var(--gold)}.cr-amplifier .eye-gold::before{color:var(--gold)}
.cr-amplifier .eye-teal{color:var(--teal)}.cr-amplifier .eye-teal::before{color:var(--teal)}
.cr-amplifier .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:700;color:var(--ink);line-height:1.12;margin-bottom:12px}
.cr-amplifier .sec-title em{font-style:italic;color:var(--coral)}
.cr-amplifier .sec-sub{font-size:.97rem;color:var(--soft);line-height:1.82;max-width:580px;margin-bottom:32px}
.cr-amplifier .card-wrap{background:#fff;border:1px solid var(--border);border-radius:14px;padding:28px 32px}
.cr-amplifier .who-text{font-family:'DM Sans',sans-serif;font-size:.97rem;color:var(--soft);line-height:1.82;margin-bottom:22px}
.cr-amplifier .chip-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
.cr-amplifier .chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:40px;font-size:.85rem;font-weight:400;background:var(--ivory);color:var(--ink);border:1.5px solid var(--border);transition:all .18s}
.cr-amplifier .chip:hover{background:var(--coral-soft);border-color:var(--coral);color:var(--coral)}
.cr-amplifier .matrix{border-radius:14px;overflow:hidden;border:1px solid var(--border)}
.cr-amplifier .matrix-head{display:grid;grid-template-columns:1fr 1fr;background:var(--ink)}
.cr-amplifier .mh{padding:13px 20px;font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-align:center}
.cr-amplifier .mh.before{color:rgba(255,255,255,.4);border-right:1px solid rgba(255,255,255,.08)}
.cr-amplifier .mh.after{color:var(--gold2)}
.cr-amplifier .matrix-row{display:grid;grid-template-columns:1fr 1fr;background:#fff;border-bottom:1px solid var(--border)}
.cr-amplifier .matrix-row:last-child{border-bottom:none}
.cr-amplifier .matrix-row:hover .mc{background:#FFF8F5}
.cr-amplifier .mc{padding:15px 20px;font-size:.9rem;line-height:1.55;display:flex;align-items:flex-start;gap:10px}
.cr-amplifier .mc.before{color:var(--soft);border-right:1px solid var(--border)}
.cr-amplifier .mc.before::before{content:'✗';color:#E53935;font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.cr-amplifier .mc.after{color:var(--ink);font-weight:500}
.cr-amplifier .mc.after::before{content:'✓';color:var(--teal);font-size:.82rem;flex-shrink:0;font-weight:700;margin-top:2px}
.cr-amplifier .matrix-foot{display:grid;grid-template-columns:1fr 1fr;background:var(--coral-soft)}
.cr-amplifier .mf{padding:16px 20px;text-align:center}
.cr-amplifier .mf.before{border-right:1px solid var(--border)}
.cr-amplifier .mf-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:4px}
.cr-amplifier .mf-val{font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:700}
.cr-amplifier .mf.before .mf-val{color:#E53935}
.cr-amplifier .mf.after .mf-val{color:var(--teal)}
.cr-amplifier .career-table{width:100%;border-collapse:collapse;background:#fff;border-radius:12px;overflow:hidden;border:1px solid var(--border)}
.cr-amplifier .career-table th{background:var(--ink);color:#fff;padding:11px 16px;text-align:left;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;font-weight:500}
.cr-amplifier .career-table td{padding:13px 16px;border-bottom:1px solid var(--border);font-size:.9rem;vertical-align:top}
.cr-amplifier .career-table tr:last-child td{border-bottom:none}
.cr-amplifier .career-table tr:hover td{background:var(--ivory)}
.cr-amplifier .career-table td:first-child{font-weight:600;color:var(--ink)}
.cr-amplifier .earn-pill{display:inline-block;background:var(--coral-soft);color:var(--coral);border-radius:6px;padding:3px 10px;font-size:.78rem;font-weight:600}
.cr-amplifier .testimonials{display:flex;flex-direction:column;gap:14px;margin-top:4px}
.cr-amplifier .testi{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px 24px;border-left:4px solid var(--coral)}
.cr-amplifier .testi:nth-child(2){border-left-color:var(--purple)}
.cr-amplifier .testi:nth-child(3){border-left-color:var(--gold)}
.cr-amplifier .testi-quote{font-family:'Cormorant Garamond',serif;font-size:1.06rem;font-style:italic;color:var(--ink);line-height:1.7;margin-bottom:14px}
.cr-amplifier .testi-meta{display:flex;align-items:center;gap:12px}
.cr-amplifier .testi-avatar{width:38px;height:38px;border-radius:50%;background:var(--coral-soft);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:700;color:var(--coral);flex-shrink:0}
.cr-amplifier .testi:nth-child(2) .testi-avatar{background:var(--purple-soft);color:var(--purple)}
.cr-amplifier .testi:nth-child(3) .testi-avatar{background:#FFFDE7;color:var(--gold)}
.cr-amplifier .testi-name{font-weight:500;font-size:.88rem;color:var(--ink)}
.cr-amplifier .testi-role{font-size:.78rem;color:var(--soft)}
.cr-amplifier .testi-result{margin-top:10px;padding:7px 14px;border-radius:8px;background:var(--coral-soft);display:inline-flex;align-items:center;gap:6px;font-size:.78rem;font-weight:600;color:var(--coral)}
.cr-amplifier .testi:nth-child(2) .testi-result{background:var(--purple-soft);color:var(--purple)}
.cr-amplifier .testi:nth-child(3) .testi-result{background:#FFFDE7;color:var(--gold)}
.cr-amplifier .testi-result::before{content:'◆';font-size:.52rem}
.cr-amplifier .income-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;position:relative}
.cr-amplifier .income-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px}
.cr-amplifier .income-card.visual{border-top:4px solid var(--coral)}
.cr-amplifier .income-card.content{border-top:4px solid var(--purple)}
.cr-amplifier .income-card.audio{border-top:4px solid var(--blue)}
.cr-amplifier .income-card.writer{border-top:4px solid var(--teal)}
.cr-amplifier .ic-label{font-size:.64rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;margin-bottom:5px}
.cr-amplifier .income-card.visual .ic-label{color:var(--coral)}
.cr-amplifier .income-card.content .ic-label{color:var(--purple)}
.cr-amplifier .income-card.audio .ic-label{color:var(--blue)}
.cr-amplifier .income-card.writer .ic-label{color:var(--teal)}
.cr-amplifier .ic-title{font-family:'Cormorant Garamond',serif;font-size:1.12rem;font-weight:700;color:var(--ink);margin-bottom:5px}
.cr-amplifier .ic-range{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:700;margin-bottom:8px}
.cr-amplifier .income-card.visual .ic-range{color:var(--coral)}
.cr-amplifier .income-card.content .ic-range{color:var(--purple)}
.cr-amplifier .income-card.audio .ic-range{color:var(--blue)}
.cr-amplifier .income-card.writer .ic-range{color:var(--teal)}
.cr-amplifier .ic-desc{font-size:.82rem;color:var(--soft);line-height:1.55;margin-bottom:10px}
.cr-amplifier .ic-list{list-style:none}
.cr-amplifier .ic-list li{font-size:.8rem;color:var(--soft);padding:5px 0 5px 15px;position:relative;border-bottom:1px solid var(--border);line-height:1.45}
.cr-amplifier .ic-list li:last-child{border-bottom:none}
.cr-amplifier .ic-list li::before{content:'→';position:absolute;left:0;font-size:.72rem}
.cr-amplifier .income-card.visual .ic-list li::before{color:var(--coral)}
.cr-amplifier .income-card.content .ic-list li::before{color:var(--purple)}
.cr-amplifier .income-card.audio .ic-list li::before{color:var(--blue)}
.cr-amplifier .income-card.writer .ic-list li::before{color:var(--teal)}
.cr-amplifier .income-blur-wrap{position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}
.cr-amplifier .blur-overlay{position:absolute;bottom:0;left:0;right:0;height:58%;background:linear-gradient(to bottom,transparent 0%,rgba(250,248,244,.96) 50%,var(--ivory) 100%);z-index:2;pointer-events:none}
.cr-amplifier #paywall{background:var(--ink);padding:64px 28px;scroll-margin-top:70px}
.cr-amplifier .paywall-inner{max-width:680px;margin:0 auto;text-align:center}
.cr-amplifier .pw-pre{font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold2);font-weight:600;margin-bottom:14px}
.cr-amplifier .pw-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:16px;letter-spacing:-.01em}
.cr-amplifier .pw-title em{font-style:italic;color:var(--gold2)}
.cr-amplifier .pw-sub{font-size:.97rem;color:rgba(255,255,255,.58);line-height:1.82;max-width:500px;margin:0 auto 36px}
.cr-amplifier .pw-sub em{font-style:italic;color:rgba(255,255,255,.85)}
.cr-amplifier .pw-price-was{font-size:.88rem;color:rgba(255,255,255,.28);text-decoration:line-through;margin-bottom:5px}
.cr-amplifier .pw-price{font-family:'Cormorant Garamond',serif;font-size:4rem;font-weight:700;color:var(--gold2);line-height:1;margin-bottom:14px}
.cr-amplifier .pw-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(232,160,32,.1);border:1px solid rgba(232,160,32,.28);border-radius:40px;padding:6px 18px;font-size:.8rem;font-weight:600;color:var(--gold2);margin-bottom:28px}
.cr-amplifier .btn-buy{display:inline-flex;align-items:center;gap:10px;background:var(--coral);color:#fff;font-family:'DM Sans',sans-serif;font-size:1.08rem;font-weight:600;padding:17px 48px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;text-decoration:none;letter-spacing:.02em}
.cr-amplifier .btn-buy:hover{background:var(--gold2);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 40px rgba(201,79,42,.4)}
.cr-amplifier .pw-trust{font-size:.82rem;color:rgba(255,255,255,.35);margin-top:16px;font-family:'DM Sans',sans-serif}

/* ── FOOTER (GrowthCatalyst style) ────────────── */
.cr-amplifier footer {
  background:var(--ink); border-top:1px solid rgba(255,255,255,.06);
  color:rgba(255,255,255,.4); padding:20px 32px;
  display:flex; align-items:center; justify-content:space-between;
  flex-wrap:wrap; gap:12px;
}
.cr-amplifier .footer-brand {
  font-family:'Cormorant Garamond',serif; font-size:1rem;
  font-weight:500; color:rgba(255,255,255,.7);
}
.cr-amplifier .footer-brand span { color:var(--gold2); }
.cr-amplifier footer .footer-brand + div { font-size:.7rem; opacity:0.25; }

@media(max-width:600px){
  .cr-amplifier .income-grid{grid-template-columns:1fr}
  .cr-amplifier .matrix-head,.cr-amplifier .matrix-row,.cr-amplifier .matrix-foot{grid-template-columns:1fr}
  .cr-amplifier .mh.before,.cr-amplifier .mc.before,.cr-amplifier .mf.before{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  .cr-amplifier nav{padding:0 14px;height:56px;gap:8px}
  .cr-amplifier .nav-links{display:none}
  .cr-amplifier .nav-logo{font-size:.95rem}
  .cr-amplifier .nav-cta{font-size:.74rem;padding:7px 14px}
  .cr-amplifier .hero{padding:88px 16px 40px}
  .cr-amplifier section{padding:36px 0}
  .cr-amplifier .wrap{padding:0 16px}
  .cr-amplifier .card-wrap{padding:22px 18px}
  .cr-amplifier .ceiling-box{padding:16px 18px}
  .cr-amplifier .testi{padding:18px 16px}
  .cr-amplifier .income-card{padding:18px}
  .cr-amplifier .paywall-inner{padding:0}
  .cr-amplifier .pw-sub{margin-bottom:24px}
  .cr-amplifier .btn-buy{padding:14px 32px;font-size:.95rem;width:100%;justify-content:center}
  .cr-amplifier .pw-price{font-size:3rem}
  .cr-amplifier section:last-of-type{padding-bottom:12px}
  .cr-amplifier #paywall{padding:12px 16px;scroll-margin-top:56px}
  .cr-amplifier footer{padding:16px 14px;flex-direction:column;text-align:center;gap:6px}
}
`;

const CONFIG: ArchetypeConfig = {
  archetypeKey: "C",
  css: CSS,
  wrapperClass: "cr-amplifier",

  icon: "🎨",
  name: "Creative Amplifier",
  tagline: "You see the finished thing before you have made it. AI closes the gap between the vision and the world.",
  ceilingLabel: "Your human edge · and your current bottleneck",
  ceilingContent: `You have more ideas than most people will have in a lifetime. You see the finished piece before you start. You hold a standard for your work that most people cannot even perceive. But right now, <strong>the gap between the vision and the finished thing</strong> is costing you income, audience, and impact. Your ideas are sitting in a notes app. <em>The world has not seen them yet.</em> That is not a creativity problem. That is a production infrastructure problem.`,

  whoYouAre: "You notice things other people walk past. You find meaning in unexpected places and feel compelled to capture it, transform it, and share it in a way that makes people feel something. That intelligence — aesthetic, emotional, and visual — is extraordinarily rare. In a world being flooded with generic AI content, the human with genuine taste and an original point of view is more valuable than ever. You are not behind. You are the answer to what is missing.",
  whoEyeColor: "eye-coral",
  strengths: ["Original Vision", "Emotional Resonance", "Eye for Detail", "Aesthetic Intelligence", "Idea Generation", "Unique Voice"],
  strengthsEyeColor: "eye-coral",

  careerSubtitle: "exactly how you create",
  careers: [
    { title: "Digital Product Creator", desc: "Package your creative skills: preset packs, templates, guides, courses. Build once, sell to many.", earn: "$500–$10k/mo" },
    { title: "Brand Content Partner", desc: "Brands pay you to create content that feels native. Your creative credibility is the product.", earn: "$1k–$10k per deal" },
    { title: "Paid Newsletter or Community", desc: "Share your creative perspective consistently. Audience grows. Launch a paid tier or community.", earn: "$500–$8k/mo" },
    { title: "Podcast Monetisation", desc: "Your voice and audience are the product. Descript handles editing. Claude writes all surrounding content.", earn: "$500–$5k per episode" },
    { title: "Freelance Creative Services", desc: "Photography, video, writing, design for clients. AI handles proposals, admin, post-production.", earn: "$2k–$15k/mo" },
    { title: "Creative Education", desc: "Teach your craft. Online course, workshop, mentorship. AI builds the curriculum. You deliver.", earn: "$1k–$20k/launch" },
  ],

  matrixSectionTitle: "The production gap",
  matrixTitle: `What AI actually closes<br /><em>for your specific archetype</em>`,
  matrixSubheading: "This is not a tool list. This is the exact before and after for a Creative Amplifier who implements the playbook in 90 days.",
  matrixEyeColor: "eye-coral",
  beforeAfter: [
    { before: "1 idea → 1 post, if you have the time and energy to finish it", after: "1 voice memo → 14 pieces of content across platforms in 20 minutes" },
    { before: "Video editing: 3 to 4 hours per piece, technical barrier", after: "Video editing: 30 minutes — CapCut AI handles captions, cuts, sync" },
    { before: "Creative brief: hours of scattered thinking, often never resolved", after: "Creative brief: 15 minutes — describe the idea, Claude structures it" },
    { before: "Newsletter: takes most of a day, often skipped or delayed", after: "Newsletter: 20 minutes from a voice memo, in your exact voice" },
    { before: "Digital product: months of building in isolation, never launched", after: "Digital product: live in 14 days with Claude writing the content and copy" },
  ],
  matrixFoot: {
    before: { label: "Ideas that exist in the world", value: "Almost none" },
    after: { label: "Ideas that exist and earn", value: "Every week" },
  },

  testimonialsEyebrow: "Real Creative Amplifiers. Real results.",
  testimonialsEyeColor: "eye-gold",
  caseStudies: [
    {
      name: "Chidi A.",
      role: "Filmmaker",
      location: "Lagos",
      result: "9 years in his head → 80,000 views in month one",
      quote: "I had the same film in my head for nine years. Not vaguely. Specifically. I could tell you the opening shot. I had tried to make it three times. Each time the production cost made it feel impossible before I started. I found the right tools. I made a four-minute short on my phone. 80,000 views in the first month. Then the brand deals started.",
    },
    {
      name: "Adaeze K.",
      role: "Essay Writer",
      location: "UK",
      result: "$1,683/month recurring from writing she was already doing for free",
      quote: "I had been writing essays in private for years. A friend read one and said: I would pay for this. I set up a Beehiiv newsletter. Claude helped me write the weekly edition in my voice. Within 90 days I had 2,400 subscribers. I launched a paid tier at $9 a month. 187 people upgraded in the first week. That is $1,683 a month from writing I was already doing for free.",
    },
    {
      name: "Ola M.",
      role: "Content Creator",
      location: "UK",
      result: "$6,200 first product launch · 2,400 subscribers in 90 days",
      quote: "I went from 2 posts a week to 14 pieces of content from a single 20-minute voice memo. My email list went from 180 to 2,400 in 90 days. First digital product launch: $6,200 in 72 hours. I had been making content for two years. The only thing that changed was having the right production system.",
    },
  ],

  incomeEyeColor: "eye-teal",
  incomeTitle: `How Creative Amplifiers<br /><em>actually</em> earn with AI`,
  incomeSubheading: "Four income paths. Each one specific to how your archetype creates. Full breakdown inside the playbook.",
  incomePaths: [
    {
      label: "The Visual Creator",
      title: "Visual Premium",
      range: "$2k to $20k/month",
      desc: "Your eye and aesthetic are the product. AI accelerates every part of production except the creative decision itself.",
      className: "visual",
      items: ["Freelance photography or video: $500 to $3,000 per project", "Brand content partnership: $1,000 to $10,000 per campaign", "Preset or template pack: $27 to $197 per pack", "Photo or film licensing: $200 to $5,000 per licence"],
    },
    {
      label: "The Content Creator",
      title: "Audience Leverage",
      range: "$1k to $30k/month",
      desc: "Your audience is the asset. AI keeps you consistent enough to build it. Income comes from multiple directions simultaneously.",
      className: "content",
      items: ["Brand deals: $500 to $10,000 per post at scale", "Paid community: $49 to $99/month per member", "Digital products: $27 to $497 per product", "Platform ad revenue: grows with audience"],
    },
    {
      label: "The Audio Creator",
      title: "Voice Value",
      range: "$1k to $15k/month",
      desc: "Your voice and perspective are rare. A loyal listening audience pays in multiple ways once you show up consistently.",
      className: "audio",
      blurred: true,
      items: ["Podcast sponsorships: $25 to $50 per 1,000 downloads", "Premium podcast tier: $5 to $20/month per subscriber", "Voiceover work: $500 to $3,000 per project", "Audio course or masterclass: $97 to $500"],
    },
    {
      label: "The Writer",
      title: "Words as Equity",
      range: "$2k to $25k/month",
      desc: "Your perspective compounds over time. Every piece adds to a body of work attracting new readers, clients, and opportunities.",
      className: "writer",
      blurred: true,
      items: ["Paid newsletter: $7 to $20/month per subscriber", "Ghostwriting: $2,000 to $10,000 per project", "Brand copywriting: $1,000 to $5,000 per project", "Book advance or self-publishing: variable"],
    },
  ],
};

export default function CreativeAmplifierPage() {
  return <ArchetypeResultLayout config={CONFIG} />;
}
