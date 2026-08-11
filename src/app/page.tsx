import type { Metadata } from "next";
import "@/components/features/about/about.css";
import Sidebar from "@/components/features/about/Sidebar";
import CredentialsCard from "@/components/features/about/CredentialsCard";
import HighlightsCard from "@/components/features/about/HighlightsCard";
import WorkshopsCard from "@/components/features/about/WorkshopsCard";
import AwardsCard from "@/components/features/about/AwardsCard";

export const metadata: Metadata = {
  title: "About — Temitope Saliu | Your Human Edge",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function HomePage() {
  return (
    <div className="abt-page">
      <div className="abt-wrap">
        <Sidebar />

        <main>
          <div className="abt-card">
            <div className="abt-eyebrow">About</div>
            <h1>Temitope Saliu</h1>
            <div className="abt-subtitle">
              Business Solutions Architect. AI Consultant. Strategist.
            </div>
            <p>
              Temitope Saliu is a business architect and AI consultant with
              over a decade of experience building the operational and
              intelligence infrastructure that allows founders, institutions,
              and growing organisations to scale without losing what made
              them exceptional in the first place.
            </p>
            <p>
              Her work spans digital transformation, growth strategy,
              partnerships, expansion, and AI system design.
            </p>
          </div>

          <CredentialsCard />
          <HighlightsCard />
          <WorkshopsCard />
          <AwardsCard />

          <footer className="abt-footer">
            © 2026 Temitope Saliu · Your Human Edge with AI. All Rights
            Reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
