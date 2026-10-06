import {
  BUYERS, BUYER_OTHER, CLIENTS_FROM, DOMAINS, DOMAIN_OTHER, PAID, SELL, SITUATIONS, YEARS, currencyFor,
} from './data';
import type { EfpAnswers, EfpBuild, EfpCompany, EfpTier } from './types';

export const EFP_MODEL = 'claude-sonnet-5-5';
const AI_TIMEOUT_MS = 50_000;

export interface GenerateResult {
  build: EfpBuild;
  source: 'ai' | 'template';
  tokensIn?: number;
  tokensOut?: number;
  error?: string;
}

const SYSTEM_PROMPT = `You write the Expert Framework Profile: a short, personal preview of the business someone's expertise could become. The reader is a professional, often employed, who has never packaged or priced what they know. They should finish reading and think "that's me, and that's worth real money".

Write in plain, direct English. Short sentences. No jargon, no hype, no exclamation marks. Never use the em dash character. Use the buyer's own words from the problem and what they tried wherever you can.

Return ONLY one JSON object, no markdown, matching exactly this shape:
{
 "gap": string,            // one sentence: one buyer unit times the core price, e.g. "One cohort of this programme is worth ₦2.8M to one company."
 "brand": string,          // the offer name, 2 to 6 words
 "navCta": string,         // 2 to 4 words, the entry tier action, e.g. "Book the Diagnostic"
 "kicker": string,         // under 9 words: what it is and who it is for
 "h1": string,             // homepage headline in the buyer's language, under 22 words
 "lede": string,           // one sentence, under 35 words, who it is for and what it does
 "cta1": string, "cta2": string,  // two short button labels
 "priceline": string,      // e.g. "From QAR 16,500 · Findings in 3 weeks · 20+ years in aviation training"
 "band": [[string,string],[string,string],[string,string],[string,string]], // 4 proof stats: [big value, small label]
 "thoughts": [string,string,string], // what the buyer tells themselves this week, in their words
 "tiers": [ {"tag":"Entry","name":string,"price":string,"unit":string,"why":string},
            {"tag":"Core · most chosen","name":string,"price":string,"unit":string,"why":string,"pick":true},
            {"tag":"Premium","name":string,"price":string,"unit":string,"why":string} ],
 "pricingNote": string,    // one sentence: "These prices reflect your ..." (experience, buyer, paid history)
 "who": string,            // one sentence describing the buyer
 "want": [string,string,string],
 "dont": [string,string,string],
 "companiesHeading": string, // e.g. "12 Lagos companies that buy this" (location only here)
 "companiesWhy": string,     // one sentence on how they were matched
 "companies": { "large": [[name, why they fit, role to approach] x4],
                "medium": [[name, why they fit, role to approach] x4],
                "small": [[profile, why they fit, "Find them: where"] x4] }
}

Rules:
- Proof: if the person gave a result, the first band stat comes from it, quoting their numbers exactly. If they have no result yet, lead with their years of experience and the offer. Never invent a result, statistic, testimonial or case study.
- Offer: the core tier is built around what they would rather sell first. If they are not sure, pick the best format for their buyer. Entry is a low-risk first step. Premium is ongoing support or a bigger engagement.
- Prices: show every price in the currency given, formatted the way that currency is normally written (e.g. ₦450,000, £2,400, $7,500, QAR 16,500, KSh 120,000). Use your knowledge of typical market rates for this kind of work in this country, then round to clean price points. Guidance for the core price in USD before converting: individual buyers 150 to 300 (1 to 3 years), 300 to 600 (4 to 7), 500 to 1,000 (8 to 12), 800 to 1,500 (13 to 20), 1,200 to 2,500 (20+); organisation buyers 1,000 to 2,500, 2,000 to 5,000, 4,000 to 8,000, 6,000 to 12,000, 10,000 to 20,000. Never paid sits low in the range, paid regularly sits high. Small business owners pay less than companies, large companies pay more. In lower-income markets prices are lower in USD terms.
- Companies: large and medium follow the buyer. If the buyer is a company, name companies. If the buyer is small business owners or individuals, name the organisations that gather or pay for them (chambers, associations, hubs, employers with staff budgets). Large and medium are real, well-known organisations in or near the given location. Small are profiles only, never invented names, each with where to find them. Never state specific facts about a named company (funding, headcount, news). Keep the reason it fits general and true.
- Location: match companies to the city and country. Keep place names out of every field except companiesHeading and companiesWhy.
- If a field or buyer was typed as "Other", interpret the typed text sensibly.
- Keep it short. The whole JSON must stay under 900 words. Each company reason under 10 words, each role under 5 words, each tier "why" under 20 words.`;

