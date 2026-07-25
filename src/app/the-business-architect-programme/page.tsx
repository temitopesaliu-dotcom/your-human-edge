"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const BUILDER_HREF = "https://buy.stripe.com/dRm8wQgkf8Vqcwj1aj3oA0p";
const ACCELERATOR_HREF = "https://buy.stripe.com/8x228s0lhdbG8g3dX53oA0q";

const COUNTDOWN_KEY = "bap_dl";
const COUNTDOWN_DURATION_MS = 72 * 60 * 60 * 1000;

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const DashIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const shifts: [string, string][] = [
  ["Invisible expert", "Recognised authority in your niche"],
  ["Selling time", "Selling a named premium offer"],
  ["Hoping for referrals", "Running an active acquisition system"],
  ["Advising clients", "Building AI infrastructure for clients"],
  ["No content system", "Content engine working while you sleep"],
  ["Solo operator", "Premium Business Architect"],
];

const tracks: { num: string; title: React.ReactNode; desc: string }[] = [
  {
    num: "Track 01",
    title: <><em>Intelligence Layer</em> Mastery</>,
    desc: "The workshop named it. This is where you own it. You pressure-test your Intelligence Layer against real market signals, refine the language until it converts, and confirm the foundation before everything else is built on top of it. Most experts pivot two or three times before it lands. This track collapses that into one deliberate process.",
  },
  {
    num: "Track 02",
    title: <>From Unknown to <em>Authority</em></>,
    desc: "Personal branding built around your specific expertise and niche. You become the person your ICP finds, follows, and trusts before they ever speak to you. Your positioning, your visual identity, your market presence — architected with intention, not assembled by accident.",
  },
  {
    num: "Track 03",
    title: <>From <em>Content</em> to Clients</>,
    desc: "A content system that works while you are not. Short-form video, yap sessions, written content — all derived from your Intelligence Layer so it sounds like you and attracts exactly who you serve. Not content for the sake of content. Content that converts.",
  },
  {
    num: "Track 04",
    title: <>From Conversations to <em>Contracts</em></>,
    desc: "How to run discovery calls, diagnose a client's business, present your findings, and close an engagement. The full client acquisition process from first contact to signed scope — so you never walk in unprepared or leave a call uncertain about next steps.",
  },
  {
    num: "Track 05",
    title: <>From Consultant to <em>Builder</em></>,
    desc: "You learn to design and deliver an AI Operating System for a real client — the infrastructure, the automation, the handover. You stop giving advice and start building things clients depend on. This is where you become the person worth the premium rate.",
  },
  {
    num: "Track 06",
    title: <>The <em>Operator&rsquo;s</em> Brand</>,
    desc: "How to carry, price, and present yourself as a premium Business Architect — not a contractor, not a freelancer. The business identity, the positioning language, the market presence that commands the rates and the rooms you want to be in.",
  },
];

