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
    slug: "autoleads-dashboard",
    file: "/demos/autoleads_dashboard_page.html",
    title: "AutoLeads Dashboard",
    tag: "Automotive · Lead Flow · Showroom Ops · and others",
    description:
      "Lead capture, follow-up automation and showroom pipelines — a dashboard built around how dealerships actually sell.",
  },
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
    title: "Finance OS",
    tag: "Coaching · Programs · Community · and others",
    description:
      "A full operating system for financial coaching practices.",
  },

  // ── Empty slots: the grid fills the rest with "Coming soon" cards ──
  // To add a demo, move its object above this line.
];
