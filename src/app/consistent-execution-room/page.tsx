import PayButtons from "./PayButtons";

const PILLARS = [
  {
    n: "01",
    t: "Consistent Implementation & Accountability",
    p: [
      "This isn't a space where you simply listen to someone teach.",
      "You'll have an environment that keeps you accountable to the business goals and projects you've committed to.",
      "We focus on what you're building, what's been completed, what's holding you back and what needs to happen next.",
      "**Live calls every two weeks keep the work moving and give you a fixed point to report progress, get unstuck and set your next commitment.",
    ],
  },
  {
    n: "02",
    t: "The Signal OS",
    p: [
      "Effort feels like progress. Signal is proof of it.",
      "The Signal OS is the live operating system of the room: a running build log where every member submits what they put in and what came out of it. Outreach sent, offers launched, calls booked, systems shipped, revenue earned.",
      "Every input and every output is counted, so you can see your execution rate climbing, spot where you stall, and know exactly what is moving your business and what is just noise.",
      "It comes with the tools, templates and processes that make implementation the default, plus a resource library that is continually updated and sent to you as the room builds.",
    ],
  },
  {
    n: "03",
    t: "Practical Business Execution",
    p: [
      "Sometimes you know exactly what needs to happen but need support getting it done.",
      "Whether you're developing an offer, launching a service, building a business system, refining your positioning or putting your marketing strategy into action, the focus is on practical execution.",
      "We work through the actual business challenges standing between you and your next milestone.",
    ],
  },
  {
    n: "04",
    t: "Strategic Guidance & Problem-Solving",
    p: [
      "Not every obstacle requires another course.",
      "Sometimes you need someone to help you see the problem differently, identify the missing piece or make a decision that moves your business forward.",
      "Bring your questions, roadblocks and implementation challenges into the room.",
    ],
  },
  {
    n: "05",
    t: "AI & Systems in Practice",
    p: [
      "You've learned how to leverage technology, AI and systems to increase your capacity.",
      "Now it's time to put those capabilities to work.",
      "Explore how to use AI to support your business operations, marketing, content, customer experience, delivery and productivity.",
      "The objective isn't to use more tools. It's to build a business that operates more effectively.",
    ],
  },
  {
    n: "06",
    t: "An Environment of People Who Are Building",
    p: [
      "Your environment matters.",
      "You'll be surrounded by other professionals, experts, consultants, coaches and business owners who have invested in developing their capabilities and are actively working towards building something.",
      "This is an environment for people who want to move beyond consuming information and start creating tangible results.",
    ],
  },
];

const WORK_ON = [
  "Turning your expertise into a marketable, premium offer.",
  "Launching your coaching or consulting business.",
  "Developing your business positioning and messaging.",
  "Building your marketing and client acquisition systems.",
  "Acquiring clients and customers.",
  "Creating content that attracts the right audience.",
  "Implementing AI-powered workflows and automations.",
  "Improving your service delivery and customer experience.",
  "Developing operational processes that reduce manual work.",
  "Testing and validating a new business idea.",
  "Increasing your capacity to serve more clients.",
  "Moving from inconsistent activity to structured business execution.",
];

const FOR_YOU = [
  "You've completed a programme with me and want to implement what you've learned.",
  "You have ideas and strategies but need a consistent environment to execute them.",
  "You're building a coaching, consulting, training or service-based business.",
  "You want to leverage AI and technology to increase your execution capacity.",
  "You need strategic input when you encounter challenges.",
  "You want to maintain momentum instead of repeatedly starting and stopping.",
  "You're serious about turning your knowledge and expertise into a functioning business.",
];

