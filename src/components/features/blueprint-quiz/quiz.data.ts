/**
 * Blueprint Audit quiz: question options, the result-page system templates,
 * routing rules and the payment links for each tier.
 *
 * Routing (decided with Temitope, October 2026):
 * - "Intensive workshop"                         -> Expert Framework Intensive ($1,599)
 * - just exploring / start smaller / tiny solo   -> free blueprint only
 * - 21+ staff or $2M+ revenue                    -> Leadership AI Strategy Session ($1,500)
 * - everyone else                                -> AI Strategy Session ($500)
 *
 * Both session links redirect to /book after payment and carry
 * metadata.product = "blueprint-audit", so the Stripe webhook adds the buyer
 * to the paid MailerLite group that sends the booking emails.
 */

export const LINKS = {
  founderSession: "https://buy.stripe.com/4gMaEWbl87JddnL88R6J20g",
  leadershipSession: "https://buy.stripe.com/4gM9AS3SG8NhgzX4WF6J20h",
  intensive: "https://buy.stripe.com/bJe00k1plb3y1RF4mv3oA0N",
  samples: "/demos",
} as const;

export const OPTIONS = {
  team: ["Just me", "2 to 5", "6 to 20", "21 to 50", "51 to 200", "200+"],
  revenue: ["Under $50k", "$50k to $100k", "$100k to $500k", "$500k to $2M", "$2M to $10M", "$10M+", "Prefer not to say"],
  automate: [
    "Lead gen & outreach", "Sales follow-up", "Quoting & proposals", "Customer support", "Client onboarding",
    "Data entry / ops", "Document processing", "Content / marketing", "Social media", "Email & inbox",
    "Internal workflows", "Reporting & analytics", "Scheduling & admin", "Invoicing & finance",
    "Recruiting / HR", "Research", "Not sure yet",
  ],
  tools: [
    "Google Workspace", "Microsoft 365", "Slack", "HubSpot", "Salesforce", "Pipedrive", "Zoho", "GoHighLevel",
    "Notion", "Airtable", "Monday", "Asana", "ClickUp", "Calendly", "Zapier / Make", "n8n", "Shopify", "Stripe",
    "QuickBooks / Xero", "Mailchimp", "Klaviyo", "ConvertKit / Beehiiv", "Outlook / Exchange", "WhatsApp",
    "WhatsApp Business API", "Instagram / Meta", "LinkedIn", "Custom in-house tools", "Mostly spreadsheets", "Mostly email",
  ],
  data: [
    "In a CRM", "Spreadsheets or Sheets", "A proper database", "Cloud drive (Drive, Dropbox, SharePoint)",
    "Inside email inboxes", "A custom internal tool", "Paper or manual records", "Scattered across all of these",
  ],
  owner: ["Me or leadership", "An ops or admin lead", "Our IT or technical team", "Each team owns their own", "No clear owner"],
  timego: [
    "Copy-pasting between tools", "Re-keying the same data", "Chasing people for updates", "Leads going cold",
    "Slow follow-up", "Answering the same questions", "Manual reporting", "Documents & PDFs by hand",
    "Scheduling back-and-forth", "Errors slipping through", "Nothing is written down", "Team at capacity",
    "Not sure, that's why I'm here",
  ],
  hours: ["Under 5 hrs", "5 to 15 hrs", "15 to 40 hrs", "40+ hrs", "Not sure"],
  tech: ["Non-technical", "We can use no-code tools", "We have developers", "Mixed"],
  security: [
    "Client data must stay in our control", "GDPR or data residency rules", "Health or HIPAA data",
    "Financial or payment data", "NDAs with our clients", "Role-based access needed", "Nothing specific",
  ],
  matters: ["Save time", "Cut cost", "Grow revenue", "Fewer errors", "Faster response", "Scale without hiring", "Better visibility", "Free up my own time"],
  timeline: ["ASAP", "1 to 3 months", "3 to 6 months", "Just exploring"],
  decider: ["Me", "Me and a partner", "A board or committee"],
} as const;

export type CardOption = { value: string; title: string; desc?: string };

