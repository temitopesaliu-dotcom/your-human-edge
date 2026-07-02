"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const Q = [
  {
    key: "domain",
    text: "What is the primary domain you work in?",
    hint: "Pick the closest match. This shapes every recommendation you receive.",
    type: "options",
    options: [
      "Business / Strategy / Consulting",
      "Marketing / Branding / Communications",
      "Finance / Accounting / Investment",
      "HR / People / Talent / L&D",
      "Legal / Compliance / Risk",
      "Health / Wellness / Medicine",
      "Education / Training / Coaching",
      "Technology / Product / Engineering",
      "Creative / Design / Content",
      "Operations / Supply Chain / Logistics",
      "Sales / Business Development",
      "Other",
    ],
  },
  {
    key: "years",
    text: "How many years have you been doing this?",
    hint: "Your experience depth determines the premium your intelligence layer can command.",
    type: "options",
    options: [
      "1 to 3 years",
      "4 to 7 years",
      "8 to 12 years",
      "13 to 20 years",
      "20 years or more",
    ],
  },
  {
    key: "role",
    text: "Which best describes where you operate right now?",
    hint: "",
    type: "options",
    options: [
      "Employed full-time",
      "Freelancer or independent consultant",
      "Business owner or founder",
      "Coach or trainer",
      "In transition between roles",
      "Multiple of the above",
    ],
  },
  {
    key: "problem",
    text: "When people come to you, what is the core problem they bring?",
    hint: "1 to 2 sentences. This becomes the foundation of your AI-powered offer. Example: I help companies figure out why their teams are not performing.",
    type: "textarea",
    placeholder: "Describe the core problem you solve...",
  },
  {
    key: "goal",
    text: "What do you most want AI to help you achieve?",
    hint: "Be honest. There is no wrong answer. The output changes based on what you select.",
    type: "options",
    options: [
      "Earn more in my current job or role",
      "Launch a consulting or advisory offer",
      "Build a coaching programme or course",
      "Create a productised service at scale",
      "Start a side hustle without leaving my job",
      "All of the above \u2014 I need a starting point",
    ],
  },
  {
    key: "aiLevel",
    text: "Where are you honestly right now with AI?",
    hint: "",
    type: "options",
    options: [
      "I use it occasionally but not strategically",
      "I use it daily for tasks but not to make money",
      "I have thought about monetising it but do not know where to start",
      "I have started but my approach feels scattered",
      "I am ready to build something structured and I need the blueprint",
    ],
  },
  {
    key: "time",
    text: "How much time can you realistically give to building this, outside your current commitments?",
    hint: "Your 30-day action plan scales to this. No false promises.",
    type: "options",
    options: [
      "Less than 3 hours a week",
      "3 to 7 hours a week",
      "7 to 15 hours a week",
      "More than 15 hours a week",
    ],
  },
];

const LAYERS: Record<string, string> = {
  Business:
    "Your Intelligence Layer is your ability to see around corners \u2014 to spot what is breaking in a business before the numbers confirm it. That is not a consultancy skill, that is a pattern library built from years of exposure. AI does not replicate that. It takes your diagnostic instinct and turns it into a deliverable system \u2014 audits, frameworks, and decision tools that work without you in the room.",
  Marketing:
    "Your Intelligence Layer is your ability to read what an audience actually wants versus what they say they want \u2014 and to close the gap. That takes taste, lived experience, and a cultural antenna that cannot be prompted. AI does not replace that. It takes your strategic instincts and turns them into campaigns, content systems, and brand frameworks that scale beyond your own hours.",
  Finance:
    "Your Intelligence Layer is your ability to translate numbers into decisions \u2014 to tell a founder what the spreadsheet actually means and what they should do about it. That is not accounting. That is judgment. AI handles the model building, the scenario analysis, the data structuring \u2014 freeing you to deliver the interpretation your clients are actually paying for.",
  HR: "Your Intelligence Layer is your ability to read people dynamics and organisational systems simultaneously \u2014 to diagnose what is causing attrition, disengagement, or underperformance when everyone else is looking at the wrong variable. AI does not replicate that. It takes your diagnostic frameworks and makes them deliverable at a scale no human team can match alone.",
  Legal: "Your Intelligence Layer is your ability to hold complexity and risk in tension \u2014 to understand not just what the law says but what a client should actually do given their specific exposure. AI handles the research, the document review, the precedent mapping \u2014 and frees you to deliver the advice that actually matters.",
  Health: "Your Intelligence Layer is your ability to see the whole person behind the presenting symptom \u2014 to hold clinical knowledge and human context simultaneously. AI handles the documentation, the research, the education materials \u2014 freeing you to do the high-value work only you can do.",
  Education:
    "Your Intelligence Layer is your ability to meet learners where they are and design the path that actually works \u2014 not the one that looks good on a curriculum map. AI does not replace that. It takes your learning design instincts and turns them into scalable programmes, personalised content, and diagnostic tools that serve hundreds simultaneously.",
  Technology:
    "Your Intelligence Layer is your ability to translate between what a business needs and what a system can do \u2014 the most valuable skill in any technology organisation. AI handles the execution, the documentation, the code scaffolding \u2014 and frees you to do the architecture and decision-making that determines whether the thing actually works.",
  Creative:
    "Your Intelligence Layer is your taste \u2014 your ability to make creative judgements that land with real audiences, built from years of iteration and cultural attunement. AI produces volume. You produce meaning. The opportunity is to use AI for execution and output while you own the strategy, the vision, and the creative direction that makes the work worth paying for.",
  Operations:
    "Your Intelligence Layer is your ability to see the whole system and identify the one lever that actually matters. AI maps the processes, runs the data, surfaces the patterns \u2014 and frees you to do the high-level problem-solving your clients are actually paying for.",
  Sales: "Your Intelligence Layer is your ability to build trust under pressure \u2014 to read a room, anticipate an objection, and close without forcing it. AI handles the research, the outreach, the follow-up sequencing \u2014 and frees you to spend your best hours on the conversations that actually convert.",
};

