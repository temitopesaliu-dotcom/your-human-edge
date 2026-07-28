import type { ArchetypeConfig } from "./types";

export default function ResultHero({ config, greeting }: { config: ArchetypeConfig; greeting: string }) {
  return (
    <div className="hero">
      <div className="hero-inner">
        <div className="hero-greeting">{greeting}</div>
        <span className="hero-icon">{config.icon}</span>
        <div className="hero-eyebrow">Your AI Archetype</div>
        <h1 className="hero-name">The {config.name}</h1>
        <div className="hero-tagline">&ldquo;{config.tagline}&rdquo;</div>
        <div className="hero-sep">
          <div className="line"></div>
          <div className="dot">◆</div>
          <div className="line"></div>
        </div>
        <div className="ceiling-box">
          <span className="ceiling-label">{config.ceilingLabel}</span>
          <p dangerouslySetInnerHTML={{ __html: config.ceilingContent }} />
        </div>
      </div>
    </div>
  );
}
