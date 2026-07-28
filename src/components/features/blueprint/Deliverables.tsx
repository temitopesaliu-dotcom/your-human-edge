import { DELIVERABLES } from "./blueprint.data";

export default function Deliverables() {
  return (
    <section className="section" id="what-you-receive" aria-labelledby="receive-heading">
      <div className="container">
        <div className="section-header centered fade-up">
          <p className="label mb-3">The Deliverables</p>
          <h2 className="heading-1" id="receive-heading">
            What you receive from the Blueprint.
          </h2>
          <p className="body-lg mt-3">
            Delivered within 5 business days of your session. Written.
            Actionable. Yours to keep.
          </p>
        </div>

        <div className="deliverables-grid fade-up delay-1">
          {DELIVERABLES.map((item) => (
            <div className="deliverable-feature-card" key={item.num}>
              <div className="deliverable-feature-number">{item.num}</div>
              <h3 className="deliverable-feature-title">{item.title}</h3>
              <p className="deliverable-feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
