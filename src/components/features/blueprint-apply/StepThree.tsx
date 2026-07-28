import FieldError from "./FieldError";
import { SYSTEMATIZE_OPTIONS } from "./blueprint-apply.data";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepThreeProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  toggleSystematize: (value: string) => void;
  goNext: () => void;
  goBack: () => void;
}

export default function StepThree({ data, errors, update, toggleSystematize, goNext, goBack }: StepThreeProps) {
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 3 of 5</p>
      <h2 className="form-step-title">Where are you right now?</h2>
      <p className="form-step-subtitle">We want to understand your current operational reality.</p>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label" htmlFor="biggestPain">
            What is your biggest operational pain point right now? <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="biggestPain"
            rows={4}
            placeholder="Describe the single biggest friction or bottleneck in your business operations."
            value={data.biggestPain}
            onChange={(e) => update("biggestPain", e.target.value)}
          />
          <FieldError field="biggestPain" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="bottleneck">
            Where does your business stop when you stop? <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="bottleneck"
            rows={3}
            placeholder="What specific processes depend entirely on you showing up personally?"
            value={data.bottleneck}
            onChange={(e) => update("bottleneck", e.target.value)}
          />
          <FieldError field="bottleneck" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label">
            Which areas do you most want to systematize? (select all that apply)
          </label>
          <div className="form-checkbox-group" role="group" aria-label="Areas to systematize">
            {SYSTEMATIZE_OPTIONS.map((opt) => (
              <label className="form-checkbox-item" key={opt.value}>
                <input
                  type="checkbox"
                  checked={data.systematize.includes(opt.value)}
                  onChange={() => toggleSystematize(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="currentTools">
            What tools are you currently using for operations and communication?{" "}
            <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="currentTools"
            rows={3}
            placeholder="e.g. HubSpot CRM, Gmail, Slack, Notion, Calendly, Zapier..."
            value={data.currentTools}
            onChange={(e) => update("currentTools", e.target.value)}
          />
          <FieldError field="currentTools" errors={errors} />
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
