"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./site-nav.css";

interface SiteNavLink {
  label: string;
  href: string;
  /** Optional sub-links: hover dropdown on desktop, indented group in the mobile menu. */
  children?: { label: string; href: string }[];
}

interface SiteNavProps {
  ctaLabel?: string | null;
  ctaHref?: string;
  onCtaClick?: () => void;
  links?: SiteNavLink[];
  logoHref?: string;
  /** Pass null (default) to render no logo at all. */
  logoText?: string | null;
  /** "brand" renders logoText as-is; "name" renders it as a styled personal name (first word + italic surname in coral). */
  logoVariant?: "brand" | "name";
}

const DEFAULT_LINKS: SiteNavLink[] = [
  {
    label: "Quizzes",
    href: "/quiz",
    children: [
      { label: "AI Fit Quiz", href: "/quiz" },
      { label: "AI For Expert Quiz", href: "/intelligence-layer" },
    ],
  },
  { label: "Free Resources", href: "/resources" },
  { label: "Business Audit", href: "/the-blueprint-audit" },
];

export default function SiteNav({
  ctaLabel = null,
  ctaHref = "/quiz",
  onCtaClick,
  links = DEFAULT_LINKS,
  logoHref = "/",
  logoText = null,
  logoVariant = "name",
}: SiteNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Close on Escape for keyboard/AT users.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
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
    if (!logoText) return null;
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
        {links.map((link) =>
          link.children?.length ? (
            <li
              key={link.href}
              className={`sn-dd${openDropdown === link.href ? " sn-dd-open" : ""}`}
            >
              {/* Trigger is a toggle, not a link — it opens/closes the dropdown
                  on click (touch/tablet, keyboards) while CSS :hover covers
                  pointer devices. */}
              <button
                type="button"
                className="sn-dd-trigger"
                aria-haspopup="true"
                aria-expanded={openDropdown === link.href}
                onClick={() =>
                  setOpenDropdown((o) => (o === link.href ? null : link.href))
                }
              >
                {link.label}
              </button>
              <div
                className={`sn-dd-panel${openDropdown === link.href ? " sn-dd-panel--open" : ""}`}
                role="menu"
              >
                <div className="sn-dd-card">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      role="menuitem"
                      className="sn-dd-link"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ) : (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          )
        )}
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
          {links.map((link) =>
            link.children?.length ? (
              <div key={link.href} className="sn-mobile-group">
                <span className="sn-mobile-group-label">{link.label}</span>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    role="menuitem"
                    className={`sn-mobile-link sn-mobile-sublink${pathname === child.href ? " sn-mobile-link--active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className={`sn-mobile-link${pathname === link.href ? " sn-mobile-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          {showCta && <div className="sn-mobile-cta">{renderCta("sn-mobile-cta-btn")}</div>}
        </div>
      )}
    </nav>
  );
}
