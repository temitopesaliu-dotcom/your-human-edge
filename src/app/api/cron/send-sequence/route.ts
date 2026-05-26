import { NextRequest, NextResponse } from 'next/server';
import { listActiveSequences, setSequenceRecord } from '@/lib/kv';
import {
  getDay2Email, getDay3Email, getDay4Email, getDay5Email, sendEmail,
} from '@/lib/email-sender';
import { type ArchetypeKey } from '@/lib/archetypes';

const MIN_INTERVAL_MS = 22 * 60 * 60 * 1000; // 22 hours
const TOTAL_EMAILS = 5;

export async function GET(req: NextRequest) {
  // Verify this is a legitimate Vercel cron call
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://temitopesaliu.com';
  const ctaUrl = `${siteUrl}/#quiz`;

  const records = await listActiveSequences(50);
  let sent = 0, skipped = 0, errors = 0;

  for (const record of records) {
    if (!record.active || record.emailsSent >= TOTAL_EMAILS) {
      await setSequenceRecord(record.email, { ...record, active: false }).catch(() => {});
      skipped++;
      continue;
    }

    const msSinceLast = Date.now() - (record.lastSentAt || record.signupAt);
    if (msSinceLast < MIN_INTERVAL_MS) { skipped++; continue; }

    const nextDay = record.emailsSent + 1;
    if (nextDay > TOTAL_EMAILS) {
      await setSequenceRecord(record.email, { ...record, active: false }).catch(() => {});
      skipped++;
      continue;
    }

    let emailContent: { subject: string; html: string } | null = null;
    const arch = record.archetype as ArchetypeKey;

    switch (nextDay) {
      case 2: emailContent = getDay2Email(record.name, arch); break;
      case 3: emailContent = getDay3Email(record.name, arch, ctaUrl); break;
      case 4: emailContent = getDay4Email(record.name, arch, ctaUrl); break;
      case 5: emailContent = getDay5Email(record.name, arch, ctaUrl); break;
    }

    if (!emailContent) { skipped++; continue; }

    try {
      const result = await sendEmail(record.email, emailContent.subject, emailContent.html);
      if (result.success) {
        await setSequenceRecord(record.email, {
          ...record,
          emailsSent: nextDay,
          lastSentAt: Date.now(),
          active: nextDay < TOTAL_EMAILS,
        });
        sent++;
      } else {
        errors++;
      }
    } catch {
      errors++;
    }

    await new Promise(r => setTimeout(r, 300));
  }

  return NextResponse.json({ sent, skipped, errors });
}
