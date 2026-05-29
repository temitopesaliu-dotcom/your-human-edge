import { type ArchetypeKey } from './archetypes';

// Per-archetype MailerLite group IDs (set in Vercel env vars)
// KPI #4: every archetype gets its own group + the all-subscribers group
const ARCHETYPE_GROUP_ENV: Record<ArchetypeKey, string> = {
  H: 'MAILERLITE_GROUP_H',
  C: 'MAILERLITE_GROUP_C',
  S: 'MAILERLITE_GROUP_S',
  G: 'MAILERLITE_GROUP_G',
};

function getGroupIds(archetype: ArchetypeKey): string[] {
  const groups: string[] = [];

  // All-subscribers group
  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);

  // Archetype-specific group
  const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
  if (archGroup) groups.push(archGroup);

  return groups;
}

export async function addSubscriberToMailerLite(
  email: string,
  name: string,
  archetype: ArchetypeKey
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn('[mailer] MAILERLITE_API_KEY not set — skipping');
    return;
  }

  const groups = getGroupIds(archetype);

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        status: 'active',
        fields: { name, ai_archetype: archetype },
        ...(groups.length ? { groups } : {}),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('[mailer] MailerLite add failed (non-fatal):', JSON.stringify(err));
    } else {
      console.log(`[mailer] ${email} added to MailerLite groups: ${groups.join(', ')}`);
    }
  } catch (err: unknown) {
    console.warn('[mailer] MailerLite network error (non-fatal):', err instanceof Error ? err.message : String(err));
  }
}

export async function addBuyerToMailerLite(
  email: string,
  name: string,
  archetype: ArchetypeKey,
  accessLink: string
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const buyersGroup = process.env.MAILERLITE_BUYERS_GROUP_ID;
  if (!apiKey) return;

  const groups: string[] = [];
  if (buyersGroup) groups.push(buyersGroup);

  try {
    await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        status: 'active',
        fields: { name, ai_archetype: archetype, is_buyer: 'true', access_link: accessLink },
        ...(groups.length ? { groups } : {}),
      }),
    });
  } catch (err: unknown) {
    console.warn('[mailer] Buyer MailerLite update failed (non-fatal):', err instanceof Error ? err.message : String(err));
  }
}
