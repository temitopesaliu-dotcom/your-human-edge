import { ArrowIcon } from "./Icons";
import { scrollToPricing } from "./scroll-to-pricing";
import { COHORT_START, ENGAGEMENT_RANGE } from "./business-architect.data";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-dot"></span>For Intelligence Layer Workshop
        Graduates · Starts {COHORT_START}
      </div>
      <h1>
        You built the offer.
        <br />
        Now build the
        <br />
        <em>business that sells it.</em>
      </h1>
      <p className="hero-sub">
        You left the workshop with an Intelligence Layer, an ICP, and a live
        site. In the next <strong>six weeks</strong> you turn that into a
        consulting practice priced at{" "}
        <strong>{ENGAGEMENT_RANGE} per engagement</strong> — with the discovery
        process to sell it and the AI Operating System to deliver it.
      </p>

      <a href="#pricing" className="hero-cta" onClick={scrollToPricing}>
        See pricing and join ↓
        <ArrowIcon />
      </a>
    </section>
  );
}