function brief(a: EfpAnswers, currency: string): string {
  const field = a.domain === DOMAIN_OTHER ? a.domainOther : DOMAINS[a.domain];
  const buyer = a.buyer === BUYER_OTHER ? `Other: ${a.buyerOther}` : BUYERS[a.buyer];
  return JSON.stringify({
    firstName: a.firstName,
    field,
    yearsDoingThis: YEARS[a.years],
    situation: SITUATIONS[a.situation],
    basedIn: `${a.city}, ${a.country}`,
    clientsFrom: CLIENTS_FROM[a.clientsFrom],
    whoBringsTheProblem: buyer,
    problemInTheirWords: a.problem,
    whatTheyAlreadyTried: a.tried,
    bestResult: a.noResultYet ? 'No result yet' : a.result,
    paidOutsideJob: PAID[a.paid],
    wouldRatherSellFirst: SELL[a.sellFirst],
    currency,
  }, null, 1);
}

const str = (v: unknown, max = 400) => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max).replace(/\u2014/g, ',') : null);

function strList(v: unknown, n: number, max = 200): string[] | null {
  if (!Array.isArray(v) || v.length < n) return null;
  const out = v.slice(0, n).map((x) => str(x, max));
  return out.every(Boolean) ? (out as string[]) : null;
}

function companyList(v: unknown): EfpCompany[] | null {
  if (!Array.isArray(v) || v.length < 4) return null;
  const out = v.slice(0, 4).map((c) => (Array.isArray(c) ? [str(c[0], 120), str(c[1], 200), str(c[2], 160)] : [null, null, null]));
  return out.every((c) => c.every(Boolean)) ? (out as EfpCompany[]) : null;
}

/** Check the model's JSON has every field the page needs. Returns null if anything is missing. */
export function validateBuild(raw: unknown): EfpBuild | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const band = Array.isArray(r.band) && r.band.length >= 4
    ? r.band.slice(0, 4).map((b) => (Array.isArray(b) ? [str(b[0], 30), str(b[1], 60)] : [null, null]))
    : null;
  const tiersRaw = Array.isArray(r.tiers) && r.tiers.length >= 3 ? r.tiers.slice(0, 3) : null;
  const tiers = tiersRaw?.map((t, i) => {
    const o = (t || {}) as Record<string, unknown>;
    const tier: EfpTier = {
      tag: str(o.tag, 40) || ['Entry', 'Core · most chosen', 'Premium'][i],
      name: str(o.name, 80) || '',
      price: str(o.price, 40) || '',
      unit: str(o.unit, 60) || '',
      why: str(o.why, 260) || '',
      pick: i === 1,
    };
    return tier;
  });
  const cos = (r.companies || {}) as Record<string, unknown>;
  const build = {
    gap: str(r.gap, 220), brand: str(r.brand, 80), navCta: str(r.navCta, 40), kicker: str(r.kicker, 120),
    h1: str(r.h1, 220), lede: str(r.lede, 320), cta1: str(r.cta1, 40), cta2: str(r.cta2, 40),
    priceline: str(r.priceline, 200), pricingNote: str(r.pricingNote, 260), who: str(r.who, 260),
    companiesHeading: str(r.companiesHeading, 120), companiesWhy: str(r.companiesWhy, 260),
    band, tiers,
    thoughts: strList(r.thoughts, 3), want: strList(r.want, 3), dont: strList(r.dont, 3),
    companies: { large: companyList(cos.large), medium: companyList(cos.medium), small: companyList(cos.small) },
  };
  const ok = Object.entries(build).every(([k, v]) => {
    if (k === 'companies') return Object.values(v as object).every(Boolean);
    if (k === 'band') return Array.isArray(v) && (v as unknown[][]).every((p) => p.every(Boolean));
    if (k === 'tiers') return Array.isArray(v) && (v as EfpTier[]).every((t) => t.name && t.price && t.why);
    return Boolean(v);
  });
  return ok ? (build as unknown as EfpBuild) : null;
}

