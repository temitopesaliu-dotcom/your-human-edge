import { WORKSHOP_DATE, WORKSHOP_PRICE, WORKSHOP_PRICE_FULL } from "./workshop.data";
import WorkshopCheckoutButton from "./WorkshopCheckoutButton";

export default function FinalCta() {
  return (
    <section className="ws-final-cta ws-section">
      <div className="ws-container">
        <div className="ws-final-cta-inner">
          <h2>
            <span className="ws-urgent-text--on-dark">Only 50 seats.</span>{" "}
            {WORKSHOP_PRICE}.
            <br />
            <em>{WORKSHOP_DATE}.</em>
          </h2>
          <p>
            This is the room where your expertise stops being invisible.
          </p>
          <div style={{ marginBottom: "2rem" }}>
            <div className="ws-final-price-original">
              {WORKSHOP_PRICE_FULL} full price
            </div>
            <div className="ws-final-price-current">{WORKSHOP_PRICE}</div>
            <div className="ws-final-price-badge">
              Early access — closes soon
            </div>
          </div>
          <WorkshopCheckoutButton className="ws-btn-final">
            Reserve my seat now
          </WorkshopCheckoutButton>
          <div className="ws-final-trust">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            Stripe checkout. Instant confirmation. Recording included.
          </div>
        </div>
      </div>
    </section>
  );
}
