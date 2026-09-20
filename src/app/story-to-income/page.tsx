'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './story-to-income.css';

/**
 * The Story to Income Blueprint sales page.
 *
 * Sold direct from Instagram with no free lead-magnet step in front of it.
 * A previous free-value funnel produced dormant leads rather than buyers, so
 * this page has exactly one job and one button.
 *
 * Price lives in api/story-to-income/create-checkout. PRICE_LABEL below is
 * only what the page renders; if one changes the other must change with it.
 */

const PRICE_LABEL = '$9.99';

export default function StoryToIncomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  const buy = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/story-to-income/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        setError(
          data?.error ||
            'Something went wrong starting checkout. Please try again.'
        );
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  }, []);

  // The sticky bar appears only once the hero button has scrolled away, so
  // it never sits on top of the button it duplicates.
  useEffect(() => {
    const el = heroCtaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { rootMargin: '-10px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="sti-page">
      {/* ================= HERO ================= */}
      <header className="sti-hero">
        <div className="sti-wrap">
          <div className="sti-eyebrow">The Story to Income Blueprint</div>
          <h1>
            5,000 followers in <em>30 days</em>.
            <br />
            Now 11,900, and over $10,000.
          </h1>
          <p className="sti-sub">
            All of it from my phone. Not a following I rented with ads. Not a
            team. The exact prompts, the psychology underneath them, and the one
            automation that turns a comment into a paying customer while you
            sleep.
          </p>

          <div className="sti-chain">
            <span className="c1">Find your lane</span>
            <span className="c2">Build the offer</span>
            <span className="c3">Awareness story</span>
            <span className="c4">Conversion story</span>
            <span className="c5">Auto-deliver</span>
          </div>

          <div className="sti-price-line">
            <span className="now">{PRICE_LABEL}</span>
            <span className="then">Launch price. Rises to $27.</span>
          </div>

          <div ref={heroCtaRef}>
            <button className="sti-btn" onClick={buy} disabled={loading}>
              {loading ? 'Opening checkout…' : `Get the blueprint, ${PRICE_LABEL}`}
            </button>
          </div>
          {error && <div className="sti-err">{error}</div>}
          <p className="sti-btn-note">
            Instant download. 15 pages. Works in ChatGPT, Claude or Gemini.
          </p>
        </div>
      </header>

      {/* ================= PROBLEM ================= */}
      <section className="sti-section">
        <div className="sti-wrap">
          <h2>You are not short of expertise.</h2>
          <p className="sti-lead">
            You are short of a way to say it that makes a stranger stop.
          </p>
          <p>
            You already know things people would pay for. That has never been
            the problem. The problem is that the moment you open the camera,
            everything interesting you know rearranges itself into something
            flat and careful, and you post it, and it disappears.
          </p>
          <p>
            So you decide the issue is consistency, or the algorithm, or that
            you need better lighting first. Six months go by. Somebody less
            experienced than you, saying simpler things than you know, builds
            the audience you wanted.
          </p>
          <p>
            The gap between you and them is not knowledge and it is not
            equipment. It is a repeatable structure for turning what is already
            in your head into something a stranger cannot scroll past.
          </p>
        </div>
      </section>

      {/* ================= THE CHAIN ================= */}
      <section className="sti-section sti-dark">
        <div className="sti-wrap">
          <div className="sti-eyebrow">What it actually looked like</div>
          <h2>Followers are not the point.</h2>
          <p>
            A follower count proves nothing on its own. Here is the whole chain
            instead, because the money is in the part most people never show
            you:
          </p>
          <ol className="sti-steps">
            <li>
              <span className="n" style={{ background: '#00c2a8' }}>1</span>
              <strong>Storytelling.</strong> A structure that holds a stranger
              past the three-second mark, used on every single post.
            </li>
            <li>
              <span className="n" style={{ background: '#ff5a5f' }}>2</span>
              <strong>Followers.</strong> Those strangers follow, because the
              value arrives before the ask, never after it.
            </li>
            <li>
              <span className="n" style={{ background: '#ffb800', color: '#15102e' }}>3</span>
              <strong>Inbound DMs.</strong> They comment one word. The resource
              lands in their inbox automatically, in seconds, at any hour.
            </li>
            <li>
              <span className="n" style={{ background: '#ff3d9a' }}>4</span>
              <strong>Revenue.</strong> The conversation is already one to one
              by the time the offer appears. That is where the $10,000 came
              from.
            </li>
          </ol>
          <p style={{ marginTop: '22px' }}>
            Every link in that chain is in the blueprint. Skip any one of them
            and the chain pays you nothing.
          </p>
        </div>
      </section>

      {/* ================= PROOF ================= */}
      <section className="sti-section">
        <div className="sti-wrap">
          <h2>The receipts</h2>
          <p className="sti-lead">
            My own account. The growth, the machine that runs underneath it, and
            what it produced.
          </p>
          <div className="sti-proof-grid">
            <figure className="sti-proof">
              <img
                src="/images/story-to-income/proof/growth-june-recap.jpg"
                alt="Instagram monthly recap showing 426 thousand views, up 756 percent, 86 percent of views from non-followers, and 6.3 thousand followers, up 5,295"
                loading="lazy"
              />
              <figcaption>
                One month. 426K views, 86 percent of them from people who did
                not follow me. 5,295 new followers.
              </figcaption>
            </figure>
            <figure className="sti-proof">
              <img
                src="/images/story-to-income/proof/growth-insights-30day.jpg"
                alt="Instagram audience insights showing 9,041 followers, up 61.8 percent over 30 days, with the follower growth graph"
                loading="lazy"
              />
              <figcaption>
                The 30 days after that. 9,041 followers, up 61.8 percent. It is
                11.9K now.
              </figcaption>
            </figure>
            <figure className="sti-proof">
              <img
                src="/images/story-to-income/proof/automation-comment-to-dm.jpg"
                alt="Instagram automation flow where a comment triggers an automatic direct message that delivers an offer"
                loading="lazy"
              />
              <figcaption>
                Somebody comments. The DM goes out on its own and hands over the
                offer. This is the system running live on one of mine.
              </figcaption>
            </figure>
            <figure className="sti-proof">
              <img
                src="/images/story-to-income/proof/revenue.png"
                alt="Revenue chart totalling 10,533 dollars"
                loading="lazy"
              />
              <figcaption>What the system produced.</figcaption>
            </figure>
          </div>

          <h3 className="sti-proof-sub">Then the inbox starts</h3>
          <p className="sti-lead">
            These are strangers. Not one of them was asked. This is what happens
            when people can see what you actually do.
          </p>
          <div className="sti-dm-grid">
            <figure className="sti-dm">
              <img
                src="/images/story-to-income/proof/dm-paying.jpg"
                alt="Direct message reading: please come and train me on how to make money via ChatGPT and Claude. I am highly interested. I do not mind paying for the training"
                loading="lazy"
              />
            </figure>
            <figure className="sti-dm">
              <img
                src="/images/story-to-income/proof/dm-pricing.jpg"
                alt="Direct message asking how much the premium option costs"
                loading="lazy"
              />
            </figure>
            <figure className="sti-dm">
              <img
                src="/images/story-to-income/proof/dm-consultation.jpg"
                alt="Direct message asking to book a consultation"
                loading="lazy"
              />
            </figure>
            <figure className="sti-dm">
              <img
                src="/images/story-to-income/proof/dm-services.jpg"
                alt="Direct message from someone who found the page and is asking about career evaluation services"
                loading="lazy"
              />
            </figure>
          </div>
          <p className="sti-proof-note">
            None of that is the point on its own. The point is that it started
            with one post, and the post started with one voice note.
          </p>
        </div>
      </section>

      {/* ================= WHAT IS INSIDE ================= */}
      <section className="sti-section" id="inside">
        <div className="sti-wrap">
          <h2>What is inside</h2>
          <p className="sti-lead">
            Four prompts you paste once, and the setup that makes them pay.
          </p>

          <div className="sti-card k1">
            <span className="sti-num">Prompt 01</span>
            <h3>Find your lane</h3>
            <p>
              Finds the subject you could talk about at 2am with no notes, which
              is the only subject you will still be posting about in March. It
              adapts to what you actually tell it, so it works whether you have
              twenty years behind you or none.
            </p>
          </div>

          <div className="sti-card k2">
            <span className="sti-num">Prompt 02</span>
            <h3>Build the offer</h3>
            <p>
              Turns that lane into three offers at three price points, matched
              honestly to what you can deliver right now, and tells you which
              one to launch first for the fastest possible first sale.
            </p>
          </div>

          <div className="sti-card k3">
            <span className="sti-num">Prompt 03</span>
            <h3>Awareness storytelling</h3>
            <p>
              My actual working prompt, the one I use, not a rewritten version.
              You speak a messy thought into your phone and it returns a
              sub-60-second script built on a five-stage psychological frame,
              plus the text overlays, the caption, three hashtags and both
              comments. Ready to film.
            </p>
          </div>

          <div className="sti-card k4">
            <span className="sti-num">Prompt 04</span>
            <h3>Conversion storytelling</h3>
            <p>
              Set it up once with your offer, then ask for five scripts across
              three angles whenever you want them. Same offer, different way in
              each time, every one a complete package. This is the half almost
              nobody builds, and it is the half that sells.
            </p>
          </div>

          <div className="sti-card k5">
            <span className="sti-num">The setup</span>
            <h3>Comment to inbox, automatically</h3>
            <p>
              How to package what you sell and wire it so the moment somebody
              comments your keyword, it lands in their DM without you touching
              your phone. Plus the psychology chapter explaining why the
              five-stage frame works on people who have never heard your name,
              the filming approach, and every tool with a tutorial linked.
            </p>
          </div>
        </div>
      </section>

      {/* ================= NO GEAR ================= */}
      <section className="sti-section sti-dark">
        <div className="sti-wrap">
          <div className="sti-eyebrow">Before you buy anything else</div>
          <h2>Filmed on a phone, in a kitchen.</h2>
          <p>
            No microphone. No ring light. No artificial lighting at all. I film
            facing a window and let the sunlight do the work, mostly in my
            kitchen or my living room, because that is what is there and it is
            all I need.
          </p>
          <p>
            There is a page in the blueprint about this on purpose. The
            shopping list is where most people go to hide. If you are waiting
            on equipment to arrive before you start, the equipment is not the
            thing stopping you.
          </p>
        </div>
      </section>

      {/* ================= FIT ================= */}
      <section className="sti-section">
        <div className="sti-wrap">
          <h2>Who this is for</h2>
          <ul className="sti-ticks">
            <li>
              Experts, professionals, founders and business owners who know
              their subject and cannot get it to travel.
            </li>
            <li>
              Anyone who has been meaning to post properly for months and keeps
              rewriting their bio instead.
            </li>
            <li>
              People who want the content to actually produce income, not just
              a nicer-looking follower count.
            </li>
            <li>
              Anyone who has an offer, or wants the prompt that builds one.
            </li>
            <li>
              Individuals with no business or offer yet who just want to talk
              about their work or their own story, and get better at it.
            </li>
          </ul>

          <h2 style={{ marginTop: '44px' }}>Who it is not for</h2>
          <ul className="sti-ticks no">
            <li>
              Anyone wanting followers for their own sake, with nothing to sell
              and no intention of selling.
            </li>
            <li>
              Anyone who wants it done for them. These are prompts and a method.
              You still have to speak, film and post.
            </li>
          </ul>
        </div>
      </section>

      {/* ================= BUY ================= */}
      <section className="sti-section" id="get-it">
        <div className="sti-wrap">
          <div className="sti-buybox">
            <div className="sti-eyebrow" style={{ color: '#6c4fd6' }}>
              The Story to Income Blueprint
            </div>
            <div className="amount">
              {PRICE_LABEL}
              <small>one payment</small>
            </div>

            <div className="rises">
              <strong>Launch price.</strong> This goes to $27 after the first
              50 copies. If you are reading this and it still says{' '}
              {PRICE_LABEL}, you are early.
            </div>

            <ul className="sti-ticks" style={{ marginTop: 0 }}>
              <li>15-page PDF, instant download</li>
              <li>All four prompts, copy and paste ready</li>
              <li>My real awareness prompt, unedited</li>
              <li>The comment-to-inbox automation setup</li>
              <li>The psychology behind why the frame works</li>
              <li>Filming approach and full tool stack, tutorials linked</li>
            </ul>

            <div style={{ marginTop: '24px' }}>
              <button className="sti-btn" onClick={buy} disabled={loading}>
                {loading ? 'Opening checkout…' : `Get instant access, ${PRICE_LABEL}`}
              </button>
            </div>
            {error && <div className="sti-err">{error}</div>}
            <p className="sti-btn-note">
              Secure checkout by Stripe. The download page opens the moment you
              pay.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="sti-section">
        <div className="sti-wrap">
          <div className="sti-about">
            <img
              src="/images/story-to-income/temitope-about.jpg"
              alt="Temitope Saliu"
              className="sti-about-photo"
            />
            <div>
              <h2>Who is teaching this</h2>
              <p>
                I am Temitope Saliu. I work at the intersection of AI and
                human psychology, which is the only reason this blueprint is
                about attention mechanics rather than posting tips. The
                prompts work because of what is underneath them.
              </p>
              <p>
                The relevant part is not the credentials, it is that I ran
                this on my own account, from my own kitchen, and it produced
                the chain on this page. But for the record:
              </p>
              <ul className="sti-about-creds">
                <li>
                  Google Elite Trainer, one of three women selected as
                  Sub-Saharan Africa partners
                </li>
                <li>Delivered Microsoft Africa developer training</li>
                <li>Over a decade in marketing, products and partnerships</li>
                <li>Women&apos;s Economic Forum Iconic Award recipient</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="sti-section">
        <div className="sti-wrap">
          <h2>Questions</h2>
          <div className="sti-faq">
            <details>
              <summary>What exactly do I get, in plain terms?</summary>
              <p>
                A 15-page PDF you download immediately after paying. Inside are
                four prompts you paste into ChatGPT, Claude or Gemini, a chapter
                on the psychology that makes them work, the automation setup
                that delivers your product to buyers by itself, the filming
                approach, and every tool explained with a tutorial linked.
              </p>
            </details>
            <details>
              <summary>Do I need to pay for ChatGPT or any other AI?</summary>
              <p>
                No. The prompts run on the free tiers of ChatGPT, Claude and
                Gemini. Paid tiers are faster and hold longer conversations,
                which is convenient, but nothing here requires one.
              </p>
            </details>
            <details>
              <summary>Do I need to buy equipment?</summary>
              <p>
                No, and there is a page in the blueprint arguing specifically
                against it. I use my phone and daylight. A microphone and a
                light are worth it later, once you have hit a problem they
                actually solve.
              </p>
            </details>
            <details>
              <summary>I have never posted before. Is this too advanced?</summary>
              <p>
                No. The first prompt is built to meet you where you are and does
                not assume you have credentials, an audience or an offer. If you
                have never posted, you start at Prompt 01 like everyone else.
              </p>
            </details>
            <details>
              <summary>Will this work outside Instagram?</summary>
              <p>
                The storytelling prompts work anywhere short-form video lives,
                including TikTok, Reels, Shorts and LinkedIn. The automation
                page is written specifically for Instagram, because that is
                where the comment-to-DM tools operate.
              </p>
            </details>
            <details>
              <summary>Is there a refund?</summary>
              <p>
                Because the download is delivered instantly and in full, this
                purchase is non-refundable. Everything you are buying is
                described plainly on this page, so please buy only if the
                description above is what you want.
              </p>
            </details>
            <details>
              <summary>How long before this makes me money?</summary>
              <p>
                Nobody honest can promise you a timeline, and I am not going to.
                What I can tell you is what the blueprint removes: not knowing
                what to say, not knowing what to sell, and having no way to
                deliver it automatically. The posting is still yours to do.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="sti-footer">
        <div className="sti-wrap">
          <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>
            Temitope Saliu
          </p>
          <p>
            <a
              href="https://www.instagram.com/temitopesaliu"
              target="_blank"
              rel="noopener noreferrer"
            >
              @temitopesaliu
            </a>
            {'  ·  '}
            <a href="https://www.temitopesaliu.com">temitopesaliu.com</a>
          </p>
          <p style={{ fontSize: '12px', marginTop: '18px' }}>
            © {new Date().getFullYear()} Temitope Saliu. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ================= STICKY (phone only) ================= */}
      <div className={`sti-sticky${showSticky ? ' show' : ''}`}>
        <span className="s-price">{PRICE_LABEL}</span>
        <button className="sti-btn" onClick={buy} disabled={loading}>
          {loading ? 'Opening…' : 'Get the blueprint'}
        </button>
      </div>
    </div>
  );
}
