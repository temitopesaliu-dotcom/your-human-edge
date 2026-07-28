import { scrollToPricing } from "./scroll-to-pricing";

export default function Nav({ countdown }: { countdown: string }) {
  return (
    <nav className="nav">
      <div className="nav-brand">
        The Business <em>Architect</em> Programme
      </div>
      <div className="nav-timer">
        Founding Cohort price closes: <strong>{countdown}</strong>
      </div>
      <a href="#pricing" className="nav-cta" onClick={scrollToPricing}>
        Join the cohort
      </a>
    </nav>
  );
}
