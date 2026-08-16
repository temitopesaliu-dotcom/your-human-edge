import type { ReactNode } from "react";
import { StarIcon, UsersIcon, ShieldIcon, GlobeIcon, FileIcon, WorldIcon, AwardIcon } from "./Icons";

/* Checkout is created server-side in
   src/app/api/business-architect/create-checkout/route.ts so the page price
   and the charged price cannot drift. The old hard-coded Payment Links were
   built for the previous $997 / $1,497 pricing and have been removed. */

/* ── CONFIRMED FACTS ─── */
export const COHORT_START = "August 22, 2026 · 2pm BST";
export const COHORT_START_SHORT = "August 22, 2026";

/* ── NEEDS TEMITOPE'S SIGN-OFF ───
   ENGAGEMENT_RANGE: the price band a graduate can realistically charge.
   Replace with a band grounded in real consulting rates before shipping. */
export const ENGAGEMENT_RANGE = "$3,000–$8,000";

export const shifts: [string, string][] = [
  ["Invisible expert", "Recognised authority in your niche"],
  ["Selling time", "Selling a named premium offer"],
  ["Hoping for referrals", "Running an active acquisition system"],
  ["Advising clients", "Building AI infrastructure for clients"],
  ["No content system", "Content engine working while you sleep"],
  ["Solo operator", "Premium Business Architect"],
];

export const tracks: {
  num: string;
  title: ReactNode;
  benefit: string;
  desc: string;
}[] = [
  {
    num: "Track 01",
    title: <><em>Intelligence Layer</em> Mastery</>,
    benefit: "Turn your Intelligence Layer into language that closes deals.",
    desc: "The workshop named it. This is where you own it. You pressure-test your Intelligence Layer against real market signals, refine the language until it converts, and confirm the foundation before everything else is built on top of it. Most experts pivot two or three times before it lands. This track collapses that into one deliberate process.",
  },
  {
    num: "Track 02",
    title: <>From Unknown to <em>Authority</em></>,
    benefit: "Become the name your ICP already trusts before the first call.",
    desc: "Personal branding built around your specific expertise and niche. You become the person your ICP finds, follows, and trusts before they ever speak to you. Your positioning, your visual identity, your market presence — architected with intention, not assembled by accident.",
  },
  {
    num: "Track 03",
    title: <>From <em>Content</em> to Clients</>,
    benefit: "A content system that brings in clients without daily posting.",
    desc: "A content system that works while you are not. Short-form video, yap sessions, written content — all derived from your Intelligence Layer so it sounds like you and attracts exactly who you serve. Not content for the sake of content. Content that converts.",
  },
  {
    num: "Track 04",
    title: <>From Conversations to <em>Contracts</em></>,
    benefit: "Turn discovery calls into signed, scoped engagements.",
    desc: "How to run discovery calls, diagnose a client's business, present your findings, and close an engagement. The full client acquisition process from first contact to signed scope — so you never walk in unprepared or leave a call uncertain about next steps.",
  },
  {
    num: "Track 05",
    title: <>From Consultant to <em>Builder</em></>,
    benefit: "Design and deliver a real AI Operating System for a paying client.",
    desc: "You learn to design and deliver an AI Operating System for a real client — the infrastructure, the automation, the handover. You stop giving advice and start building things clients depend on. This is where you become the person worth the premium rate.",
  },
  {
    num: "Track 06",
    title: <>The <em>Operator&rsquo;s</em> Brand</>,
    benefit: "Price and present yourself as premium — not as a freelancer.",
    desc: "How to carry, price, and present yourself as a premium Business Architect — not a contractor, not a freelancer. The business identity, the positioning language, the market presence that commands the rates and the rooms you want to be in.",
  },
];

/* ── GUARANTEE ───
   Conditional on two things the programme controls: attendance, and the work
   in Tracks 01 and 04. Deliberately does NOT promise a client says yes —
   that is a stranger's decision, not a deliverable. */
export const guarantee = {
  label: "The Six-Track Guarantee",
  title: "Do the work in Track 01 and Track 04, or you do not pay.",
  body: "Show up to all six live weeks and complete the work in Track 01 and Track 04 — your Intelligence Layer refined into a priced offer, and one real discovery call run using the client acquisition process. If you have done that and cannot point to a priced offer and a repeatable way to sell it, email us within 7 days of the final session and we refund your tuition in full.",
  fine: "Two conditions. Both are things we teach and you can evidence. No forms, no retention call — one email.",
};

/* ── VALUE STACK ───
   NEEDS TEMITOPE'S SIGN-OFF. Every figure below is a category comparable,
   not a rate Temitope has quoted. Replace with real standalone prices, or
   delete any line you would not actually sell separately. The Builder Seat
   line is the one already defensible from existing page copy. */
export const builderStack: { label: string; value: number }[] = [
  { label: "Six-track curriculum, taught live over six weeks", value: 547 },
  { label: "Weekly group Q&A — your work reviewed, not just questions answered", value: 197 },
  { label: "Domain expert guest sessions across every track", value: 197 },
  { label: "Full template and prompt library", value: 127 },
  { label: "Community access and peer accountability", value: 77 },
  { label: "All session recordings, yours to keep", value: 47 },
];

export const acceleratorStack: { label: string; value: number }[] = [
  { label: "The Builder Seat — a second full seat in the programme", value: 597 },
  { label: "Opening private strategy session (1:1, before day one)", value: 175 },
  { label: "Track expert private session (1:1, targeted)", value: 175 },
  { label: "Personal review of your first proposal and AI OS architecture", value: 125 },
  { label: "Priority feedback — 24hr response", value: 75 },
];

export const BUILDER_PRICE = 597;
export const ACCELERATOR_PRICE = 997;

