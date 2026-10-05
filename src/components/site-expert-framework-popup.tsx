"use client";

import { usePathname } from "next/navigation";
import ExpertFrameworkPopup from "@/components/expert-framework-popup";

// Skip pages where the popup would be redundant (already on the Expert
// Framework sales flow) or intrusive (mid checkout/application, gated
// content, or a page that already shows its own gate/overlay modal).
const EXCLUDED_PATH_PREFIXES = [
  "/expert-framework",
  "/workshop",
  "/confirmation",
  "/payment-successful",
  "/the-blueprint-audit/apply",
  "/resources/ai-for-coaches",
  "/expert-profile",
  "/story-to-income",
  "/gate",
  "/access-denied",
  "/results",
  "/intelligence-layer",
  "/quiz",
  "/playbook",
  "/demos",
];

export default function SiteExpertFrameworkPopup() {
  const pathname = usePathname();
  const excluded = EXCLUDED_PATH_PREFIXES.some((prefix) => pathname?.startsWith(prefix));

  if (excluded) return null;

  return <ExpertFrameworkPopup />;
}
