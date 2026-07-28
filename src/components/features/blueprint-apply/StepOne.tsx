import FieldError from "./FieldError";
import type { BlueprintApplyRequest } from "@/types/blueprint-apply";

interface StepOneProps {
  data: BlueprintApplyRequest;
  errors: Record<string, string>;
  update: (field: keyof BlueprintApplyRequest, value: string | string[]) => void;
  goNext: () => void;
}

export default function StepOne({ data, errors, update, goNext }: StepOneProps) {
  return (
    <div className="form-step active" role="group">
      <p className="form-step-label">Step 1 of 5</p>
      <h2 className="form-step-title">Tell us about yourself.</h2>
      <p className="form-step-subtitle">
        Basic contact information. We use this to review your application and send you a decision.
      </p>

      <div className="form-fields">
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="firstName">
              First name <span className="form-required">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="firstName"
              placeholder="Sarah"
              value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              autoComplete="given-name"
            />
            <FieldError field="firstName" errors={errors} />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="lastName">
              Last name <span className="form-required">*</span>
            </label>
            <input
              className="form-input"
              type="text"
              id="lastName"
              placeholder="Johnson"
              value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              autoComplete="family-name"
            />
            <FieldError field="lastName" errors={errors} />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email address <span className="form-required">*</span>
          </label>
          <input
            className="form-input"
            type="email"
            id="email"
            placeholder="sarah@company.com"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            autoComplete="email"
          />
          <FieldError field="email" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="businessName">
            Business name <span className="form-required">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="businessName"
            placeholder="Your business or practice name"
            value={data.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
          <FieldError field="businessName" errors={errors} />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="website">
            Website URL
          </label>
          <input
            className="form-input"
            type="url"
            id="website"
            placeholder="https://yourbusiness.com"
            value={data.website}
            onChange={(e) => update("website", e.target.value)}
            autoComplete="url"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-primary btn-lg btn-arrow btn-next" onClick={goNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
