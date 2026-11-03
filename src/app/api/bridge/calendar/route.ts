import { NextRequest, NextResponse } from 'next/server';

/**
 * Calendar file for The Bridge sessions, so "Apple / other (.ics)" downloads a real event.
 * GET /api/bridge/calendar?kind=training|vip&start=<ISO time>
 * The page works out the next session time in the visitor's browser and passes it here.
 */
const KINDS = {
  training: {
    title: 'Free live training with Temitope Saliu',
    link: 'https://temitopesaliu.com/live',
    minutes: 90,
    file: 'the-bridge-free-training',
  },
  vip: {
    title: 'VIP live Q&A with Temitope Saliu',
    link: 'https://temitopesaliu.com/vip-live',
    minutes: 90,
    file: 'the-bridge-vip-qa',
  },
} as const;

function stamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export async function GET(req: NextRequest) {
  const kindParam = req.nextUrl.searchParams.get('kind') ?? 'training';
  const kind = kindParam === 'vip' ? 'vip' : 'training';
  const cfg = KINDS[kind];
  const start = new Date(req.nextUrl.searchParams.get('start') ?? '');
  const now = Date.now();
  if (Number.isNaN(start.getTime()) || start.getTime() < now - 864e5 || start.getTime() > now + 400 * 864e5) {
    return NextResponse.json({ error: 'Invalid start time.' }, { status: 400 });
  }
  const end = new Date(start.getTime() + cfg.minutes * 60000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Temitope Saliu//The Bridge//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${kind}-${stamp(start)}@temitopesaliu.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${cfg.title}`,
    `DESCRIPTION:Join here: ${cfg.link}`,
    `URL:${cfg.link}`,
    'LOCATION:Online (Zoom)',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Starting in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${cfg.file}.ics"`,
      'Cache-Control': 'no-store',
    },
  });
}
