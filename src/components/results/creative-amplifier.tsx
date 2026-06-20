"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";


const CONFIG: ArchetypeConfig = {
  archetypeKey: "C",
    primaryColor: '#C94F2A',
  secondaryColor: '#0C6B51',
  navRgb: '201,79,42',
  heroGrad: 'linear-gradient(145deg,#5C1A0A 0%,#C94F2A 55%,#D4824A 100%)',
  ctaBg: 'var(--coral)',
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