function extractJson(text: string): unknown {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  try { return JSON.parse(cleaned.slice(start, end + 1)); } catch { return null; }
}

/** Ask Claude for the build. Falls back to the template version on any failure, so the person always gets a page. */
export async function generateBuild(a: EfpAnswers): Promise<GenerateResult> {
  const currency = currencyFor(a.country);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { build: buildTemplate(a), source: 'template', error: 'ANTHROPIC_API_KEY not set' };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: EFP_MODEL,
        max_tokens: 6000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: `Build the profile for this person.\n${brief(a, currency)}` }],
      }),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      return { build: buildTemplate(a), source: 'template', error: `anthropic ${res.status} ${t.slice(0, 200)}` };
    }
    const data = (await res.json()) as {
      content?: { type: string; text?: string }[];
      usage?: { input_tokens?: number; output_tokens?: number };
    };
    const text = (data.content || []).filter((c) => c.type === 'text').map((c) => c.text || '').join('\n');
    const build = validateBuild(extractJson(text));
    const usage = { tokensIn: data.usage?.input_tokens, tokensOut: data.usage?.output_tokens };
    if (!build) return { build: buildTemplate(a), source: 'template', error: 'invalid AI output', ...usage };
    return { build, source: 'ai', ...usage };
  } catch (err) {
    return { build: buildTemplate(a), source: 'template', error: err instanceof Error ? err.message : String(err) };
  }
}

/* ---------- Template version: no AI, no cost. Used when the AI is off, fails or runs out of credit. ---------- */

const FORMAT_NAMES = [
  'Advisory Sessions', 'Done-For-You Service', 'Audit and Action Plan', 'Group Programme',
  'Team Workshop', 'Monthly Partner', 'Toolkit', 'Talk and Workshop',
];
/** Core format when the person picks "Not sure", by buyer type. */
const DEFAULT_CORE = [3, 3, 2, 0, 4, 2, 4, 4, 0];

const BUYER_PROFILES: Record<'large' | 'medium' | 'small', string>[] = [
  { large: 'Large employers that pay for staff development', medium: 'Mid-size employers with learning or wellbeing budgets', small: 'Communities and associations where these professionals gather' },
  { large: 'Large institutions and platforms that reach them', medium: 'Local schools, colleges and community organisations', small: 'Groups, clubs and online channels where they gather' },
  { large: 'National bodies that gather small businesses', medium: 'Regional hubs, workspaces and networking groups', small: 'The small businesses themselves, by type' },
  { large: 'Accelerators and investors whose founders need this', medium: 'Local startup hubs and founder communities', small: 'Founders by stage and situation' },
  { large: 'Large companies with many teams facing this problem', medium: 'Mid-size, fast-growing companies', small: 'Small companies, by size and situation' },
  { large: 'Large companies in your sector', medium: 'Mid-market companies in the same sector', small: 'The teams to approach inside large companies' },
  { large: 'National agencies and ministries', medium: 'Regional bodies, universities and large NGOs', small: 'Local councils, schools and small NGOs' },
  { large: 'Professional bodies in your field', medium: 'Training providers and conferences in your field', small: 'Peer communities where practitioners gather' },
  { large: 'The largest organisations that match your buyer', medium: 'Smaller organisations that match your buyer', small: 'Profiles of your buyer, by situation' },
];

/** Core price guide in USD by experience (Q2): individual buyers, then organisation buyers. Same table the AI is given. */
const BANDS = { person: [[150, 300], [300, 600], [500, 1000], [800, 1500], [1200, 2500]], org: [[1000, 2500], [2000, 5000], [4000, 8000], [6000, 12000], [10000, 20000]] };
/** How far up the band someone starts, from Q9 (never paid to paid regularly). */
const BAND_POSITION = [0.1, 0.15, 0.5, 0.85];
/** Small business owners pay less than companies, large companies pay more. Index matches BUYERS. */
const BUYER_FACTOR = [1, 0.6, 0.45, 0.8, 1, 1.3, 1, 0.5, 1];

const roundPrice = (n: number) => (n >= 10000 ? Math.round(n / 500) * 500 : n >= 1000 ? Math.round(n / 50) * 50 : Math.round(n / 10) * 10);
const usd = (n: number) => `$${roundPrice(n).toLocaleString('en-US')}`;

