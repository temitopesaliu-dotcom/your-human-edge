import Image from "next/image";
import Link from "next/link";

const KEY_CREDENTIALS = [
  "Google & Meta Elite Trainer — 3,000+ professionals trained",
  "UK Global Exceptional Talent",
  "Women Economic Forum Iconic Award Winner",
];

export default function About() {
  return (
    <section
      className="about section"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div className="about-grid fade-up">
          <div className="about-photo-frame">
            <div className="about-photo">
              <Image
                src="/70b1d12e-9faf-4534-87e5-c719dde5f0b9.jpg"
                alt="Temitope Saliu"
                fill
                sizes="(max-width: 900px) 100vw, 380px"
                className="about-photo-img"
              />
            </div>
          </div>

          <div className="about-content">
            <p className="label mb-3">About</p>
            <h2 className="heading-1" id="about-heading">
              Temitope Saliu.
            </h2>
            <p className="about-role">
              Business Solutions Architect. AI Consultant. Strategist.
            </p>
            <p className="body-md mt-3">
              Temitope Saliu is a business architect and AI consultant with
              over a decade of experience building the operational and
              intelligence infrastructure that allows founders, institutions,
              and growing organisations to scale without losing what made them
              exceptional in the first place.
            </p>
            <p className="body-md mt-3">
              Her work spans digital transformation, growth strategy,
              partnerships, expansion, and AI system design — the same
              disciplines behind every Audit she runs.
            </p>

            <div className="about-creds">
              {KEY_CREDENTIALS.map((cred) => (
                <div className="about-cred" key={cred}>
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {cred}
                </div>
              ))}
            </div>

            <Link href="/" className="about-link">
              More about Temitope →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
