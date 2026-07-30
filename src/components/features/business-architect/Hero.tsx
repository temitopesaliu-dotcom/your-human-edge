import { ArrowIcon } from "./Icons";
import { scrollToPricing } from "./scroll-to-pricing";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-dot"></span>Founding Cohort · Starts August 22, 2026 · 2pm BST
      </div>
      <h1>
        You are the expert.
        <br />
        Now become
        <br />
        <em>the architect.</em>
      </h1>
      <p className="hero-sub">
        Six weeks. From <strong>invisible expert</strong> to{" "}
        <strong>Business Architect</strong> — with a premium consulting
        offer, a complete client system, and the personal brand that
        commands the room.
      </p>

      <a href="#pricing" className="hero-cta" onClick={scrollToPricing}>
        See pricing and join ↓
        <ArrowIcon />
      </a>
    </section>
  );
}
