import Link from "next/link";
import { WORKSHOP_CHECKOUT_HREF } from "./workshop.data";

export default function Nav() {
  return (
    <nav className="ws-nav">
      <Link href="/" className="ws-nav-logo">
        Your Intelligence Layer + AI<span>.</span>
      </Link>
      <div className="ws-nav-right">
        <a
          href={WORKSHOP_CHECKOUT_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="ws-nav-cta"
        >
          Reserve seat — $99
        </a>
      </div>
    </nav>
  );
}
