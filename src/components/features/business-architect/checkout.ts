"use client";

import { trackEvent } from "@/lib/services/analytics";
import { BUILDER_PRICE, ACCELERATOR_PRICE } from "./business-architect.data";

export type Tier = "builder" | "accelerator";

const LABELS: Record<Tier, { id: string; name: string; value: number }> = {
  builder: {
    id: "bap-builder",
    name: "Business Architect Programme — Builder",
    value: BUILDER_PRICE,
  },
  accelerator: {
    id: "bap-accelerator",
    name: "Business Architect Programme — Accelerator",
    value: ACCELERATOR_PRICE,
  },
};

/**
 * Starts Stripe Checkout for a tier.
 *
 * `begin_checkout` is fired manually here. The sitewide /click-tracking.js only
 * fires it on anchors pointing at buy.stripe.com, and these buttons POST to our
 * own API before redirecting — so without this call the funnel would go dark at
 * exactly the step that matters most.
 */
export async function startCheckout(tier: Tier): Promise<string | null> {
  const item = LABELS[tier];

  trackEvent("begin_checkout", {
    currency: "USD",
    value: item.value,
    items: [
      { item_id: item.id, item_name: item.name, price: item.value, quantity: 1 },
    ],
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", {
      currency: "USD",
      value: item.value,
      content_ids: [item.id],
      content_type: "product",
    });
  }

  const res = await fetch("/api/business-architect/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data?.url) {
    return null;
  }

  return data.url as string;
}
