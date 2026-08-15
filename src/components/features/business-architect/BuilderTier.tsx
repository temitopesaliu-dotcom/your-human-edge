import { CheckIcon } from "./Icons";
import { BUILDER_PRICE, builderStack } from "./business-architect.data";
import ValueStack from "./ValueStack";
import CheckoutButton from "./CheckoutButton";

export default function BuilderTier() {
  return (
    <div className="tier">
      <div className="tier-top">
        <div className="tier-badge b">The Builder</div>
        <div className="tier-name">
          The <em>Builder</em>
        </div>
        <div className="tier-for">
          You are technically capable — or learning to be. You can
          implement. What you need is the business architecture, the
          offer, the positioning, and the client system built around
          your expertise. You are doing this yourself and you want
          the best cohort, content, and community to do it alongside.
        </div>
        <div className="tier-price-row">
          <div className="tier-price">$597</div>
        </div>
        <CheckoutButton tier="builder" className="tier-btn b">
          Join as The Builder
        </CheckoutButton>
        <div className="tier-guarantee">
          Covered by the Six-Track Guarantee
        </div>
      </div>
      <div className="tier-body">
        <ValueStack rows={builderStack} price={BUILDER_PRICE} accent="b" />

        <div className="tier-section-lbl">What is included</div>
        <div className="tf g">
          <CheckIcon />
          All six curriculum tracks
        </div>
        <div className="tf g">
          <CheckIcon />
          Six weeks of live implementation sessions
        </div>
        <div className="tf g">
          <CheckIcon />
          Weekly group Q&A — work reviewed, not just questions
          answered
        </div>
        <div className="tf g">
          <CheckIcon />
          Domain expert guest sessions across every track
        </div>
        <div className="tf g">
          <CheckIcon />
          Full template and prompt library
        </div>
        <div className="tf g">
          <CheckIcon />
          Community access and peer accountability
        </div>
        <div className="tf g">
          <CheckIcon />
          All session recordings
        </div>
      </div>
    </div>
  );
}
