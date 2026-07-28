import FieldError from "./FieldError";
import { HOW_HEARD_OPTIONS } from "./blueprint-apply.data";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepFiveProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  goBack: () => void;
  submitting: boolean;
}

export default function StepFive({ data, errors, update, goBack, submitting }: StepFiveProps) {
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 5 of 5</p>
      <h2 className="form-step-title">Almost done.</h2>
      <p className="form-step-subtitle">A few final details to complete your application.</p>

      <div className="form-fields">
        <div className="form-field">
          <label className="form-label" htmlFor="howHeard">
            How did you hear about us? <span className="form-required">*</span>
          </label>
          <select
            className="form-select"
            id="howHeard"
            value={data.howHeard}
            onChange={(e) => update("howHeard", e.target.value)}
          >
            <option value="" disabled>
              Select one
            </option>
            {HOW_HEARD_OPTIONS.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError field="howHeard" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="additionalContext">
            Is there anything else you want us to know before we review your application?
          </label>
          <textarea
            className="form-textarea"
            id="additionalContext"
            rows={4}
            placeholder="Any context about your situation, timing, or specific goals..."
            value={data.additionalContext}
            onChange={(e) => update("additionalContext", e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-checkbox-item form-terms">
            <input type="checkbox" required />
            <span>
              I understand that submitting this application does not guarantee a spot. Applications are reviewed
              and not all are accepted. I agree to the{" "}
              <a href="#privacy" style={{ color: "var(--accent)" }}>
                privacy policy
              </a>{" "}
              and{" "}
              <a href="#terms-conditions" style={{ color: "var(--accent)" }}>
                terms of service
              </a>
              .
            </span>
          </label>
        </div>
      </div>

      {errors.submit && (
        <p className="form-error" style={{ marginBottom: 16 }}>
          {errors.submit}
        </p>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost btn-back" onClick={goBack}>
          ← Back
        </button>
        <button type="submit" className="btn btn-primary btn-lg btn-arrow" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
