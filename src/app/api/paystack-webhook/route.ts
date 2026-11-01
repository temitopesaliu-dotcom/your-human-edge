import { NextRequest, NextResponse } from 'next/server';
import { paystackMetadata, validPaystackSignature, verifyPaystack } from '@/lib/services/paystack';
import { sendToBridgeSheet, clean } from '@/lib/bridge/sheet';
import { sendMetaPurchaseEvent } from '@/lib/services/meta-capi';

/**
 * Paystack webhook (naira payments). Set in the Paystack dashboard as
 * https://temitopesaliu.com/api/paystack-webhook.
 *
 * The signature is checked first, then the transaction is re-verified with
 * Paystack before anything is fulfilled. A Bridge VIP sale goes to the same
 * Apps Script as Stripe sales: VIP tab row, welcome email from ts@, admin alert.
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  if (!validPaystackSignature(raw, req.headers.get('x-paystack-signature'))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  let event: { event?: string; data?: { reference?: string } };
  try { event = JSON.parse(raw); } catch { return NextResponse.json({ error: 'Bad body' }, { status: 400 }); }
  if (event.event !== 'charge.success' || !event.data?.reference) return NextResponse.json({ received: true });

  try {
    const tx = await verifyPaystack(event.data.reference);
    if (!tx || tx.status !== 'success') return NextResponse.json({ received: true, verified: false });
    const meta = paystackMetadata(tx.metadata);
    const email = clean(tx.customer?.email, 200).toLowerCase();

    if (meta.product === 'bridge-vip' && email) {
      await sendToBridgeSheet({
        action: 'vip_buyer',
        email,
        name: clean(meta.name, 80),
        amount: tx.amount / 100,
        currency: (tx.currency || 'NGN').toUpperCase(),
        processor: 'Paystack',
        order_id: tx.reference,
      });
      await sendMetaPurchaseEvent({ email, amountTotal: tx.amount, currency: tx.currency || 'NGN', eventId: tx.reference });
    }
  } catch (err) {
    console.error('[paystack-webhook]', err instanceof Error ? err.message : String(err));
    // 500 makes Paystack retry later.
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
