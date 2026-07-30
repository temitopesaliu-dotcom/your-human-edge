import { AWARDS } from "./about.data";

export default function AwardsCard() {
  return (
    <div className="abt-card">
      <div className="abt-eyebrow">Awards</div>
      {AWARDS.map((award) => (
        <div className="abt-award" key={award.title}>
          <div className="abt-award-title">{award.title}</div>
          <div className="abt-award-sub">{award.sub}</div>
        </div>
      ))}
    </div>
  );
}
