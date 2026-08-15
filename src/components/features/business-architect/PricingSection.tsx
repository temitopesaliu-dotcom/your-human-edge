import BuilderTier from "./BuilderTier";
import AcceleratorTier from "./AcceleratorTier";
import UrgencySection from "./UrgencySection";

export default function PricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="eyebrow" style={{ textAlign: "center" }}>
          Founding Cohort pricing
        </div>
        <h2 className="section-h2" style={{ textAlign: "center" }}>
          Two paths into
          <br />
          <em>the programme.</em>
        </h2>
        <p
          className="section-sub"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          Both tiers go through the same six tracks. The difference is the
          depth of support, the speed of results, and whether you bring a
          builder with you.
        </p>
        <div className="pricing-grid">
          <BuilderTier />
          <AcceleratorTier />
        </div>
        <UrgencySection />
      </div>
    </section>
  );
}
