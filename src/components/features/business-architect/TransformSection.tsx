import { ArrowIcon } from "./Icons";
import { shifts } from "./business-architect.data";

export default function TransformSection() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="transform-inner">
          <div>
            <div className="eyebrow">The transformation</div>
            <h2 className="section-h2">
              Six weeks.
              <br />
              <em>One complete shift.</em>
            </h2>
            <div className="transform-body">
              <p>
                Most experts spend years figuring out how to package what
                they know into something the market will pay premium rates
                for. Most never do — not because the expertise is not
                there, but because nobody showed them the architecture of
                how to build a business around it.
              </p>
              <p>
                The Business Architect Programme collapses that timeline.{" "}
                <strong>Six weeks. Six tracks. One transformation</strong> —
                from expert to the person businesses call when they need
                intelligence infrastructure built.
              </p>
            </div>
          </div>
          <div className="shifts">
            {shifts.map(([from, to]) => (
              <div className="shift" key={from}>
                <span className="shift-from">{from}</span>
                <span className="shift-arr">
                  <ArrowIcon />
                </span>
                <span className="shift-to">{to}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
