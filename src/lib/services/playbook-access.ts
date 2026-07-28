import { type ArchetypeKey } from '@/lib/utils/archetypes';
import { validatePurchaseAccess } from '@/lib/services/purchase-access';

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
