import { type ArchetypeKey, ARCHETYPES } from '../utils/archetypes';

/** Live MailerLite group: "Build Audit Applications". */
const BUILD_AUDIT_GROUP_ID = '195554021352670299';

/**
 * Deliberately NOT wired up: MailerLite group "Platform OS Audit — Paid
 * ($1,000)" (195383699307496638) triggers the "here's your booking link"
 * automation. Buyers now book on Calendly straight after Stripe, BEFORE they
 * ever reach /your-business, so sending them a booking link at submit time
 * would tell them to do something they have already done.
 *
 * The open gap: someone who pays and closes the tab without booking is only
 * recorded in Stripe. Closing it properly needs a Stripe webhook that adds the
 * customer to that group on checkout.session.completed — not a change here.
 */

const ARCHETYPE_GROUP_ENV: Record<ArchetypeKey, string> = {
  H: 'MAILERLITE_GROUP_H',
  C: 'MAILERLITE_GROUP_C',
  S: 'MAILERLITE_GROUP_S',
  G: 'MAILERLITE_GROUP_G',
};

const ARCHETYPE_DRIP_GROUP_ENV: Record<ArchetypeKey, string> = {
  H: 'MAILERLITE_FUNNEL_DRIP_GROUP_H',
  C: 'MAILERLITE_FUNNEL_DRIP_GROUP_C',
  S: 'MAILERLITE_FUNNEL_DRIP_GROUP_S',
  G: 'MAILERLITE_FUNNEL_DRIP_GROUP_G',
};

async function mailerLiteRequest(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<{ ok: boolean; status: number; data?: unknown; errorText?: string }> {
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
    if (result.status !== 0 && result.status !== 404) {
      console.error('[mailer] isMailerLiteBuyer error:', result.status, result.errorText);
    }
    return false;
  }
  const payload = result.data as { data?: { fields?: { is_buyer?: string } } } | undefined;
  return payload?.data?.fields?.is_buyer === 'true';

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
  }
}

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
    if (result.status !== 0 && result.status !== 404) {
      console.error('[mailer] Remove from group failed:', result.status, result.errorText);
    }
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
    if (result.status !== 0 && result.status !== 404) {
      console.error('[mailer] isSubscriberInGroup error:', result.status, result.errorText);
    }
    return false;
  }
  const payload = result.data as { data?: Array<{ id: string }> } | undefined;
  const groupsList: Array<{ id: string }> = payload?.data ?? [];
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
      const groupResult = await mailerLiteRequest(`/subscribers/${encodeURIComponent(email)}/groups/${buyersGroup}`, {
        method: 'POST',
      });
      if (!groupResult.ok) {
        console.error('[mailer] Add to buyers group failed:', groupResult.status, groupResult.errorText);
        return;
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


export async function addStadiumBuyerToMailerLite(
  email: string,
  name: string,
  tier: 'live-class' | '6-weeks'
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return;

  const groupId =
    tier === 'live-class'
      ? process.env.MAILERLITE_STADIUM_LIVE_GROUP_ID
      : process.env.MAILERLITE_STADIUM_6WEEKS_GROUP_ID;

  try {
    const allGroup = process.env.MAILERLITE_GROUP_ALL;
    const groupsToAdd: string[] = [];
    if (allGroup) groupsToAdd.push(allGroup);
    if (groupId) groupsToAdd.push(groupId);

    const result = await mailerLiteRequest('/subscribers', {
      method: 'POST',
      body: {
        email,
        fields: {
          name,
          is_buyer: 'true',
          product: tier === 'live-class' ? 'stadium-live' : 'stadium-6weeks',
        },
        groups: groupsToAdd,
      },
    });
    if (!result.ok) {
      console.error(`[mailer] Stadium buyer (${tier}) update failed:`, result.status, result.errorText);
    }
  } catch (err: unknown) {
    console.error('[mailer] Stadium buyer MailerLite error:', err instanceof Error ? err.message : String(err));
  }
}


export async function addFreeResourceSubscriberToMailerLite(
  email: string,
  name: string,
  isCompany: boolean,
  signupRole?: string
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
    body: { email, fields: { name, subscriber_type: signupRole ?? (isCompany ? 'company' : 'individual') }, groups },
  });
  if (!result.ok) {
    console.error('[mailer] Free resource subscriber add failed:', result.status, result.errorText);
  }
}


export async function addBusinessArchitectBuyerToMailerLite(
  email: string,
  name: string,
  tier: 'builder' | 'accelerator'
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return;

  const groupId =
    tier === 'builder'
      ? process.env.MAILERLITE_BAP_BUILDER_GROUP_ID
      : process.env.MAILERLITE_BAP_ACCELERATOR_GROUP_ID;

  try {
    const allGroup = process.env.MAILERLITE_GROUP_ALL;
    const groupsToAdd: string[] = [];
    if (allGroup) groupsToAdd.push(allGroup);
    if (groupId) groupsToAdd.push(groupId);

    const result = await mailerLiteRequest('/subscribers', {
      method: 'POST',
      body: {
        email,
        fields: {
          name,
          is_buyer: 'true',
          product: tier === 'builder' ? 'bap-builder' : 'bap-accelerator',
        },
        groups: groupsToAdd,
      },
    });
    if (!result.ok) {
      console.error(`[mailer] Business Architect Programme buyer (${tier}) update failed:`, result.status, result.errorText);
    }
  } catch (err: unknown) {
    console.error('[mailer] Business Architect Programme buyer MailerLite error:', err instanceof Error ? err.message : String(err));
  }
}


