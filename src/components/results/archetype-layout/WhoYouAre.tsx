import type { ArchetypeConfig } from "./types";

export default function WhoYouAre({ config }: { config: ArchetypeConfig }) {
  return (
    <section>
      <div className="wrap">
        <div className="card-wrap">
          <div className={`sec-eye ${config.whoEyeColor}`}>Who you are</div>
          <p className="who-text">{config.whoYouAre}</p>
          <div className={`sec-eye ${config.strengthsEyeColor}`} style={{ marginTop: "22px" }}>Natural Strengths</div>
          <div className="chip-row">
            {config.strengths.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
