import type { MouseEvent } from "react";

export function scrollToPricing(e: MouseEvent) {
  e.preventDefault();
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}
