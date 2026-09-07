import FieldError from "./FieldError";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionReflection({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 07</div>
        <div className="cpf-section-title">The Reflection Question</div>
        <div className="cpf-section-desc">This is the most important section on the form. Take your time.</div>
      </div>

      <div className={fieldClass("six_months_vision")} id="f-sixmonths">
        <label className="cpf-field-label">Imagine it is six months from now. You send me a message and say — I am so glad I attended. What has happened? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Describe the outcome in as much detail as you can. What are you doing? What has changed? What can you do now that you could not do before September 12th?</div>
        <textarea name="six_months_vision" placeholder="Six months from now, I am..." style={{ minHeight: 160 }} value={formData.six_months_vision || ""} onChange={(e) => set("six_months_vision", e.target.value)}></textarea>
        <FieldError name="six_months_vision" errors={errors} />
      </div>

      <div className={fieldClass("anything_else")} id="f-anythingelse">
        <label className="cpf-field-label">Is there anything you think I should know about you before we meet that would help me make this workshop more valuable for you? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Anything about your situation, your history, your concerns, or your ambitions that no multiple-choice question has captured.</div>
        <textarea name="anything_else" placeholder="Anything at all that you want me to know before September 12th..." style={{ minHeight: 110 }} value={formData.anything_else || ""} onChange={(e) => set("anything_else", e.target.value)}></textarea>
        <FieldError name="anything_else" errors={errors} />
      </div>
    </div>
  );
}
