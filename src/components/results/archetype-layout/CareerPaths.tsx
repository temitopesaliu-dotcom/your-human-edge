import Link from "next/link";
import type { ArchetypeConfig } from "./types";

export default function CareerPaths({ config }: { config: ArchetypeConfig }) {
  return (
    <section>
      <div className="wrap">
        <div className="sec-eye eye-gold">AI career paths for your archetype</div>
        <h2 className="sec-title">Roles built for<br /><em>{config.careerSubtitle}</em></h2>
        <p className="sec-sub">These are real paths {config.name}s are building and earning from today.</p>
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", maxWidth: "100%" }}>
          <table className="career-table">
            <thead>
              <tr><th>Career Path</th><th>What You Do</th><th>Earning Range</th></tr>
            </thead>
            <tbody>
              {config.careers.map((c) => (
                <tr key={c.title}>
                  <td>{c.title}</td>
                  <td style={{ color: "var(--soft)", fontSize: ".88rem" }}>{c.desc}</td>
                  <td><span className="earn-pill">{c.earn}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <Link href="#paywall" className="nav-cta" style={{ display: "inline-block", padding: "12px 32px", fontSize: ".95rem" }}>Get the Playbook →</Link>
        </div>
      </div>
    </section>
  );
}
