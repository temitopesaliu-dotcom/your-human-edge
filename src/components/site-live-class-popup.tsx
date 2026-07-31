"use client";

import { usePathname } from "next/navigation";
import LiveClassPopup from "@/components/live-class-popup";

// Skip pages where the popup would be redundant (already on the workshop
// registration flow) or intrusive (mid checkout/application, or a page that
// already shows its own gate/overlay modal).
const EXCLUDED_PATH_PREFIXES = [
  "/workshop",
  "/confirmation",
  "/resources/ai-for-coaches",
  "/the-blueprint-audit/apply",
  "/payment-successful",
  "/expert-profile",
];

export default function SiteLiveClassPopup() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (excluded) return null;

  return (
    <LiveClassPopup onRegister={() => { window.location.href = "/workshop"; }} />
  );
}
