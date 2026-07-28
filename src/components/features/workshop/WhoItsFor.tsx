import Link from "next/link";

export default function WhoItsFor() {
  return (
    <section className="ws-for-section ws-section">
      <div className="ws-container">
        <div className="ws-for-grid">
          <div>
            <div className="ws-section-eyebrow">This room is for you if</div>
            <h2 className="ws-section-h2">
              You are ready to build.
              <br />
              Not just learn.
            </h2>
            <div className="ws-for-list">
              {[
                "You have 3 or more years of expertise in your field and you know you are undercharging for it",
                "You are employed, consulting, or coaching and want an AI-powered income stream without starting from scratch",
                "You are done watching people with less experience charge more because they packaged themselves better",
                "You want a structured methodology, not another pile of AI tool recommendations",
              ].map((item) => (
                <div className="ws-for-item yes" key={item}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ws-section-eyebrow">This is not for you if</div>
            <h2
              className="ws-section-h2"
              style={{ color: "var(--text-muted)" }}
            >
              Wrong room?
              <br />
              No problem.
            </h2>
            <div className="ws-for-list">
              <div className="ws-for-item no">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <span>
                  You are brand new to your field and looking for a shortcut
                </span>
              </div>
              <div className="ws-for-item no">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <span>
                  You want passive income without putting in the thinking
                  work first
                </span>
              </div>
              <div className="ws-for-item no">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                <span>
                  You are looking for a general AI tools overview or beginner
                  content
                </span>
              </div>
              <div
                className="ws-for-item no"
                style={{
                  border: "1px solid var(--purple-mid)",
                  background: "var(--purple-light)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--purple)" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                <span style={{ color: "var(--purple)", fontWeight: 500 }}>
                  Not sure if this is for you?{" "}
                  <Link
                    href="/"
                    style={{
                      color: "var(--purple)",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Take the free profile quiz first.
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
