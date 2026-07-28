import FieldError from "./FieldError";
import OptionButtons from "./OptionButtons";
import { ORG_TYPE_OPTIONS } from "./consulting-profile-form.data";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionExpertise({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 03</div>
        <div className="cpf-section-title">Your Expertise</div>
        <div className="cpf-section-desc">This is the section that shapes the entire session. Take the most time here.</div>
      </div>

      <div className={fieldClass("core_problem")} id="f-problem">
        <label className="cpf-field-label">In plain language — not professional language — what problem are you exceptionally good at solving? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Not your job title. Not your LinkedIn headline. The actual problem. The thing people bring to you when something is broken or stuck.</div>
        <textarea name="core_problem" placeholder="When people come to me they are usually struggling with..." style={{ minHeight: 130 }} value={formData.core_problem || ""} onChange={(e) => set("core_problem", e.target.value)}></textarea>
        <FieldError name="core_problem" errors={errors} />
      </div>

      <div className={fieldClass("proudest_work")} id="f-proud">
        <label className="cpf-field-label">Describe a piece of work you are most proud of. <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">What did you do, what changed, and why does it still stay with you?</div>
        <textarea name="proudest_work" placeholder="Tell me about the work, the outcome, and why it matters to you..." style={{ minHeight: 130 }} value={formData.proudest_work || ""} onChange={(e) => set("proudest_work", e.target.value)}></textarea>
        <FieldError name="proudest_work" errors={errors} />
      </div>

      <div className={fieldClass("org_types")} id="f-orgtypes">
        <label className="cpf-field-label">What type of organisations do you understand best? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Select all that apply.</div>
        <OptionButtons options={ORG_TYPE_OPTIONS} type="checkbox" value={formData.org_types || ""} onChange={(v) => set("org_types", v)} />
        <FieldError name="org_types" errors={errors} />
      </div>
    </div>
  );
}
