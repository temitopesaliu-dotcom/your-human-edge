import FieldError from "./FieldError";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionGoals({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 04</div>
        <div className="cpf-section-title">What You Want From September 12th</div>
        <div className="cpf-section-desc">Be honest here. Not the polished version. The real reason you showed up.</div>
      </div>

      <div className={fieldClass("why_joined")} id="f-why">
        <label className="cpf-field-label">Why did you decide to join this workshop? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Not the professional answer. The real one.</div>
        <textarea name="why_joined" placeholder="Be honest with me. What made you click that button and pay?" style={{ minHeight: 120 }} value={formData.why_joined || ""} onChange={(e) => set("why_joined", e.target.value)}></textarea>
        <FieldError name="why_joined" errors={errors} />
      </div>

      <div className="cpf-field" id="f-best">
        <label className="cpf-field-label">What would make this one of the best workshops you have ever attended? <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
        <textarea name="best_workshop" placeholder="Describe it specifically. What would need to happen for you to walk away saying — that changed things?" style={{ minHeight: 120 }} value={formData.best_workshop || ""} onChange={(e) => set("best_workshop", e.target.value)}></textarea>
      </div>

      <div className={fieldClass("key_question")} id="f-question">
        <label className="cpf-field-label">What is the one question you are most hoping gets answered? <span className="cpf-req">*</span></label>
        <textarea name="key_question" placeholder="The question that has been sitting with you unanswered..." value={formData.key_question || ""} onChange={(e) => set("key_question", e.target.value)}></textarea>
        <FieldError name="key_question" errors={errors} />
      </div>
    </div>
  );
}