export default function ConsistentExecutionRoomPage() {
  return (
    <>
      <div className="nav"><div className="wrap">Temitope <em>Saliu</em></div></div>

      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">For alumni only</p>
          <h1>The <em>Consistent Execution</em> Room</h1>
          <p className="tag">From knowing to doing. From learning to building. From building to growing.</p>
          <p className="lead">
            <b>Your next level of business growth requires more than another course. It requires consistent execution.</b>
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          <p>You&apos;ve invested in learning. You&apos;ve developed your thinking, acquired new skills, explored opportunities and perhaps even built the foundations of your business.</p>
          <p>But knowledge alone doesn&apos;t build a business.</p>
          <p>Offers need to be launched. Ideas need to be tested. Systems need to be implemented. Content needs to go out. Clients need to be acquired. And the work needs to keep moving, even when motivation fluctuates or you encounter obstacles.</p>
          <p>The Consistent Execution Room is an exclusive monthly implementation and accountability environment for alumni who are ready to turn what they&apos;ve learned into measurable business progress.</p>
          <p className="strong">Less learning for learning&apos;s sake. More building, implementing and moving forward.</p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>This is where the <em>real work</em> happens.</h2>
          <p>One of the biggest challenges with professional development is the gap between what you learn and what you actually implement.</p>
          <p>You finish a programme full of ideas. You have notes, frameworks, strategies and a clearer understanding of what needs to happen.</p>
          <p>Then real life happens.</p>
          <p>You get busy. You second-guess your decisions. You encounter technical challenges. You struggle to prioritise. You start something and don&apos;t finish it.</p>
          <p>Eventually, the very thing you invested in learning becomes another unfinished project.</p>
          <p className="strong">The Consistent Execution Room exists to close that gap.</p>
          <p>It&apos;s an environment where you don&apos;t have to figure everything out alone, start from scratch every time or wait until you feel completely ready.</p>
          <p>You come in with your goals. We work through the execution. You make progress, get feedback and keep moving.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>What you get <em>inside</em></h2>
          <div className="pillars">
            {PILLARS.map((x) => (
              <div className="pillar" key={x.n}>
                <span className="num">{x.n}</span>
                <h3>{x.t}</h3>
                {x.p.map((line) => line.startsWith("**") ? <p key={line}><b>{line.slice(2)}</b></p> : <p key={line}>{line}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>What can you <em>work on?</em></h2>
          <p>Your implementation goals will depend on where you are in your business journey. You might be working on:</p>
          <ul className="cols">{WORK_ON.map((w) => <li key={w}>{w}</li>)}</ul>
          <p className="strong">You don&apos;t need to be working on all these things.</p>
          <p>You need to know what matters most for your business right now and commit to moving it forward.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2>Who is <em>this for?</em></h2>
          <p>The Consistent Execution Room is exclusively for alumni who have previously participated in one of my programmes, courses or professional development engagements.</p>
          <p>It&apos;s for you if:</p>
          <ul>{FOR_YOU.map((w) => <li key={w}>{w}</li>)}</ul>
          <p className="strong">This is not for people looking for another library of lessons to consume.</p>
          <p>It&apos;s for people who are ready to do the work.</p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <h2>Why continue <em>after the programme?</em></h2>
          <p>Because completing a programme is not the same as completing the work.</p>
          <p>The real value of what you&apos;ve learned is in what you do with it.</p>
          <p>Your next business milestone might be launching your first offer, signing your next client, establishing your operating systems, automating repetitive work or building a more sustainable business.</p>
          <p>Whatever that milestone looks like, you shouldn&apos;t have to abandon the momentum you&apos;ve built simply because the programme has ended.</p>
          <p>The Consistent Execution Room gives you somewhere to continue.</p>
          <p>You&apos;ve already invested in your development.</p>
          <p className="strong">Now let&apos;s make that investment count.</p>
        </div>
      </section>

      <section id="join">
        <div className="wrap">
          <h2>Your <em>membership</em></h2>
          <p><b>An ongoing monthly membership for programme alumni.</b></p>
          <p>Your membership includes access to the ongoing implementation and accountability environment, live calls every two weeks, practical business guidance, strategic problem-solving, the Signal OS and a community of fellow alumni.</p>
          <div className="pay">
            <div className="callout">
              <b>Membership terms</b>
              <ul>
                <li>You pay one full month when you join, which covers the coming month. After that, payment is taken on the 1st of every month. For example: join in November, pay today, next payment 1 January.</li>
                <li>Continues for as long as you choose to remain. Cancel future renewals at any time by telling Temitope before the next 1st.</li>
                <li>Payments already made are non-refundable.</li>
                <li>Membership means implementing: a short weekly update on what shipped, what is stuck and your next action. Members who stop implementing may be asked to leave, with no further charges.</li>
                <li>If a payment fails it is retried automatically. Access is paused until it is paid.</li>
              </ul>
            </div>

            <p className="note">Pay by card. Your card is saved and charged automatically on the 1st of each month.</p>
            <div className="callout">
              <b>Note</b>
              <p>This is group implementation and strategic support. It is not unlimited private consulting, and it is not done-for-you implementation. You do the building. The room keeps you executing, sharpens your decisions and helps you through the blocks.</p>
            </div>

            <PayButtons />
          </div>
          <p className="note">Your acceptance is recorded with the date and time when you continue to checkout.</p>
        </div>
      </section>

      <div className="cta-band">
        <div className="wrap">
          <h2>Your <em>next step</em></h2>
          <p>If you&apos;ve previously worked with me, you already understand the standard of thinking, the depth of work, and the value of the environment.</p>
          <p>The Consistent Execution Room is your opportunity to continue that journey.</p>
          <p className="strong" style={{ color: "#fff" }}>You don&apos;t need another six weeks of information. You need to keep building.</p>
          <p style={{ marginTop: 20 }}><b>Welcome to The Consistent Execution Room.</b><br />For alumni. For builders. For people who are ready to execute.</p>
        </div>
      </div>

      <div className="foot"><div className="wrap">&copy; Temitope Saliu</div></div>
    </>
  );
}
