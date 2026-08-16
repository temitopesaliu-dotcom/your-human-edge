import FieldError from "./FieldError";
import PhotoUploadField from "./PhotoUploadField";
import type { FieldName } from "./consulting-profile-form.data";

interface SectionProps {
  formData: Record<string, string>;
  errors: Record<string, boolean>;
  set: (name: FieldName, value: string) => void;
}

export default function SectionAboutYou({ formData, errors, set }: SectionProps) {
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  return (
    <div className="cpf-form-section">
      <div className="cpf-section-header">
        <div className="cpf-section-num">Section 01</div>
        <div className="cpf-section-title">About You</div>
        <div className="cpf-section-desc">The basics. So I know who I am talking to before September 26th.</div>
      </div>

      <div className="cpf-field-row">
        <div className={fieldClass("full_name")} id="f-fname">
          <label className="cpf-field-label">Full name <span className="cpf-req">*</span></label>
          <input type="text" name="full_name" placeholder="Your full name" value={formData.full_name || ""} onChange={(e) => set("full_name", e.target.value)} />
          <FieldError name="full_name" errors={errors} />
        </div>
        <div className={fieldClass("preferred_name")} id="f-pref">
          <label className="cpf-field-label">Preferred name in session <span className="cpf-req">*</span></label>
          <input type="text" name="preferred_name" placeholder="What should I call you?" value={formData.preferred_name || ""} onChange={(e) => set("preferred_name", e.target.value)} />
          <FieldError name="preferred_name" errors={errors} />
        </div>
      </div>

      <div className="cpf-field-row">
        <div className={fieldClass("email")} id="f-email">
          <label className="cpf-field-label">Email address <span className="cpf-req">*</span></label>
          <input type="email" name="email" placeholder="name@email.com" value={formData.email || ""} onChange={(e) => set("email", e.target.value)} />
          <FieldError name="email" errors={errors} />
        </div>
        <div className={fieldClass("country")} id="f-country">
          <label className="cpf-field-label">Country you are based in <span className="cpf-req">*</span></label>
          <input type="text" name="country" placeholder="e.g. Nigeria, UK, USA" value={formData.country || ""} onChange={(e) => set("country", e.target.value)} />
          <FieldError name="country" errors={errors} />
        </div>
      </div>

      <div className="cpf-field-row">
        <div className={fieldClass("timezone")} id="f-tz">
          <label className="cpf-field-label">Time zone joining from <span className="cpf-req">*</span></label>
          <input type="text" name="timezone" placeholder="e.g. WAT, BST, EST" value={formData.timezone || ""} onChange={(e) => set("timezone", e.target.value)} />
          <FieldError name="timezone" errors={errors} />
        </div>
        <div className="cpf-field">
          <label className="cpf-field-label">LinkedIn profile URL <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
          <input type="url" name="linkedin" placeholder="linkedin.com/in/yourname" value={formData.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} />
        </div>
      </div>

      <PhotoUploadField value={formData.photo_base64 || ""} error={!!errors.photo_base64} onChange={set} />
    </div>
  );
}
