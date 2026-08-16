"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/services/analytics";
import { WORKSHOP_PRICE } from "./workshop.data";

/**
 * `begin_checkout` is fired here on purpose. The sitewide /click-tracking.js
 * only fires it on anchors pointing at buy.stripe.com; these buttons POST to
 * our own API first, so without this the funnel would go dark at the step
 * that matters most.
 */
export async function startWorkshopCheckout(): Promise<string | null> {
  trackEvent("begin_checkout", {
    currency: "USD",
    value: 157,
    items: [
      {
        item_id: "intelligence-layer-workshop",
        item_name: "The Intelligence Layer + AI — Live Working Session",
        price: 157,
        quantity: 1,
      },
    ],
  });

  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "InitiateCheckout", {
      currency: "USD",
      value: 157,
      content_ids: ["intelligence-layer-workshop"],
      content_type: "product",
    });
  }

  const res = await fetch("/api/workshop/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  const data = await res.json().catch(() => ({}));
  return res.ok && data?.url ? (data.url as string) : null;
}

export default function WorkshopCheckoutButton({
  className,
  children,
  showArrow = true,
}: {
  className: string;
  children?: React.ReactNode;
  showArrow?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const url = await startWorkshopCheckout();
      if (url) {
        window.location.href = url;
        return;
      }
      setFailed(true);
    } catch {
      setFailed(true);
    }
    setBusy(false);
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? "Opening secure checkout…" : children ?? `Reserve my seat — ${WORKSHOP_PRICE}`}
        {!busy && showArrow && (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>
      {failed && (
        <div className="ws-checkout-error" role="alert">
          Could not open checkout. Please try again, or email{" "}
          <a href="mailto:hello@temitopesaliu.com">hello@temitopesaliu.com</a>{" "}
          and we will send you a payment link directly.
        </div>
      )}
    </>
  );
}
