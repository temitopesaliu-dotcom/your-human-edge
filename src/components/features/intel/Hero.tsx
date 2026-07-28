import { ArrowRight } from "./Icons";

export default function Hero({ onScrollToQuiz }: { onScrollToQuiz: (e: React.MouseEvent) => void }) {
  return (
    <section className="ilp-hero">
      <div className="ilp-hero-eyebrow">Free Profile Assessment</div>
      <h1>
        You have spent years getting good at something.<br />
        You have not spent a single day getting paid
        <br />
        <em>what it is actually worth.</em>
      </h1>
      <p className="ilp-hero-sub">
        Discover exactly how your expertise becomes an AI-powered offer — and
        what someone with your background can charge.
      </p>
      <div className="ilp-hero-stats">
        <div className="ilp-hero-stat">
          <span className="ilp-hero-stat-num">3 min</span>
          <span className="ilp-hero-stat-label">to complete</span>
        </div>
        <div className="ilp-hero-stat-div" />
        <div className="ilp-hero-stat">
          <span className="ilp-hero-stat-num">7</span>
          <span className="ilp-hero-stat-label">questions</span>
        </div>
        <div className="ilp-hero-stat-div" />
        <div className="ilp-hero-stat">
          <span className="ilp-hero-stat-num">1</span>
          <span className="ilp-hero-stat-label">personalised profile</span>
        </div>
        <div className="ilp-hero-stat-div" />
        <div className="ilp-hero-stat">
          <span className="ilp-hero-stat-num">Free</span>
          <span className="ilp-hero-stat-label">always</span>
        </div>
      </div>
      <a
        href="#quiz"
        className="ilp-btn-primary"
        onClick={onScrollToQuiz}
      >
        Find my profile
        <ArrowRight />
      </a>
    </section>
  );
}