export const PATH_OPTIONS: CardOption[] = [
  { value: "workshop", title: "Intensive workshop", desc: "Learn to design and run AI systems yourself" },
  { value: "implementation", title: "AI implementation", desc: "Temitope designs it, your team or a partner builds it, and she oversees" },
  { value: "both", title: "Both", desc: "Design it with us, then hand your team the keys" },
  { value: "unsure", title: "Not sure, help me decide" },
];

export const BUDGET_OPTIONS: CardOption[] = [
  { value: "yes", title: "Yes, that works" },
  { value: "depends", title: "Maybe, depends on scope", desc: "Show me what it takes and I'll decide" },
  { value: "smaller", title: "I'd prefer to start smaller" },
];

export type SingleKey = "team" | "revenue" | "owner" | "hours" | "tech" | "timeline" | "decider" | "path" | "budget";
export type MultiKey = "automate" | "tools" | "data" | "timego" | "security" | "matters";

export interface QuizAnswers {
  team: string; revenue: string; owner: string; hours: string; tech: string;
  timeline: string; decider: string; path: string; budget: string;
  automate: string[]; tools: string[]; data: string[]; timego: string[]; security: string[]; matters: string[];
  businessDesc: string; whoDoesWhat: string; breaksDown: string; anythingElse: string;
  firstName: string; email: string; companyName: string; website: string;
}

export const EMPTY_ANSWERS: QuizAnswers = {
  team: "", revenue: "", owner: "", hours: "", tech: "", timeline: "", decider: "", path: "", budget: "",
  automate: [], tools: [], data: [], timego: [], security: [], matters: [],
  businessDesc: "", whoDoesWhat: "", breaksDown: "", anythingElse: "",
  firstName: "", email: "", companyName: "", website: "",
};

export type Route = "intensive" | "nurture" | "company" | "founder";

export function isCompany(a: QuizAnswers): boolean {
  return ["21 to 50", "51 to 200", "200+"].includes(a.team) || ["$2M to $10M", "$10M+"].includes(a.revenue);
}

export function routeFor(a: QuizAnswers): Route {
  if (a.path === "workshop") return "intensive";
  const tiny = a.team === "Just me" && ["Under $50k", "$50k to $100k"].includes(a.revenue);
  if (a.timeline === "Just exploring" || a.budget === "smaller" || tiny) return "nurture";
  return isCompany(a) ? "company" : "founder";
}

export const FIT_LABEL: Record<Route, string> = {
  company: "LEADERSHIP STRATEGY SESSION",
  founder: "AI STRATEGY SESSION",
  intensive: "INTENSIVE WORKSHOP",
  nurture: "BLUEPRINT FIRST",
};

export const FIT_WHY: Record<Route, string> = {
  company: "At your size the risk is ten teams adopting ten tools with nothing holding them together. The return comes from deciding the design at leadership level before anyone buys or builds.",
  founder: "You have a defined bottleneck and a timeline that means you want value now. The fastest return is getting the design right before anyone builds anything.",
  intensive: "You want the skill, not just the system. Learning to design these yourself pays back in your business and in the work you do for others.",
  nurture: "Right now the highest return is the foundation: write down the three processes you repeat most, then automate the first one. This blueprint is your starting map.",
};

export interface FlowTemplate { sub: string; trigger: string; steps: string[]; outcome: string }
const f = (sub: string, trigger: string, steps: string[], outcome: string): FlowTemplate => ({ sub, trigger, steps, outcome });

