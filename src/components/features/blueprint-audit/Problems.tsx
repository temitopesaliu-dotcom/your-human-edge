export default function Problems() {
  return (
    <section
      className="problems section"
      id="problems"
      aria-labelledby="problems-heading"
    >
      <div className="container">
        <div className="section-header fade-up">
          <p className="label mb-3">The Reality</p>
          <h2 className="heading-1">If any of this sounds familiar.</h2>
          <p className="body-lg mt-3">
            You didn&apos;t start a business to become its most overworked
            employee. But here you are.
          </p>
        </div>

        <div className="problems-grid" role="list">
          {[
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              text: '"My business stops the moment I stop."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M3 10h18M3 6h18M3 14h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              text: '"I answer the same questions every single day."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              ),
              text: '"I have tools everywhere but no actual system."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              text: '"My team wastes hours on things that should be automatic."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              text: '"Clients wait too long because I\'m the only one who can respond."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M12 7v10M3 12c0 2.76 4.03 5 9 5s9-2.24 9-5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              ),
              text: '"All the knowledge is in my head. If I leave, it disappears."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              text: '"Onboarding new clients takes hours of my personal time."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              text: '"Growth feels like more chaos, not less. Scaling breaks everything."',
            },
            {
              icon: (
                <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ),
              text: '"Operations are invisible until they break — and they always break."',
            },
          ].map((item, i) => (
            <div className="problem-card" role="listitem" key={i}>
              {item.icon}
              <p className="problem-card-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
