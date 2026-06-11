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

function getGroupIds(archetype: ArchetypeKey, skipDrip = false): string[] {
  const groups: string[] = [];

  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);

  const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
  if (archGroup) groups.push(archGroup);

  // Only add to the 5-day funnel drip group if skipDrip is false
  // (drip group is for non-paying quiz leads only)
  const dripGroup = getDripGroupId(archetype);
  if (dripGroup && !skipDrip) groups.push(dripGroup);

  return groups;
}

/**
 * Check whether a subscriber already has is_buyer === 'true' in MailerLite.
 * Returns false on any error (including 404 or missing API key).
 */
export async function isMailerLiteBuyer(email: string): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      // 404 = subscriber doesn't exist, which is fine
      if (res.status === 404) {
        console.log(`[mailer] isMailerLiteBuyer: ${email} not found (404)`);
      } else {
        const errText = await res.text();
        console.error('[mailer] isMailerLiteBuyer error:', res.status, errText);
      }
      return false;
    }

    const data = await res.json();
    return data?.data?.fields?.is_buyer === 'true';
  } catch (err: unknown) {
    console.warn(
      '[mailer] isMailerLiteBuyer network error:',
      err instanceof Error ? err.message : String(err)
    );
    return false;
  }
}

export async function addSubscriberToMailerLite(
  email: string,
  name: string,
  archetype: ArchetypeKey,
  skipDrip?: boolean
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn('[mailer] MAILERLITE_API_KEY not set — skipping');
    return;
  }

  const groups = getGroupIds(archetype, skipDrip);

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
      if (res.status === 404) {
        console.log(
          `[mailer] Subscriber not in group ${groupId} — skipping remove`
        );
      } else {
        const errText = await res.text();
        console.error(
          '[mailer] Remove from group failed:',
          res.status,
          errText
        );
      }
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

/**
 * Check whether a subscriber is currently in a specific MailerLite group.
 * Returns false on any error (subscriber not found, not in group, network error, etc.).
 */
async function isSubscriberInGroup(
  email: string,
  groupId: string
): Promise<boolean> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return false;

  try {
    const res = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}/groups`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      // 404 = subscriber doesn't exist, which is fine
      if (res.status === 404) {
        console.log(`[mailer] isSubscriberInGroup: ${email} not found (404)`);
      } else {
        const errText = await res.text();
        console.error('[mailer] isSubscriberInGroup error:', res.status, errText);
      }
      return false;
    }

    const data = await res.json();
    const groups: Array<{ id: string }> = data?.data ?? [];
    return groups.some((g) => g.id === groupId);
  } catch (err: unknown) {
    console.warn(
      '[mailer] isSubscriberInGroup network error:',
      err instanceof Error ? err.message : String(err)
    );
    return false;
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
    // Ensure all buyers land in GROUP_ALL regardless of whether they
    // came through the quiz funnel, so automations and reporting
    // always have a complete subscriber list. MailerLite's subscriber
    // upsert is idempotent for group membership — adding to a group
    // they are already in is a no-op.
    const allGroup = process.env.MAILERLITE_GROUP_ALL;
    const groupsToAdd: string[] = [];
    if (allGroup) groupsToAdd.push(allGroup);

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
        groups: groupsToAdd,
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
      const inDripGroup = await isSubscriberInGroup(email, dripGroup);
      if (inDripGroup) {
        await removeSubscriberFromGroup(email, dripGroup);
      }
    }

    // d. Remove from archetype group → log error, continue
    const archGroup = process.env[ARCHETYPE_GROUP_ENV[archetype]];
    if (archGroup) {
      const inArchGroup = await isSubscriberInGroup(email, archGroup);
      if (inArchGroup) {
        await removeSubscriberFromGroup(email, archGroup);
      }
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

/** Free resource subscriber — optionally adds to the company free resource MailerLite group. */
export async function addFreeResourceSubscriberToMailerLite(
  email: string,
  name: string,
  isCompany: boolean
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn('[mailer] MAILERLITE_API_KEY not set — skipping');
    return;
  }

  const companyGroup = process.env.MAILERLITE_COMPANY_FREE_RESOURCE_GROUP;
  const groups: string[] = [];

  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);

  if (isCompany && companyGroup) {
    groups.push(companyGroup);
  }

  if (groups.length === 0) return;

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
        fields: { name, subscriber_type: isCompany ? 'company' : 'individual' },
        groups,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[mailer] Free resource subscriber add failed:', res.status, errText);
    } else {
      console.log(`[mailer] ${email} added to free resource groups: ${groups.join(', ')}`);
    }
  } catch (err: unknown) {
    console.warn('[mailer] Free resource subscriber network error:', err instanceof Error ? err.message : String(err));
  }
}

