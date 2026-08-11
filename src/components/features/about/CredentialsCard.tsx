import { CheckIcon } from "./Icons";
import { CREDENTIALS } from "./about.data";

export default function CredentialsCard() {
  return (
    <div className="abt-card">
      <div className="abt-eyebrow">Credentials &amp; Partnerships</div>
      <div className="abt-grid">
        {CREDENTIALS.map((credential, i) => (
          <div
            className={`abt-tick-card${i === CREDENTIALS.length - 1 && CREDENTIALS.length % 2 === 1
              ? " abt-tick-card--wide"
              : ""}`}
            key={credential}
          >
            <CheckIcon />
            <span>{credential}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
