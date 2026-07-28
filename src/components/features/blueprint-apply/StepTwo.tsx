import FieldError from "./FieldError";
import { BUSINESS_TYPE_OPTIONS, TEAM_SIZE_OPTIONS } from "./blueprint-apply.data";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepTwoProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  goNext: () => void;
  goBack: () => void;
}

export default function StepTwo({ data, errors, update, goNext, goBack }: StepTwoProps) {
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 2 of 5</p>
      <h2 className="form-step-title">Tell us about your business.</h2>
      <p className="form-step-subtitle">Help us understand what you do and who you serve.</p>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label" htmlFor="businessType">
            What type of business do you operate? <span className="form-required">*</span>
          </label>
          <select
            className="form-select"
            id="businessType"
            value={data.businessType}
            onChange={(e) => update("businessType", e.target.value)}
          >
            <option value="" disabled>
              Select your business type
            </option>
            {BUSINESS_TYPE_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError field="businessType" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="industry">
            Industry or niche <span className="form-required">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="industry"
            placeholder="e.g. Executive coaching, B2B marketing, health & wellness"
            value={data.industry}
            onChange={(e) => update("industry", e.target.value)}
          />
          <FieldError field="industry" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="teamSize">
            How many people are on your team (including you)? <span className="form-required">*</span>
          </label>
          <select
            className="form-select"
            id="teamSize"
            value={data.teamSize}
            onChange={(e) => update("teamSize", e.target.value)}
          >
            <option value="" disabled>
              Select team size
            </option>
            {TEAM_SIZE_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError field="teamSize" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="businessDesc">
            Describe what your business does in 2–3 sentences. <span className="form-required">*</span>
          </label>
          <textarea
            className="form-textarea"
            id="businessDesc"
            rows={4}
            placeholder="We help marketing agencies systematize their client onboarding..."
            value={data.businessDesc}
            onChange={(e) => update("businessDesc", e.target.value)}
          />
          <FieldError field="businessDesc" errors={errors} />
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
