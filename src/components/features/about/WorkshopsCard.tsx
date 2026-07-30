import { WORKSHOP_CLIENTS } from "./about.data";

export default function WorkshopsCard() {
  return (
    <div className="abt-card">
      <div className="abt-eyebrow">Facilitated Workshops &amp; Training For</div>
      <div className="abt-workshop-list">
        {WORKSHOP_CLIENTS.map((client) => (
          <span className="abt-chip" key={client}>
            {client}
          </span>
        ))}
      </div>
    </div>
  );
}
