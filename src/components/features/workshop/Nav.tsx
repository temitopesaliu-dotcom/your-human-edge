import Link from "next/link";

export default function Nav() {
  return (
    <nav className="ws-nav">
      <Link href="/" className="ws-nav-logo">
        Your Intelligence Layer + AI<span>.</span>
      </Link>
      <div className="ws-nav-right">
        <a
          href="https://buy.stripe.com/7sY9AU7NJ6NifIvg5d3oA0u"
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