export async function addCoachToMailerLite(
  email: string,
  name: string,
  signupRole?: string,
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const coachGroup = process.env.MAILERLITE_COACH_GROUP;
  if (!apiKey || !coachGroup) {
    console.warn('[mailer] MAILERLITE_API_KEY or MAILERLITE_COACH_GROUP not set — skipping coach group add');
    return;
  }

  const groups: string[] = [];
  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);
  groups.push(coachGroup);

  const result = await mailerLiteRequest('/subscribers', {
    method: 'POST',
    body: { email, fields: { name, subscriber_type: signupRole ?? 'coach' }, groups },
  });
  if (!result.ok) {
    console.error('[mailer] Coach MailerLite add failed:', result.status, result.errorText);
  }
}


export async function addBlueprintAuditApplicantToMailerLite(
  email: string,
  name: string,
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const blueprintAuditGroup = process.env.MAILERLITE_BLUEPRINT_AUDIT_GROUP;
  if (!apiKey || !blueprintAuditGroup) {
    console.warn('[mailer] MAILERLITE_API_KEY or MAILERLITE_BLUEPRINT_AUDIT_GROUP not set — skipping blueprint audit group add');
    return;
  }

  const groups: string[] = [];
  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);
  groups.push(blueprintAuditGroup);

  const result = await mailerLiteRequest('/subscribers', {
    method: 'POST',
    body: {
      email,
      fields: {
        name,
        subscriber_type: 'blueprint-audit-applicant',
      },
      groups,
    },
  });
  if (!result.ok) {
    console.error('[mailer] Blueprint Audit MailerLite add failed:', result.status, result.errorText);
  }
}


export async function addIntelligenceLayerFreeSubscriber(
  email: string,
  name: string,
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const freeGroup = process.env.MAILERLITE_FREE_INTELLIGENCE_LAYER_GROUP;
  if (!apiKey || !freeGroup) {
    console.warn('[mailer] MAILERLITE_API_KEY or FREE_INTELLIGENCE_LAYER group not set — skipping');
    return;
  }

  try {
    const groups: string[] = [];
    const allGroup = process.env.MAILERLITE_GROUP_ALL;
    if (allGroup) groups.push(allGroup);
    groups.push(freeGroup);

    const result = await mailerLiteRequest('/subscribers', {
      method: 'POST',
      body: {
        email,
        fields: { name, subscriber_type: 'intelligence-layer-free' },
        groups,
      },
    });
    if (!result.ok) {
      console.error('[mailer] Intelligence Layer free subscriber add failed:', result.status, result.errorText);
    }
  } catch (err: unknown) {
    console.error('[mailer] Intelligence Layer free subscriber error:', err instanceof Error ? err.message : String(err));
  }
}

export async function addIntelligenceLayerPaidSubscriber(
  email: string,
  name: string,
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const paidGroup = process.env.MAILERLITE_PAID_INTELLIGENCE_LAYER_GROUP;
  if (!apiKey || !paidGroup) {
    console.warn('[mailer] MAILERLITE_API_KEY or PAID_INTELLIGENCE_LAYER group not set — skipping');
    return;
  }

  try {
    const groups: string[] = [];
    const allGroup = process.env.MAILERLITE_GROUP_ALL;
    if (allGroup) groups.push(allGroup);
    groups.push(paidGroup);

    const result = await mailerLiteRequest('/subscribers', {
      method: 'POST',
      body: {
        email,
        fields: { name, is_buyer: 'true', subscriber_type: 'intelligence-layer-paid' },
        groups,
      },
    });
    if (!result.ok) {
      console.error('[mailer] Intelligence Layer paid subscriber add failed:', result.status, result.errorText);
    }
    const freeGroup = process.env.MAILERLITE_FREE_INTELLIGENCE_LAYER_GROUP;
    if (freeGroup){
      const inFreeGroup = await isSubscriberInGroup(email, freeGroup)
      if(inFreeGroup){
        await removeSubscriberFromGroup(email, freeGroup)
      }
    }
  } catch (err: unknown) {
    console.error('[mailer] Intelligence Layer paid subscriber error:', err instanceof Error ? err.message : String(err));
  }
}



/**
 * Business details for the $1,000 build audit (the /your-business form,
 * completed after payment). Stored as a MailerLite subscriber so no lead is
 * lost even if the spreadsheet webhook is unavailable, and so the booking
 * automation fires.
 */
export async function addBuildAuditApplicantToMailerLite(
  email: string,
  name: string,
  answers: Record<string, string> = {},
): Promise<void> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn('[mailer] MAILERLITE_API_KEY not set — skipping build audit applicant add');
    return;
  }

  const groups: string[] = [];
  const allGroup = process.env.MAILERLITE_GROUP_ALL;
  if (allGroup) groups.push(allGroup);
  groups.push(process.env.MAILERLITE_BUILD_AUDIT_GROUP || BUILD_AUDIT_GROUP_ID);

  const result = await mailerLiteRequest('/subscribers', {
    method: 'POST',
    body: {
      email,
      fields: {
        name,
        subscriber_type: 'build-audit-applicant',
        company: answers.businessName || '',
        country: answers.country || '',
        phone: answers.phone || '',
      },
      groups,
    },
  });

  if (!result.ok) {
    console.error('[mailer] Build Audit MailerLite add failed:', result.status, result.errorText);
    throw new Error(`MailerLite ${result.status}: ${result.errorText}`);
  }
}
