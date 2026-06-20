"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";

const CONFIG: ArchetypeConfig = {
  archetypeKey: "G",
  wrapperClass: "growth-catalyst",

  primaryColor: '#1565C0',
secondaryColor: '#0C6B51',
navRgb: '21,101,192',
heroGrad: 'linear-gradient(145deg,#0D2B6B 0%,#1565C0 55%,#534AB7 100%)',
ctaBg: 'var(--coral)',

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
