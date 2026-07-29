import { scrollToPricing } from "./scroll-to-pricing";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        The Business <em>Architect</em> Programme
      </div>
      <a href="#pricing" className="nav-cta" onClick={scrollToPricing}>
        Join the cohort
      </a>
    </nav>
  );
}
