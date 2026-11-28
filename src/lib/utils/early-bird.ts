/**
 * Weekly early-bird window: Saturday 12:30 to Monday 12:30 (48 hours), London
 * wall clock. Was Sat 12:00 to Tue 12:00 (72h) until 28 Nov 2026.
 * Same rule as public/offers/offers.js (isEarly). Wall-clock based, so it is
 * DST-safe without any offset maths.
 */
const DAY_INDEX: Record<string, number> = { Sat: 0, Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6 };

export function isEarlyBird(nowMs: number = Date.now()): boolean {
  const parts: Record<string, string> = {};
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .formatToParts(new Date(nowMs))
    .forEach((p) => {
      parts[p.type] = p.value;
    });
  const day = DAY_INDEX[parts.weekday] ?? 6;
  const minutes = day * 1440 + Number(parts.hour) * 60 + Number(parts.minute);
  // Saturday 12:30 (750) up to, not including, Monday 12:30 (2 * 1440 + 750).
  return minutes >= 750 && minutes < 2 * 1440 + 750;
}

/** The recorded Expert Framework Workshop, in minor units. Full price $129 / £99;
 *  30% off in the weekly window: $90 / £69 (129 x 0.7 = 90.30, 99 x 0.7 = 69.30). */
export const WORKSHOP_PRICES = {
  USD: { full: 12900, early: 9000 },
  GBP: { full: 9900, early: 6900 },
} as const;

export type WorkshopCurrency = keyof typeof WORKSHOP_PRICES;

export function workshopAmount(cur: WorkshopCurrency, nowMs: number = Date.now()): number {
  const p = WORKSHOP_PRICES[cur];
  return isEarlyBird(nowMs) ? p.early : p.full;
}