/** Sample prices in US dollars for the card version. No AI and no exchange rates involved. */
export function samplePricesUsd(a: EfpAnswers): { entry: string; core: string; premium: string } {
  const band = (a.buyer <= 1 ? BANDS.person : BANDS.org)[a.years];
  const core = (band[0] + (band[1] - band[0]) * BAND_POSITION[a.paid]) * BUYER_FACTOR[a.buyer];
  return { entry: usd(Math.max(a.buyer <= 1 ? 40 : 150, core * 0.2)), core: usd(core), premium: usd(core * 0.4) };
}

const firstSentence = (s: string, max = 150) => {
  const t = s.replace(/[“”"]/g, '').trim();
  const cut = t.split(/(?<=[.!?])\s/)[0] || t;
  return cut.length > max ? `${cut.slice(0, max - 1).trim()}…` : cut;
};

export function buildTemplate(a: EfpAnswers): EfpBuild {
  const field = a.domain === DOMAIN_OTHER ? (a.domainOther || 'your field') : DOMAINS[a.domain].split(' / ')[0];
  const core = a.sellFirst === SELL.length - 1 ? DEFAULT_CORE[a.buyer] : a.sellFirst;
  const coreName = FORMAT_NAMES[core];
  const brand = `The ${field} ${coreName}`.slice(0, 80);
  const buyerLabel = a.buyer === BUYER_OTHER ? (a.buyerOther || 'your buyers') : BUYERS[a.buyer].toLowerCase();
  const profiles = BUYER_PROFILES[a.buyer];
  const companies = (['large', 'medium', 'small'] as const).reduce((acc, tier) => {
    acc[tier] = [[profiles[tier], 'Matched to who brings you this problem', tier === 'small' ? 'Find them: in the workshop list' : 'Approach: the team that owns this problem']] as unknown as EfpCompany[];
    return acc;
  }, {} as EfpBuild['companies']);
  const prices = samplePricesUsd(a);
  return {
    gap: 'What you already know is worth more than you have been charging for it.',
    brand,
    navCta: 'Book a first call',
    kicker: `${field} expertise for ${buyerLabel}`,
    h1: firstSentence(a.problem, 140) || `Help for ${buyerLabel}`,
    lede: `For ${buyerLabel} who have already tried ${firstSentence(a.tried, 90).toLowerCase()}: a ${coreName.toLowerCase()} built on ${YEARS[a.years]} of doing this.`,
    cta1: 'Book a first call',
    cta2: 'See how it works',
    priceline: `From ${prices.entry} · ${YEARS[a.years]} in ${field.toLowerCase()} · Built for ${buyerLabel}`,
    band: a.noResultYet || !a.result
      ? [[YEARS[a.years].replace(' years', ' yrs'), `in ${field.toLowerCase()}`], ['1', 'offer, built around you'], ['3', 'ways to work with you'], ['12', 'kinds of buyers to approach']]
      : [[firstSentence(a.result, 28), 'your best result'], [YEARS[a.years].replace(' years', ' yrs'), `in ${field.toLowerCase()}`], ['3', 'ways to work with you'], ['12', 'kinds of buyers to approach']],
    thoughts: [firstSentence(a.problem, 160), firstSentence(a.tried, 160), 'I know there has to be a better way to sort this out.'],
    tiers: [
      { tag: 'Entry', name: 'First Call', price: prices.entry, unit: 'one-off', why: 'A low-risk first step to see where things stand.' },
      { tag: 'Core · most chosen', name: coreName, price: prices.core, unit: 'core offer', why: 'The main way you help, built around what you would rather sell.', pick: true },
      { tag: 'Premium', name: 'Ongoing Partner', price: prices.premium, unit: 'per month', why: 'Continued support for clients who want you close.' },
    ],
    pricingNote: `Sample prices in US dollars. Your prices in ${currencyFor(a.country)} are worked out properly in the workshop.`,
    who: `${BUYERS[a.buyer] === 'Other' ? a.buyerOther : BUYERS[a.buyer]} who bring you this problem.`,
    want: ['A clear way out of the problem', 'Someone who has done this before', 'Results they can see'],
    dont: ['Another thing that does not stick', 'Generic advice', 'Wasted time and money'],
    companiesHeading: `Who to approach in ${a.city}`,
    companiesWhy: 'Matched on who brings you this problem. The workshop turns these into named companies.',
    companies,
  };
}
