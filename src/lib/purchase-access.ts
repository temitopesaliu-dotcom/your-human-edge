import { getSession, setSession, type SessionRecord } from '@/lib/kv';
import { type ArchetypeKey } from '@/lib/archetypes';
import {
  type ProductType,
  isValidSessionId,
  normalizeProduct as normalizeProductType,
} from '@/lib/products';

export type PurchaseAccessResult =
  | { ok: true; sessionId: string; product: ProductType; archetype: ArchetypeKey; name: string; email: string }
  | { ok: false };

function normalizeArchetype(raw: string | undefined): ArchetypeKey {
  const key = (raw || 'H').toUpperCase();
  return ['H', 'C', 'S', 'G'].includes(key) ? (key as ArchetypeKey) : 'H';
}

async function verifyWithStripe(sessionId: string): Promise<SessionRecord | null> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;

  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          'Stripe-Version': '2023-10-16',
        },
      }
    );
    if (!stripeRes.ok) return null;

    const session = await stripeRes.json();
    if (session.payment_status !== 'paid') return null;

    const record: SessionRecord = {
      createdAt: Date.now(),
      visitCount: 1,
      lastVisit: Date.now(),
      firstIP: '',
      lastIP: '',
      email: session.customer_email || session.customer_details?.email || '',
      name: session.customer_details?.name || '',
      archetype: normalizeArchetype(session.metadata?.archetype),
      product: normalizeProductType(session.metadata?.product),
      paid: true,
      webhookSource: false,
    };

    await setSession(sessionId, record).catch(() => {});
    return record;
  } catch {
    return null;
  }
}

/** Validate a paid Stripe session for a specific product. */
export async function validatePurchaseAccess(
  sessionId: string,
  expectedProduct: ProductType
): Promise<PurchaseAccessResult> {
  if (!isValidSessionId(sessionId)) return { ok: false };

  let record = await getSession(sessionId).catch(() => null);

  if (!record?.paid) {
    record = await verifyWithStripe(sessionId);
  }

  if (!record?.paid) return { ok: false };

  const product = normalizeProductType(record.product);
  if (product !== expectedProduct) return { ok: false };

  await setSession(sessionId, {
    ...record,
    visitCount: record.visitCount + 1,
    lastVisit: Date.now(),
  }).catch(() => {});

  return {
    ok: true,
    sessionId,
    product,
    archetype: normalizeArchetype(record.archetype),
    name: record.name || '',
    email: record.email || '',
  };
}
