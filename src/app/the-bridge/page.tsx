import Link from 'next/link';
import './the-bridge.css';

/**
 * The Bridge: a values/guide page for cold traffic.
 *
 * Sits in front of /story-to-income. Nothing here is gated and nothing here
 * asks for money. It gives a real, usable idea about crossing from AI
 * avoidance to AI as a working tool, then points to the paid blueprint for
 * the specific mechanics (the prompts, the automation, the system).
 *
 * If a listed type existed for a plain content/guide page this would be
 * built as one; it does not, so this is a hand-built static page, matching
 * the story-to-income funnel's pattern of a small scoped stylesheet.
 */

export const metadata = {
  title: 'The Bridge: crossing over to the other side of AI',
  description:
    'A short guide on why AI feels distant even when you already have what it takes, and the four psychological shifts that close the gap.',
};

export default function TheBridgePage() {
  return (
    <div className="tb-page">
      <section className="tb-hero">
        <div className="tb-wrap">
          <div className="tb-eyebrow">The Bridge</div>
          <h1>
            You are not behind on AI. You are standing on the{' '}
            <em>wrong side</em> of it.
          </h1>
          <p className="tb-lead">
            Most people do not have a skills problem. They have a psychology
            problem. Here is the actual gap, and what closes it.
          </p>
        </div>
      </section>

      <section className="tb-section tb-intro">
        <div className="tb-wrap">
          <p>
            You already have something worth building on. A skill, a job, a
            way of explaining things, years of doing something well. That is
            not what is missing.
          </p>
          <p>
            What is missing is permission. Most people wait to feel ready for
            AI, the same way they waited to feel ready to post, to charge
            more, to be seen. Readiness is not a feeling that arrives. It is
            something you build by crossing before you feel ready.
          </p>
          <p>
            <strong>This is that bridge.</strong> Four honest shifts, not
            tricks. If you want the exact mechanics after this, the way to
            turn what you already know into content and income, that is a
            separate thing, and it comes at the end.
          </p>
        </div>
      </section>

      <section className="tb-section tb-guide">
        <div className="tb-wrap">
          <h2>Four shifts, not four tools</h2>
          <p className="tb-lead">
            None of these need a course. They need you to actually do them
            once.
          </p>

          <div className="tb-points">
            <div className="tb-point">
              <span className="tb-point-num">1</span>
              <h3>Ignorance is not the block. Vagueness is.</h3>
              <p>
                &quot;I do not understand AI&quot; is almost never true.
                What is true is &quot;I have not asked it one specific thing
                and watched what came back.&quot; Pick one real task you did
                this week. Ask AI to do a rough version of it. You will
                understand more from that ten minutes than from a month of
                reading about it.
              </p>
            </div>

            <div className="tb-point">
              <span className="tb-point-num">2</span>
              <h3>Fear usually means the stakes are imagined too high.</h3>
              <p>
                People treat their first attempt like it has to be their
                best work, publicly, forever. It does not. Give yourself
                one attempt that nobody sees. Draft an email, a caption, an
                outline. Delete it after. The fear was never about AI. It
                was about being watched while you learn.
              </p>
            </div>

            <div className="tb-point">
              <span className="tb-point-num">3</span>
              <h3>Anxiety drops the moment you narrow the question.</h3>
              <p>
                &quot;How do I use AI in my business&quot; is too big a
                question for anyone to answer, which is exactly why it
                keeps circling in your head. &quot;How do I use AI to
                write the first draft of my Monday newsletter&quot; is a
                question with an answer. Shrink the question before you
                touch the tool.
              </p>
            </div>

            <div className="tb-point">
              <span className="tb-point-num">4</span>
              <h3>Nonchalance is protection wearing a disguise.</h3>
              <p>
                &quot;It is not for me&quot; or &quot;I will get to it
                eventually&quot; is rarely apathy. It is a way to avoid
                trying and possibly being bad at something new, in public,
                at your age or stage. The fix is not motivation. It is
                lowering what &quot;trying&quot; costs you, which is what
                shift one and two already did.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="tb-section tb-transition">
        <div className="tb-wrap">
          <p>
            Crossing the bridge is a decision. What you build once you are
            on the other side is a system.
          </p>
          <p className="tb-sub">
            That system is what actually turns a skill into content, and
            content into income, without you needing to become a different
            person to do it.
          </p>
        </div>
      </section>

      <section className="tb-section">
        <div className="tb-wrap">
          <div className="tb-ctabox">
            <div className="tb-eyebrow">Once you are across</div>
            <h2>Here is the system, not just the mindset</h2>
            <p>
              The exact prompts I use to find my lane, build an offer, write
              the stories that make strangers stop scrolling, and the one
              automation that turns a comment into a paying customer while
              I sleep. $9.99, first 10 copies.
            </p>
            <Link href="/story-to-income#get-it" className="tb-btn">
              See the blueprint
            </Link>
            <div className="tb-note">
              15-page PDF. Instant download. Works in ChatGPT, Claude or
              Gemini.
            </div>
          </div>
        </div>
      </section>

      <footer className="tb-footer">
        <Link href="/story-to-income">Skip ahead to the blueprint</Link>
      </footer>
    </div>
  );
}
