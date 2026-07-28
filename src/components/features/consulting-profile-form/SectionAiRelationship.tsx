import FieldError from "./FieldError";
import ScaleInput from "./ScaleInput";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionAiRelationship({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 05</div>
        <div className="cpf-section-title">Your AI Relationship</div>
        <div className="cpf-section-desc">Where you are honestly right now. No judgment. This shapes the session.</div>
      </div>

      <div className={fieldClass("ai_confidence")} id="f-aiconf">
        <label className="cpf-field-label">How would you rate your current confidence using AI strategically — not just for tasks but to build something? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">1 = complete beginner &nbsp;·&nbsp; 10 = building with it daily</div>
        <ScaleInput value={formData.ai_confidence || ""} labelLow="Complete beginner" labelHigh="Building with it daily" onChange={(v) => set("ai_confidence", v)} />
        <FieldError name="ai_confidence" errors={errors} />
      </div>

      <div className={fieldClass("ai_tools")} id="f-aitools">
        <label className="cpf-field-label">Which AI tools do you currently use and what specifically do you use them for? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Be precise. Not just the tool name — the actual use case.</div>
        <textarea name="ai_tools" placeholder="e.g. Claude for drafting client proposals, ChatGPT for research, Notion AI for meeting notes..." value={formData.ai_tools || ""} onChange={(e) => set("ai_tools", e.target.value)}></textarea>
        <FieldError name="ai_tools" errors={errors} />
      </div>

      <div className={fieldClass("ai_transformative")} id="f-aitransform">
        <label className="cpf-field-label">What would AI need to do for your specific expertise for you to consider it genuinely transformative rather than just useful? <span className="cpf-req">*</span></label>
        <textarea name="ai_transformative" placeholder="What is the bar? What would need to happen for AI to feel like it changed everything for you?" style={{ minHeight: 120 }} value={formData.ai_transformative || ""} onChange={(e) => set("ai_transformative", e.target.value)}></textarea>
        <FieldError name="ai_transformative" errors={errors} />
      </div>
    </div>
  );
}
