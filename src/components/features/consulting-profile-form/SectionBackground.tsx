import FieldError from "./FieldError";
import OptionButtons from "./OptionButtons";
import { CURRENT_ROLE_OPTIONS, YEARS_EXPERIENCE_OPTIONS } from "./consulting-profile-form.data";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionBackground({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 02</div>
        <div className="cpf-section-title">Your Professional Background</div>
        <div className="cpf-section-desc">Not your CV. The real version of where you operate and what you have built.</div>
      </div>

      <div className={fieldClass("current_role")} id="f-role">
        <label className="cpf-field-label">What best describes your current role? <span className="cpf-req">*</span></label>
        <OptionButtons options={CURRENT_ROLE_OPTIONS} type="radio" value={formData.current_role || ""} onChange={(v) => set("current_role", v)} />
        <FieldError name="current_role" errors={errors} />
      </div>

      <div className={fieldClass("years_experience")} id="f-years">
        <label className="cpf-field-label">How many years of serious professional experience do you have in your primary domain? <span className="cpf-req">*</span></label>
        <OptionButtons options={YEARS_EXPERIENCE_OPTIONS} type="radio" value={formData.years_experience || ""} onChange={(v) => set("years_experience", v)} />
        <FieldError name="years_experience" errors={errors} />
      </div>

      <div className={fieldClass("industry")} id="f-industry">
        <label className="cpf-field-label">Which industry or industries have you spent the most time working in? <span className="cpf-req">*</span></label>
        <input type="text" name="industry" placeholder="e.g. Finance, HR, Marketing, Healthcare, Education..." value={formData.industry || ""} onChange={(e) => set("industry", e.target.value)} />
        <FieldError name="industry" errors={errors} />
      </div>

      <div className={fieldClass("advice_areas")} id="f-sought">
        <label className="cpf-field-label">What areas do people naturally seek your advice on — even informally, even without paying you? <span className="cpf-req">*</span></label>
        <textarea name="advice_areas" placeholder="The things people ask you about in WhatsApp groups, at events, over coffee..." value={formData.advice_areas || ""} onChange={(e) => set("advice_areas", e.target.value)}></textarea>
        <FieldError name="advice_areas" errors={errors} />
      </div>

      <div className={fieldClass("greatest_strength")} id="f-strength">
        <label className="cpf-field-label">What would you consider your single greatest professional strength? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Not a skill. A strength. The thing that is most distinctly yours.</div>
        <textarea name="greatest_strength" placeholder="The thing you do that feels ordinary to you but extraordinary to others..." value={formData.greatest_strength || ""} onChange={(e) => set("greatest_strength", e.target.value)}></textarea>
        <FieldError name="greatest_strength" errors={errors} />
      </div>
    </div>
  );
}
