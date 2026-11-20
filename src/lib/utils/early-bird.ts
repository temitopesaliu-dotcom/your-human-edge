/**
 * Weekly early-bird window: Saturday 12:00 to Tuesday 12:00, London wall clock.
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
  // Saturday 12:00 (720) up to, not including, Tuesday 12:00 (3 * 1440 + 720).
  return minutes >= 720 && minutes < 3 * 1440 + 720;
}

/** The recorded Expert Framework Workshop, in minor units. */
export const WORKSHOP_PRICES = {
  USD: { full: 12900, early: 12700 },
  GBP: { full: 9900, early: 9800 },
} as const;

export type WorkshopCurrency = keyof typeof WORKSHOP_PRICES;

export function workshopAmount(cur: WorkshopCurrency, nowMs: number = Date.now()): number {
  const p = WORKSHOP_PRICES[cur];
  return isEarlyBird(nowMs) ? p.early : p.full;
}
