import PayButtons from "./PayButtons";

const MONTHS = [
  ["Dec 2026", "Reset and commit: pick one offer, one ICP, one 90-day target", "Offer live, first outreach sent"],
  ["Jan 2027", "Visibility and pipeline: content, outreach, discovery calls", "10+ conversations booked"],
  ["Feb 2027", "First client: audit sold and delivered", "First paying client"],
  ["Mar 2027", "Build and systemise: delivery, onboarding, automations", "One client system live"],
  ["Apr 2027", "Retain and repeat: retainer, referrals, case study", "Second client or retainer"],
  ["May 2027", "Scale and graduate: pricing review, 6-month plan, next steps", "Documented business and a revenue number"],
];

const DATES = ["1 Dec 2026", "1 Jan 2027", "1 Feb 2027", "1 Mar 2027", "1 Apr 2027", "1 May 2027"];

export default function ImplementationProgrammePage() {
  return (
    <>
      <div className="nav"><div className="wrap">Temitope <em>Saliu</em></div></div>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">For alumni only</p>
          <h1>Implementation and <em>Accountability</em> Programme</h1>
          <p className="lead">
            Six months of weekly accountability and implementation support, so what
            you learned becomes a working business that earns revenue.
          </p>
          <div className="facts">
            <div className="fact"><b>Length</b><span>6 months</span></div>
            <div className="fact"><b>Starts</b><span>1 December 2026</span></div>
            <div className="fact"><b>Investment</b><span>£190 or $250 / month</span></div>
            <div className="fact"><b>Total</b><span>£1,140 or $1,500</span></div>
          </div>
        </div>
      </header>

      <section>
        <div className="wrap">
          <h2>What <em>this is</em></h2>
          <p>
            You already have the framework. This programme exists for the part that
            decides whether it pays you: doing the work, every week, with someone who
            sees whether you did.
          </p>
          <p>
            Your deposit for future courses is applied to this programme instead of
            the new course, so you are not paying twice for the same thing.
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>The weekly <em>rhythm</em></h2>
          <ul>
            <li>One group accountability call each week. Day and time are set together on the kickoff call.</li>
            <li>One written check-in thread, so progress is visible between calls.</li>
            <li>Support between calls when you are blocked.</li>
            <li>A tracker of each person&apos;s commitments, reviewed monthly.</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Six months, <em>six outcomes</em></h2>
          <table>
            <thead><tr><th>Month</th><th>Focus</th><th>Proof of progress</th></tr></thead>
            <tbody>
              {MONTHS.map(([m, t, p]) => (
                <tr key={m}><td>{m}</td><td>{t}</td><td>{p}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="note">
            Each month is adjusted to where you actually are. You do not all start from the same place.
          </p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>What &ldquo;implementing&rdquo; <em>means</em></h2>
          <p>It has to be measurable, so each week you:</p>
          <ul>
            <li>Post a short update by the agreed day: what shipped, what is stuck, next action.</li>
            <li>Show one tangible output: an offer posted, outreach sent, a call booked, an audit run, a system built, a payment link live.</li>
            <li>Attend the weekly call, or send your update in advance if you cannot.</li>
          </ul>
          <div className="callout">
            <b>If the standard is missed</b>
            <ol>
              <li>Miss it once: a private reminder from Temitope.</li>
              <li>Miss it two weeks in a row: a written warning, with one week to show output.</li>
              <li>Still no output after the warning week: you are removed from the class and the programme.</li>
            </ol>
            <p>
              On removal, payments already made are non-refundable and your subscription is
              cancelled from the next billing date.
            </p>
          </div>
        </div>
      </section>

      <section id="pay">
        <div className="wrap">
          <h2>Payment, <em>on the 1st</em></h2>
          <p>
            One subscription. Six payments, always on the 1st of the month, then it ends by itself.
            Nothing is charged today. Your first payment is on 1 December 2026.
          </p>
          <div className="pay">
            <div className="price">£190 <small>/ month, UK</small></div>
            <div className="price" style={{ fontSize: 28, marginTop: 4 }}>$250 <small>/ month, USD</small></div>
            <div className="sched">{DATES.map((d) => <span key={d}>{d}</span>)}</div>
            <p className="note" style={{ marginTop: 0, marginBottom: 6 }}>
              UK payers can choose Direct Debit at checkout. Everyone else pays by card.
              If a payment fails it is retried automatically. After the retry window,
              access to calls and the community is paused until you pay. Missed payments are not waived.
            </p>
            <PayButtons />
          </div>
          <p className="note">
            Your acceptance is recorded with the date and time when you continue to checkout.
            Questions before you pay? Reply to the email this link came in.
          </p>
        </div>
      </section>

      <div className="foot"><div className="wrap">&copy; Temitope Saliu</div></div>
    </>
  );
}