const credentials: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Former Google and Meta Elite Trainer",
    desc: "Not a participant. The person Google and Meta trusted to train their trainers. Personally trained over 3,000 professionals and business owners. In partnership with Google and Meta, part of a team that has reached over 300,000 professionals and business owners across the globe.",
    icon: <StarIcon />,
  },
  {
    title:
      "Single-handedly sealed partnerships with Google, Meta, and the largest sports brand in Nigeria",
    desc: "Enterprise deals closed independently — not as part of a team, not with institutional backing.",
    icon: <UsersIcon />,
  },
  {
    title: "Led growth and marketing for tech startups across Africa",
    desc: "Inside the businesses — building growth engines, opening markets, expanding operations across the continent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Created curricula and programme facilitation for USAID and Peace Corps",
    desc: "The frameworks used to train people at the intersection of technology and human development were built by her.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    title: "Trained for the International Organization for Migration and more",
    desc: "Work spanning borders, institutions, and sectors most consultants never get near.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "UK Global Talent Visa — Exceptional Talent endorsement",
    desc: "Issued by the British government to individuals who have already demonstrated exceptional talent at an international level. Not potential. Proven.",
    icon: <ShieldIcon />,
  },
  {
    title: "Women's Economic Forum Iconic Award",
    desc: "Recognised internationally for impact at the intersection of women, business, and technology.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

const compareRows: {
  section?: string;
  label: string;
  builder: boolean;
  accelerator: boolean;
}[] = [
  { section: "Programme access", label: "All six curriculum tracks", builder: true, accelerator: true },
  { label: "Six weeks of live sessions", builder: true, accelerator: true },
  { label: "Weekly group Q&A", builder: true, accelerator: true },
  { label: "Domain expert guest sessions", builder: true, accelerator: true },
  { label: "Template and prompt library", builder: true, accelerator: true },
  { label: "Community access", builder: true, accelerator: true },
  { label: "Session recordings", builder: true, accelerator: true },
  { section: "Accelerator exclusives", label: "The Builder Seat — bring one co-builder", builder: false, accelerator: true },
  { label: "Opening private strategy session", builder: false, accelerator: true },
  { label: "Track expert private session", builder: false, accelerator: true },
  { label: "Personal proposal and architecture review", builder: false, accelerator: true },
  { label: "Priority feedback — 24hr response", builder: false, accelerator: true },
  { label: "The Invisible Operator track", builder: false, accelerator: true },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Why does the price go up after 72 hours?",
    a: "Because you were in the room. The Founding Cohort price exists for people who experienced the workshop and felt the momentum of what is possible. That energy is real and time-limited. After 72 hours the programme opens publicly at its full price. Founding Cohort members get the best price because they got here first.",
  },
  {
    q: "Who do I bring as my Builder Seat in the Accelerator?",
    a: "Someone who wants to learn the technical implementation side — a business partner, a co-founder, a VA you trust, a family member who is technically inclined. They do not need to be a developer. They need to be willing to learn the build process alongside you. You lead the clients and the strategy. They learn to build the systems. Together you are a complete consulting unit.",
  },
  {
    q: "I was not at the workshop. Can I still join?",
    a: "The Founding Cohort is specifically for workshop participants. The programme opens publicly after the 72-hour window closes at the full price. If you are reading this and were not at the workshop, reach out directly and we will discuss whether there is a fit.",
  },
  {
    q: "What do I walk away with after six weeks?",
    a: "A refined Intelligence Layer the market pays for. A personal brand with a content system behind it. A complete client acquisition process from first contact to signed contract. A delivered or ready-to-deliver AI Operating System. A business identity that commands premium rates. Accelerator members also walk away with a reviewed proposal that has already been in front of a real client.",
  },
  {
    q: "Who teaches the specialist tracks?",
    a: "Domain experts who have actually built in their specific area — lead acquisition, AI-backed content, personal brand, automated systems, and more. This is not one person covering everything. Each specialist track is led by the person most qualified to teach it. The programme is built this way deliberately so every layer of your business is taught at the highest level.",
  },
];

function useCountdown() {
  const [display, setDisplay] = useState("72:00:00");

  useEffect(() => {
    let deadline: number;
    const stored = localStorage.getItem(COUNTDOWN_KEY);
    if (stored) {
      deadline = parseInt(stored, 10);
    } else {
      deadline = Date.now() + COUNTDOWN_DURATION_MS;
      try {
        localStorage.setItem(COUNTDOWN_KEY, String(deadline));
      } catch {
        // ignore storage errors
      }
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setDisplay(`${pad(h)}:${pad(m)}:${pad(s)}`);
      if (diff > 0) timeoutId = setTimeout(tick, 1000);
    };
    tick();

    return () => clearTimeout(timeoutId);
  }, []);

  return display;
}

function scrollToPricing(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
}

