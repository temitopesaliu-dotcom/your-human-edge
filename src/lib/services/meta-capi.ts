import { createHash } from 'node:crypto';

const GRAPH_API_VERSION = 'v21.0';

/** Currencies Stripe bills in whole units — amount_total is NOT in cents.
 *  Anything not listed here is treated as a 2-decimal currency. */
const ZERO_DECIMAL_CURRENCIES = new Set([
  'bif', 'clp', 'djf', 'gnf', 'jpy', 'kmf', 'krw', 'mga',
  'pyg', 'rwf', 'ugx', 'vnd', 'vuv', 'xaf', 'xof', 'xpf',
]);

/** Meta requires email identifiers as lowercased, trimmed, sha256 hex. */
function hashEmail(email: string): string {
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

function toMajorUnits(amountTotal: number, currency: string): number {
  if (ZERO_DECIMAL_CURRENCIES.has(currency.toLowerCase())) return amountTotal;
  return amountTotal / 100;
}

/**
 * Report a completed purchase to the Meta Conversions API.
 *
 * Fired from the Stripe webhook so every product reports automatically, with
 * no per-page pixel work. `eventId` is the Stripe checkout session ID: Meta
 * uses it to deduplicate against a client-side pixel Purchase for the same
 * sale, so the two cannot double-count.
 *
 * Never throws. Tracking is not allowed to affect the buyer's checkout, so
 * every failure path — missing config, bad response, network error — is logged
 * and swallowed.
 */
export async function sendMetaPurchaseEvent(params: {
  email: string;
  amountTotal: number | null;
  currency: string | null;
  eventId: string;
}): Promise<void> {
  const { email, amountTotal, currency, eventId } = params;

  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  if (!accessToken || !pixelId) {
    console.error('[meta-capi] META_CAPI_ACCESS_TOKEN or NEXT_PUBLIC_FB_PIXEL_ID not set — skipping Purchase event.');
    return;
  }

  try {
    const customData: Record<string, unknown> = {};
    if (amountTotal !== null && currency) {
      customData.value = toMajorUnits(amountTotal, currency);
      customData.currency = currency.toUpperCase();
    }

    const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: 'website',
            user_data: email ? { em: [hashEmail(email)] } : {},
            custom_data: customData,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '<unreadable body>');
      console.error(`[meta-capi] Purchase event rejected (${res.status}):`, errorText);
    }
  } catch (err: unknown) {
    console.error('[meta-capi] Purchase event failed:', err instanceof Error ? err.message : String(err));
  }
}
