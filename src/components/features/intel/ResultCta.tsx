import { ArrowRight } from "./Icons";

export default function ResultCta() {
  return (
    <div className="ilp-result-cta">
      <h3>Go from expert to new income stream</h3>
      <p>
        The Intelligence Framework workshop takes exactly
        this profile and turns it into a working AI-powered offer. The full
        session, now a self-paced course you build alongside. Built for
        people at your level.
      </p>
      <a
        href="/expert-framework"
        className="ilp-btn-primary"
        style={{ display: "inline-flex" }}
      >
        Get Instant Access
        <ArrowRight size={15} />
      </a>
      <div className="ilp-result-cta-footer">At your own pace</div>
    </div>
  );
}
