import COUNTRY_CURRENCY from './country-currency.json';

/** Bump when questions change, so answers in the Sheet stay comparable. */
export const QUIZ_VERSION = 'efp-v1';

export const WORKSHOP_URL = '/expert-framework';

export const DOMAINS = [
  'Business / Strategy / Consulting',
  'Marketing / Branding / Communications',
  'Finance / Accounting / Investment',
  'HR / People / Talent / L&D',
  'Legal / Compliance / Risk',
  'Health / Wellness / Medicine',
  'Education / Training / Coaching',
  'Technology / Product / Engineering',
  'Creative / Design / Content',
  'Operations / Supply Chain / Logistics',
  'Sales / Business Development',
  'Aviation / Transport',
  'Real Estate / Construction',
  'Energy / Utilities',
  'Hospitality / Travel',
  'Government / Public Sector',
  'Other',
] as const;
export const DOMAIN_OTHER = DOMAINS.length - 1;

/** One colour per field, used across the results page. All pass contrast with white text. Index matches DOMAINS. */
export const DOMAIN_COLORS = [
  '#1e3a8a', '#be185d', '#1d4ed8', '#0f766e', '#4338ca', '#15803d', '#c2410c', '#0369a1', '#a21caf',
  '#475569', '#b45309', '#0e7490', '#92400e', '#a16207', '#be123c', '#334155', '#7c3aed',
];
export const DEFAULT_ACCENT = '#7c3aed';

/** Short names used in "Example from ..." labels. Index matches DOMAINS (except Other). */
export const DOMAIN_SHORT = [
  'business', 'marketing', 'finance', 'HR', 'legal', 'health', 'education', 'technology',
  'creative', 'operations', 'sales', 'aviation', 'real estate', 'energy', 'hospitality', 'government',
];

/** [problem in their words, what they tried, best result] per domain. Last row is the generic set for Other. */
export const DOMAIN_EXAMPLES: [string, string, string][] = [
  ['“We’re growing fast but every decision goes through me and nothing runs without me.”', '“Hired a general manager who left, tried three project tools, paid for a strategy workshop.”', '“Helped a 15-person firm cut owner decisions by half and grow revenue 40% in a year.”'],
  ['“We post every day and nobody buys.”', '“Boosted posts, a cheap agency, a course on funnels.”', '“Took a local brand from 50 to 400 leads a month in four months.”'],
  ['“Sales are coming in but there’s never money in the account.”', '“A bookkeeper who only files returns, a cash-flow spreadsheet they stopped updating.”', '“Found 12% of annual costs leaking out of a family restaurant through supplier pricing and the staff rota.”'],
  ['“Our best people got promoted to manager and now their teams are falling apart.”', '“A 2-day leadership off-site, LinkedIn Learning licences nobody used, a one-off feedback session.”', '“Coached 6 first-time managers at a fintech. Team attrition went from about 30% to 8% in a year.”'],
  ['“We signed a contract without reading it properly and now we’re stuck with it.”', '“Downloaded templates online, asked a friend who’s a lawyer, hoped for the best.”', '“Renegotiated terms that cut a client’s yearly risk exposure by about a third.”'],
  ['“My back and neck hurt every day after work and I’ve just accepted that’s what a desk job does.”', '“A standing desk, random YouTube stretches, massages that wear off in two days.”', '“A software engineer went from about 4 sick days a month to zero in 8 weeks.”'],
  ['“My students understand it in class and forget it by the exam.”', '“Extra homework, a tutoring app, a private tutor for a few weeks.”', '“Moved a class average from 52% to 71% in one term.”'],
  ['“We built the product but nobody can tell whether it’s actually working.”', '“Hired a freelance developer, bought three analytics tools, started a rebuild that stalled.”', '“Cut a client’s release time from three weeks to four days.”'],
  ['“Our brand looks different everywhere and customers don’t recognise us.”', '“A logo from a freelance site, templates, a new designer every year.”', '“Rebuilt a bakery chain’s brand and repeat orders went up 25% in six months.”'],
  ['“Orders go out late and nobody knows where the delay is.”', '“A new software system, extra staff, weekly ‘urgent’ meetings.”', '“Cut late deliveries from 18% of orders to 5% in 90 days.”'],
  ['“We’re getting demos but nobody’s closing, and I’m still the only one who can sell.”', '“Hired an SDR who burned out, bought a sales course, paid for a CRM nobody updates.”', '“Built the first sales playbook at a SaaS startup. Win rate went from 12% to 31% in two quarters.”'],
  ['“Our crew training costs a fortune and we still fail audits.”', '“More classroom hours, an outside auditor once a year, a new training platform.”', '“Helped a regional operator pass its safety audit with no major findings, after two failed ones.”'],
  ['“Our projects keep running over budget and clients blame us.”', '“A new project manager, weekly site meetings, a fixed-price contract that backfired.”', '“Brought a 20-unit development in 8% under budget after two over-runs.”'],
  ['“Our energy bills keep rising and we don’t know where it’s all going.”', '“Switching suppliers, a one-off audit, asking staff to switch things off.”', '“Cut a factory’s monthly energy use by 22% without buying new equipment.”'],
  ['“We’re full at weekends and empty on weekdays.”', '“Discount vouchers, a social media agency, a new menu.”', '“Lifted weekday bookings by 35% for a 40-seat restaurant in two months.”'],
  ['“Our programmes get funded but we can’t show what they achieved.”', '“Annual reports nobody reads, a one-off consultant, a spreadsheet of outputs.”', '“Built the reporting system that helped a ministry unit win its next three-year grant.”'],
  ['“People keep asking me the same question because they can’t work it out alone.”', '“Free videos, a book, asking around.”', '“Helped a client go from zero to 10 paying customers in 60 days.”'],
];

export const YEARS = ['1 to 3 years', '4 to 7 years', '8 to 12 years', '13 to 20 years', '20 years or more'] as const;

export const SITUATIONS = [
  'Employed full-time, want something on the side',
  'Freelancer or independent consultant',
  'Business owner or founder',
  'Coach or trainer',
  'In transition between roles',
] as const;

export const CLIENTS_FROM = ['In my city', 'Across my country', 'Anywhere, remotely'] as const;

export const BUYERS = [
  'Individual professionals',
  'Consumers or students',
  'Small business owners',
  'Founders and startups',
  'Managers or teams inside companies',
  'Large companies',
  'Government and institutions',
  'Other experts in my field',
  'Other',
] as const;
export const BUYER_OTHER = BUYERS.length - 1;

export const PAID = ['Never', 'Only helped people for free', 'Yes, a few times', 'Yes, regularly'] as const;

export const SELL = [
  '1:1 advisory or consulting',
  'Done-for-you service',
  'Project or audit',
  'Group programme or cohort',
  'Training or workshops for teams',
  'Monthly retainer',
  'Digital product (course, template, toolkit)',
  'Speaking or events',
  'Not sure, show me',
] as const;

export const CURRENCY_BY_COUNTRY: Record<string, string> = COUNTRY_CURRENCY as Record<string, string>;
export const COUNTRIES: string[] = Object.keys(CURRENCY_BY_COUNTRY).sort((a, b) => a.localeCompare(b));

export function currencyFor(country: string): string {
  return CURRENCY_BY_COUNTRY[country] || 'USD';
}

/** What the person tells us about their last purchase history (Q9), echoed above the gap headline. */
export const PAID_ECHO = [
  'You told us you’ve never been paid for this.',
  'You told us you’ve only ever helped people for free.',
  'You told us you’ve been paid a few times.',
  'You told us you’re paid regularly.',
];
