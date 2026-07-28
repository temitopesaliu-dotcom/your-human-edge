import Link from "next/link";

export default function Nav() {
  return (
    <nav className="ilp-nav">
      <Link href="/" className="ilp-nav-logo">
        Your Intelligence Layer + AI<span>.</span>
      </Link>
      <a className="nav-tag" href="/resources">
        <span className="nav-tag">FREE RESOURCE</span>
      </a>
    </nav>
  );
}