export const sum = (rows: { value: number }[]) =>
  rows.reduce((total, row) => total + row.value, 0);

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/* ── SOCIAL PROOF ───
   Real quotes supplied by Temitope 2026-08-15 from Intelligence Layer Workshop
   participants. Adi's is condensed — every word is his, with cuts marked by an
   ellipsis. Nothing added, nothing paraphrased. No photos or artifact
   screenshots: he asked for those to be left out for now. */
export const proofItems: {
  quote: string;
  name: string;
  meta: string;
}[] = [
  {
    quote:
      "The biggest thing people do not share is how you exchange your knowledge for value, and that is the biggest issue you have in consulting, or any space… I see them struggle, and they are talented, but this is the block. I don't know how many people do what you're doing, Temitope; it's quite laudable.",
    name: "Adi",
    meta: "30 years in consulting",
  },
  {
    quote:
      "The client acquisition system is what I've been looking for all of my time in business. This works.",
    name: "Nat",
    meta: "20 years in business",
  },
  {
    quote:
      "What you do isn't copy-and-paste, Temitope; it is the real deal.",
    name: "Ola",
    meta: "12 years in engineering consulting",
  },
];

export const credentials: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: "Former Google and Meta Elite Trainer",
    desc: "Not a participant. The person Google and Meta trusted to train their trainers. Personally trained over 3,000 professionals and business owners. In partnership with Google and Meta, part of a team that has reached over 300,000 professionals and business owners across the globe.",
    icon: <StarIcon />,
  },
  {
    title:
      "Single-handedly sealed partnerships with Google, Meta, and the largest sports brand in Nigeria",
    desc: "Enterprise deals closed independently — not as part of a team, not with institutional backing.",
    icon: <UsersIcon />,
  },
  {
    title: "Led growth and marketing for tech startups across Africa",
    desc: "Inside the businesses — building growth engines, opening markets, expanding operations across the continent.",
    icon: <GlobeIcon />,
  },
  {
    title: "Created curricula and programme facilitation for USAID and Peace Corps",
    desc: "The frameworks used to train people at the intersection of technology and human development were built by her.",
    icon: <FileIcon />,
  },
  {
    title: "Trained for the International Organization for Migration and more",
    desc: "Work spanning borders, institutions, and sectors most consultants never get near.",
    icon: <WorldIcon />,
  },
  {
    title: "UK Global Talent Visa — Exceptional Talent endorsement",
    desc: "Issued by the British government to individuals who have already demonstrated exceptional talent at an international level. Not potential. Proven.",
    icon: <ShieldIcon />,
  },
  {
    title: "Women's Economic Forum Iconic Award",
    desc: "Recognised internationally for impact at the intersection of women, business, and technology.",
    icon: <AwardIcon />,
  },
];

export const compareRows: {
  section?: string;
  label: string;
  builder: boolean;
  accelerator: boolean;
}[] = [
  { section: "Programme access", label: "All six curriculum tracks", builder: true, accelerator: true },
  { label: "Six weeks of live sessions", builder: true, accelerator: true },
  { label: "Weekly group Q&A", builder: true, accelerator: true },
  { label: "Domain expert guest sessions", builder: true, accelerator: true },
  { label: "Template and prompt library", builder: true, accelerator: true },
  { label: "Community access", builder: true, accelerator: true },
  { label: "Session recordings", builder: true, accelerator: true },
  { label: "The Six-Track Guarantee", builder: true, accelerator: true },
  { section: "Accelerator exclusives", label: "The Builder Seat — bring one co-builder", builder: false, accelerator: true },
  { label: "Opening private strategy session", builder: false, accelerator: true },
  { label: "Track expert private session", builder: false, accelerator: true },
  { label: "Personal proposal and architecture review", builder: false, accelerator: true },
  { label: "Priority feedback — 24hr response", builder: false, accelerator: true },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "I already built my offer at the workshop. What is actually left to do?",
    a: "You built the foundation — the Intelligence Layer, the ICP, the site. What you do not have yet is a price the market has tested, a repeatable way to get in front of the people who pay it, a delivery system you can hand over, and a brand that holds the rate. That is the six weeks. You are not starting again; you are building the business around what you already made.",
  },
  {
    q: "What happens if I do the work and it does not land?",
    a: "The Six-Track Guarantee covers it. Attend all six live weeks, complete the Track 01 and Track 04 work — a priced offer and one real discovery call run using the acquisition process — and if you cannot point to a priced offer and a repeatable way to sell it, email us within 7 days of the final session for a full refund. Two conditions, both things we teach.",
  },
  {
    q: "Who do I bring as my Builder Seat in the Accelerator?",
    a: "Someone who wants to learn the technical implementation side — a business partner, a co-founder, a VA you trust, a family member who is technically inclined. They do not need to be a developer. They need to be willing to learn the build process alongside you. You lead the clients and the strategy. They learn to build the systems. Together you are a complete consulting unit.",
  },
  {
    q: "I was not at the workshop. Can I still join?",
    a: "The Founding Cohort is specifically for workshop participants. If you are reading this and were not at the workshop, reach out directly and we will discuss whether there is a fit.",
  },
  {
    q: "What do I walk away with after six weeks?",
    a: "A refined Intelligence Layer the market pays for. A personal brand with a content system behind it. A complete client acquisition process from first contact to signed contract. A delivered or ready-to-deliver AI Operating System. A business identity that commands premium rates. Accelerator members also walk away with a reviewed proposal that has already been in front of a real client.",
  },
  {
    q: "Who teaches the specialist tracks?",
    a: "Domain experts who have actually built in their specific area — lead acquisition, AI-backed content, personal brand, automated systems, and more. This is not one person covering everything. Each specialist track is led by the person most qualified to teach it. The programme is built this way deliberately so every layer of your business is taught at the highest level.",
  },
];
