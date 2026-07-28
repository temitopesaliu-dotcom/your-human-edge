import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero hero-inner-page" id="hero" aria-label="Blueprint hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-grid-lines" aria-hidden="true"></div>

      <div className="hero-inner">
        <div className="hero-label fade-up">
          <div className="hero-label-dot"></div>
          <span className="label">The First Step</span>
        </div>
        <h1 className="hero-title fade-up delay-1">
          AI Operating System
          <br />
          <em>Blueprint Session</em>
        </h1>
        <p className="hero-subtitle fade-up delay-2">
          A 90-minute consulting engagement where we map your business,
          identify every AI opportunity, and design the architecture of your
          operating system. Not a sales call. A deliverable.
        </p>
        <div className="hero-ctas fade-up delay-3">
          <Link href="/the-blueprint-audit/apply" className="btn btn-primary btn-lg btn-arrow">
            Apply to Book
          </Link>
          <a href="#what-you-receive" className="btn btn-ghost btn-arrow">
            What you receive
          </a>
        </div>
        <p className="hero-note fade-up delay-3">
          $1,000 · Credited in full toward implementation
        </p>
      </div>
    </section>
  );
}
