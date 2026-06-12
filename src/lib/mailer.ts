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

async function mailerLiteRequest(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<{ ok: boolean; status: number; data?: any; errorText?: string }> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return { ok: false, status: 0, errorText: 'MAILERLITE_API_KEY not set' };

  try {
    const res = await fetch(`https://connect.mailerlite.com/api${path}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { ok: false, status: res.status, errorText };
    }

    const data = await res.json().catch(() => undefined);
    return { ok: true, status: res.status, data };
  } catch (err: unknown) {
    return { ok: false, status: -1, errorText: err instanceof Error ? err.message : String(err) };
  }
}

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

  const result = await mailerLiteRequest(`/subscribers/${encodeURIComponent(email)}`);
  if (!result.ok) {
    if (result.status === 404) {
      console.log(`[mailer] isMailerLiteBuyer: ${email} not found (404)`);
    } else if (result.status !== 0) {
      console.error('[mailer] isMailerLiteBuyer error:', result.status, result.errorText);
    }
    return false;
  }
  return result.data?.data?.fields?.is_buyer === 'true';

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

  const result = await mailerLiteRequest('/subscribers', {
    method: 'POST',
    body: { email, fields: { name, ai_archetype: ARCHETYPES[archetype].name }, groups },
  });
  if (!result.ok) {
    console.error('[mailer] MailerLite add failed:', result.status, result.errorText);
  } else {
    console.log(`[mailer] ${email} added to MailerLite groups: ${groups.join(', ')}`);
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

  const result = await mailerLiteRequest(`/subscribers/${encodeURIComponent(email)}/groups/${groupId}`, {
    method: 'DELETE',
  });
  if (!result.ok) {
    if (result.status === 404) {
      console.log(`[mailer] Subscriber not in group ${groupId} — skipping remove`);
    } else if (result.status !== 0) {
      console.error('[mailer] Remove from group failed:', result.status, result.errorText);
    }
  } else {
    console.log(`[mailer] ${email} removed from group ${groupId}`);
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

  const result = await mailerLiteRequest(`/subscribers/${encodeURIComponent(email)}/groups`);
  if (!result.ok) {
    if (result.status === 404) {
      console.log(`[mailer] isSubscriberInGroup: ${email} not found (404)`);
    } else if (result.status !== 0) {
      console.error('[mailer] isSubscriberInGroup error:', result.status, result.errorText);
    }
    return false;
  }
  const groupsList: Array<{ id: string }> = result.data?.data ?? [];
  return groupsList.some((g) => g.id === groupId);
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
    const updateResult = await mailerLiteRequest('/subscribers', {
      method: 'POST',
      body: {
        email,
        fields: {
          name,
          ai_archetype: ARCHETYPES[archetype].name,
          is_buyer: 'true',
          access_link: accessLink,
          pdf_download_link: pdfLinks[archetype],
        },
        groups: groupsToAdd,
      },
    });
    if (!updateResult.ok) {
      console.error('[mailer] Buyer update failed:', updateResult.status, updateResult.errorText);
      return;
    }

    // b. Add to buyers group → fail fast if error
    if (buyersGroup) {
      if (buyersGroup) {
      const groupResult = await mailerLiteRequest(`/subscribers/${encodeURIComponent(email)}/groups/${buyersGroup}`, {
        method: 'POST',
      });
      if (!groupResult.ok) {
        console.error('[mailer] Add to buyers group failed:', groupResult.status, groupResult.errorText);
        return;
      }
      console.log(`[mailer] ${email} added to buyers group ${buyersGroup}`);
    }
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

const result = await mailerLiteRequest('/subscribers', {
    method: 'POST',
    body: { email, fields: { name, subscriber_type: isCompany ? 'company' : 'individual' }, groups },
  });
  if (!result.ok) {
    console.error('[mailer] Free resource subscriber add failed:', result.status, result.errorText);
  } else {
    console.log(`[mailer] ${email} added to free resource groups: ${groups.join(', ')}`);
  }
}

