"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./site-nav.css";

interface SiteNavLink {
  label: string;
  href: string;
}

interface SiteNavProps {
  ctaLabel?: string | null;
  ctaHref?: string;
  onCtaClick?: () => void;
  links?: SiteNavLink[];
  logoHref?: string;
  logoText?: string;
  /** "brand" renders logoText as-is; "name" renders it as a styled personal name (first word + italic surname in coral). */
  logoVariant?: "brand" | "name";
}

const DEFAULT_LINKS: SiteNavLink[] = [
  { label: "Archetype Quiz", href: "/quiz" },
  { label: "Resources", href: "/resources" },
];

export default function SiteNav({
  ctaLabel = "Find my archetype",
  ctaHref = "/quiz",
  onCtaClick,
  links = DEFAULT_LINKS,
  logoHref = "/quiz",
  logoText = "Your Human Edge in the AI Era",
  logoVariant = "brand",
}: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard/AT users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const showCta = Boolean(ctaLabel);

  const renderCta = (extraClass?: string) => {
    if (!showCta) return null;
    const className = extraClass ? `nav-cta ${extraClass}` : "nav-cta";
    if (onCtaClick) {
      return (
        <button
          className={className}
          onClick={() => {
            setMenuOpen(false);
            onCtaClick();
          }}
          aria-label={ctaLabel ?? undefined}
        >
          {ctaLabel}
        </button>
      );
    }
    return (
      <Link
        href={ctaHref}
        className={className}
        onClick={() => setMenuOpen(false)}
      >
        {ctaLabel}
      </Link>
    );
  };

  const renderLogo = () => {
    if (logoVariant === "name" && logoText.includes(" ")) {
      const [first, ...rest] = logoText.split(" ");
      return (
        <Link href={logoHref} className="nav-logo sn-logo-name">
          {first} <em>{rest.join(" ")}</em>
        </Link>
      );
    }
    return (
      <Link href={logoHref} className="nav-logo">
        {logoText}
      </Link>
    );
  };

  return (
    <nav className="sn-root">
      {renderLogo()}

      {/* Desktop links (hidden on mobile by global responsive rules) */}
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      {/* Right side: CTA on desktop, hamburger on mobile */}
      <div className="sn-right">
        <span className="sn-desktop-cta">{renderCta()}</span>
        <button
          type="button"
          className="sn-hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="sn-mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`sn-burger-line${menuOpen ? " sn-burger-line--open" : ""}`} />
          <span className={`sn-burger-line${menuOpen ? " sn-burger-line--open" : ""}`} />
          <span className={`sn-burger-line${menuOpen ? " sn-burger-line--open" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sn-mobile-menu" id="sn-mobile-menu" role="menu">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={`sn-mobile-link${pathname === link.href ? " sn-mobile-link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {showCta && <div className="sn-mobile-cta">{renderCta("sn-mobile-cta-btn")}</div>}
        </div>
      )}
    </nav>
  );
}
