import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="blueprint-cta-heading">
      <div className="final-cta-bg" aria-hidden="true"></div>
      <div className="final-cta-inner fade-up">
        <p className="label mb-4">Apply Now</p>
        <h2
          className="heading-1"
          id="blueprint-cta-heading"
          style={{
            maxWidth: 580,
            margin: "0 auto var(--space-5)",
          }}
        >
          The Blueprint is where operational clarity begins.
        </h2>
        <Link
          href="/the-blueprint-audit/apply"
          className="btn btn-primary btn-lg btn-arrow"
        >
          Apply for Your Blueprint
        </Link>
        <p className="final-cta-note">
          $1,000 · Credited in full if you proceed · Not all applications
          accepted
        </p>
      </div>
    </section>
  );
}
