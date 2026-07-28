import Link from "next/link";
import type { ArchetypeConfig } from "./types";

export default function Testimonials({ config }: { config: ArchetypeConfig }) {
  return (
    <section className="sec-alt">
      <div className="wrap">
        <div className={`sec-eye ${config.testimonialsEyeColor}`}>{config.testimonialsEyebrow}</div>
        <h2 className="sec-title">They were where you are.<br />Here is what <em>changed.</em></h2>
        <div className="testimonials">
          {config.caseStudies.map((cs, idx) => (
            <div key={idx} className="testi">
              <div className="testi-quote">{cs.quote}</div>
              <div className="testi-meta">
                <div className="testi-avatar">{cs.name[0]}</div>
                <div>
                  <div className="testi-name">{cs.name}</div>
                  <div className="testi-role">{cs.role} · {cs.location}</div>
                </div>
              </div>
              <div className="testi-result">{cs.result}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link href="#paywall" className="nav-cta" style={{ display: "inline-block", padding: "12px 32px", fontSize: ".95rem" }}>Get the Playbook →</Link>
        </div>
      </div>
    </section>
  );
}
