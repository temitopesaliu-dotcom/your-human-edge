import FieldError from "./FieldError";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionBusiness({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 06</div>
        <div className="cpf-section-title">Bring a Business</div>
        <div className="cpf-section-desc">One of the most powerful things we do in the session is diagnose a real business live in the room. Come prepared with one. It can be a business you work for, work with, have observed closely, or want to approach as a client.</div>
      </div>

      <div className="cpf-field-row">
        <div className={fieldClass("business_name")} id="f-bizname">
          <label className="cpf-field-label">Business name <span className="cpf-req">*</span></label>
          <input type="text" name="business_name" placeholder="Name of the business" value={formData.business_name || ""} onChange={(e) => set("business_name", e.target.value)} />
          <FieldError name="business_name" errors={errors} />
        </div>
        <div className={fieldClass("business_industry")} id="f-bizindustry">
          <label className="cpf-field-label">Industry <span className="cpf-req">*</span></label>
          <input type="text" name="business_industry" placeholder="e.g. Logistics, Healthcare, Retail" value={formData.business_industry || ""} onChange={(e) => set("business_industry", e.target.value)} />
          <FieldError name="business_industry" errors={errors} />
        </div>
      </div>

      <div className="cpf-field">
        <label className="cpf-field-label">Approximate size <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
        <input type="text" name="business_size" placeholder="Number of employees or revenue range if known" value={formData.business_size || ""} onChange={(e) => set("business_size", e.target.value)} />
      </div>

      <div className={fieldClass("business_challenge")} id="f-bizchallenge">
        <label className="cpf-field-label">What do you think is their biggest operational challenge right now? <span className="cpf-req">*</span></label>
        <textarea name="business_challenge" placeholder="What is breaking, slowing down, or stuck in this business right now?" value={formData.business_challenge || ""} onChange={(e) => set("business_challenge", e.target.value)}></textarea>
        <FieldError name="business_challenge" errors={errors} />
      </div>

      <div className={fieldClass("business_friction")} id="f-bizfriction">
        <label className="cpf-field-label">Where do you see the most obvious friction in how they operate? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">The repetition, the delay, the bottleneck, the knowledge trapped inside one person&apos;s head.</div>
        <textarea name="business_friction" placeholder="Where does this business slow down, repeat itself, or break when the wrong person is unavailable?" value={formData.business_friction || ""} onChange={(e) => set("business_friction", e.target.value)}></textarea>
        <FieldError name="business_friction" errors={errors} />
      </div>

      <div className={fieldClass("business_why")} id="f-bizwhy">
        <label className="cpf-field-label">Why did you choose this business? <span className="cpf-req">*</span></label>
        <input type="text" name="business_why" placeholder="What made you pick this one specifically?" value={formData.business_why || ""} onChange={(e) => set("business_why", e.target.value)} />
        <FieldError name="business_why" errors={errors} />
      </div>
    </div>
  );
}
