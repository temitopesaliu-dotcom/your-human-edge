import { SESSION_BLOCKS } from "./blueprint.data";

export default function SessionStructure() {
  return (
    <section className="section" id="the-session" aria-labelledby="session-heading">
      <div className="container">
        <div className="section-header centered fade-up">
          <p className="label mb-3">The 90 Minutes</p>
          <h2 className="heading-1" id="session-heading">
            How the session is structured.
          </h2>
          <p className="body-lg mt-3">
            We use every minute. Come prepared. Leave with clarity.
          </p>
        </div>

        <div className="session-structure fade-up delay-1">
          {SESSION_BLOCKS.map((block, i) => (
            <div className="session-block" key={i}>
              <div className="session-block-time">{block.time}</div>
              <div className="session-block-content">
                <h3 className="session-block-title">{block.title}</h3>
                <p className="session-block-desc">{block.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
