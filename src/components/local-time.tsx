'use client';

import { useSyncExternalStore } from 'react';

/**
 * "That's 3:00pm Saturday, West Africa Standard Time, where you are."
 *
 * Takes the class start as a UTC instant and shows it in the visitor's own
 * time zone, read from their browser. Renders nothing on the server and
 * nothing for visitors already on London time (the printed date covers
 * them), so there is no hydration mismatch and no line repeating the same
 * time twice. If the browser cannot tell us its zone, it also renders nothing.
 */
function describe(iso: string): string | null {
  try {
    const start = new Date(iso);
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!zone) return null;

    const full = (tz: string) =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, weekday: 'long', day: 'numeric', month: 'long',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }).format(start);

    // Same wall-clock time as London: nothing new to tell them.
    if (full(zone) === full('Europe/London')) return null;

    const time = new Intl.DateTimeFormat('en-GB', {
      timeZone: zone, hour: 'numeric', minute: '2-digit', hour12: true,
    }).format(start).replace(/\s/g, '').toLowerCase();

    const day = new Intl.DateTimeFormat('en-GB', {
      timeZone: zone, weekday: 'long', day: 'numeric', month: 'long',
    }).format(start);

    const zoneName =
      new Intl.DateTimeFormat('en-GB', { timeZone: zone, timeZoneName: 'long' })
        .formatToParts(start)
        .find((p) => p.type === 'timeZoneName')?.value ?? zone;

    return `That's ${time} on ${day} (${zoneName}) where you are.`;
  } catch {
    // Old browser without full Intl support: the London time already shows.
    return null;
  }
}

const noSubscribe = () => () => {};

export default function LocalTime({ iso, className }: { iso: string; className?: string }) {
  // Server render: null. Browser: the visitor's own time. No effect, no flash
  // of wrong content, no hydration mismatch.
  const text = useSyncExternalStore(noSubscribe, () => describe(iso), () => null);

  if (!text) return null;
  return (
    <p className={className} style={{ margin: '6px 0 0', fontSize: '13px', lineHeight: 1.4, opacity: 0.85 }}>
      {text}
    </p>
  );
}
