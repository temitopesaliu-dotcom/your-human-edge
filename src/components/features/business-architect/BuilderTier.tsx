import { ArrowIcon, CheckIcon } from "./Icons";
import { BUILDER_HREF } from "./business-architect.data";

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
          <div className="tier-price">$997</div>
        </div>
        <a href={BUILDER_HREF} className="tier-btn b">
          Join as The Builder <ArrowIcon />
        </a>
      </div>
      <div className="tier-body">
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
