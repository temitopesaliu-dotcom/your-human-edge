import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession, setSession, type SessionRecord } from '@/lib/services/kv';
import { addBuyerToMailerLite, addStadiumBuyerToMailerLite, addIntelligenceLayerPaidSubscriber, addBusinessArchitectBuyerToMailerLite } from '@/lib/services/mailer';
import { type ArchetypeKey } from '@/lib/utils/archetypes';
import { normalizeProduct, type ProductType } from '@/lib/utils/products';
import { stripe } from '@/lib/services/stripe';

/** Extract archetype from metadata, or fall back to parsing the success_url.
 *  Covers API-created sessions (metadata.archetype) and
 *  Payment Link sessions (arch param in success_url). */
function extractArchetype(session: Stripe.Checkout.Session): ArchetypeKey {
  const fromMeta = session.metadata?.archetype?.toUpperCase();
  if (fromMeta && ['H', 'C', 'S', 'G'].includes(fromMeta)) {
    return fromMeta as ArchetypeKey;
  }
  try {
    const url = new URL(session.success_url ?? '');
    const arch = url.searchParams.get('arch')?.toUpperCase();
    if (arch && ['H', 'C', 'S', 'G'].includes(arch)) {
      return arch as ArchetypeKey;
    }
  } catch { /* malformed URL — fall back to 'H' */ }
  return 'H';
}

type VerifyResult =
  | { ok: true; event: Stripe.Event }
  | { ok: false; message: string };

function verifyWebhookSignature(rawBody: string, signature: string, secret: string): VerifyResult {
  try {
    return { ok: true, event: stripe.webhooks.constructEvent(rawBody, signature, secret) };
  } catch (err: unknown) {
    return { ok: false, message: err instanceof Error ? err.message : String(err) };
  }
}

// Persist the session record so repeat visits can skip the Stripe API call.
// This is an optimization, not an access requirement: if KV is unavailable we
// log and continue, because /api/validate-session falls back to a live Stripe
// lookup when the record is missing (see purchase-access.ts), so the buyer's
// access is preserved. Returning 500 here would only burn Stripe's retry
// budget without changing the outcome.
async function persistSessionRecord(sessionId: string, record: SessionRecord): Promise<void> {
  try {
    const existing = await getSession(sessionId);
    if (!existing) {
      await setSession(sessionId, record);
    }
  } catch (e) {
    console.error('[webhook] KV write failed — continuing (Stripe fallback covers access):', e);
  }
}

const MAILER_DISPATCH: Partial<Record<ProductType, {
  send: (email: string, name: string, archetype: ArchetypeKey, accessLink: string) => Promise<void>;
  errorLabel: string;
}>> = {
  playbook: {
    send: (email, name, archetype, accessLink) => addBuyerToMailerLite(email, name, archetype, accessLink),
    errorLabel: 'addBuyerToMailerLite',
  },
  'stadium-live': {
    send: (email, name) => addStadiumBuyerToMailerLite(email, name, 'live-class'),
    errorLabel: 'addStadiumBuyerToMailerLite (live)',
  },
  'stadium-6weeks': {
    send: (email, name) => addStadiumBuyerToMailerLite(email, name, '6-weeks'),
    errorLabel: 'addStadiumBuyerToMailerLite (6-weeks)',
  },
  'intelligence-layer-workshop': {
    send: (email, name) => addIntelligenceLayerPaidSubscriber(email, name),
    errorLabel: 'addIntelligenceLayerPaidSubscriber',
  },
  'bap-builder': {
    send: (email, name) => addBusinessArchitectBuyerToMailerLite(email, name, 'builder'),
    errorLabel: 'addBusinessArchitectBuyerToMailerLite (builder)',
  },
  'bap-accelerator': {
    send: (email, name) => addBusinessArchitectBuyerToMailerLite(email, name, 'accelerator'),
    errorLabel: 'addBusinessArchitectBuyerToMailerLite (accelerator)',
  },
};

async function notifyMailerLite(
  product: ProductType,
  buyerEmail: string,
  buyerName: string,
  archetype: ArchetypeKey,
  accessLink: string
): Promise<void> {
  if (!buyerEmail) return;
  const entry = MAILER_DISPATCH[product];
  if (!entry) return;

  try {
    await entry.send(buyerEmail, buyerName, archetype, accessLink);
  } catch (err: unknown) {
    console.error(`[webhook] ${entry.errorLabel} failed:`, err instanceof Error ? err.message : String(err));
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  if (session.payment_status !== 'paid') return;

  // NOTE: payment_method_types is restricted to ['card'] in
  // create-checkout to prevent async payment methods (bank transfer, etc.)
  // where payment_status may be 'unpaid' at webhook time.
  // If payment methods are ever expanded, add a listener for
  // payment_intent.succeeded as a secondary confirmation event.
  const product = normalizeProduct(session.metadata?.product);
  const archetype = extractArchetype(session);
  const buyerEmail = session.customer_email || session.customer_details?.email || '';
  const buyerName = session.customer_details?.name || '';
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = (envUrl && !/localhost|127\.0\.0\.1/.test(envUrl)
    ? envUrl
    : 'https://temitopesaliu.com'
    ).replace(/\/$/, '');

  const accessLink = `${siteUrl}/playbook?session_id=${session.id}&arch=${archetype}`;

  await persistSessionRecord(session.id, {
    createdAt: Date.now(),
    visitCount: 0,
    lastVisit: null,
    firstIP: '',
    lastIP: '',
    email: buyerEmail,
    name: buyerName,
    archetype,
    product,
    paid: true,
    webhookSource: true,
  });

  await notifyMailerLite(product, buyerEmail, buyerName, archetype, accessLink);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set.');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const rawBody = await req.text();
  const verified = verifyWebhookSignature(rawBody, signature, webhookSecret);
  if (!verified.ok) {
    console.error('[webhook] Signature failed:', verified.message);
    return NextResponse.json({ error: verified.message }, { status: 400 });
  }

  if (verified.event.type === 'checkout.session.completed') {
    await handleCheckoutSessionCompleted(verified.event.data.object as Stripe.Checkout.Session);
  }

  return NextResponse.json({ received: true });
}
