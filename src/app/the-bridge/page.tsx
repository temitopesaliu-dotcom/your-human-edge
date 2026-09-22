import Link from 'next/link';
import './the-bridge.css';

/**
 * The Bridge: free guide page for cold traffic, in front of the
 * Storytelling to Income sales page (/story-to-income). Gives real value
 * without the paid framework or prompts, and every section ends with a CTA
 * matched to what the reader just read.
 */

export const metadata = {
  title: 'Storytelling to Income: how to get people to stop, watch, resonate and buy',
  description:
    'A free guide on how attention moves through the human mind, awareness and conversion storytelling, finding your lane and building your offer.',
};

export default function TheBridgePage() {
  return (
    <div className="tb-page">

<section className="tb-hero"><div className="tb-wrap">
  <div className="tb-eyebrow">The Bridge</div>
  <h1>You don&apos;t need more followers. You need people to <em>stop, watch, resonate &amp; buy</em>.</h1>
  <p className="tb-lead">You don&apos;t need a niche, a ring light, or perfect content. You need to understand how attention works, a story worth telling, and a lane you already own. Here&apos;s the start.</p>
</div></section>

{/* 1. ATTENTION (most important) */}
<section className="tb-section tb-key"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 1 &middot; Start here</div>
  <h2>How attention actually moves through a human mind</h2>
  <p>People don&apos;t decide to watch your video. Their brain decides for them in about a second, before they&apos;re even aware of it. It&apos;s scanning for one thing: <strong>is this about me, or is this something I didn&apos;t expect?</strong> If the answer is no, the thumb keeps moving.</p>
  <p>The posts that stop people in their tracks almost always use one of these patterns:</p>
  <div className="tb-points">
    <div className="tb-point"><h3>The Contrarian</h3><p>Says the opposite of what everyone accepts as true. The brain flags it as a threat to what it already believes, and it has to check.</p></div>
    <div className="tb-point"><h3>The Mirror Moment</h3><p>Describes a scene so specific the viewer feels caught. &quot;If you&apos;ve ever rewritten a caption five times and still not posted it...&quot; Being seen is the fastest way to be heard.</p></div>
    <div className="tb-point"><h3>The Unfinished Loop</h3><p>Opens a question and holds the answer back. The mind hates an open loop and will stay until it&apos;s closed.</p></div>
    <div className="tb-point"><h3>The Confession</h3><p>Says out loud what people think privately and would never post. It creates instant trust because it feels unperformed.</p></div>
    <div className="tb-point"><h3>The Reversal</h3><p>Builds toward an obvious ending, then flips it in the last line. Surprise is memorable, and memorable gets shared.</p></div>
  </div>
  <p>These are patterns, not scripts. Knowing them gets you a head start. Turning a raw thought into one of them, in your own voice, every single time, is where most people get stuck.</p>
  <div className="tb-inline-cta">
    <h3>Stopping them is step one.</h3>
    <p>The guide goes deeper into how the mind moves from stopping, to feeling, to trusting, and shows you how to build that journey into every piece of content you post.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* 2. AWARENESS */}
<section className="tb-section"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 2</div>
  <h2>Awareness storytelling</h2>
  <p>Awareness storytelling is how a stranger goes from &quot;who is this?&quot; to &quot;wait, that&apos;s me.&quot; It isn&apos;t about your product. It isn&apos;t about you, really. It&apos;s about naming something your viewer has lived through, so accurately that they feel understood before they know what you sell.</p>
  <p>This is the content that builds your audience. People don&apos;t follow experts. They follow the person who made them feel seen first.</p>
  <p>The good news: you already have these stories. They come out when you talk, not when you sit down to &quot;write content.&quot;</p>
  <div className="tb-inline-cta">
    <h3>Your voice note is already a story.</h3>
    <p>The guide shows you how to take a raw voice note, just you talking, and turn it into an awareness story that stops the scroll and pulls people in. No writing required.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* 3. CONVERSION */}
