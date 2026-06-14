"use client";

import Link from "next/link";

interface SiteNavProps {
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function SiteNav({ ctaLabel = "Find my archetype", ctaHref = "/quiz", onCtaClick }: SiteNavProps) {
  return (
    <nav>
      <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
      <ul className="nav-links">
        <li><Link href="/quiz">Home</Link></li>
        <li><Link href="/resources">Resources</Link></li>
      </ul>
      {onCtaClick ? (
        <button className="nav-cta" onClick={onCtaClick} aria-label={ctaLabel}>
          {ctaLabel}
        </button>
      ) : (
        <Link href={ctaHref} className="nav-cta">{ctaLabel}</Link>
      )}
    </nav>
  );
}
