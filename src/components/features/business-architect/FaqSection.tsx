import { useState } from "react";
import { PlusIcon } from "./Icons";
import { faqs } from "./business-architect.data";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container">
        <div className="eyebrow" style={{ textAlign: "center" }}>
          Questions
        </div>
        <h2 className="section-h2" style={{ textAlign: "center" }}>
          Answered.
        </h2>
        <div className="faq-list">
          {faqs.map((item, i) => {
            const open = openFaq === i;
            return (
              <div className="faq-item" key={item.q}>
                <button
                  className={`faq-q${open ? " open" : ""}`}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  {item.q}
                  <PlusIcon />
                </button>
                <div className={`faq-a${open ? " open" : ""}`}>{item.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
