import FieldError from "./FieldError";
import { BUDGET_OPTIONS, TIMELINE_OPTIONS } from "./blueprint-apply.data";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepFourProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  goNext: () => void;
  goBack: () => void;
}

export default function StepFour({ data, errors, update, goNext, goBack }: StepFourProps) {
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 4 of 5</p>
      <h2 className="form-step-title">Investment readiness.</h2>
      <p className="form-step-subtitle">
        We ask directly because we want to protect your time. If the investment range isn&apos;t right for your
        situation, we&apos;ll point you toward better options.
      </p>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label" htmlFor="implementationBudget">
            If the Blueprint session reveals the right opportunity, what is your likely implementation budget?{" "}
            <span className="form-required">*</span>
          </label>
          <p className="form-hint">
            Implementation projects typically range from $3,500–$10,000+. This is not a commitment.
          </p>
          <select
            className="form-select"
            id="implementationBudget"
            value={data.implementationBudget}
            onChange={(e) => update("implementationBudget", e.target.value)}
          >
            <option value="" disabled>
              Select your budget range
            </option>
            {BUDGET_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError field="implementationBudget" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label">
            When are you looking to get started? <span className="form-required">*</span>
          </label>
          <div className="form-radio-group" role="radiogroup" aria-label="Timeline preference">
            {TIMELINE_OPTIONS.map((opt) => (
              <label
                className={`form-radio-option${data.timeline === opt.value ? " selected" : ""}`}
                key={opt.value}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={opt.value}
                  checked={data.timeline === opt.value}
                  onChange={(e) => update("timeline", e.target.value)}
                />
                <div className="form-radio-content">
                  <div className="form-radio-title">{opt.title}</div>
                  <div className="form-radio-desc">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
          <FieldError field="timeline" errors={errors} />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost btn-back" onClick={goBack}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary btn-lg btn-arrow btn-next" onClick={goNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
