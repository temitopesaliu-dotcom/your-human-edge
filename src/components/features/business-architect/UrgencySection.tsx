import { priceIntegrity } from "./business-architect.data";

export default function UrgencySection() {
  return (
    <div className="integrity-card">
      <div className="urg-lbl">{priceIntegrity.label}</div>
      <div className="urg-title">{priceIntegrity.title}</div>
      <p className="urg-body">{priceIntegrity.body}</p>
    </div>
  );
}
