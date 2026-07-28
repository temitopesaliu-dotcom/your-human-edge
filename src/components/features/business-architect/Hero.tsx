import { ArrowIcon } from "./Icons";
import { scrollToPricing } from "./scroll-to-pricing";

export default function Hero({ countdown }: { countdown: string }) {
  const [h, m, s] = countdown.split(":");

  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-dot"></span>Founding Cohort · Limited Enrolment
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

      <div className="timer-wrap">
        <div className="timer-block">
          <div className="timer-unit">
            <span className="timer-num">{h}</span>
            <span className="timer-label">Hours</span>
          </div>
          <div className="timer-sep">:</div>
          <div className="timer-unit">
            <span className="timer-num">{m}</span>
            <span className="timer-label">Minutes</span>
          </div>
          <div className="timer-sep">:</div>
          <div className="timer-unit">
            <span className="timer-num">{s}</span>
            <span className="timer-label">Seconds</span>
          </div>
        </div>
        <div className="timer-caption">
          Founding Cohort price expires <strong>Wednesday morning</strong> —
          reverts to full price
        </div>
      </div>

      <a href="#pricing" className="hero-cta" onClick={scrollToPricing}>
        See pricing and join ↓
        <ArrowIcon />
      </a>
    </section>
  );
}
