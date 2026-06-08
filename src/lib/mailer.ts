import { type ArchetypeKey, ARCHETYPES } from './archetypes';

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
        fields: { name, ai_archetype: ARCHETYPES[archetype].name },
        groups,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[mailer] MailerLite add failed:', res.status, errText);
    } else {
      console.log(`[mailer] ${email} added to MailerLite groups: ${groups.join(', ')}`);
    }
  } catch (err: unknown) {
    console.warn('[mailer] MailerLite network error (non-fatal):', err instanceof Error ? err.message : String(err));
  }
}

/**
 * Remove a subscriber from a specific MailerLite group.
 * The subscriber is identified by email (MailerLite accepts email as a
 * subscriber identifier in the URL).
 */
export async function removeSubscriberFromGroup(
  email: string,
  groupId: string
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return;

  try {
    const res = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}/groups/${groupId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('[mailer] Remove from group failed:', res.status, errText);
    } else {
      console.log(`[mailer] ${email} removed from group ${groupId}`);
    }
  } catch (err: unknown) {
    console.warn(
      '[mailer] MailerLite remove-from-group network error:',
      err instanceof Error ? err.message : String(err)
    );
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

  const pdfLinks: Record<ArchetypeKey, string> = {
    H: 'https://drive.google.com/uc?export=download&id=1x4qsoiiPFMozkBFgSCdnvjEGPDticUJE',
    C: 'https://drive.google.com/uc?export=download&id=1uvxoEnVJkDLqnmyDuLPMQs9FSu1G2IRv',
    S: 'https://drive.google.com/uc?export=download&id=1AnXFT8x8WOvbefxymlYhUNZSTz2Gh4JU',
    G: 'https://drive.google.com/uc?export=download&id=1x9HTtZyxgsOLW1a4rCB78EBZirHQZ0X1',
  };

  try {
    // Update existing subscriber fields
    const updateRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        fields: {
          name,
          ai_archetype: ARCHETYPES[archetype].name,
          is_buyer: 'true',
          access_link: accessLink,
          pdf_download_link: pdfLinks[archetype],
        },
      }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error('[mailer] Buyer update failed:', updateRes.status, errText);
      return;
    }

    // Add to buyers group
    if (buyersGroup) {
      const groupRes = await fetch(`https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}/groups/${buyersGroup}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!groupRes.ok) {
        const errText = await groupRes.text();
        console.error('[mailer] Add to buyers group failed:', groupRes.status, errText);
      } else {
        console.log(`[mailer] ${email} added to buyers group ${buyersGroup}`);
      }
    }

    // Remove subscriber from their archetype-specific free group
    // (but keep them in the all-subscribers group)
    const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
    if (archGroup) {
      await removeSubscriberFromGroup(email, archGroup);
    }
  } catch (err: unknown) {
    console.error('[mailer] Buyer MailerLite error:', err instanceof Error ? err.message : String(err));
  }
}
