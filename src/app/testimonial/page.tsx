"use client";

import { useState } from "react";

export default function TestimonialPage() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/testimonial/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, industry, experience, message, rating, consent }),
      });

      if (!res.ok) throw new Error("submit failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="tf-body">
        <div className="tf-wrap">
          <div className="tf-card" style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8 }}>
              Thank you!
            </h2>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Your testimonial has been received.
            </p>
          </div>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="tf-body">
      <div className="tf-wrap">
        <div className="tf-header">
          <div className="tf-eyebrow">The Intelligence Layer Workshop</div>
          <h1>Share your experience</h1>
          <p>Your words help the next expert take the step you just took.</p>
        </div>

        <div className="tf-card">
          <form onSubmit={handleSubmit}>
            <div className="tf-row2">
              <div className="tf-field">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Adenike Dada"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="tf-field">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  placeholder="United Kingdom"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            <div className="tf-row2">
              <div className="tf-field">
                <label htmlFor="industry">Your industry</label>
                <input
                  type="text"
                  id="industry"
                  placeholder="Healthcare · Domiciliary Care"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className="tf-field">
                <label htmlFor="experience">Years of experience</label>
                <input
                  type="text"
                  id="experience"
                  placeholder="8–12 years"
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>

            <div className="tf-field">
              <label htmlFor="message">Your testimonial</label>
              <textarea
                id="message"
                placeholder="Before today, I was... After today, I..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="tf-field">
              <label>How would you rate your experience?</label>
              <div className="tf-stars">
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    className={`tf-star ${(hoverRating || rating) >= value ? "filled" : ""}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="tf-consent">
              <input
                type="checkbox"
                id="consent"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent">
                I give Temitope Saliu permission to use my testimonial in marketing materials, with my name and industry attributed.
              </label>
            </div>

            <button type="submit" className="tf-submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit testimonial"}
            </button>

            {status === "error" && (
              <p style={{ color: "#C0392B", fontSize: 13, marginTop: 12, textAlign: "center" }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
          <div className="tf-note">
            Takes about 90 seconds · Your words may be shared publicly, with your consent above
          </div>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
.tf-body{
  --bg:#FAF9FC; --card:#FFFFFF; --border:#E4E2ED;
  --purple:#7C3AED; --purple-dk:#6524D9; --purple-lt:#F5F3FE;
  --espresso:#3B2F35; --muted:#8B8494; --gold:#E8B93C;
  font-family:'Inter',sans-serif;background:var(--bg);color:var(--espresso);line-height:1.6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 16px;
}
.tf-wrap{width:100%;max-width:560px;}
.tf-header{background:linear-gradient(135deg,var(--purple) 0%,var(--purple-dk) 100%);border-radius:18px;padding:30px 32px;margin-bottom:28px;position:relative;overflow:hidden;}
.tf-header::before{content:'';position:absolute;top:-40px;right:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.08);}
.tf-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:10px;}
.tf-header h1{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:-.4px;margin-bottom:8px;}
.tf-header p{font-size:13.5px;color:rgba(255,255,255,.65);}
.tf-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:32px;}
.tf-field{margin-bottom:20px;}
.tf-field label{display:block;font-size:12.5px;font-weight:600;color:var(--espresso);margin-bottom:6px;}
.tf-field input,.tf-field textarea{width:100%;border:1px solid var(--border);border-radius:8px;padding:11px 14px;font-size:14px;font-family:'Inter',sans-serif;color:var(--espresso);background:#fff;transition:border-color .15s;}
.tf-field input:focus,.tf-field textarea:focus{outline:none;border-color:var(--purple);}
.tf-field textarea{resize:vertical;min-height:120px;}
.tf-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.tf-stars{display:flex;gap:6px;}
.tf-star{width:30px;height:30px;cursor:pointer;color:#D9D5E3;transition:color .15s;}
.tf-star.filled{color:var(--gold);}
.tf-consent{display:flex;align-items:flex-start;gap:10px;background:var(--purple-lt);border-radius:10px;padding:14px 16px;margin-bottom:22px;}
.tf-consent input{margin-top:2px;flex-shrink:0;}
.tf-consent label{font-size:12.5px;color:var(--muted);line-height:1.55;}
.tf-submit{width:100%;background:var(--purple);color:#fff;border:none;border-radius:10px;padding:14px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:background .15s;}
.tf-submit:hover{background:var(--purple-dk);}
.tf-submit:disabled{opacity:0.6;cursor:not-allowed;}
.tf-note{text-align:center;font-size:11.5px;color:var(--muted);margin-top:16px;}
@media (max-width:480px){
  .tf-row2{grid-template-columns:1fr;}
}
`;
