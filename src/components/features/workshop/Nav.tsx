import Link from "next/link";

export default function Nav() {
  return (
    <nav className="ws-nav">
      <Link href="/" className="ws-nav-logo">
        Your Intelligence Layer + AI<span>.</span>
      </Link>
      <div className="ws-nav-right">
        <a
          href="https://buy.stripe.com/00waEYfgbdbGaob2en3oA0r"
          target="_blank"
          rel="noopener noreferrer"
          className="ws-nav-cta"
        >
          Reserve seat — $157
        </a>
      </div>
    </nav>
  );
}
