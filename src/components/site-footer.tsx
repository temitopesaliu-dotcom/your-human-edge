import Link from "next/link";
import "./site-footer.css";

/**
 * Standard site-wide footer for all unified (design-system) pages:
 * brand mark, quick links, and copyright in one consistent light bar.
 */
export default function SiteFooter() {
  return (
    <footer className="sf-root">
      <div className="sf-inner">
        <div className="sf-brand">
          human<span>+</span>ai
        </div>
        <ul className="sf-links">
          <li>
            <Link href="/quiz">Take the quiz</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
          <li>
            <Link href="/the-blueprint-audit">Business audit</Link>
          </li>
        </ul>
        <div className="sf-copy">
          © 2026 Temitope Saliu · Your Human Edge with AI. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
