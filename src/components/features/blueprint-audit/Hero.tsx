import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-grid-lines" aria-hidden="true"></div>

      <div className="hero-inner">
        <div className="hero-label fade-up">
          <div className="hero-label-dot" aria-hidden="true"></div>
          <span className="label">AI Operating Systems</span>
        </div>

        <h1 className="hero-title fade-up delay-1">
          Stop babysitting
          <br />
          <em className="line-2">your business.</em>
        </h1>

        <p className="hero-subtitle fade-up delay-2">
          Build an AI Operating System that runs your business with you—not
          because of you. For founders, coaches, consultants and growing teams
          who are done being the bottleneck.
        </p>

        <div className="hero-ctas fade-up delay-3">
          <Link
            href="/the-blueprint-audit/apply"
            className="btn btn-primary btn-lg btn-arrow"
          >
            Apply for Blueprint
          </Link>
          <a href="#how-it-works" className="btn btn-ghost btn-arrow">
            See how it works
          </a>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 3v10M4 9l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
