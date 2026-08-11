import { HIGHLIGHTS } from "./about.data";

export default function HighlightsCard() {
  return (
    <div className="abt-card">
      <div className="abt-eyebrow">Highlights</div>
      {HIGHLIGHTS.map((highlight) => (
        <div className="abt-award" key={highlight.title}>
          <div className="abt-award-title">{highlight.title}</div>
          <div className="abt-award-sub">{highlight.sub}</div>
        </div>
      ))}
    </div>
  );
}
