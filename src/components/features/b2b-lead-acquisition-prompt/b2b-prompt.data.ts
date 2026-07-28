export const PROMPT_TEXT = `You are a B2B lead acquisition strategist. Build me a complete, actionable lead acquisition framework for the following business:

BUSINESS: [Your company name]
PRODUCT: [What your product does in one sentence]
WEBSITE: [Your website URL]
TARGET SECTORS: [List the 3 to 5 industries or customer types you are targeting]
TARGET DECISION-MAKER: [Job title of the person who buys your product]
CORE PAIN YOU SOLVE: [The specific problem your product eliminates]
GEOGRAPHY: [Countries or cities you are targeting]
BUDGET: [Monthly budget for tools and outreach]

Build a 7-stage framework covering:

STAGE 1 -- RESEARCH: How to build a precise target list of companies and named decision-makers for this product. Include specific tools, search criteria, and how to prioritise which companies to approach first based on pain score.

STAGE 2 -- ENRICH: How to verify every contact's email and phone number before writing any copy. Include confidence thresholds, fallback methods, and how to handle contacts that cannot be verified.

STAGE 3 -- PERSONALISE: How to write one unique, personalised cold email per contact at scale using AI. Include the system prompt to use, the three email angles (Week 1: data angle, Week 2: competitor loss angle, Week 3: ROI angle), and the non-negotiable email rules (plain text only, CTA with website link on every email, no campaign language, under 120 words).

STAGE 4 -- SEND: How to send cold outreach from a real business email address in a way that feels personal and 1-to-1. Include sending infrastructure recommendation, daily volume limits, send day and time, domain warmup requirements, and the 3-email sequence structure with timing.

STAGE 5 -- FOLLOW UP FAST: How to ensure every inbound lead is contacted within 5 minutes. Include what to say in the first contact, how to route different reply types (positive, negative, out-of-office, question), and how to escalate warm signals immediately.

STAGE 6 -- TRACK: What metrics to measure weekly and what actions to take based on the data. Include the 5 core metrics, what good performance looks like for this sector, and the weekly review process that decides what to cut and what to scale.

STAGE 7 -- CLOSE AND STOP: How to convert a warm lead into a booked demo and a closed deal, and how to ensure all outreach stops permanently the moment a deal is Won, Lost, or Opted Out. Include the kill switch mechanism and what happens to lost deals after 90 days.

For each stage, provide:
-- The exact actions to take in sequence
-- The specific tools to use and why
-- The human decisions that must stay human
-- The automation that can run without human intervention
-- The quality checks that prevent errors from reaching prospects

Format the output as a detailed operational playbook, not a slide deck or summary.
Tone: direct, practical, no buzzwords. Write like a sales ops professional, not a marketing consultant.`;

export const STAGES = [
  {
    num: 1,
    name: 'Research — Build a precise target list',
    desc: 'Identify the exact companies and the specific decision-makers whose KPIs are hurt by the problem you solve. Tools, search criteria, and how to rank targets by pain score.',
  },
  {
    num: 2,
    name: 'Enrich — Verify before you write',
    desc: 'Verify every email address and phone number before a single word of copy is written. Confidence thresholds, fallback methods, and how to handle unverifiable contacts.',
  },
  {
    num: 3,
    name: 'Personalise — One email per person, not per segment',
    desc: 'Use AI to write a unique, personalised cold email for every contact at scale. Three-angle sequence across three weeks. The non-negotiable email rules that protect deliverability.',
  },
  {
    num: 4,
    name: 'Send — From a real inbox, not a platform',
    desc: 'Send outreach from a real business email address in plain text. Sending infrastructure, daily limits, timing, domain warmup, and the 3-email sequence structure.',
  },
  {
    num: 5,
    name: 'Follow up fast — The first to call wins the deal',
    desc: 'Contact every inbound lead within 5 minutes. After 30 minutes, conversion probability drops 80%. How to route replies, handle OOO responses, and escalate positive signals immediately.',
  },
  {
    num: 6,
    name: 'Track — Measure what matters, cut what does not',
    desc: 'The 5 core metrics to review every week. What good looks like at each stage. The weekly review process that decides what to cut and what to double down on.',
  },
  {
    num: 7,
    name: 'Close and stop — Kill switch on Won',
    desc: 'Convert a warm lead into a booked demo and a closed deal. When a deal is Won, Lost, or Opted Out, all outreach stops permanently and instantly. No exceptions.',
  },
];

export const INTRO_ITEMS = [
  { icon: '⚡', title: 'Works in any AI', desc: 'Claude, ChatGPT, Gemini — paste and go' },
  { icon: '🎯', title: 'Any sector', desc: 'Adapt to your industry and target buyers' },
  { icon: '📋', title: 'Operational output', desc: 'A playbook, not a slide deck' },
  { icon: '🔁', title: '7 stages', desc: 'Research to close — nothing skipped' },
];

export const HOW_STEPS = [
  { step: 1, title: 'Copy the prompt above', desc: 'Hit the Copy button. The full prompt is now in your clipboard.' },
  { step: 2, title: 'Paste into any AI assistant', desc: 'Claude, ChatGPT, Gemini, or any other. Works with all of them.' },
  { step: 3, title: 'Fill in the 8 fields', desc: 'Replace each bracketed value with your product, sector, decision-maker, pain, geography, and budget. The more specific you are, the more actionable the output.' },
  { step: 4, title: 'Get your playbook', desc: 'The AI outputs a complete 7-stage operational playbook tailored to your business. Hand it to someone on day 1. They can be running the system by day 5.' },
];
