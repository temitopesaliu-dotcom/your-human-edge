/**
 * Shared checkout + analytics helpers for archetype result pages.
 */
"use client";

import { track } from "@/lib/analytics";

// Re-export track so existing importers (`import { track } from "@/lib/funnel"`) continue to work.
export { track };

/**
 * Initiate a Stripe checkout for the playbook.
 *
 * Reads the email from localStorage, calls the create-checkout API,
 * and redirects to the Stripe checkout URL on success.
 *
 * @param archetype - The archetype key (H, C, G, S)
 * @returns The checkout URL (the caller can also use it), or throws on failure.
 */
export async function handleBuy(
  archetype: string,
  email?: string
): Promise<string> {
  const resolvedEmail = email
    || (typeof window !== 'undefined'
      ? localStorage.getItem("yhe_email") || ""
      : "");
  if (!resolvedEmail) {
    throw new Error("EMAIL_REQUIRED");
  }

  track("buy_click", { archetype });

  const res = await fetch("/api/create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: resolvedEmail, archetype }),
  });

  const data = await res.json();
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Checkout unavailable.");
  }

  return data.url;
}
