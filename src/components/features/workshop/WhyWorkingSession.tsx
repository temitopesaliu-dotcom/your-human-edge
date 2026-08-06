export default function WhyWorkingSession() {
  return (
    <section className="ws-section" style={{ background: "var(--white)" }}>
      <div className="ws-container">
        <div className="ws-why-card">
          <div>
            <div className="ws-section-eyebrow">
              Why a working session and not a webinar
            </div>
            <h2>
              A webinar gives you information. This gives you a built offer.
            </h2>
            <p>
              Information without implementation is just content. This room
              is designed to end with something in your hands — not a
              notebook full of ideas and a Zoom fatigue headache.
            </p>
            <p style={{ marginTop: "1rem" }}>
              The level of specificity required to actually build your
              Intelligence Layer, price it correctly, and map the
              go-to-market requires a room that stays small.{" "}
              <strong className="ws-urgent-text">
                Only 50 seats are available
              </strong>{" "}
              and will not reopen at this price once they close.
            </p>
          </div>
          <div className="ws-why-stats">
            <div className="ws-why-stat">
              <div className="ws-why-stat-val">3 hrs</div>
              <div className="ws-why-stat-label">
                One focused working session — everything built in the room,
                not as homework
              </div>
            </div>
            <div className="ws-why-stat">
              <div
                className="ws-why-stat-val"
                style={{ color: "var(--green)" }}
              >
                $99
              </div>
              <div className="ws-why-stat-label">
                Early access price. Goes to $157 when this closes. Next
                session will be higher.
              </div>
            </div>
            <div className="ws-why-stat">
              <div className="ws-why-stat-val">72 hrs</div>
              <div className="ws-why-stat-label">
                Recording delivered within 72 hours if you cannot attend live
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
