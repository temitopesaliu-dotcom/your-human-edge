import { COHORT_START, proofItems } from "./business-architect.data";
import CheckoutButton from "./CheckoutButton";

export default function FinalCta() {
  return (
    <section className="final">
      <div className="final-inner">
        <h2>
          You already built it.
          <br />
          <em>Now go and sell it.</em>
        </h2>
        <p>
          Six weeks from the offer you made at the workshop to a priced
          engagement, a discovery process that converts, and a system you
          have actually delivered.
        </p>
        <div className="final-quote">
          &ldquo;{proofItems[2].quote}&rdquo;
          <span className="final-quote-name">
            {proofItems[2].name} — {proofItems[2].meta}
          </span>
        </div>
        <div className="final-btns">
          <CheckoutButton tier="accelerator" className="fbtn-p">
            Join The Accelerator — $997
          </CheckoutButton>
          <CheckoutButton tier="builder" className="fbtn-g" withArrow={false}>
            Join The Builder — $597
          </CheckoutButton>
        </div>
        <div className="final-caption">Founding Cohort starts <strong>{COHORT_START}</strong>.</div>
      </div>
    </section>
  );
}
