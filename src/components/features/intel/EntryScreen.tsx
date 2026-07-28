import { ArrowRight, StarIcon } from "./Icons";

export default function EntryScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="ilp-entry-card">
      <div className="ilp-entry-icon">
        <StarIcon />
      </div>
      <h2 className="ilp-entry-title">
        The Intelligence Layer Profile
      </h2>
      <p className="ilp-entry-sub">
        Answer 7 questions and get a personalised breakdown of exactly
        how your expertise translates into an AI-powered income — with
        real numbers.
      </p>
      <div className="ilp-entry-stats">
        <div className="ilp-entry-stat">
          <span className="ilp-entry-stat-val">3 min</span>
          <span className="ilp-entry-stat-lab">to complete</span>
        </div>
        <div className="ilp-entry-stat">
          <span className="ilp-entry-stat-val">7</span>
          <span className="ilp-entry-stat-lab">questions</span>
        </div>
        <div className="ilp-entry-stat">
          <span className="ilp-entry-stat-val">100%</span>
          <span className="ilp-entry-stat-lab">free</span>
        </div>
      </div>
      <button
        className="ilp-btn-next"
        style={{ width: "100%", justifyContent: "center", padding: 14 }}
        onClick={onStart}
      >
        Start building my profile
        <ArrowRight />
      </button>
    </div>
  );
}