type StackItem = { i: string; n: string; d: string };
const STACKS: Record<string, StackItem[]> = {
  Business: [
    {
      i: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6",
      n: "Diagnostic layer",
      d: "Turn your intake questions into a structured Business Health Audit using Claude. What used to take three discovery calls happens in 48 hours \u2014 before the engagement even starts.",
    },
    {
      i: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
      n: "Delivery layer",
      d: "Package your frameworks into a client-facing Notion workspace or custom GPT. Your thinking becomes a product clients navigate between sessions \u2014 not just your time.",
    },
    {
      i: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
      n: "Outreach layer",
      d: "Use AI-written sequencing to reach founders and operators at the right growth stage. Six right conversations a month is enough to fill a consulting practice.",
    },
  ],
  Marketing: [
    {
      i: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
      n: "Strategy layer",
      d: "Turn one positioning session into a full brand architecture document using AI \u2014 messaging hierarchy, audience segments, channel strategy. Hours of work delivered in one day.",
    },
    {
      i: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
      n: "Content engine",
      d: "Build a content system where your strategic direction feeds AI execution. You make the creative decisions; AI handles the volume, formatting, and scheduling.",
    },
    {
      i: "M18 20V10M12 20V4M6 20v-6",
      n: "Audit layer",
      d: "Run brand and content audits for new clients in under 24 hours using AI analysis. What used to be a discovery phase becomes a lead magnet.",
    },
  ],
  Finance: [
    {
      i: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
      n: "Modelling layer",
      d: "Build financial models, scenario analyses, and projections faster than any associate team using AI. You own the interpretation; AI owns the construction.",
    },
    {
      i: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8M16 17H8M10 9H8",
      n: "Reporting layer",
      d: "Turn raw data into board-ready narrative reports in hours. AI handles structure and language; you add the strategic judgement that makes it actionable.",
    },
    {
      i: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
      n: "Client layer",
      d: "Build an AI-powered client onboarding system that delivers a personalised financial health audit before the first advisory session \u2014 instant perceived value at premium prices.",
    },
  ],
  HR: [
    {
      i: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5h6 M9 12l2 2 4-4",
      n: "Diagnostic layer",
      d: "Turn your people assessment frameworks into an Organisational Health Audit using Claude. Deliver it in 48 hours, charge as a standalone product, or use it as your discovery process.",
    },
    {
      i: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      n: "Programme layer",
      d: "Package your training content and methodologies into a custom GPT your clients use between sessions. Your frameworks, available around the clock.",
    },
    {
      i: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z",
      n: "Outreach layer",
      d: "Use AI sequencing to reach HR Directors and People Leads at growing companies. Six right conversations a month is enough to fill a people advisory practice.",
    },
  ],
};
const DEFAULT_STACK = STACKS.Business;

const PRICING: Record<
  string,
  {
    intro: string;
    items: { l: string; v: string; n: string }[];
    close: string;
  }
