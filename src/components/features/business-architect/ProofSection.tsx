import { proofItems } from "./business-architect.data";

export default function ProofSection() {
  return (
    <section className="section" id="proof">
      <div className="container">
        <div className="eyebrow" style={{ textAlign: "center" }}>
          From the workshop room
        </div>
        <h2 className="section-h2" style={{ textAlign: "center" }}>
          People who have done this <em>a long time.</em>
        </h2>
        <p
          className="section-sub"
          style={{ margin: "0 auto", textAlign: "center" }}
        >
          Not beginners looking for a shortcut. Operators with decades behind
          them, describing the part nobody teaches.
        </p>
        <div className="proof-grid">
          {proofItems.map((item) => (
            <figure className="proof-card" key={item.name}>
              <blockquote className="proof-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="proof-name">
                {item.name}
                <span className="proof-meta">{item.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