export default function BusinessArchitectProgrammePage() {
  const countdown = useCountdown();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [h, m, s] = countdown.split(":");

  return (
    <>
      <div className="announce">
        <p>
          ⚡ Founding Cohort pricing closes in <strong>{countdown}</strong> —{" "}
          <a onClick={scrollToPricing}>claim your seat before it goes</a>
        </p>
      </div>

      <nav className="nav">
        <div className="nav-brand">
          The Business <em>Architect</em> Programme
        </div>
        <div className="nav-timer">
          Founding Cohort price closes: <strong>{countdown}</strong>
        </div>
        <a href="#pricing" className="nav-cta" onClick={scrollToPricing}>
          Join the cohort
        </a>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <span className="hero-dot"></span>Founding Cohort · Limited Enrolment
        </div>
        <h1>
          You are the expert.
          <br />
          Now become
          <br />
          <em>the architect.</em>
        </h1>
        <p className="hero-sub">
          Six weeks. From <strong>invisible expert</strong> to{" "}
          <strong>Business Architect</strong> — with a premium consulting
          offer, a complete client system, and the personal brand that
          commands the room.
        </p>

        <div className="timer-wrap">
          <div className="timer-block">
            <div className="timer-unit">
              <span className="timer-num">{h}</span>
              <span className="timer-label">Hours</span>
            </div>
            <div className="timer-sep">:</div>
            <div className="timer-unit">
              <span className="timer-num">{m}</span>
              <span className="timer-label">Minutes</span>
            </div>
            <div className="timer-sep">:</div>
            <div className="timer-unit">
              <span className="timer-num">{s}</span>
              <span className="timer-label">Seconds</span>
            </div>
          </div>
          <div className="timer-caption">
            Founding Cohort price expires <strong>Tuesday morning</strong> —
            reverts to full price
          </div>
        </div>

        <a href="#pricing" className="hero-cta" onClick={scrollToPricing}>
          See pricing and join ↓
          <ArrowIcon />
        </a>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="transform-inner">
            <div>
              <div className="eyebrow">The transformation</div>
              <h2 className="section-h2">
                Six weeks.
                <br />
                <em>One complete shift.</em>
              </h2>
              <div className="transform-body">
                <p>
                  Most experts spend years figuring out how to package what
                  they know into something the market will pay premium rates
                  for. Most never do — not because the expertise is not
                  there, but because nobody showed them the architecture of
                  how to build a business around it.
                </p>
                <p>
                  The Business Architect Programme collapses that timeline.{" "}
                  <strong>Six weeks. Six tracks. One transformation</strong> —
                  from expert to the person businesses call when they need
                  intelligence infrastructure built.
                </p>
              </div>
            </div>
            <div className="shifts">
              {shifts.map(([from, to]) => (
                <div className="shift" key={from}>
                  <span className="shift-from">{from}</span>
                  <span className="shift-arr">
                    <ArrowIcon />
                  </span>
                  <span className="shift-to">{to}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow" style={{ textAlign: "center" }}>
            The curriculum
          </div>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Six tracks. <em>Six transformations.</em>
          </h2>
          <p
            className="section-sub"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            Not a syllabus. Not a calendar. Six areas of mastery — each one
            leaving you with something real you can use immediately.
          </p>
          <div className="tracks-grid">
            {tracks.map((track) => (
              <div className="track" key={track.num}>
                <div className="track-num">{track.num}</div>
                <div className="track-title">{track.title}</div>
                <div className="track-desc">{track.desc}</div>
              </div>
            ))}
            <div className="track track-bonus">
              <div className="bonus-badge">
                <StarIcon />
                Accelerator Exclusive — The Unfair Advantage
              </div>
              <div className="track-title">
                The <em>Invisible</em> Operator
              </div>
              <div className="track-desc">
                Your AI clone. Your voice. A faceless content presence built
                in parallel to your personal brand — posting, teaching,
                attracting — without requiring your face or your hours every
                single time. While others are manually creating content
                piece by piece, you have a system that runs on its own. This
                track is not part of the core six. It is the layer that
                separates the architects who scale from those who stay at
                capacity.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt" id="founder">
        <div className="container">
          <div className="founder-inner">
            <div className="founder-photo">
              <Image
                src="/PHOTO-2026-06-19-12-56-31.jpg"
                alt="Temitope Saliu"
                fill
                sizes="(max-width: 960px) 480px, 260px"
                className="founder-photo-img"
                priority
              />
              <div className="founder-name-tag">
                <div className="founder-name-tag-name">Temitope Saliu</div>
                <div className="founder-name-tag-role">
                  AI Strategist · Business Architect · Teacher
                </div>
              </div>
            </div>
            <div className="founder-content">
              <div className="eyebrow">Who leads this</div>
              <h2 className="section-h2" style={{ marginBottom: 16 }}>
                Built by someone who
                <br />
                <em>did it first.</em>
              </h2>
              <div className="founder-origin">
                In 2017 she sold a gold chain to fund her first digital
                marketing course. Not because she had nothing else. Because
                she had decided.{" "}
                <strong>
                  That decision — and what it proved — is the foundation
                  everything here is built on.
                </strong>
              </div>
              <div className="founder-bio">
                <p>
                  Temitope Saliu is an AI Strategist, Systems Architect, and
                  Business Architect with ten years on the business side of
                  technology — not the engineering side, not the academic
                  side. The commercial, partnership, and human side of tech.
                  The side that understands how technology actually reaches
                  people and creates value.
                </p>
                <p>
                  She has built AI-backed Operating Systems for real
                  businesses. She has led growth and marketing for tech
                  startups and expanded them into new African markets. She
                  has built the kind of business she is now teaching others
                  to build — from a single decision and a gold chain.
                </p>
              </div>
              <div className="credentials">
                {credentials.map((cred) => (
                  <div className="cred" key={cred.title}>
                    <div className="cred-icon">{cred.icon}</div>
                    <div className="cred-text">
                      <div className="cred-title">{cred.title}</div>
                      <div className="cred-desc">{cred.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="guest-note">
                <UsersIcon />
                <p>
                  <strong>
                    Taught by domain experts, not just one voice.
                  </strong>{" "}
                  Alongside Temitope, specialist experts from across
                  technology, business, content, AI, and brand will lead the
                  tracks that sit in their specific domain. Every layer of
                  your business is taught by someone who has actually built
                  in that space — not a generalist covering everything.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="eyebrow" style={{ textAlign: "center" }}>
            Founding Cohort pricing
          </div>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Two paths into
            <br />
            <em>the programme.</em>
          </h2>
          <p
            className="section-sub"
            style={{ margin: "0 auto", textAlign: "center" }}
          >
            Both tiers go through the same six tracks. The difference is the
            depth of support, the speed of results, and whether you bring a
            builder with you.
          </p>
          <div className="pricing-grid">
            <div className="tier">
              <div className="tier-top">
                <div className="tier-badge b">The Builder</div>
                <div className="tier-name">
                  The <em>Builder</em>
                </div>
                <div className="tier-for">
                  You are technically capable — or learning to be. You can
                  implement. What you need is the business architecture, the
                  offer, the positioning, and the client system built around
                  your expertise. You are doing this yourself and you want
                  the best cohort, content, and community to do it alongside.
                </div>
                <div className="tier-price-row">
                  <div className="tier-price">$597</div>
                  <div className="tier-price-cross">$997</div>
                </div>
                <div className="tier-note">
                  <strong>Founding Cohort pricing ends Tuesday.</strong>{" "}
                  Reverts to $997 after 72 hours.
                </div>
                <a href={BUILDER_HREF} className="tier-btn b">
                  Join as The Builder <ArrowIcon />
                </a>
              </div>
              <div className="tier-body">
                <div className="tier-section-lbl">What is included</div>
                <div className="tf g">
                  <CheckIcon />
                  All six curriculum tracks
                </div>
                <div className="tf g">
                  <CheckIcon />
                  Six weeks of live implementation sessions
                </div>
                <div className="tf g">
                  <CheckIcon />
                  Weekly group Q&A — work reviewed, not just questions
                  answered
                </div>
                <div className="tf g">
                  <CheckIcon />
                  Domain expert guest sessions across every track
                </div>
                <div className="tf g">
                  <CheckIcon />
                  Full template and prompt library
                </div>
                <div className="tf g">
                  <CheckIcon />
                  Community access and peer accountability
                </div>
                <div className="tf g">
                  <CheckIcon />
                  All session recordings
                </div>
              </div>
            </div>

            <div className="tier featured">
              <div className="tier-top">
                <div className="tier-badge p">
                  <StarIcon />
                  The Accelerator
                </div>
                <div className="tier-name">
                  The <em>Accelerator</em>
                </div>
                <div className="tier-for">
                  You are a domain expert — exceptional at what you do, but
                  the building side is not yours. You bring one technical
                  person with you. They learn the implementation. You lead
                  the business, the clients, the strategy. Together you are
                  a complete consulting unit. This tier is also for those
                  who want to reach their first client faster — with direct
                  support behind every critical step.
                </div>
                <div className="tier-price-row">
                  <div className="tier-price">$997</div>
                  <div className="tier-price-cross">$1,497</div>
                </div>
                <div className="tier-note">
                  <strong>Founding Cohort pricing ends Tuesday.</strong>{" "}
                  Reverts to $1,497 after 72 hours.
                </div>
                <a href={ACCELERATOR_HREF} className="tier-btn p">
                  Join as The Accelerator <ArrowIcon />
                </a>
              </div>
              <div className="tier-body">
                <div className="tier-section-lbl">
                  Everything in The Builder, plus
                </div>

                <div className="builder-seat">
                  <div className="bs-lbl">
                    <UsersIcon />
                    The Builder Seat
                  </div>
                  <div className="bs-title">
                    Bring your technical co-builder
                  </div>
                  <div className="bs-body">
                    One person joins the full six-week programme alongside
                    you. They learn the implementation side while you build
                    the business side. You graduate as a team — a domain
                    expert and a builder who speak the same language and
                    share the same system.
                  </div>
                  <div className="bs-math">
                    Two people. One programme. One investment of{" "}
                    <strong>$997</strong> — rather than two separate seats at
                    $597 each plus the Accelerator extras. The Builder Seat
                    is included because the best Business Architects do not
                    build alone.
                  </div>
                </div>

                <div className="tier-section-lbl">
                  Two private strategy sessions
                </div>
                <div className="sessions">
                  <div className="srow">
                    <div className="sicon pu">
                      <UserIcon />
                    </div>
                    <div>
                      <div className="stitle">Opening strategy session</div>
                      <div className="sdesc">
                        Your Intelligence Layer mapped to your specific
                        market opportunity. Your offer, your positioning,
                        your first 90 days — built before the programme
                        begins so you start with clarity, not questions.
                      </div>
                    </div>
                  </div>
                  <div className="srow">
                    <div className="sicon gr">
                      <UsersIcon />
                    </div>
                    <div>
                      <div className="stitle">Track expert session</div>
                      <div className="sdesc">
                        Targeted implementation support from the domain
                        expert who teaches your specific track — delivered
                        at the point in the programme where you need it
                        most. Not a generalist session. Exact help for your
                        exact situation.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tier-section-lbl">
                  Additional Accelerator benefits
                </div>
                <div className="tf pu">
                  <CheckIcon />
                  <span>
                    Personal review of your first client proposal and AI
                    Operating System architecture before it goes out
                  </span>
                </div>
                <div className="tf pu">
                  <CheckIcon />
                  <span>
                    Priority feedback — questions answered within 24 hours
                  </span>
                </div>
                <div className="tf pu">
                  <CheckIcon />
                  <span>
                    <strong>The Invisible Operator track</strong> — AI clone,
                    voice, and faceless content presence
                  </span>
                </div>

                <div className="soft-assurance">
                  <div className="sa-lbl">
                    <ShieldIcon />
                    You do not figure out the first client alone
                  </div>
                  <div className="sa-title">
                    Your proposal gets reviewed before it goes out.
                  </div>
                  <div className="sa-body">
                    Your pitch gets sharpened before you walk in. The
                    discovery, the scope, the close — the private sessions
                    and the personal proposal review exist specifically for
                    this moment. Accelerator members arrive at their first
                    client conversation prepared, not hopeful.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="eyebrow" style={{ textAlign: "center" }}>
            Full comparison
          </div>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Side by side. <em>Full picture.</em>
          </h2>
          <table className="compare-table">
            <thead>
              <tr>
                <th></th>
                <th className="bc">The Builder · $597</th>
                <th className="ac">The Accelerator · $997</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <Fragment key={row.label}>
                  {row.section && (
                    <tr className="sec-row">
                      <td colSpan={3}>{row.section}</td>
                    </tr>
                  )}
                  <tr>
                    <td>{row.label}</td>
                    <td>
                      {row.builder ? (
                        <span className="ck">
                          <CheckIcon />
                        </span>
                      ) : (
                        <span className="ds">
                          <DashIcon />
                        </span>
                      )}
                    </td>
                    <td>
                      {row.accelerator ? (
                        <span className="ck-pu">
                          <CheckIcon />
                        </span>
                      ) : (
                        <span className="ds">
                          <DashIcon />
                        </span>
                      )}
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="eyebrow" style={{ textAlign: "center" }}>
            Questions
          </div>
          <h2 className="section-h2" style={{ textAlign: "center" }}>
            Answered.
          </h2>
          <div className="faq-list">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div className="faq-item" key={item.q}>
                  <button
                    className={`faq-q${open ? " open" : ""}`}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    {item.q}
                    <PlusIcon />
                  </button>
                  <div className={`faq-a${open ? " open" : ""}`}>{item.a}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="final-inner">
          <h2>
            The expertise was
            <br />
            always there.
            <br />
            <em>Now build with it.</em>
          </h2>
          <p>
            Six weeks. The programme that takes you from expert to Business
            Architect — with the offer, the system, the brand, and the
            client to prove it.
          </p>
          <div className="final-btns">
            <a href={ACCELERATOR_HREF} className="fbtn-p">
              Join The Accelerator — $997{" "}
              <ArrowIcon />
            </a>
            <a href={BUILDER_HREF} className="fbtn-g">
              Join The Builder — $597
            </a>
          </div>
          <div className="final-caption">
            Founding Cohort price expires <strong>Tuesday morning</strong> ·
            72 hours from end of workshop
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-brand">
          The Business <em>Architect</em> Programme
        </div>
        <div className="footer-copy">
          2026 temitopesaliu.com · Intelligence Layer Workshop · Founding
          Cohort
        </div>
      </footer>
    </>
  );
}
