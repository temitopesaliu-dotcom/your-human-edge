import Image from "next/image";
import { UsersIcon } from "./Icons";
import { credentials } from "./business-architect.data";

export default function FounderSection() {
  return (
    <section className="section section-alt" id="founder">
      <div className="container">
        <div className="founder-inner">
          <div className="founder-photo">
            <Image
              src="/PHOTO-2026-06-19-12-56-31.jpg"
              alt="Temitope Saliu"
              fill
              sizes="(max-width: 960px) 480px, 260px"
              className="founder-photo-img"
              priority
            />
            <div className="founder-name-tag">
              <div className="founder-name-tag-name">Temitope Saliu</div>
              <div className="founder-name-tag-role">
                AI Strategist · Business Architect · Teacher
              </div>
            </div>
          </div>
          <div className="founder-content">
            <div className="eyebrow">Who leads this</div>
            <h2 className="section-h2" style={{ marginBottom: 16 }}>
              Built by someone who
              <br />
              <em>did it first.</em>
            </h2>
            <div className="founder-origin">
              In 2017 she sold a gold chain to fund her first digital
              marketing course. Not because she had nothing else. Because
              she had decided.{" "}
              <strong>
                That decision — and what it proved — is the foundation
                everything here is built on.
              </strong>
            </div>
            <div className="founder-bio">
              <p>
                Temitope Saliu is an AI Strategist, Systems Architect, and
                Business Architect with ten years on the business side of
                technology — not the engineering side, not the academic
                side. The commercial, partnership, and human side of tech.
                The side that understands how technology actually reaches
                people and creates value.
              </p>
              <p>
                She has built AI-backed Operating Systems for real
                businesses. She has led growth and marketing for tech
                startups and expanded them into new African markets. She
                has built the kind of business she is now teaching others
                to build — from a single decision and a gold chain.
              </p>
            </div>
            <div className="credentials">
              {credentials.map((cred) => (
                <div className="cred" key={cred.title}>
                  <div className="cred-icon">{cred.icon}</div>
                  <div className="cred-text">
                    <div className="cred-title">{cred.title}</div>
                    <div className="cred-desc">{cred.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="guest-note">
              <UsersIcon />
              <p>
                <strong>
                  Taught by domain experts, not just one voice.
                </strong>{" "}
                Alongside Temitope, specialist experts from across
                technology, business, content, AI, and brand will lead the
                tracks that sit in their specific domain. Every layer of
                your business is taught by someone who has actually built
                in that space — not a generalist covering everything.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
