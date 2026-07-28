import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="final-cta" id="apply" aria-labelledby="final-cta-heading">
      <div className="final-cta-bg" aria-hidden="true"></div>
      <div className="final-cta-inner fade-up">
        <p className="label mb-4">Ready?</p>
        <h2
          className="heading-1"
          id="final-cta-heading"
          style={{
            maxWidth: 640,
            margin: "0 auto var(--space-5)",
          }}
        >
          Your business should run without you holding everything together.
        </h2>
        <Link
          href="/the-blueprint-audit/apply"
          className="btn btn-primary btn-lg btn-arrow"
        >
          Apply for Your Blueprint
        </Link>
        <p className="final-cta-note">
          $1,000 · Credited in full if you proceed · Applications reviewed
          within 48 hours
        </p>
      </div>
    </section>
  );
}
