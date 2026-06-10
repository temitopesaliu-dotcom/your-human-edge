import { type ArchetypeKey } from '@/lib/archetypes';
import { validatePurchaseAccess } from '@/lib/purchase-access';

export {
  PLAYBOOK_ACCESS_COOKIE,
  GUIDE_ACCESS_COOKIE,
  PURCHASE_COOKIE_MAX_AGE as PLAYBOOK_COOKIE_MAX_AGE,
  isValidSessionId,
  STRIPE_SESSION_PATTERN,
} from '@/lib/products';

export type PlaybookAccessResult =
  | { ok: true; sessionId: string; archetype: ArchetypeKey; name: string; email: string }
  | { ok: false };

/** Validate a Stripe checkout session for playbook access. */
export async function validatePlaybookAccess(sessionId: string): Promise<PlaybookAccessResult> {
  const result = await validatePurchaseAccess(sessionId, 'playbook');
  if (!result.ok) return { ok: false };
  return {
    ok: true,
    sessionId: result.sessionId,
    archetype: result.archetype,
    name: result.name,
    email: result.email,
  };
}

