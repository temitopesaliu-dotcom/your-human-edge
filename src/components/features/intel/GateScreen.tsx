import { ArrowRight, MailIcon, ShieldIcon } from "./Icons";

interface GateScreenProps {
  gateName: string;
  gateEmail: string;
  gateSubmitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
}

export default function GateScreen({
  gateName,
  gateEmail,
  gateSubmitting,
  onNameChange,
  onEmailChange,
  onSubmit,
}: GateScreenProps) {
  return (
    <div className="ilp-gate-card">
      <div className="ilp-gate-icon">
        <MailIcon />
      </div>
      <h2 className="ilp-gate-title">
        Your Intelligence Layer Profile is ready.
      </h2>
      <p className="ilp-gate-sub">
        Where should I send your full breakdown? You will also receive
        the one-page AI Infrastructure Map specific to your domain —
        free.
      </p>
      <div className="ilp-field-row">
        <input
          className="ilp-field-input"
          type="text"
          placeholder="First name"
          value={gateName}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <input
          className="ilp-field-input"
          type="email"
          placeholder="name@email.com"
          value={gateEmail}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>
      <button
        className="ilp-btn-gate"
        onClick={onSubmit}
        disabled={gateSubmitting}
      >
        {gateSubmitting ? "Submitting..." : "Show me my profile"}
        {!gateSubmitting && <ArrowRight />}
      </button>
      <div className="ilp-trust-line">
        <ShieldIcon />
        No spam. One email with your results. You choose what happens
        next.
      </div>
    </div>
  );
}
