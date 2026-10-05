import FieldError from "./FieldError";
import OptionButtons from "./OptionButtons";
import { ORG_TYPE_OPTIONS } from "./consulting-profile-form.data";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

// org_types is stored as one comma-joined string; an "Other" answer lives
// inside it as "Other: <their words>", so what they type is exactly what
// reaches the sheet - no extra column needed.
const ORG_TYPE_VALUES = ORG_TYPE_OPTIONS.map((o) => o.value);

export default function SectionExpertise({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  const orgEntries = (formData.org_types || "").split(",").map((s) => s.trim()).filter(Boolean);
  const standardOrgTypes = orgEntries.filter((s) => ORG_TYPE_VALUES.includes(s));
  const otherEntry = orgEntries.find((s) => s.startsWith("Other:"));
  const otherSelected = otherEntry !== undefined;
  const otherText = otherEntry ? otherEntry.slice("Other:".length).trim() : "";

  const handleStandardChange = (v: string) => {
    const standard = v.split(",").map((s) => s.trim()).filter(Boolean);
    set("org_types", otherSelected && otherEntry ? [...standard, otherEntry].join(", ") : standard.join(", "));
  };

  const toggleOther = () => {
    set("org_types", otherSelected ? standardOrgTypes.join(", ") : [...standardOrgTypes, "Other:"].join(", "));
  };

  const handleOtherText = (text: string) => {
    set("org_types", [...standardOrgTypes, `Other: ${text}`].join(", "));
  };

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 03</div>
        <div className="cpf-section-title">Your Expertise</div>
        <div className="cpf-section-desc">This is the section that shapes the entire session. Take the most time here.</div>
      </div>

      <div className={fieldClass("core_problem")} id="f-problem">
        <label className="cpf-field-label">In plain language, not professional language, what problem are you exceptionally good at solving? <span className="cpf-req">*</span></label>
        <div className="cpf-field-hint">Not your job title. Not your LinkedIn headline. The actual problem. The thing people bring to you when something is broken, stuck or developed.</div>
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
        <OptionButtons options={ORG_TYPE_OPTIONS} type="checkbox" value={standardOrgTypes.join(", ")} onChange={handleStandardChange} />
        <button
          type="button"
          className={`cpf-option-btn cpf-option-check${otherSelected ? " selected" : ""}`}
          onClick={toggleOther}
        >
          <span className="cpf-option-indicator" />
          <span className="cpf-option-text">Other</span>
        </button>
        {otherSelected && (
          <input
            type="text"
            name="org_types_other"
            placeholder="Tell me which organisations you understand best..."
            style={{ marginTop: 10 }}
            value={otherText}
            onChange={(e) => handleOtherText(e.target.value)}
          />
        )}
        <FieldError name="org_types" errors={errors} />
      </div>
    </div>
  );
}