<section className="tb-section"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 3</div>
  <h2>Conversion storytelling</h2>
  <p>Awareness gets them to relate. Conversion gets them to act. Once someone already feels understood by you, conversion storytelling shows them what changes when they have the thing you sell, and makes the next step feel obvious rather than pushy.</p>
  <p>Same honesty, same voice. The difference is direction: every conversion story is pointed at one specific offer and one specific outcome.</p>
  <p>Most people either never sell at all, or they sell so hard it breaks the trust their awareness content built. Conversion storytelling is the middle path.</p>
  <div className="tb-inline-cta">
    <h3>From &ldquo;that&rsquo;s me&rdquo; to &ldquo;take my money.&rdquo;</h3>
    <p>The guide shows you how to turn a voice note and your offer into the story that moves people from watching to buying. One per offer.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* 4. LANE */}
<section className="tb-section"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 4</div>
  <h2>Find your lane</h2>
  <p>Most people freeze on what to post because they think they need a &quot;niche.&quot; You don&apos;t. You need a lane: one thing you know, that other people are stuck on, said in your own words.</p>
  <div className="tb-compare">
    <div className="tb-weak"><b>Weak</b>Post whatever comes to mind that day and hope something lands.</div>
    <div className="tb-strong"><b>Strong</b>Pick one problem you already solve for people, at work, in conversation, in your DMs, and become known for it.</div>
  </div>
  <p>Your lane isn&apos;t your job title. It&apos;s the transformation you can talk about with zero research, because you&apos;ve already done the work.</p>
  <div className="tb-inline-cta">
    <h3>You&rsquo;ve already done the work. Now name it.</h3>
    <p>The guide walks you through finding your lane in one sitting, pulled straight out of what you already know. No guessing.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* 5. OFFER */}
<section className="tb-section"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 5</div>
  <h2>Turn that lane into an offer</h2>
  <p>Content without an offer is a hobby. Once you know your lane, you need something to sell from it, even something small.</p>
  <div className="tb-compare">
    <div className="tb-weak"><b>Weak</b>&quot;I help people with their mindset.&quot;</div>
    <div className="tb-strong"><b>Strong</b>&quot;A 15-minute guide that helps first-time posters land their first paying customer.&quot;</div>
  </div>
  <p>The offer doesn&apos;t need to be big. It needs to be clear enough that a stranger scrolling past knows exactly what they&apos;d get, and who it&apos;s for.</p>
  <div className="tb-inline-cta">
    <h3>Make it something they can say yes to.</h3>
    <p>The guide takes the lane you just found and shapes it into an offer people will actually pay for. One sitting.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* 6. WHAT YOU NEED */}
<section className="tb-section"><div className="tb-wrap">
  <div className="tb-eyebrow">Part 6</div>
  <h2>What you actually need to start</h2>
  <p>I use my phone and natural light. That&apos;s it. No ring light, no mic, no studio. The gear was never what stood between you and posting.</p>
  <div className="tb-inline-cta">
    <h3>Your phone is enough. The system is what&rsquo;s missing.</h3>
    <p>Everything else, the tools and system that turn posts into paying customers, is in the 15-page guide.</p>
    <a href="#get-it">Get the guide &rarr;</a>
  </div>
</div></section>

{/* FINAL CTA */}
<section className="tb-section" id="get-it" style={{ border: 0 }}><div className="tb-wrap">
  <div className="tb-ctabox">
    <div className="tb-eyebrow">Storytelling to Income</div>
    <h2>You&apos;ve seen the map. Here&apos;s the whole system.</h2>
    <p>The 15-page guide that shows you how to find your lane, build your offer, and turn a voice note into awareness and conversion stories, plus the tools and automation that turn comments into customers.</p>
    <div className="tb-price">$9.99</div>
    <div className="tb-price-note">Launch price. Rising to $27.</div>
    <Link className="tb-btn" href="/story-to-income#get-it">Get the guide</Link>
    <div className="tb-note">15-page PDF. Instant download. Works in ChatGPT, Claude or Gemini.</div>
  </div>
</div></section>

<footer className="tb-footer"><Link href="/story-to-income">Skip ahead to the guide</Link></footer>
</div>
  );
}
