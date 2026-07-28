import type { ArchetypeConfig } from "./types";

export default function LeverageMatrix({ config }: { config: ArchetypeConfig }) {
  return (
    <section className="sec-alt">
      <div className="wrap">
        <div className={`sec-eye ${config.matrixEyeColor}`}>{config.matrixSectionTitle}</div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: config.matrixTitle }} />
        <p className="sec-sub">{config.matrixSubheading}</p>
        <div className="matrix">
          <div className="matrix-head">
            <div className="mh before">{config.matrixBeforeHeader ?? "Without the playbook"}</div>
            <div className="mh after">{config.matrixAfterHeader ?? "With the playbook ◆"}</div>
          </div>
          {config.beforeAfter.map((row, i) => (
            <div key={i} className="matrix-row">
              <div className="mc before">{row.before}</div>
              <div className="mc after">{row.after}</div>
            </div>
          ))}
          <div className="matrix-foot">
            <div className="mf before">
              <div className="mf-label">{config.matrixFoot.before.label}</div>
              <div className="mf-val">{config.matrixFoot.before.value}</div>
            </div>
            <div className="mf after">
              <div className="mf-label">{config.matrixFoot.after.label}</div>
              <div className="mf-val">{config.matrixFoot.after.value}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
