export const BUSINESS_TYPE_OPTIONS = [
  { value: "coach", label: "Coach (1:1 or group)" },
  { value: "consultant", label: "Consultant" },
  { value: "agency", label: "Agency" },
  { value: "saas-founder", label: "SaaS / Tech Founder" },
  { value: "creator", label: "Creator / Educator" },
  { value: "service-business", label: "Service Business" },
  { value: "professional-services", label: "Professional Services (legal, finance, medical)" },
  { value: "ecommerce", label: "E-commerce / Product Business" },
  { value: "other", label: "Other" },
];

export const TEAM_SIZE_OPTIONS = [
  { value: "solo", label: "Solo (just me)" },
  { value: "2-5", label: "2–5" },
  { value: "6-15", label: "6–15" },
  { value: "16-25", label: "16–25" },
  { value: "25+", label: "25+" },
];

export const SYSTEMATIZE_OPTIONS = [
  { value: "lead-capture", label: "Lead capture and qualification" },
  { value: "client-onboarding", label: "Client onboarding" },
  { value: "client-delivery", label: "Client delivery and communication" },
  { value: "content", label: "Content creation and distribution" },
  { value: "knowledge", label: "Internal knowledge management" },
  { value: "sales", label: "Sales intelligence and follow-up" },
  { value: "ops", label: "General operations and team coordination" },
  { value: "support", label: "Customer support" },
  { value: "reporting", label: "Reporting and visibility" },
  { value: "records-compliance", label: "Records and compliance" },
  { value: "training-enablement", label: "Training and enablement" },
  { value: "other", label: "Something else (not listed above)" },
];

export const OTHER_SYSTEMATIZE_PREFIX = "Other:";

/** Removes every trace of the "Other" selection (bare value or free-text entry). */
export function stripOtherSystematize(values: string[]): string[] {
  return values.filter((v) => v !== "other" && !v.startsWith(OTHER_SYSTEMATIZE_PREFIX));
}

/**
 * Merges the free-text "Other" answer into the systematize selections.
 * With text, the answer is submitted as its own entry (e.g.
 * "Other: weekly reporting") so it flows through the normal form submission
 * alongside the other options. Checked with no text yet, it submits the bare
 * "other" value so the selection is still recorded.
 */
export function withOtherSystematize(values: string[], text: string): string[] {
  const trimmed = text.trim();
  const base = stripOtherSystematize(values);
  return trimmed ? [...base, `${OTHER_SYSTEMATIZE_PREFIX} ${trimmed}`] : [...base, "other"];
}

export const BUDGET_OPTIONS = [
  { value: "under-1000", label: "Under $1,000" },
  { value: "1000-2500", label: "$1,000–$2,500" },
  { value: "2500-5000", label: "$3,500–$5,000" },
  { value: "5000-10000", label: "$5,000–$10,000" },
  { value: "10000-plus", label: "$10,000+" },
  { value: "not-sure", label: "Not sure yet — the Blueprint will help me decide" },
];

export const LOW_BUDGET_VALUES = ["under-1000", "1000-2500"];

export const TIMELINE_OPTIONS = [
  { value: "asap", title: "Ready now", desc: "I want to move forward as soon as possible" },
  { value: "30-days", title: "Within 30 days", desc: "I'm planning ahead but want to move this quarter" },
  { value: "60-90-days", title: "60–90 days", desc: "I'm evaluating options and gathering information" },
  { value: "exploring", title: "Just exploring", desc: "No firm timeline — I want to understand what's possible" },
];

export const HOW_HEARD_OPTIONS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral from someone I know" },
  { value: "google", label: "Google search" },
  { value: "podcast", label: "Podcast" },
  { value: "twitter-x", label: "Twitter / X" },
  { value: "instagram", label: "Instagram" },
  { value: "content", label: "Article or blog post" },
  { value: "other", label: "Other" },
];
