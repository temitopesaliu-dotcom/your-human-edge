import { StackIcon } from "./Icons";
import ResultCta from "./ResultCta";
import type { IntelResult } from "./intel.data";

export default function ResultScreen({ result }: { result: IntelResult }) {
  return (
    <>
      <div className="ilp-result-header">
        <div className="ilp-result-badge">
          <span className="ilp-result-badge-dot" />
          <span>{result.badge}</span>
        </div>
        <div className="ilp-result-name">{result.name}</div>
        <div className="ilp-result-sub">{result.sub}</div>
      </div>
      <div className="ilp-result-body">
        <div className="ilp-result-section">
          <div className="ilp-section-eyebrow">
            Your intelligence layer
          </div>
          <div className="ilp-section-body">{result.layer}</div>
        </div>
        <ResultCta />

        <div className="ilp-result-section">
          <div className="ilp-section-eyebrow">
            Your AI infrastructure
          </div>
          {result.stack.map((s, i) => (
            <div className="ilp-stack-item" key={i}>
              <div className="ilp-stack-icon-wrap">
                <StackIcon path={s.i} />
              </div>
              <div>
                <div className="ilp-stack-name">{s.n}</div>
                <div className="ilp-stack-desc">{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ilp-result-section">
          <div className="ilp-section-eyebrow">What this is worth</div>
          <div
            className="ilp-section-body"
            style={{ marginBottom: 0 }}
          >
            {result.pricing.intro}
          </div>
          <div className="ilp-pricing-grid">
            {result.pricing.items.map((p, i) => (
              <div className="ilp-price-card" key={i}>
                <div className="ilp-price-label">{p.l}</div>
                <div className="ilp-price-val">{p.v}</div>
                <div className="ilp-price-note">{p.n}</div>
              </div>
            ))}
          </div>
          <div className="ilp-price-close">
            {result.pricing.close}
          </div>
        </div>
        <ResultCta />

        <div className="ilp-result-section">
          <div className="ilp-section-eyebrow">Your first 30 days</div>
          <div className="ilp-steps-list">
            {result.steps.map((s, i) => (
              <div className="ilp-step-item" key={i}>
                <div className="ilp-step-num">{i + 1}</div>
                <div className="ilp-step-content">
                  <strong>{s.w}:</strong> {s.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ResultCta />
      </div>
    </>
  );
}
