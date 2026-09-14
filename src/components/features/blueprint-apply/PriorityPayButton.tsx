"use client";

import { useState } from "react";
import { useAsyncForm } from "@/hooks/use-async-form";
import type { BlueprintCreateCheckoutRequest, BlueprintCreateCheckoutResponse } from "@/types/blueprint-apply";

/**
 * Starts the $1,000 Priority Access checkout. The checkout API requires the
 * applicant's email — when it is known (from the apply form) it is passed
 * straight through; otherwise a small input is shown so the session is still
 * created with the right email and the webhook can mark the right person as
 * a priority buyer.
 */
export default function PriorityPayButton({ email, className }: { email?: string | null; className?: string }) {
  const createCheckout = useAsyncForm<BlueprintCreateCheckoutRequest, BlueprintCreateCheckoutResponse>({
    url: "/api/the-blueprint-audit/create-checkout",
  });

  const [fallbackEmail, setFallbackEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const knownEmail = email?.trim() || "";

  const handlePay = async () => {
    setError(null);
    const result = await createCheckout.submit({ email: knownEmail || fallbackEmail.trim() });
    if (result.ok && "url" in result.data) {
      window.location.href = result.data.url;
    } else {
      setError(!result.ok ? result.error : "Could not start checkout. Please try again.");
    }
  };

  return (
    <div className={className}>
      {!knownEmail && (
        <input
          type="email"
          className="form-input mb-2"
          aria-label="Email used on your application"
          placeholder="Email used on your application"
          value={fallbackEmail}
          onChange={(e) => setFallbackEmail(e.target.value)}
        />
      )}
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={handlePay}
        disabled={createCheckout.status === "submitting"}
      >
        {createCheckout.status === "submitting" ? "Opening secure checkout…" : "Secure Priority Access → Pay"}
      </button>
      {error && (
        <p className="form-error mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
