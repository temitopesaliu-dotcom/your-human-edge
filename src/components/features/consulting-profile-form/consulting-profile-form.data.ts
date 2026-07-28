export const REQUIRED_FIELDS = [
  "full_name", "preferred_name", "email", "country", "timezone",
  "current_role", "years_experience", "industry", "advice_areas", "greatest_strength",
  "core_problem", "proudest_work", "org_types",
  "why_joined", "best_workshop", "key_question",
  "ai_confidence", "ai_tools", "ai_transformative",
  "business_name", "business_industry", "business_challenge", "business_friction", "business_why",
  "six_months_vision",
] as const;

export type FieldName = (typeof REQUIRED_FIELDS)[number] | "linkedin" | "business_size" | "anything_else";

export const FIELD_MAP: Record<string, string> = {
  full_name: "f-fname", preferred_name: "f-pref",
  email: "f-email", country: "f-country", timezone: "f-tz",
  current_role: "f-role", years_experience: "f-years",
  industry: "f-industry", advice_areas: "f-sought", greatest_strength: "f-strength",
  core_problem: "f-problem", proudest_work: "f-proud", org_types: "f-orgtypes",
  why_joined: "f-why", best_workshop: "f-best", key_question: "f-question",
  ai_confidence: "f-aiconf", ai_tools: "f-aitools", ai_transformative: "f-aitransform",
  business_name: "f-bizname", business_industry: "f-bizindustry",
  business_challenge: "f-bizchallenge", business_friction: "f-bizfriction",
  business_why: "f-bizwhy", six_months_vision: "f-sixmonths",
};

export const ERROR_MESSAGES: Record<string, string> = {
  full_name: "Please enter your full name.",
  preferred_name: "Please enter your preferred name.",
  email: "Please enter a valid email address.",
  country: "Please enter your country.",
  timezone: "Please enter your time zone.",
  current_role: "Please select your current role.",
  years_experience: "Please select your experience level.",
  industry: "Please enter your industry or industries.",
  advice_areas: "Please answer this question.",
  greatest_strength: "Please answer this question.",
  core_problem: "Please answer this question.",
  proudest_work: "Please answer this question.",
  org_types: "Please select at least one organisation type.",
  why_joined: "Please answer this question.",
  best_workshop: "Please answer this question.",
  key_question: "Please answer this question.",
  ai_confidence: "Please select a confidence rating.",
  ai_tools: "Please answer this question.",
  ai_transformative: "Please answer this question.",
  business_name: "Please enter the business name.",
  business_industry: "Please enter the industry.",
  business_challenge: "Please answer this question.",
  business_friction: "Please answer this question.",
  business_why: "Please answer this question.",
  six_months_vision: "Please answer this question.",
};

export const CURRENT_ROLE_OPTIONS = [
  { value: "Employed full-time", label: "Employed full-time in a corporate or organisation" },
  { value: "Independent consultant", label: "Independent consultant or freelancer" },
  { value: "Business owner", label: "Business owner or founder" },
  { value: "Coach or trainer", label: "Coach or trainer" },
  { value: "Multiple of the above", label: "Multiple of the above" },
  { value: "In transition", label: "In transition between roles" },
];

export const YEARS_EXPERIENCE_OPTIONS = [
  { value: "1-3 years", label: "1 to 3 years" },
  { value: "4-7 years", label: "4 to 7 years" },
  { value: "8-12 years", label: "8 to 12 years" },
  { value: "13-20 years", label: "13 to 20 years" },
  { value: "20+ years", label: "20 years or more" },
];

export const ORG_TYPE_OPTIONS = [
  { value: "Small businesses and startups", label: "Small businesses and startups" },
  { value: "Corporate and enterprise", label: "Corporate and enterprise" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Government or public sector", label: "Government or public sector" },
  { value: "Non-profit", label: "Non-profit" },
  { value: "Professional services", label: "Professional services" },
  { value: "Technology", label: "Technology" },
  { value: "Manufacturing", label: "Manufacturing" },
];
