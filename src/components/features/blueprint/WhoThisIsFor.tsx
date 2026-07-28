import { WHO_FITS, WHO_NOT_FITS } from "./blueprint.data";

export default function WhoThisIsFor() {
  return (
    <section className="section-sm" id="who" aria-labelledby="who-heading">
      <div className="container">
        <div className="two-col-layout">
          <div className="fade-up">
            <p className="label mb-3">Who This Is For</p>
            <h2 className="heading-2" id="who-heading">
              The Blueprint is designed for one kind of business.
            </h2>
          </div>
          <div className="fade-up delay-1">
            <p className="body-lg mb-5">
              Founder-led. Revenue-generating. Operationally bottlenecked.
              Ready to change that.
            </p>
            <div className="who-grid">
              {WHO_FITS.map((item, i) => (
                <div className="who-item" key={i}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#C8A96E" strokeWidth="1.2" />
                    <path d="M5 8l2 2 4-4" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
              {WHO_NOT_FITS.map((item, i) => (
                <div className="who-item not-fit" key={`nf-${i}`}>
                  <svg viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                    <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
