import { ShieldIcon } from "./Icons";
import { guarantee } from "./business-architect.data";

export default function GuaranteeSection() {
  return (
    <section className="section section-alt" id="guarantee">
      <div className="container">
        <div className="guarantee-card">
          <div className="guarantee-lbl">
            <ShieldIcon />
            {guarantee.label}
          </div>
          <h2 className="guarantee-title">{guarantee.title}</h2>
          <p className="guarantee-body">{guarantee.body}</p>
          <p className="guarantee-fine">{guarantee.fine}</p>
        </div>
      </div>
    </section>
  );
}
