import { isValidEmail } from "@/lib/utils/validation";
import {
  PLAYBOOK_LIST_PRICE_LABEL,
  PLAYBOOK_PRICE_LABEL,
} from "@/lib/utils/playbook-pricing";
import type { ArchetypeConfig } from "./types";

interface PaywallProps {
  config: ArchetypeConfig;
  buying: boolean;
  buyError: string;
  showEmailInput: boolean;
  fallbackEmail: string;
  onFallbackEmailChange: (value: string) => void;
  onBuy: (email?: string) => void;
}

export default function Paywall({
  config,
  buying,
  buyError,
  showEmailInput,
  fallbackEmail,
  onFallbackEmailChange,
  onBuy,
}: PaywallProps) {
  return (
    <div id="paywall">
      <div className="paywall-inner">
        <div className="pw-pre">Your Personal Playbook · {PLAYBOOK_PRICE_LABEL}</div>
        <h2 className="pw-title">The Step-by-Step Blueprint to Your First<br /><em>5 Figure Month</em> using AI</h2>
        <p className="pw-sub">
          Your free results show you <em>who</em> you are. The Playbook shows you exactly <em>what to do</em> — every AI career path, income strategy, tool stack made for your brain, and 90-day action plan built for The {config.name}.
        </p>
        <div className="pw-price-was">{PLAYBOOK_LIST_PRICE_LABEL}</div>
        <div className="pw-price">{PLAYBOOK_PRICE_LABEL}</div>
        <div className="pw-badge">Discount applied automatically. No code needed.</div>
        <div>
          {showEmailInput && (
            <div style={{ marginBottom: "16px" }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={fallbackEmail}
                onChange={(e) => onFallbackEmailChange(e.target.value)}
                style={{
                  padding: "10px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,.2)",
                  background: "rgba(255,255,255,.08)", color: "#fff", fontSize: ".9rem",
                  width: "100%", maxWidth: "320px", outline: "none", fontFamily: "'DM Sans',sans-serif"
                }}
              />
              <button
                onClick={() => {
                  const email = fallbackEmail.trim();
                  if (email && isValidEmail(email)) {
                    localStorage.setItem("yhe_email", email);
                    onFallbackEmailChange("");
                    onBuy(email);
                  }
                }}
                style={{
                  display: "block", margin: "8px auto 0", padding: "10px 24px", borderRadius: "8px",
                  border: "none", background: "var(--coral)", color: "#fff", fontSize: ".85rem",
                  fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
                }}
              >
                Continue to Checkout
              </button>
            </div>
          )}
          <button
            onClick={() => onBuy()}
            disabled={buying}
            className="btn-buy"
            style={{ opacity: buying ? 0.6 : 1, cursor: buying ? "not-allowed" : "pointer" }}
          >
            {buying ? "Preparing checkout…" : "Buy Playbook →"}
          </button>
          {buyError && <div role="alert" style={{ color: "#ffcdd2", fontSize: ".8rem", marginTop: "8px" }}>{buyError}</div>}
        </div>
        <div className="pw-trust">More income paths, tool stack, and 90 day plan inside the playbook</div>
      </div>
    </div>
  );
}
