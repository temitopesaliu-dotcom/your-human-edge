import Link from "next/link";
import { WORKSHOP_DATE, WORKSHOP_PRICE, WORKSHOP_PRICE_FULL } from "./workshop.data";
import WorkshopCheckoutButton from "./WorkshopCheckoutButton";

export default function Hero() {
  return (
    <section className="ws-hero">
      <div className="ws-container">
        <div className="ws-hero-inner">
          <div>
            <div className="ws-hero-eyebrow">
              <span className="ws-hero-eyebrow-dot" />
              Live Workshop · The Intelligence Layer
            </div>
            <h1>
              The Intelligence Layer:
              <br />
              Go <em>From Expertise</em>
              <br />to <span className="checkout-offer-color">Offer.</span>
            </h1>
            <p className="ws-hero-sub">
              A 3-hour live working session for ambitious professionals
              who are done leaving money on the table. Walk in with
              expertise. Walk out with an AI-powered offer, a pricing
              strategy, and the infrastructure to deliver it.
            </p>
            <div className="ws-hero-meta">
              <div className="ws-hero-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {WORKSHOP_DATE}
              </div>
              <div className="ws-hero-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /></svg>
                Live on Zoom
              </div>
              <div className="ws-hero-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                3 hours · Recording included
              </div>
            </div>
            <div className="ws-hero-actions">
              <WorkshopCheckoutButton className="ws-btn-checkout">
                Reserve my seat — {WORKSHOP_PRICE}
              </WorkshopCheckoutButton>
              <Link href="/intelligence-layer" className="ws-btn-secondary">
                Take the free profile quiz first
              </Link>
            </div>
            <div className="ws-hero-trust">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Powered by Stripe. Secure checkout. Recording sent within 72
              hours if you miss the live session.
            </div>
          </div>

          <div className="ws-checkout-card">
            <div className="ws-checkout-card-top">
              <div className="ws-checkout-date">
                Live on Zoom · {WORKSHOP_DATE}.
              </div>
              <div className="ws-checkout-title">
                The Intelligence Layer: Go From Expertise to <span className="checkout-offer-color">Offer.</span>
              </div>
              <div className="ws-checkout-sub">
                The Intelligence Layer — 3-hour working session
              </div>
            </div>
            <div className="ws-checkout-body">
              <div>
                <div className="ws-price-original">
                  {WORKSHOP_PRICE_FULL} full price
                </div>
                <div className="ws-price-current">
                  <sup>$</sup>157
                </div>
                <div className="ws-price-badge">
                  Early access — closes soon
                </div>
              </div>
              <div className="ws-seats-notice">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <strong className="ws-urgent-text">Only 50 seats available.</strong>
              </div>
              <div>
                <div className="ws-checkout-includes-label">
                  What is included
                </div>
                {[
                  "3-hour live working session on Zoom",
                  "Your Intelligence Layer mapped live",
                  "AI infrastructure built in the session",
                  "90-day GTM plan you leave with",
                  "Session recording within 72 hours",
                  "All working templates and frameworks",
                ].map((item) => (
                  <div className="ws-include-item" key={item}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {item}
                  </div>
                ))}
              </div>
              <WorkshopCheckoutButton className="ws-btn-checkout-full">
                Reserve my seat — {WORKSHOP_PRICE}
              </WorkshopCheckoutButton>
              <div className="ws-checkout-trust">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Secure checkout via Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
