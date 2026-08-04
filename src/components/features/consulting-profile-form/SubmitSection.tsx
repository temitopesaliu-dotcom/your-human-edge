interface SubmitSectionProps {
  submitting: boolean;
  consent: boolean;
  onConsentChange: (checked: boolean) => void;
}

export default function SubmitSection({ submitting, consent, onConsentChange }: SubmitSectionProps) {
  return (
    <div className="cpf-submit-section">
      <h3>You are almost there.</h3>
      <p>Your responses go directly to me. I will read every answer before we go into the room together on August 15th. What you share here shapes everything that happens in those three hours.</p>
      <label className="cpf-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
        />
        <span>I consent to my comments or testimonials being used in marketing materials (with my name / anonymously).</span>
      </label>
      <button type="submit" className="cpf-btn-submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit my consulting profile"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
      <div className="cpf-submit-trust">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Your responses are private and used only to personalise your session experience.
      </div>
    </div>
  );
}