> = {
  "Earn more in my current job or role": {
    intro: "With your background, here is what the market will pay for AI-enhanced versions of what you already do:",
    items: [
      {
        l: "Efficiency premium",
        v: "20% to 40% rate increase",
        n: "Same role, AI-enhanced delivery speed",
      },
      {
        l: "Internal consulting",
        v: "$2,000 to $5,000",
        n: "AI-powered audits and reports for your organisation",
      },
      {
        l: "Side advisory",
        v: "$500 to $1,500/month",
        n: "2 to 3 external advisory hours using your AI stack",
      },
    ],
    close: "You do not need to leave your job to start. One internal project or one external client is the proof of concept.",
  },
  "Launch a consulting or advisory offer": {
    intro: "Someone with your background, packaging their expertise this way, can credibly charge:",
    items: [
      {
        l: "Sprint engagement",
        v: "$2,500 to $5,000",
        n: "4-week intensive using your methodology",
      },
      {
        l: "Advisory retainer",
        v: "$1,000 to $2,500/month",
        n: "5 clients = $60K to $150K per year alongside your job",
      },
      {
        l: "Entry audit product",
        v: "$500 to $1,500",
        n: "Standalone diagnostic \u2014 no delivery time once built",
      },
    ],
    close: "You need one client and one offer. Everything else is scale.",
  },
  "Build a coaching programme or course": {
    intro: "Productising your expertise with AI means your time is no longer the bottleneck. Here is what that unlocks:",
    items: [
      {
        l: "Signature programme",
        v: "$1,000 to $2,500",
        n: "Cohort or self-paced \u2014 50 students = $50K to $125K",
      },
      {
        l: "Diagnostic toolkit",
        v: "$297 to $697",
        n: "Low-touch product, high volume, no delivery time",
      },
      {
        l: "Done-with-you tier",
        v: "$3,000 to $7,500",
        n: "Premium cohort with implementation support",
      },
    ],
    close: "The methodology is yours. AI makes it deliverable to 100 people instead of 10.",
  },
  "Create a productised service at scale": {
    intro: "Productising your expertise with AI means your time is no longer the bottleneck. Here is what that unlocks:",
    items: [
      {
        l: "Productised offer",
        v: "$1,500 to $3,500",
        n: "Same result, AI-delivered, no extra hours per client",
      },
      {
        l: "Retainer tier",
        v: "$800 to $2,000/month",
        n: "Ongoing access to your AI-powered delivery system",
      },
      {
        l: "Premium build",
        v: "$5,000 to $10,000",
        n: "Done-for-you implementation of your methodology",
      },
    ],
    close: "The methodology is yours. AI makes it deliverable to 100 people instead of 10.",
  },
  "Start a side hustle without leaving my job": {
    intro: "You do not need to go all-in to start. Here is what one side offer built on your expertise can generate:",
    items: [
      {
        l: "First client",
        v: "$500 to $1,500",
        n: "One problem, one person \u2014 proof of concept",
      },
      {
        l: "Monthly recurring",
        v: "$1,500 to $4,000/month",
        n: "3 to 5 small retainers alongside your main income",
      },
      {
        l: "Productised offer",
        v: "$197 to $497",
        n: "Scalable once validated \u2014 no extra hours to deliver",
      },
    ],
    close: "One buyer. One result. That is all you need to start. The system builds from there.",
  },
  "All of the above \u2014 I need a starting point": {
    intro: "Someone with your background, packaging their expertise this way, can credibly charge:",
    items: [
      {
        l: "Consulting sprint",
        v: "$2,500 to $5,000",
        n: "4-week engagement using your methodology",
      },
      {
        l: "Advisory retainer",
        v: "$1,000 to $2,500/month",
        n: "5 clients = $60K to $150K per year alongside your job",
      },
      {
        l: "Entry product",
        v: "$297 to $697",
        n: "Scalable offer that earns without your direct time",
      },
    ],
    close: "You need one client and one offer. The workshop gives you both in one session.",
  },
};

const STEPS: Record<string, { w: string; a: string }[]> = {
  "Less than 3 hours a week": [
    {
      w: "Week 1",
      a: "Write down the 3 problems you solve better than anyone you know. Use AI to help you articulate them clearly. This is your offer premise.",
    },
    {
      w: "Week 2",
      a: "Use Claude to turn your top problem into a one-page framework. This becomes your first lead magnet or intake document.",
    },
    {
      w: "Weeks 3 to 4",
      a: "Have 2 conversations with people in your network who have that problem. Not to sell. To validate. AI helps you prepare the questions.",
    },
  ],
  "3 to 7 hours a week": [
    {
      w: "Week 1",
      a: "Document your core methodology \u2014 the 3 to 5 steps you take with every client or problem. Feed it to AI. See what it builds.",
    },
    {
      w: "Week 2",
      a: "Build your first AI-enhanced deliverable \u2014 a diagnostic, an audit framework, or a structured output template. This is your product prototype.",
    },
    {
      w: "Weeks 3 to 4",
      a: "Have 3 to 5 validation conversations. Make your first offer, even informally. The feedback from one real conversation is worth ten hours of planning.",
    },
  ],
  "7 to 15 hours a week": [
    {
      w: "Week 1",
      a: "Map your full Intelligence Layer \u2014 the problems you solve, the frameworks you use, the results you create. This becomes your offer architecture.",
    },
    {
      w: "Week 2",
      a: "Build your AI infrastructure: diagnostic tool, delivery template, and one outreach sequence. The full stack, rough version.",
    },
    {
      w: "Weeks 3 to 4",
      a: "Make 5 to 10 targeted outreach attempts to ideal clients. Close your first paid engagement. Refine the system from the feedback.",
    },
  ],
  "More than 15 hours a week": [
    {
      w: "Week 1",
      a: "Fully map and document your Intelligence Layer. Build your complete offer stack \u2014 entry product, core offer, and premium tier \u2014 in draft form.",
    },
    {
      w: "Week 2",
      a: "Build all three infrastructure layers: diagnostic, delivery, and outreach. Test each one with a real interaction before week three.",
    },
    {
      w: "Weeks 3 to 4",
      a: "Launch. Tell your network, reach out to 15 to 20 ideal clients, and make real offers. Your first $2,000 to $5,000 month is within range.",
    },
  ],
};

