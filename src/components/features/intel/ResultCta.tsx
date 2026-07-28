import { ArrowRight } from "./Icons";

export default function ResultCta() {
  return (
    <div className="ilp-result-cta">
      <h3>Go from expert to new income stream</h3>
      <p>
        The Intelligence Layer workshop takes exactly
        this profile and turns it into a working AI-powered offer in
        one session. Built for people at your level.
      </p>
      <a
        href="/workshop"
        className="ilp-btn-primary"
        style={{ display: "inline-flex" }}
      >
        Reserve my seat — $157 early access
        <ArrowRight size={15} />
      </a>
    </div>
  );
}
