import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="abt-sidebar">
      <div className="abt-photo">
        <Image
          src="/PHOTO-2026-06-19-12-56-31.jpg"
          alt="Temitope Saliu"
          fill
          sizes="(max-width: 820px) 100vw, 300px"
          className="abt-photo-img"
          priority
        />
      </div>
      <div className="abt-side-name">Temitope Saliu</div>
      <div className="abt-side-title">Business Architect. AI Consultant. Teacher.</div>

      <div className="abt-cta-row">
        <Link className="abt-btn-solid" href="/the-blueprint-audit">
          For Businesses →
        </Link>
        <Link className="abt-btn-outline" href="/intelligence-layer">
          For Professionals →
        </Link>
      </div>
    </aside>
  );
}
