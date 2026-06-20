"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";


const CONFIG: ArchetypeConfig = {
  archetypeKey: "H",
  wrapperClass: "human-bridge",

  primaryColor: '#0C6B51',
secondaryColor: '#0C6B51',  // same as primary for human bridge
navRgb: '12,107,81',
heroGrad: 'linear-gradient(145deg,#064332 0%,#0C6B51 55%,#1B6B8A 100%)',
ctaBg: '#0F8A68',
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
