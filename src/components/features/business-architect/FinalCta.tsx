import { ArrowIcon } from "./Icons";
import { ACCELERATOR_HREF, BUILDER_HREF } from "./business-architect.data";

export default function FinalCta() {
  return (
    <section className="final">
      <div className="final-inner">
        <h2>
          The expertise was
          <br />
          always there.
          <br />
          <em>Now build with it.</em>
        </h2>
        <p>
          Six weeks. The programme that takes you from expert to Business
          Architect — with the offer, the system, the brand, and the
          client to prove it.
        </p>
        <div className="final-btns">
          <a href={ACCELERATOR_HREF} className="fbtn-p">
            Join The Accelerator — $1,497{" "}
            <ArrowIcon />
          </a>
          <a href={BUILDER_HREF} className="fbtn-g">
            Join The Builder — $997
          </a>
        </div>
      </div>
    </section>
  );
}