export const FLOWS: Record<string, FlowTemplate> = {
  "Lead gen & outreach": f("Removes the manual triage of new leads", "A lead submits your form or replies to outreach", ["Every inbound lands in one pipeline", "AI enriches each lead and scores fit against your ideal client", "A record is created in your CRM with the score pre-filled", "Hot leads get a suggested first reply within minutes", "A nudge fires if nobody responds in 24 hours"], "Every lead is logged, scored and chased without anyone remembering to."),
  "Sales follow-up": f("Stops deals dying quietly", "A call ends or a proposal goes out", ["Notes and next steps are captured against the deal", "Follow-ups are drafted in your voice for approval", "Stalled deals are flagged daily"], "No deal goes silent because someone forgot."),
  "Quoting & proposals": f("Cuts proposal time from days to hours", "A discovery call ends", ["Call notes become a scoped draft", "Pricing pulls from your rules", "You review, edit and send"], "Proposals go out the same day."),
  "Customer support": f("Answers the repeat questions", "A customer asks something", ["An assistant answers from your knowledge base", "It hands over to a person with full context when needed", "Repeat questions become new help content"], "Most questions answered without the team."),
  "Client onboarding": f("Takes onboarding off your week", "A client pays or signs", ["Welcome sequence and intake form go out", "Answers build the client file and kickoff brief", "Your team gets tasks with context"], "Onboarding runs in minutes and still feels personal."),
  "Data entry / ops": f("Ends re-keying between systems", "Data lands in one system", ["It is validated and copied to every system that needs it", "Mismatches are flagged, not guessed", "A log shows every change"], "One entry, everywhere it needs to be."),
  "Document processing": f("Reads documents so people don't have to", "A PDF, invoice or form arrives", ["AI extracts the fields that matter", "They are checked against your rules", "Clean data flows into your systems"], "Documents processed in seconds, exceptions to a human."),
  "Content / marketing": f("Makes content stop depending on one person", "You record one idea or talk", ["It becomes posts, an email and a short script in your voice", "Drafts queue for approval", "Performance feeds next week's ideas"], "Consistent output from one input a week."),
  "Social media": f("Keeps channels active without daily effort", "A content piece is approved", ["It is adapted per platform", "Scheduled at the right times", "Comments needing a reply are surfaced"], "Every channel stays alive on a weekly hour."),
  "Email & inbox": f("Clears inbox triage", "An email arrives", ["AI sorts by type and urgency", "Routine replies are drafted for approval", "Anything important is surfaced"], "You read what matters and approve the rest."),
  "Internal workflows": f("Removes the manual handoffs between your tools", "A defined event in one system", ["The right downstream actions fire", "The right person is notified with context", "Exceptions route to a human"], "Handoffs happen instantly and nothing falls through."),
  "Reporting & analytics": f("Builds the report before you ask", "Every Monday morning", ["Numbers are pulled from every source", "AI writes what changed and why", "The summary lands in your inbox"], "Leadership sees the week in five minutes."),
  "Scheduling & admin": f("Ends the back-and-forth", "Someone needs a meeting or task done", ["Booking links and reminders run themselves", "Prep notes are attached", "Admin tasks are created and tracked"], "Your calendar runs itself."),
  "Invoicing & finance": f("Gets cash in faster", "Work is delivered or a milestone is hit", ["The invoice is generated and sent", "Payment reminders follow on a schedule", "Paid invoices reconcile automatically"], "Fewer late payments, less chasing."),
  "Recruiting / HR": f("Takes the grind out of hiring", "An application arrives", ["CVs are screened against your criteria", "Shortlisted people get a booking link", "New hires get an onboarding path"], "You only meet the right people."),
  "Research": f("Turns hours of research into minutes", "You need to know something", ["AI gathers sources and summarises", "Findings are saved to your knowledge base", "You get the answer with sources"], "Decisions backed by research, without the hours."),
  "Not sure yet": f("Finds where to start", "We map your week together", ["Every repeated task is listed", "Each is scored on time saved and ease", "The top one becomes system one"], "A clear first move instead of a guess."),
};

export const DATA_PHRASE: Record<string, string> = {
  "In a CRM": "in a CRM", "Spreadsheets or Sheets": "in spreadsheets", "A proper database": "in a proper database",
  "Cloud drive (Drive, Dropbox, SharePoint)": "in cloud drives", "Inside email inboxes": "inside email inboxes",
  "A custom internal tool": "in a custom internal tool", "Paper or manual records": "on paper or manual records",
  "Scattered across all of these": "scattered across several places",
};

export const OWNER_PHRASE: Record<string, string> = {
  "Me or leadership": "owned by you or leadership", "An ops or admin lead": "owned by an ops or admin lead",
  "Our IT or technical team": "owned by your technical team", "Each team owns their own": "with each team owning its own",
  "No clear owner": "with no clear owner",
};

