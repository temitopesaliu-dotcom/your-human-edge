import type { ArchetypeConfig } from "./types";

export default function IncomeModel({ config }: { config: ArchetypeConfig }) {
  return (
    <section>
      <div className="wrap">
        <div className={`sec-eye ${config.incomeEyeColor}`}>Your income model</div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: config.incomeTitle }} />
        <p className="sec-sub">{config.incomeSubheading}</p>
        <div className="income-blur-wrap">
          <div className="income-grid">
            {config.incomePaths.map((path, idx) => (
              <div
                key={idx}
                className={`income-card ${path.className}`}
                style={path.blurred ? { filter: "blur(5px)", userSelect: "none", pointerEvents: "none" } : undefined}
              >
                <div className="ic-label">{path.label}</div>
                <div className="ic-title">{path.title}</div>
                <div className="ic-range">{path.range}</div>
                <div className="ic-desc">{path.desc}</div>
                <ul className="ic-list">
                  {path.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="blur-overlay"></div>
        </div>
      </div>
    </section>
  );
}
