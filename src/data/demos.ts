// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA — single source of truth for the /demos page
//
// TO ADD A NEW DEMO (2 steps):
//   1. Drop your demo file into  public/demos/          e.g. real-estate-os.html
//   2. Add ONE object to the `demos` array below, e.g.:
//
//        {
//          slug: "real-estate-os",
//          file: "/demos/real-estate-os.html",
//          title: "Real Estate OS",
//          tag: "Real Estate · Listings · Leads · and others",
//          description:
//            "Listing pipelines, client follow-up automation, viewing schedulers and market briefs — built around how agents actually sell.",
//        },
//
// That's it — the card appears in the grid automatically.
// Leave `file` as "" (or omit the field) to render a styled "Coming soon" slot.
// The grid always keeps PLACEHOLDER_SLOTS open slots at the end for future demos.
// ─────────────────────────────────────────────────────────────────────────────

export interface Demo {
  slug: string;
  /** Path relative to /public. Use "" to render a placeholder slot. */
  file?: string;
  title: string;
  tag: string;
  description: string;
}

export const demos: Demo[] = [
  {
    slug: "content-intelligence",
    file: "/demos/content-intelligence.html",
    title: "Content Intelligence Platform",
    tag: "Content · Analytics · Publishing · and others",
    description:
      "Content intelligence dashboards, audience analytics and publishing planners for operators building in public.",
  },
  {
    slug: "financial-coach-os",
    file: "/demos/financial_coach.html",
    title: "The Financial Coach OS",
    tag: "Finance · Coaching · Client Portals · and others",
    description:
      "Client portals, session structures and progress tracking — a full operating system for financial coaching practices.",
  },
  {
    slug: "the-marriage-coach",
    file: "/demos/the-marriage-coach.html",
    title: "The Marriage Coach Method",
    tag: "Coaching · Programs · Community · and others",
    description:
      "Program delivery, session scheduling and client resources — built around how marriage and parenting coaches work.",
  },
    {
    slug: "finance-flow",
    file: "/demos/FinanceFlow_OS.html",
    title: "FinanceFlow OS",
    tag: "Finance Coaching · Members · AI Coach · and others",
    description:
      "Member journeys, investor profiles, an AI coach and daily reports — a command centre for a finance education business.",
  },
  {
    slug: "yalo-restaurant-os",
    file: "/demos/Yalo_Restaurant_OS.html",
    title: "Yalo' Restaurant Group OS",
    tag: "Restaurants · Service Ops · Membership · and others",
    description:
      "Tonight's service, floor plans, wine club, menu engineering and supply chain — a command centre for a fine-dining group.",
  },
  {
    slug: "meridian-group-os",
    file: "/demos/Meridian_Group_OS.html",
    title: "Meridian Group OS",
    tag: "Conglomerate · Multi-Division · Group P&L · and others",
    description:
      "Interiors, developments and hospitality under one roof — group command, consolidated P&L and shared services for a multi-division group.",
  },
  {
    slug: "meridian-interiors-os",
    file: "/demos/Meridian_Interiors_OS.html",
    title: "Meridian Interiors OS",
    tag: "Interior Design · Projects · Procurement · and others",
    description:
      "Showroom floor, project pipeline, atelier procurement and the client book — an OS for a luxury interiors studio.",
  },
  {
    slug: "maison-sartore-atelier-os",
    file: "/demos/Maison_Sartore_Atelier_OS_3.html",
    title: "Maison Sartore Atelier OS",
    tag: "Bespoke Tailoring · Commissions · Clientele · and others",
    description:
      "Commissions, measurements, the workroom floor and a ready-to-wear line — a working operating system for a modern atelier.",
  },
  {
    slug: "parenting-motherhood-os",
    file: "/demos/Lisa_Parenting_Motherhood_OS_3.html",
    title: "Parenting & Motherhood by Lisa",
    tag: "Coaching · Programs · Community · and others",
    description:
      "Free quizzes, programs, community and a creator dashboard — a platform built to grow a parenting and motherhood practice.",
  },
  {
    slug: "business-architecture-os",
    file: "/demos/BA_OS_Demo_1.html",
    title: "Business Architecture OS",
    tag: "Command Centre · Decisions · Revenue Streams · and others",
    description:
      "Inbox, decisions, launches, people, traction and revenue streams — the flagship Business Architecture Operating System demo.",
  },

  // ── Empty slots: the grid fills the rest with "Coming soon" cards ──
  // To add a demo, move its object above this line.
];