const TIERS: Record<string, string> = {
  "1 to 3 years": "Emerging Expert",
  "4 to 7 years": "Developing Expert",
  "8 to 12 years": "Established Expert",
  "13 to 20 years": "Senior Expert",
  "20 years or more": "Rare Expert",
};

function domainKey(d: string): string {
  if (!d) return "Business";
  const m: Record<string, string> = {
    Business: "Business",
    Marketing: "Marketing",
    Finance: "Finance",
    HR: "HR",
    Legal: "Legal",
    Health: "Health",
    Education: "Education",
    Technology: "Technology",
    Creative: "Creative",
    Operations: "Operations",
    Sales: "Sales",
  };
  for (const k of Object.keys(m)) {
    if (d.includes(k)) return k;
  }
  return "Business";
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function StackIcon({ path }: { path: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export default function IntelHomePage() {
  const [screen, setScreen] = useState<"entry" | "quiz" | "gate" | "result">(
    "entry"
  );
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    badge: string;
    name: string;
    sub: string;
    layer: string;
    stack: StackItem[];
    pricing: { intro: string; items: { l: string; v: string; n: string }[]; close: string };
    steps: { w: string; a: string }[];
  } | null>(null);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (screen === "quiz" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [screen, cur]);

  const pct = Math.round(((cur + 1) / 7) * 100);
  const q = Q[cur];

  const handleScrollToQuiz = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("quiz")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const startQuiz = useCallback(() => {
    setScreen("quiz");
    setCur(0);
  }, []);

  const selectOption = useCallback(
    (key: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleTextarea = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value.trim() }));
  }, []);

  const goNext = useCallback(() => {
    if (cur < Q.length - 1) {
      setCur((c) => c + 1);
    } else {
      setScreen("gate");
    }
  }, [cur]);

  const goBack = useCallback(() => {
    if (cur > 0) setCur((c) => c - 1);
  }, [cur]);

  const revealResult = useCallback(async () => {
    // Fire-and-forget: add subscriber to FREE_INTELLIGENCE_LAYER group
    if (gateEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gateEmail)) {
      setGateSubmitting(true);
      try {
        await fetch("/api/intel-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: gateEmail, name: gateName }),
        });
      } catch (err) {
        console.error("[intel] subscribe failed:", err);
      }
      setGateSubmitting(false);
    }

    const tier = TIERS[answers.years] || "Established Expert";
    const domain = (answers.domain || "Business").split(" / ")[0];
    const dk = domainKey(domain);
    const pricing = PRICING[answers.goal] || PRICING["Launch a consulting or advisory offer"];
    const steps = STEPS[answers.time] || STEPS["3 to 7 hours a week"];
    const stack = STACKS[dk] || DEFAULT_STACK;
    const layer = LAYERS[dk] || LAYERS.Business;

    setResult({
      badge: `${tier} \u00B7 ${domain}`,
      name: `You are a ${tier} in ${domain}.`,
      sub: "Here is exactly how your expertise becomes an AI-powered offer \u2014 and what it is worth.",
      layer,
      stack,
      pricing,
      steps,
    });
    setScreen("result");
  }, [answers, gateEmail, gateName]);

  return (
    <>
      <style>{`
        :root {
          --white: #FFFFFF;
          --alabaster: #F8F7FC;
          --grain: #F5F5F3;
          --footer-bg: #EFECE6;
          --border: #E4E2ED;
          --purple: #7C3AED;
          --purple-light: #EDE9FD;
          --purple-mid: #C4B5FD;
          --green: #00A86B;
          --green-light: #E6F7F1;
          --text: #4A3E3D;
          --text-muted: #7A6E6D;
          --text-light: #A89E9D;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 20px;
          --shadow-sm: 0 1px 3px rgba(74,62,61,0.06), 0 1px 2px rgba(74,62,61,0.04);
          --shadow-md: 0 4px 16px rgba(74,62,61,0.08), 0 1px 4px rgba(74,62,61,0.04);
          --shadow-lg: 0 12px 40px rgba(74,62,61,0.12), 0 4px 12px rgba(74,62,61,0.06);
          --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--text); line-height: 1.6; min-height: 100vh; }
        .ilp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 max(2rem, calc((100vw - 1100px)/2)); height: 60px; display: flex; align-items: center; justify-content: flex-start; }
          .nav-tag {
    font-size: 11px; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--text-muted);
      margin-left: auto;
  }
        .ilp-nav-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--text); text-decoration: none; }
        .ilp-nav-logo span { color: var(--purple); }
        @media (max-width: 640px) {
          .ilp-nav { padding: 0 16px; height: 56px; }
          .ilp-nav-logo { font-size: 15px; }
        }
        .ilp-hero { padding: 120px 2rem 80px; text-align: center; background: var(--white); position: relative; overflow: hidden; }
        .ilp-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(ellipse 60% 50% at 50% 0%, #EDE9FD 0%, transparent 70%); pointer-events: none; }
        .ilp-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: var(--purple-light); border: 1px solid var(--purple-mid); border-radius: 999px; padding: 6px 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple); margin-bottom: 1.5rem; }
        .ilp-hero-eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: ilp-pulse 2s infinite; }
        @keyframes ilp-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .ilp-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 60px); font-weight: 700; line-height: 1.12; color: var(--text); margin-bottom: 1.25rem; letter-spacing: -1px; max-width: 760px; margin-left: auto; margin-right: auto; }
        .ilp-hero h1 em { font-style: italic; color: var(--purple); }
        .ilp-hero-sub { font-size: 18px; color: var(--text-muted); max-width: 520px; margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 400; }
        .ilp-hero-stats { display: flex; align-items: center; justify-content: center; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap; }
        .ilp-hero-stat { text-align: center; }
        .ilp-hero-stat-num { font-size: 28px; font-weight: 600; color: var(--text); letter-spacing: -0.5px; display: block; }
        .ilp-hero-stat-label { font-size: 12px; color: var(--text-muted); font-weight: 400; margin-top: 2px; }
        .ilp-hero-stat-div { width: 1px; height: 40px; background: var(--border); }
        .ilp-btn-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--purple); color: #fff; border: none; border-radius: var(--radius-sm); padding: 14px 28px; font-size: 15px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all var(--transition); letter-spacing: -0.2px; font-family: 'Inter', sans-serif; }
        .ilp-btn-primary:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .ilp-btn-primary:active { transform: translateY(0); }
        .ilp-quiz-section { background: var(--alabaster); border-top: 1px solid var(--border); padding: 80px 1.5rem; }
        .ilp-quiz-card { max-width: 680px; margin: 0 auto; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; }
        .ilp-quiz-header { padding: 32px 40px 24px; border-bottom: 1px solid var(--border); background: var(--white); }
        .ilp-progress-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .ilp-progress-track { flex: 1; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .ilp-progress-fill { height: 100%; background: var(--purple); border-radius: 2px; transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }
        .ilp-progress-text { font-size: 12px; font-weight: 500; color: var(--text-muted); white-space: nowrap; }
        .ilp-quiz-body { padding: 36px 40px 32px; }
        .ilp-q-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple); margin-bottom: 10px; }
        .ilp-q-text { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; line-height: 1.35; color: var(--text); margin-bottom: 6px; letter-spacing: -0.3px; }
        .ilp-q-hint { font-size: 13px; color: var(--text-muted); margin-bottom: 28px; line-height: 1.6; }
        .ilp-options-grid { display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }
        .ilp-opt-btn { display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; text-align: left; width: 100%; transition: all var(--transition); color: var(--text); font-size: 14px; font-weight: 400; font-family: 'Inter', sans-serif; }
        .ilp-opt-btn:hover { border-color: var(--purple-mid); background: var(--purple-light); color: var(--purple); }
        .ilp-opt-btn.selected { border-color: var(--purple); background: var(--purple-light); color: var(--purple); font-weight: 500; }
        .ilp-opt-radio { width: 18px; height: 18px; min-width: 18px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all var(--transition); flex-shrink: 0; }
        .ilp-opt-btn.selected .ilp-opt-radio { border-color: var(--purple); background: var(--purple); }
        .ilp-opt-btn.selected .ilp-opt-radio::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: white; }
        .ilp-textarea { width: 100%; padding: 14px 16px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--grain); color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 100px; outline: none; transition: border-color var(--transition); margin-bottom: 32px; }
        .ilp-textarea:focus { border-color: var(--purple); background: var(--white); }
        .ilp-textarea::placeholder { color: var(--text-light); }
        .ilp-quiz-nav { display: flex; align-items: center; justify-content: space-between; }
        .ilp-btn-back { background: none; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 20px; font-size: 13px; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all var(--transition); font-family: 'Inter', sans-serif; }
        .ilp-btn-back:hover { border-color: var(--text); color: var(--text); }
        .ilp-btn-next { background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 12px 28px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all var(--transition); font-family: 'Inter', sans-serif; display: flex; align-items: center; gap: 8px; }
        .ilp-btn-next:hover:not(:disabled) { background: #6D28D9; transform: translateY(-1px); }
        .ilp-btn-next:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
        .ilp-gate-card { padding: 48px 40px; }
        .ilp-gate-icon { width: 56px; height: 56px; border-radius: 14px; background: var(--purple-light); border: 1px solid var(--purple-mid); display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--purple); }
        .ilp-gate-icon svg { width: 26px; height: 26px; }
        .ilp-gate-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 10px; letter-spacing: -0.4px; line-height: 1.25; }
        .ilp-gate-sub { font-size: 15px; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 460px; }
        .ilp-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .ilp-field-input { width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--grain); color: var(--text); font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: border-color var(--transition); }
        .ilp-field-input:focus { border-color: var(--purple); background: var(--white); }
        .ilp-field-input::placeholder { color: var(--text-light); }
        .ilp-btn-gate { width: 100%; background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 14px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all var(--transition); font-family: 'Inter', sans-serif; margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .ilp-btn-gate:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .ilp-trust-line { font-size: 12px; color: var(--text-light); margin-top: 14px; display: flex; align-items: center; gap: 6px; }
        .ilp-trust-line svg { width: 14px; height: 14px; color: var(--green); flex-shrink: 0; }
        .ilp-result-header { padding: 36px 40px 28px; background: linear-gradient(135deg, #4A3E3D 0%, #2D2120 100%); color: white; }
        .ilp-result-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 5px 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.9); margin-bottom: 16px; }
        .ilp-result-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
        .ilp-result-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; line-height: 1.25; color: white; margin-bottom: 8px; letter-spacing: -0.3px; }
        .ilp-result-sub { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6; }
        .ilp-result-body { padding: 0 40px 40px; }
        .ilp-result-section { padding: 24px 0; border-bottom: 1px solid var(--border); }
        .ilp-result-section:last-child { border-bottom: none; }
        .ilp-section-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; }
        .ilp-section-body { font-size: 14px; color: var(--text-muted); line-height: 1.75; }
        .ilp-stack-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
        .ilp-stack-item:last-child { border-bottom: none; }
        .ilp-stack-icon-wrap { width: 36px; height: 36px; min-width: 36px; border-radius: var(--radius-sm); background: var(--purple-light); border: 1px solid var(--purple-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--purple); }
        .ilp-stack-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
        .ilp-stack-desc { font-size: 13px; color: var(--text-muted); line-height: 1.55; }
        .ilp-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
        .ilp-price-card { background: var(--grain); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px; }
        .ilp-price-label { font-size: 11px; font-weight: 500; color: var(--text-muted); margin-bottom: 6px; }
        .ilp-price-val { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 4px; letter-spacing: -0.3px; }
        .ilp-price-note { font-size: 11px; color: var(--text-light); line-height: 1.5; }
        .ilp-price-close { font-size: 13px; color: var(--text-muted); margin-top: 14px; line-height: 1.65; padding: 12px 14px; background: var(--green-light); border-radius: var(--radius-sm); border-left: 3px solid var(--green); }
        .ilp-steps-list { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
        .ilp-step-item { display: flex; gap: 12px; align-items: flex-start; }
        .ilp-step-num { width: 24px; height: 24px; min-width: 24px; border-radius: 50%; background: var(--purple); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; flex-shrink: 0; }
        .ilp-step-content { font-size: 13px; color: var(--text-muted); line-height: 1.65; }
        .ilp-step-content strong { color: var(--text); font-weight: 600; }
        .ilp-result-cta { margin: 24px 0 0; padding: 28px 32px; background: var(--alabaster); border: 1px solid var(--border); border-radius: var(--radius-md); text-align: center; }
        .ilp-result-cta h3 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 8px; letter-spacing: -0.3px; }
        .ilp-result-cta p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }
        .ilp-result-cta-footer { margin-top: 14px; font-size: 12px; color: var(--text-light); }
        .ilp-result-cta-footer a { color: var(--purple); text-decoration: none; }
        .ilp-entry-card { padding: 48px 40px; text-align: center; }
        .ilp-entry-icon { width: 72px; height: 72px; border-radius: 20px; background: var(--purple-light); border: 1px solid var(--purple-mid); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; color: var(--purple); }
        .ilp-entry-icon svg { width: 34px; height: 34px; }
        .ilp-entry-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--text); margin-bottom: 12px; letter-spacing: -0.4px; line-height: 1.2; }
        .ilp-entry-sub { font-size: 15px; color: var(--text-muted); line-height: 1.7; margin-bottom: 32px; max-width: 440px; margin-left: auto; margin-right: auto; }
        .ilp-entry-stats { display: flex; justify-content: center; gap: 0; border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 32px; }
        .ilp-entry-stat { flex: 1; padding: 16px; text-align: center; border-right: 1px solid var(--border); }
        .ilp-entry-stat:last-child { border-right: none; }
        .ilp-entry-stat-val { font-size: 22px; font-weight: 700; color: var(--text); letter-spacing: -0.5px; display: block; margin-bottom: 2px; }
        .ilp-entry-stat-lab { font-size: 11px; color: var(--text-muted); }
        .ilp-site-footer { background: var(--footer-bg); padding: 10px 2rem 32px; text-align: center; }
        .ilp-footer-bottom { font-size: 12px; color: var(--text-light); }
        @media (max-width: 600px) {
          .ilp-quiz-header, .ilp-quiz-body, .ilp-gate-card, .ilp-entry-card, .ilp-result-header, .ilp-result-body { padding-left: 24px; padding-right: 24px; }
          .ilp-field-row { grid-template-columns: 1fr; }
          .ilp-pricing-grid { grid-template-columns: 1fr; }
          .ilp-hero { padding: 100px 1.5rem 60px; }
          .ilp-hero-stats { gap: 1.25rem; }
          .ilp-hero-stat-div { display: none; }
        }
      `}</style>

      <nav className="ilp-nav">
        <a href="/" className="ilp-nav-logo">
          Your Intelligence Layer + AI<span>.</span>
        </a>
        <span className="nav-tag">FREE RESOURCE</span>
      </nav>

      <section className="ilp-hero">
        <div className="ilp-hero-eyebrow">Free Profile Assessment</div>
        <h1>
          You have spent years getting good at something.<br />
          You have not spent a single day getting paid
          <br />
          <em>what it is actually worth.</em>
        </h1>
        <p className="ilp-hero-sub">
          Discover exactly how your expertise becomes an AI-powered offer — and
          what someone with your background can charge.
        </p>
        <div className="ilp-hero-stats">
          <div className="ilp-hero-stat">
            <span className="ilp-hero-stat-num">3 min</span>
            <span className="ilp-hero-stat-label">to complete</span>
          </div>
          <div className="ilp-hero-stat-div" />
          <div className="ilp-hero-stat">
            <span className="ilp-hero-stat-num">7</span>
            <span className="ilp-hero-stat-label">questions</span>
          </div>
          <div className="ilp-hero-stat-div" />
          <div className="ilp-hero-stat">
            <span className="ilp-hero-stat-num">1</span>
            <span className="ilp-hero-stat-label">personalised profile</span>
          </div>
          <div className="ilp-hero-stat-div" />
          <div className="ilp-hero-stat">
            <span className="ilp-hero-stat-num">Free</span>
            <span className="ilp-hero-stat-label">always</span>
          </div>
        </div>
        <a
          href="#quiz"
          className="ilp-btn-primary"
          onClick={handleScrollToQuiz}
        >
          Find my profile
          <ArrowRight />
        </a>
      </section>

      <section className="ilp-quiz-section" id="quiz">
        <div className="ilp-quiz-card">
          {/* ENTRY */}
          {screen === "entry" && (
            <div className="ilp-entry-card">
              <div className="ilp-entry-icon">
                <StarIcon />
              </div>
              <h2 className="ilp-entry-title">
                The Intelligence Layer Profile
              </h2>
              <p className="ilp-entry-sub">
                Answer 7 questions and get a personalised breakdown of exactly
                how your expertise translates into an AI-powered income — with
                real numbers.
              </p>
              <div className="ilp-entry-stats">
                <div className="ilp-entry-stat">
                  <span className="ilp-entry-stat-val">3 min</span>
                  <span className="ilp-entry-stat-lab">to complete</span>
                </div>
                <div className="ilp-entry-stat">
                  <span className="ilp-entry-stat-val">7</span>
                  <span className="ilp-entry-stat-lab">questions</span>
                </div>
                <div className="ilp-entry-stat">
                  <span className="ilp-entry-stat-val">100%</span>
                  <span className="ilp-entry-stat-lab">free</span>
                </div>
              </div>
              <button
                className="ilp-btn-next"
                style={{ width: "100%", justifyContent: "center", padding: 14 }}
                onClick={startQuiz}
              >
                Start building my profile
                <ArrowRight />
              </button>
            </div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && (
            <>
              <div className="ilp-quiz-header">
                <div className="ilp-progress-wrap">
                  <div className="ilp-progress-track">
                    <div
                      className="ilp-progress-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="ilp-progress-text">
                    {cur + 1} of 7
                  </span>
                </div>
              </div>
              <div className="ilp-quiz-body">
                <div className="ilp-q-label">
                  Question {cur + 1} of 7
                </div>
                <div className="ilp-q-text">{q.text}</div>
                <div className="ilp-q-hint">{q.hint}</div>

                {q.type === "textarea" ? (
                  <textarea
                    ref={textareaRef}
                    className="ilp-textarea"
                    placeholder={q.placeholder || ""}
                    value={answers[q.key] || ""}
                    onChange={(e) => handleTextarea(q.key, e.target.value)}
                  />
                ) : (
                  <div className="ilp-options-grid">
                    {q.options!.map((opt) => (
                      <button
                        key={opt}
                        className={`ilp-opt-btn${answers[q.key] === opt ? " selected" : ""}`}
                        onClick={() => selectOption(q.key, opt)}
                      >
                        <span className="ilp-opt-radio" />
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <div className="ilp-quiz-nav">
                  <button
                    className="ilp-btn-back"
                    onClick={goBack}
                    style={{
                      visibility: cur > 0 ? "visible" : "hidden",
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="ilp-btn-next"
                    onClick={goNext}
                    disabled={!answers[q.key]}
                  >
                    Continue
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* EMAIL GATE */}
          {screen === "gate" && (
            <div className="ilp-gate-card">
              <div className="ilp-gate-icon">
                <MailIcon />
              </div>
              <h2 className="ilp-gate-title">
                Your Intelligence Layer Profile is ready.
              </h2>
              <p className="ilp-gate-sub">
                Where should I send your full breakdown? You will also receive
                the one-page AI Infrastructure Map specific to your domain —
                free.
              </p>
              <div className="ilp-field-row">
                <input
                  className="ilp-field-input"
                  type="text"
                  placeholder="First name"
                  value={gateName}
                  onChange={(e) => setGateName(e.target.value)}
                />
                <input
                  className="ilp-field-input"
                  type="email"
                  placeholder="name@email.com"
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                />
              </div>
              <button
                className="ilp-btn-gate"
                onClick={revealResult}
                disabled={gateSubmitting}
              >
                {gateSubmitting ? "Submitting..." : "Show me my profile"}
                {!gateSubmitting && <ArrowRight />}
              </button>
              <div className="ilp-trust-line">
                <ShieldIcon />
                No spam. One email with your results. You choose what happens
                next.
              </div>
            </div>
          )}

          {/* RESULT */}
          {screen === "result" && result && (
            <>
              <div className="ilp-result-header">
                <div className="ilp-result-badge">
                  <span className="ilp-result-badge-dot" />
                  <span>{result.badge}</span>
                </div>
                <div className="ilp-result-name">{result.name}</div>
                <div className="ilp-result-sub">{result.sub}</div>
              </div>
              <div className="ilp-result-body">
                <div className="ilp-result-section">
                  <div className="ilp-section-eyebrow">
                    Your intelligence layer
                  </div>
                  <div className="ilp-section-body">{result.layer}</div>
                </div>
                                <div className="ilp-result-cta">
                  <h3>Go from expert to new income stream</h3>
                  <p>
                    The Intelligence Layer workshop on July 25th takes exactly
                    this profile and turns it into a working AI-powered offer in
                    one session. Built for people at your level.
                  </p>
                  <a
                    href="/workshop"
                    className="ilp-btn-primary"
                    style={{ display: "inline-flex" }}
                  >
                    Reserve my seat — $97 early access
                    <ArrowRight size={15} />
                  </a>
                </div>

                <div className="ilp-result-section">
                  <div className="ilp-section-eyebrow">
                    Your AI infrastructure
                  </div>
                  {result.stack.map((s, i) => (
                    <div className="ilp-stack-item" key={i}>
                      <div className="ilp-stack-icon-wrap">
                        <StackIcon path={s.i} />
                      </div>
                      <div>
                        <div className="ilp-stack-name">{s.n}</div>
                        <div className="ilp-stack-desc">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ilp-result-section">
                  <div className="ilp-section-eyebrow">What this is worth</div>
                  <div
                    className="ilp-section-body"
                    style={{ marginBottom: 0 }}
                  >
                    {result.pricing.intro}
                  </div>
                  <div className="ilp-pricing-grid">
                    {result.pricing.items.map((p, i) => (
                      <div className="ilp-price-card" key={i}>
                        <div className="ilp-price-label">{p.l}</div>
                        <div className="ilp-price-val">{p.v}</div>
                        <div className="ilp-price-note">{p.n}</div>
                      </div>
                    ))}
                  </div>
                  <div className="ilp-price-close">
                    {result.pricing.close}
                  </div>
                </div>
                                <div className="ilp-result-cta">
                  <h3>Go from expert to new income stream</h3>
                  <p>
                    The Intelligence Layer workshop on July 25th takes exactly
                    this profile and turns it into a working AI-powered offer in
                    one session. Built for people at your level.
                  </p>
                  <a
                    href="/workshop"
                    className="ilp-btn-primary"
                    style={{ display: "inline-flex" }}
                  >
                    Reserve my seat — $97 early access
                    <ArrowRight size={15} />
                  </a>
                </div>

                <div className="ilp-result-section">
                  <div className="ilp-section-eyebrow">Your first 30 days</div>
                  <div className="ilp-steps-list">
                    {result.steps.map((s, i) => (
                      <div className="ilp-step-item" key={i}>
                        <div className="ilp-step-num">{i + 1}</div>
                        <div className="ilp-step-content">
                          <strong>{s.w}:</strong> {s.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ilp-result-cta">
                  <h3>Go from expert to new income stream</h3>
                  <p>
                    The Intelligence Layer workshop on July 25th takes exactly
                    this profile and turns it into a working AI-powered offer in
                    one session. Built for people at your level.
                  </p>
                  <a
                    href="/workshop"
                    className="ilp-btn-primary"
                    style={{ display: "inline-flex" }}
                  >
                    Reserve my seat — $97 early access
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="ilp-site-footer">
        <div className="ilp-footer-bottom">
          2026 Temitope Saliu. The Intelligence Layer is proprietary
          methodology. All rights reserved.
        </div>
      </footer>
    </>
  );
}
