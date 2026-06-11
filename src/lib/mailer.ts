import { type ArchetypeKey, ARCHETYPES } from './archetypes';

// Per-archetype MailerLite group IDs
const ARCHETYPE_GROUP_ENV: Record<ArchetypeKey, string> = {
  H: 'MAILERLITE_GROUP_H',
  C: 'MAILERLITE_GROUP_C',
  S: 'MAILERLITE_GROUP_S',
  G: 'MAILERLITE_GROUP_G',
};

// Per-archetype funnel drip group IDs
const ARCHETYPE_DRIP_GROUP_ENV: Record<ArchetypeKey, string> = {
  H: 'MAILERLITE_FUNNEL_DRIP_GROUP_H',
  C: 'MAILERLITE_FUNNEL_DRIP_GROUP_C',
  S: 'MAILERLITE_FUNNEL_DRIP_GROUP_S',
  G: 'MAILERLITE_FUNNEL_DRIP_GROUP_G',
};

function getDripGroupId(archetype: ArchetypeKey): string | undefined {
  return process.env[ARCHETYPE_DRIP_GROUP_ENV[archetype]];
}

function getGroupIds(archetype: ArchetypeKey): string[] {
  const groups: string[] = [];

  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);

  const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
  if (archGroup) groups.push(archGroup);

  // Add to the archetype-specific 5-day funnel drip group
  const dripGroup = getDripGroupId(archetype);
  if (dripGroup) groups.push(dripGroup);

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
    // a. Update subscriber fields → fail fast if error
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

    // b. Add to buyers group → fail fast if error
    if (buyersGroup) {
      const groupRes = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}/groups/${buyersGroup}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!groupRes.ok) {
        const errText = await groupRes.text();
        console.error('[mailer] Add to buyers group failed:', groupRes.status, errText);
        return;
      }

      console.log(`[mailer] ${email} added to buyers group ${buyersGroup}`);
    }

    // c. Remove from drip group → log error, continue
    const dripGroup = getDripGroupId(archetype);
    if (dripGroup) {
      await removeSubscriberFromGroup(email, dripGroup);
    }

    // d. Remove from archetype group → log error, continue
    const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
    if (archGroup) {
      await removeSubscriberFromGroup(email, archGroup);
    }
  } catch (err: unknown) {
    console.error('[mailer] Buyer MailerLite error:', err instanceof Error ? err.message : String(err));
  }
}

/** Paths guide ($19.99) — triggers MailerLite automation that emails the guide. */
export async function addPathsGuideBuyerToMailerLite(
  email: string,
  name: string
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const guideGroup = process.env.MAILERLITE_PATHS_GUIDE_GROUP_ID;
  if (!apiKey) return;

  try {
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
          paths_guide_buyer: 'true',
        },
      }),
    });

    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error('[mailer] Paths guide update failed:', updateRes.status, errText);
      return;
    }

    if (guideGroup) {
      const groupRes = await fetch(
        `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}/groups/${guideGroup}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (!groupRes.ok) {
        const errText = await groupRes.text();
        console.error('[mailer] Paths guide group add failed:', groupRes.status, errText);
      } else {
        console.log(`[mailer] ${email} added to paths guide group ${guideGroup}`);
      }
    }
  } catch (err: unknown) {
    console.error('[mailer] Paths guide MailerLite error:', err instanceof Error ? err.message : String(err));
  }
}
