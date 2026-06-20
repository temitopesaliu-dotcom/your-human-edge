"use client";

import ArchetypeResultLayout, {
  type ArchetypeConfig,
} from "@/components/results/archetype-layout";


const CONFIG: ArchetypeConfig = {
  archetypeKey: "S",
  wrapperClass: "systems-architect",

  primaryColor: '#534AB7',
secondaryColor: '#0C6B51',
navRgb: '83,74,183',
heroGrad: 'linear-gradient(145deg,#2A2470 0%,#534AB7 55%,#8B7FD4 100%)',
ctaBg: 'var(--gold2)',

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