export const TIMEGO_PHRASE: Record<string, string> = {
  "Copy-pasting between tools": "copy-pasting between tools", "Re-keying the same data": "re-keying the same data",
  "Chasing people for updates": "chasing people for updates", "Leads going cold": "leads going cold",
  "Slow follow-up": "slow follow-up", "Answering the same questions": "answering the same questions",
  "Manual reporting": "manual reporting", "Documents & PDFs by hand": "handling documents and PDFs by hand",
  "Scheduling back-and-forth": "scheduling back-and-forth", "Errors slipping through": "errors slipping through",
  "Nothing is written down": "nothing being written down", "Team at capacity": "a team at capacity",
  "Not sure, that's why I'm here": "work you can't see clearly yet",
};

// Lowercase the first letter for mid-sentence use, but leave acronyms ("AI strategy", "CRM") alone.
const lc = (s: string) => (/^[A-Z]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
export const listJoin = (a: string[]) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);

export interface ResultModel {
  route: Route;
  fit: string;
  why: string;
  where: string;
  flows: { name: string; tpl: FlowTemplate }[];
  tools: string;
  hours: string;
  success: string;
  nail: string[];
}

export function buildResult(a: QuizAnswers): ResultModel {
  const route = routeFor(a);
  const top = (a.automate.length ? a.automate : ["Not sure yet"]).slice(0, 2);
  const realTools = a.tools.filter((t) => !t.startsWith("Mostly"));
  const mostly = a.tools.filter((t) => t.startsWith("Mostly")).map((t) => lc(t).replace("mostly ", ""));
  const tools = realTools.length ? listJoin(realTools.slice(0, 3)) : "the tools you already use";
  const toolsTxt = tools + (mostly.length ? `, with most work still in ${listJoin(mostly)}` : "");
  const hours = a.hours && a.hours !== "Not sure" ? `${a.hours.replace(" hrs", "")} hours a week` : "an unknown number of hours a week";
  const teamTxt = a.team === "Just me" ? "a one-person business" : a.team === "200+" ? "a 200+ person organisation" : `a ${a.team.replace(" to ", "–")} person team`;
  const dataTxt = a.data.length ? listJoin(a.data.slice(0, 2).map((d) => DATA_PHRASE[d] || lc(d))) : "in a few places";
  const ownerTxt = a.owner ? ", " + (OWNER_PHRASE[a.owner] || lc(a.owner)) : "";
  const drains = listJoin(a.timego.slice(0, 2).map((t) => TIMEGO_PHRASE[t] || lc(t)));
  const where = `${a.companyName} is ${teamTxt} doing ${lc(a.businessDesc)}. You run on ${toolsTxt}. Your biggest time ${a.timego.length > 1 ? "drains are" : "drain is"} ${drains}, and ${hours} go to manual work. Your data lives ${dataTxt}${ownerTxt}, so that is what any system has to read from and write back to.`;
  const matters = a.matters.length ? listJoin(a.matters.slice(0, 3).map(lc)) : "time back";
  const success = `Within 90 days, ${lc(top[0])} runs without you, the ${hours} of manual work is visibly down, and you can point to progress on ${matters}.`;
  const nail = [
    `The exact shape of your ${lc(top[0])} workflow today: where it starts, where it stalls`,
    `Which parts of ${tools} are load-bearing and must stay untouched`,
  ];
  const sec = a.security.filter((s) => s !== "Nothing specific");
  if (sec.length) nail.push(`How ${listJoin(sec.slice(0, 2).map(lc))} shapes the design from day one`);
  if (a.tech) {
    const t = a.tech === "We can use no-code tools" ? "no-code capable" : a.tech === "We have developers" ? "developer-led" : lc(a.tech);
    nail.push(`What a ${t} team can own after launch`);
  }
  return {
    route,
    fit: FIT_LABEL[route],
    why: FIT_WHY[route],
    where,
    flows: top.map((name) => ({ name, tpl: FLOWS[name] || FLOWS["Not sure yet"] })),
    tools,
    hours,
    success,
    nail,
  };
}
