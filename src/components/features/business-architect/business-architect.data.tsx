import type { ReactNode } from "react";
import { StarIcon, UsersIcon, ShieldIcon, GlobeIcon, FileIcon, WorldIcon, AwardIcon } from "./Icons";

export const BUILDER_HREF = "https://buy.stripe.com/4gMeVe0lh9ZueEraKT3oA0s";
export const ACCELERATOR_HREF = "https://buy.stripe.com/eVq6oIec7c7Caob1aj3oA0t";

export const shifts: [string, string][] = [
  ["Invisible expert", "Recognised authority in your niche"],
  ["Selling time", "Selling a named premium offer"],
  ["Hoping for referrals", "Running an active acquisition system"],
  ["Advising clients", "Building AI infrastructure for clients"],
  ["No content system", "Content engine working while you sleep"],
  ["Solo operator", "Premium Business Architect"],
];

export const tracks: { num: string; title: ReactNode; desc: string }[] = [
  {
    num: "Track 01",
    title: <><em>Intelligence Layer</em> Mastery</>,
    desc: "The workshop named it. This is where you own it. You pressure-test your Intelligence Layer against real market signals, refine the language until it converts, and confirm the foundation before everything else is built on top of it. Most experts pivot two or three times before it lands. This track collapses that into one deliberate process.",
  },
  {
    num: "Track 02",
    title: <>From Unknown to <em>Authority</em></>,
    desc: "Personal branding built around your specific expertise and niche. You become the person your ICP finds, follows, and trusts before they ever speak to you. Your positioning, your visual identity, your market presence — architected with intention, not assembled by accident.",
  },
  {
    num: "Track 03",
    title: <>From <em>Content</em> to Clients</>,
    desc: "A content system that works while you are not. Short-form video, yap sessions, written content — all derived from your Intelligence Layer so it sounds like you and attracts exactly who you serve. Not content for the sake of content. Content that converts.",
  },
  {
    num: "Track 04",
    title: <>From Conversations to <em>Contracts</em></>,
    desc: "How to run discovery calls, diagnose a client's business, present your findings, and close an engagement. The full client acquisition process from first contact to signed scope — so you never walk in unprepared or leave a call uncertain about next steps.",
  },
  {
    num: "Track 05",
    title: <>From Consultant to <em>Builder</em></>,
    desc: "You learn to design and deliver an AI Operating System for a real client — the infrastructure, the automation, the handover. You stop giving advice and start building things clients depend on. This is where you become the person worth the premium rate.",
  },
  {
    num: "Track 06",
    title: <>The <em>Operator&rsquo;s</em> Brand</>,
    desc: "How to carry, price, and present yourself as a premium Business Architect — not a contractor, not a freelancer. The business identity, the positioning language, the market presence that commands the rates and the rooms you want to be in.",
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
  { section: "Accelerator exclusives", label: "The Builder Seat — bring one co-builder", builder: false, accelerator: true },
  { label: "Opening private strategy session", builder: false, accelerator: true },
  { label: "Track expert private session", builder: false, accelerator: true },
  { label: "Personal proposal and architecture review", builder: false, accelerator: true },
  { label: "Priority feedback — 24hr response", builder: false, accelerator: true },
  { label: "The Invisible Operator track", builder: false, accelerator: true },
];

export const faqs: { q: string; a: string }[] = [
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

