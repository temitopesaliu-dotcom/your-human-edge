import {
  BUYERS, BUYER_OTHER, CLIENTS_FROM, COUNTRIES, DOMAINS, DOMAIN_OTHER, PAID, SELL, SITUATIONS, YEARS,
} from './data';
import { isValidEmail } from '@/lib/utils/validation';

/** Raw quiz answers as sent by the quiz page. Indexes point into the option lists in data.ts. */
export interface EfpAnswers {
  domain: number;
  domainOther?: string;
  years: number;
  situation: number;
  country: string;
  city: string;
  clientsFrom: number;
  buyer: number;
  buyerOther?: string;
  problem: string;
  tried: string;
  result?: string;
  noResultYet: boolean;
  paid: number;
  sellFirst: number;
  firstName: string;
  lastName: string;
  email: string;
  consent: boolean;
  utm?: { source?: string; medium?: string; campaign?: string };
  referrer?: string;
}

export interface EfpTier {
  tag: string;
  name: string;
  price: string;
  unit: string;
  why: string;
  pick?: boolean;
}

/** [name or profile, why they fit, who to approach or where to find them] */
export type EfpCompany = [string, string, string];

/** The generated results page content. Same shape as the prototype persona objects. */
export interface EfpBuild {
  gap: string;
  brand: string;
  navCta: string;
  kicker: string;
  h1: string;
  lede: string;
  cta1: string;
  cta2: string;
  priceline: string;
  band: [string, string][];
  thoughts: string[];
  tiers: EfpTier[];
  pricingNote: string;
  who: string;
  want: string[];
  dont: string[];
  companiesHeading: string;
  companiesWhy: string;
  companies: { large: EfpCompany[]; medium: EfpCompany[]; small: EfpCompany[] };
}

export interface EfpResultRecord {
  code: string;
  submissionId: string;
  createdAt: string;
  firstName: string;
  lastName?: string;
  siteSlug: string;
  /** The field's colour (DOMAIN_COLORS). Older records have none and use the default. */
  accent?: string;
  currency: string;
  paidEcho: string;
  source: 'ai';
  build: EfpBuild;
}

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const idx = (v: unknown, len: number) => (Number.isInteger(v) && (v as number) >= 0 && (v as number) < len ? (v as number) : -1);

const UTM_VALUE = /^[a-z0-9][a-z0-9_.-]{0,59}$/i;

/** Validate and normalise answers. Returns the clean answers or the name of the first bad field. */
export function parseAnswers(body: unknown): { ok: true; answers: EfpAnswers } | { ok: false; field: string } {
  if (!body || typeof body !== 'object') return { ok: false, field: 'body' };
  const b = body as Record<string, unknown>;

  const domain = idx(b.domain, DOMAINS.length);
  if (domain < 0) return { ok: false, field: 'domain' };
  const domainOther = clip(b.domainOther, 120);
  if (domain === DOMAIN_OTHER && domainOther.length < 2) return { ok: false, field: 'domainOther' };

  const years = idx(b.years, YEARS.length);
  if (years < 0) return { ok: false, field: 'years' };
  const situation = idx(b.situation, SITUATIONS.length);
  if (situation < 0) return { ok: false, field: 'situation' };

  const country = clip(b.country, 80);
  if (!COUNTRIES.includes(country)) return { ok: false, field: 'country' };
  const city = clip(b.city, 80);
  if (city.length < 2) return { ok: false, field: 'city' };
  const clientsFrom = idx(b.clientsFrom, CLIENTS_FROM.length);
  if (clientsFrom < 0) return { ok: false, field: 'clientsFrom' };

  const buyer = idx(b.buyer, BUYERS.length);
  if (buyer < 0) return { ok: false, field: 'buyer' };
  const buyerOther = clip(b.buyerOther, 120);
  if (buyer === BUYER_OTHER && buyerOther.length < 2) return { ok: false, field: 'buyerOther' };

  const problem = clip(b.problem, 1500);
  if (problem.length < 4) return { ok: false, field: 'problem' };
  const tried = clip(b.tried, 1500);
  if (tried.length < 4) return { ok: false, field: 'tried' };
  const noResultYet = b.noResultYet === true;
  const result = noResultYet ? '' : clip(b.result, 1500);
  if (!noResultYet && result.length < 4) return { ok: false, field: 'result' };

  const paid = idx(b.paid, PAID.length);
  if (paid < 0) return { ok: false, field: 'paid' };
  const sellFirst = idx(b.sellFirst, SELL.length);
  if (sellFirst < 0) return { ok: false, field: 'sellFirst' };

  const firstName = clip(b.firstName, 60);
  if (!firstName) return { ok: false, field: 'firstName' };
  const lastName = clip(b.lastName, 60);
  if (!lastName) return { ok: false, field: 'lastName' };
  const email = clip(b.email, 200).toLowerCase();
  if (!isValidEmail(email)) return { ok: false, field: 'email' };
  if (b.consent !== true) return { ok: false, field: 'consent' };

  const rawUtm = (b.utm && typeof b.utm === 'object' ? b.utm : {}) as Record<string, unknown>;
  const utm: EfpAnswers['utm'] = {};
  for (const k of ['source', 'medium', 'campaign'] as const) {
    const v = clip(rawUtm[k], 60);
    if (v && UTM_VALUE.test(v)) utm[k] = v.toLowerCase();
  }

  return {
    ok: true,
    answers: {
      domain, domainOther, years, situation, country, city, clientsFrom, buyer, buyerOther,
      problem, tried, result, noResultYet, paid, sellFirst, firstName, lastName, email, consent: true,
      utm, referrer: clip(b.referrer, 300),
    },
  };
}
