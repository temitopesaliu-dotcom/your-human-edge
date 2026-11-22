"use client";

import { useState } from "react";

export default function PayButtons() {
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState<"usd" | "gbp" | null>(null);
  const [error, setError] = useState("");

  async function start(currency: "usd" | "gbp") {
    setError("");
    setBusy(currency);
    try {
      const res = await fetch("/api/implementation-programme/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency, accepted }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout. Please try again.");
        setBusy(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network problem. Please try again.");
      setBusy(null);
    }
  }

  return (
    <div>
      <label className="accept">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>
          I have read and accept the programme terms above: the weekly implementation
          standard, the removal rule, six monthly payments, and that payments are
          non-refundable.
        </span>
      </label>
      <div className="btns">
        <button
          type="button"
          className="btn"
          disabled={!accepted || busy !== null}
          onClick={() => start("gbp")}
        >
          {busy === "gbp" ? "Opening checkout..." : "Pay £190 / month (UK)"}
        </button>
        <button
          type="button"
          className="btn"
          disabled={!accepted || busy !== null}
          onClick={() => start("usd")}
        >
          {busy === "usd" ? "Opening checkout..." : "Pay $250 / month (USD)"}
        </button>
      </div>
      <p className="err" role="alert">{error}</p>
    </div>
  );
}
