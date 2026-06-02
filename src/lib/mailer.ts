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

  // Map archetype to PDF download link
  const pdfLinks: Record<ArchetypeKey, string> = {
      H: 'https://drive.google.com/uc?export=download&id=1E1gatayEMJ8Pv348d0A9S6yt5c4DpQJM',
    C: 'https://drive.google.com/uc?export=download&id=15yRvqLocJlXKF9AhlTOX16lqKdCKeV-U',
    S: 'https://drive.google.com/uc?export=download&id=1qMEuPh88pc1oI9QOGqx7b5lh7q0dfMuT',
    G: 'https://drive.google.com/uc?export=download&id=1w_bArlRwEaJwOKvQk4mWXineOHx7XJyM',
  };

  const pdfDownloadLink = pdfLinks[archetype];

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        name,                               // ✅ Now at root level for {$name}
        status: 'active',
        fields: {
          ai_archetype: archetype,          // Matches {$ai_archetype}
          is_buyer: 'true',                 // Matches {$is_buyer}
          access_link: accessLink,          // Matches {$access_link}
          pdf_download_link: pdfDownloadLink // Matches {$pdf_download_link}
        },
        ...(groups.length ? { groups } : {}),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.warn(`[mailer] MailerLite API error (${response.status}): ${errorBody}`);
    }
  } catch (err: unknown) {
    console.warn(
      '[mailer] Network error adding buyer:',
      err instanceof Error ? err.message : String(err)
    );
  }
}
