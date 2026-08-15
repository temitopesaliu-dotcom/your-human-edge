"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { startCheckout, type Tier } from "./checkout";

export default function CheckoutButton({
  tier,
  className,
  children,
  withArrow = true,
}: {
  tier: Tier;
  className: string;
  children: React.ReactNode;
  withArrow?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    setFailed(false);
    try {
      const url = await startCheckout(tier);
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
        {busy ? "Opening secure checkout…" : children}
        {!busy && withArrow && <ArrowIcon />}
      </button>
      {failed && (
        <div className="checkout-error" role="alert">
          Could not open checkout. Please try again, or email{" "}
          <a href="mailto:hello@temitopesaliu.com">hello@temitopesaliu.com</a>{" "}
          and we will send you a payment link directly.
        </div>
      )}
    </>
  );
}
