import Link from "next/link";

const LogoMark = () => (
  <div className="nav-logo-mark">
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="#C8A96E" strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="#C8A96E" strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="#C8A96E" strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="#C8A96E" strokeWidth="1.2" />
    </svg>
  </div>
);

/**
 * Landing: Blueprint link, Apply button, hamburger, mobile menu, sticky CTA "Ready to stop..."
 * Blueprint: How It Works + FAQ links, Apply button, hamburger, mobile menu, sticky CTA "AI OS Blueprint — $500"
 * Apply: About Blueprint link only
 * Confirmation/NotAFit: Logo only
 */
export default function AiosNav({
  variant = "landing",
}: {
  variant?: "landing" | "blueprint" | "apply" | "confirmation";
}) {
  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main">
        <div className="nav-inner">
          <Link href="/the-blueprint-audit" className="nav-logo" aria-label="AI Operating System — Home">
            <LogoMark />
            <span className="nav-logo-text">AI Operating System</span>
          </Link>

          {/* Landing page nav */}
          {variant === "landing" && (
            <div className="nav-links">
              <Link href="/the-blueprint-audit#blueprint" className="nav-link">Blueprint</Link>
            </div>
          )}

          {/* Blueprint page nav */}
          {variant === "blueprint" && (
            <div className="nav-links">
              <Link href="/the-blueprint-audit#how-it-works" className="nav-link">How It Works</Link>
              <Link href="/the-blueprint-audit#faq" className="nav-link">FAQ</Link>
            </div>
          )}

          {/* Landing + Blueprint: Apply button + hamburger */}
          {(variant === "landing" || variant === "blueprint") && (
            <div className="nav-right">
              <Link href="/the-blueprint-audit/apply" className="btn btn-primary btn-sm btn-arrow">
                Apply for Blueprint
              </Link>
              <button className="nav-hamburger" aria-label="Menu" aria-expanded="false">
                <span></span><span></span><span></span>
              </button>
            </div>
          )}

          {/* Apply page: About Blueprint link */}
          {variant === "apply" && (
            <div className="nav-right">
              <Link href="/the-blueprint-audit/blueprint" className="nav-link">About Blueprint</Link>
            </div>
          )}

          {/* Confirmation/not-a-fit: logo only — no extra links */}
        </div>
      </nav>

      {/* Mobile menu — landing page */}
      {variant === "landing" && (
        <div className="nav-mobile-menu" role="navigation" aria-label="Mobile menu">
          <Link href="/the-blueprint-audit#how-it-works" className="nav-mobile-link">How It Works</Link>
          <Link href="/the-blueprint-audit#blueprint" className="nav-mobile-link">Blueprint</Link>
          <Link href="/the-blueprint-audit#faq" className="nav-mobile-link">FAQ</Link>
          <Link href="/the-blueprint-audit/apply" className="btn btn-primary mt-2">Apply for Blueprint →</Link>
        </div>
      )}

      {/* Mobile menu — blueprint page */}
      {variant === "blueprint" && (
        <div className="nav-mobile-menu" role="navigation" aria-label="Mobile menu">
          <Link href="/the-blueprint-audit#how-it-works" className="nav-mobile-link">How It Works</Link>
          <Link href="/the-blueprint-audit#faq" className="nav-mobile-link">FAQ</Link>
          <Link href="/the-blueprint-audit/apply" className="btn btn-primary mt-2">Apply for Blueprint →</Link>
        </div>
      )}

      {/* Sticky CTA — landing page */}
      {variant === "landing" && (
        <div className="sticky-cta-bar" role="complementary">
          <span className="sticky-cta-text">Ready to stop babysitting your business?</span>
          <Link href="/the-blueprint-audit/apply" className="btn btn-primary btn-sm btn-arrow">Apply for Blueprint</Link>
        </div>
      )}

      {/* Sticky CTA — blueprint page */}
      {variant === "blueprint" && (
        <div className="sticky-cta-bar" role="complementary">
          <span className="sticky-cta-text">AI Operating System Blueprint — $1,000</span>
          <Link href="/the-blueprint-audit/apply" className="btn btn-primary btn-sm btn-arrow">Apply Now</Link>
        </div>
      )}
    </>
  );
}
