"use client";

import Link from "next/link";

export default function WorkshopPage() {
  return (
    <>
      <style>{`
        :root {
          --white: #FFFFFF;
          --alabaster: #F8F7FC;
          --grain: #F5F5F3;
          --footer-bg: #EFECE6;
          --border: #E4E2ED;
          --purple: #7C3AED;
          --purple-light: #EDE9FD;
          --purple-mid: #C4B5FD;
          --green: #00A86B;
          --green-light: #E6F7F1;
          --text: #4A3E3D;
          --text-muted: #7A6E6D;
          --text-light: #A89E9D;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 20px;
          --shadow-sm: 0 1px 3px rgba(74,62,61,0.06), 0 1px 2px rgba(74,62,61,0.04);
          --shadow-md: 0 4px 16px rgba(74,62,61,0.08), 0 1px 4px rgba(74,62,61,0.04);
          --shadow-lg: 0 12px 40px rgba(74,62,61,0.12), 0 4px 12px rgba(74,62,61,0.06);
          --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: var(--white); color: var(--text); line-height: 1.6; }

        .ws-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 max(2rem, calc((100vw - 1100px)/2)); height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .ws-nav-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--text); text-decoration: none; }
        .ws-nav-logo span { color: var(--purple); }
        .ws-nav-right { display: flex; align-items: center; gap: 16px; }
        .ws-nav-date { font-size: 12px; font-weight: 500; color: var(--text-muted); }
        .ws-nav-cta { background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 8px 20px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; transition: all var(--transition); font-family: 'Inter', sans-serif; }
        .ws-nav-cta:hover { background: #6D28D9; }

        .ws-countdown { background: var(--purple); color: white; padding: 10px 2rem; text-align: center; font-size: 13px; font-weight: 500; position: sticky; top: 60px; z-index: 90; margin-top: 60px; }
        .ws-countdown strong { font-weight: 700; }

        .ws-container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
        .ws-section { padding: 80px 0; }
        .ws-section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--purple); margin-bottom: 1rem; }
        .ws-section-h2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 3.5vw, 40px); font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 1rem; letter-spacing: -0.8px; }
        .ws-section-sub { font-size: 16px; color: var(--text-muted); line-height: 1.7; max-width: 540px; }

        .ws-hero { padding: 110px 0 80px; background: var(--white); position: relative; overflow: hidden; }
        .ws-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 60%; background: radial-gradient(ellipse 70% 60% at 50% 0%, #EDE9FD 0%, transparent 70%); pointer-events: none; }
        .ws-hero-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(320px, 420px); gap: 80px; align-items: start; }
        .ws-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: var(--purple-light); border: 1px solid var(--purple-mid); border-radius: 999px; padding: 5px 14px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple); margin-bottom: 1.25rem; }
        .ws-hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: ws-pulse 2s infinite; }
        @keyframes ws-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .ws-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 4vw, 54px); font-weight: 700; line-height: 1.1; color: var(--text); margin-bottom: 1.25rem; letter-spacing: -1.5px; }
        .ws-hero h1 em { font-style: italic; color: var(--purple); }
        .ws-hero-sub { font-size: 17px; color: var(--text-muted); line-height: 1.75; margin-bottom: 2.5rem; max-width: 520px; }
        .ws-hero-meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 2.5rem; }
        .ws-hero-meta-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: var(--text-muted); }
        .ws-hero-meta-item svg { width: 16px; height: 16px; color: var(--purple); flex-shrink: 0; }
        .ws-hero-trust { display: flex; align-items: center; gap: 8px; margin-top: 1.25rem; font-size: 12px; color: var(--text-light); }
        .ws-hero-trust svg { width: 14px; height: 14px; color: var(--green); }
        .ws-btn-checkout { display: inline-flex; align-items: center; gap: 8px; background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 14px 28px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all var(--transition); text-decoration: none; font-family: 'Inter', sans-serif; }
        .ws-btn-checkout:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .ws-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 13px 22px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; color: var(--text); text-decoration: none; transition: all var(--transition); }
        .ws-btn-secondary:hover { border-color: var(--purple-mid); color: var(--purple); background: var(--purple-light); }
        .ws-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

        .ws-checkout-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; position: sticky; top: 110px; }
        .ws-checkout-card-top { padding: 24px 24px 20px; background: linear-gradient(135deg, #4A3E3D 0%, #2D2120 100%); color: white; }
        .ws-checkout-date { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 6px; }
        .ws-checkout-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; line-height: 1.3; margin-bottom: 4px; }
        .ws-checkout-sub { font-size: 13px; color: rgba(255,255,255,0.65); }
        .ws-checkout-body { padding: 24px; }
        .ws-price-original { font-size: 14px; color: var(--text-light); text-decoration: line-through; margin-bottom: 4px; }
        .ws-price-current { font-size: 40px; font-weight: 700; color: var(--text); letter-spacing: -1.5px; line-height: 1; margin-bottom: 4px; }
        .ws-price-current sup { font-size: 20px; vertical-align: super; letter-spacing: 0; font-weight: 600; }
        .ws-price-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--green-light); border: 1px solid var(--green); border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 600; color: var(--green); }
        .ws-price-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--green); }
        .ws-seats-notice { background: var(--alabaster); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; margin: 16px 0; font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 8px; }
        .ws-seats-notice svg { width: 14px; height: 14px; color: var(--purple); flex-shrink: 0; }
        .ws-checkout-includes-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }
        .ws-include-item { display: flex; align-items: flex-start; gap: 8px; padding: 5px 0; font-size: 13px; color: var(--text-muted); }
        .ws-include-item svg { width: 14px; height: 14px; color: var(--green); flex-shrink: 0; margin-top: 2px; }
        .ws-btn-checkout-full { width: 100%; background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 15px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all var(--transition); font-family: 'Inter', sans-serif; margin: 16px 0 10px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .ws-btn-checkout-full:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: var(--shadow-md); }
        .ws-checkout-trust { font-size: 12px; color: var(--text-light); text-align: center; display: flex; align-items: center; justify-content: center; gap: 5px; }
        .ws-checkout-trust svg { width: 13px; height: 13px; color: var(--green); }

        .ws-hook { background: var(--alabaster); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 100px 0; }
        .ws-hook-inner { max-width: 700px; margin: 0 auto; text-align: center; }
        .ws-hook-inner h2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: var(--text); line-height: 1.2; margin-bottom: 1.25rem; letter-spacing: -0.8px; }
        .ws-hook-inner h2 em { font-style: italic; color: var(--purple); }
        .ws-hook-inner p { font-size: 17px; color: var(--text-muted); line-height: 1.75; }

        .ws-hours-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 3rem; }
        .ws-hour-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 28px 24px; position: relative; overflow: hidden; }
        .ws-hour-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--purple); }
        .ws-hour-num { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--purple); margin-bottom: 8px; }
        .ws-hour-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 10px; letter-spacing: -0.3px; }
        .ws-hour-desc { font-size: 13px; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px; }
        .ws-hour-deliver { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-light); margin-bottom: 6px; }
        .ws-hour-output { background: var(--grain); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 13px; font-weight: 500; color: var(--text); }

        .ws-for-section { background: var(--grain); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .ws-for-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .ws-for-list { display: flex; flex-direction: column; gap: 12px; margin-top: 1.5rem; }
        .ws-for-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 14px; color: var(--text); line-height: 1.5; }
        .ws-for-item svg { width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px; }
        .ws-for-item.yes svg { color: var(--green); }
        .ws-for-item.no { background: var(--grain); }
        .ws-for-item.no svg { color: var(--text-light); }
        .ws-for-item.no span { color: var(--text-muted); }

        .ws-why-card { background: var(--alabaster); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .ws-why-card h2 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--text); letter-spacing: -0.5px; line-height: 1.25; margin-bottom: 1rem; }
        .ws-why-card p { font-size: 15px; color: var(--text-muted); line-height: 1.75; }
        .ws-why-stats { display: flex; flex-direction: column; gap: 16px; }
        .ws-why-stat { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 20px; }
        .ws-why-stat-val { font-size: 36px; font-weight: 700; color: var(--purple); letter-spacing: -1px; margin-bottom: 4px; }
        .ws-why-stat-label { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

        .ws-about-section { background: var(--footer-bg); border-top: 1px solid var(--border); }
        .ws-about-inner { display: grid; grid-template-columns: 340px 1fr; gap: 64px; align-items: start; }
        .ws-about-img-wrap { background: linear-gradient(135deg, #4A3E3D 0%, #2D2120 100%); border-radius: var(--radius-lg); aspect-ratio: 4/5; display: flex; align-items: flex-end; padding: 28px; position: relative; overflow: hidden; }
        .ws-about-img-tag { position: relative; z-index: 1; background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); border-radius: var(--radius-sm); padding: 12px 16px; width: 100%; }
        .ws-about-img-tag-name { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: white; margin-bottom: 2px; }
        .ws-about-img-tag-role { font-size: 12px; color: rgba(255,255,255,0.65); }
        .ws-about-content h2 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--text); letter-spacing: -0.5px; margin-bottom: 1.25rem; line-height: 1.2; }
        .ws-about-content p { font-size: 15px; color: var(--text-muted); line-height: 1.8; margin-bottom: 1.25rem; }
        .ws-about-content p strong { color: var(--text); font-weight: 600; }
        .ws-creds-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.5rem; }
        .ws-cred-item { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px 14px; font-size: 12px; color: var(--text-muted); line-height: 1.4; display: flex; align-items: flex-start; gap: 8px; }
        .ws-cred-item svg { width: 14px; height: 14px; color: var(--purple); flex-shrink: 0; margin-top: 1px; }

        .ws-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 2.5rem; }
        .ws-faq-item { background: var(--alabaster); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 24px; }
        .ws-faq-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.4; }
        .ws-faq-a { font-size: 14px; color: var(--text-muted); line-height: 1.7; }

        .ws-final-cta { background: linear-gradient(135deg, #4A3E3D 0%, #2D2120 100%); }
        .ws-final-cta-inner { text-align: center; }
        .ws-final-cta-inner h2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: white; margin-bottom: 1rem; letter-spacing: -0.8px; line-height: 1.2; }
        .ws-final-cta-inner h2 em { font-style: italic; color: var(--purple-mid); }
        .ws-final-cta-inner p { font-size: 16px; color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto; }
        .ws-final-price-original { font-size: 16px; color: rgba(255,255,255,0.4); text-decoration: line-through; margin-bottom: 6px; }
        .ws-final-price-current { font-size: 52px; font-weight: 700; color: white; letter-spacing: -2px; line-height: 1; margin-bottom: 8px; }
        .ws-final-price-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(0,168,107,0.15); border: 1px solid rgba(0,168,107,0.4); border-radius: 999px; padding: 4px 12px; font-size: 12px; font-weight: 600; color: #4ade80; }
        .ws-btn-final { display: inline-flex; align-items: center; gap: 10px; background: var(--purple); color: white; border: none; border-radius: var(--radius-sm); padding: 18px 40px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all var(--transition); text-decoration: none; font-family: 'Inter', sans-serif; }
        .ws-btn-final:hover { background: #6D28D9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.4); }
        .ws-final-trust { margin-top: 1.25rem; font-size: 13px; color: rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; gap: 6px; }
        .ws-final-trust svg { width: 14px; height: 14px; color: var(--green); }

        .ws-site-footer { position: static; display: block; background: var(--footer-bg); padding: 10px 0 32px; box-shadow: none; }
        .ws-footer-copy { font-size: 12px; color: var(--text-light); width: 100%; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }

        @media (max-width: 900px) {
          .ws-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 40px; }
          .ws-checkout-card { position: static; }
          .ws-hours-grid { grid-template-columns: 1fr; }
          .ws-for-grid { grid-template-columns: 1fr; }
          .ws-about-inner { grid-template-columns: 1fr; }
          .ws-about-img-wrap { aspect-ratio: 3/2; }
          .ws-faq-grid { grid-template-columns: 1fr; }
          .ws-why-card { grid-template-columns: 1fr; }

          .ws-creds-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .ws-nav {
            min-height: 56px;
            height: auto;
            padding: 9px 16px;
            gap: 12px;
          }
          .ws-nav-logo {
            font-size: 15px;
            flex: 0 1 auto;
            min-width: 0;
          }
          .ws-nav-right {
            gap: 8px;
            flex-shrink: 0;
          }
          .ws-nav-date {
            display: none;
          }
          .ws-nav-cta {
            padding: 8px 12px;
            font-size: 12px;
            white-space: nowrap;
          }
          .ws-countdown {
            top: 56px;
            margin-top: 56px;
            padding: 8px 16px;
            font-size: 12px;
            line-height: 1.45;
          }
          .ws-container {
            width: 100%;
            padding: 0 18px;
          }
          .ws-section {
            padding: 56px 0;
          }
          .ws-hook {
            padding: 64px 0;
          }
          .ws-hero {
            padding: 64px 0 56px;
          }
          .ws-section-h2,
          .ws-hook-inner h2,
          .ws-hero h1,
          .ws-why-card h2,
          .ws-about-content h2,
          .ws-final-cta-inner h2 {
            letter-spacing: 0;
            overflow-wrap: break-word;
          }
          .ws-hero h1 {
            font-size: clamp(32px, 11vw, 42px);
          }
          .ws-hero-sub,
          .ws-hook-inner p {
            font-size: 15px;
            line-height: 1.7;
          }
          .ws-hero-eyebrow {
            max-width: 100%;
            gap: 7px;
            padding: 5px 12px;
            font-size: 10px;
            line-height: 1.35;
            white-space: normal;
          }
          .ws-hero-meta {
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 2rem;
          }
          .ws-hero-meta-item {
            width: 100%;
          }
          .ws-hero-actions,
          .ws-btn-checkout,
          .ws-btn-secondary,
          .ws-btn-final {
            width: 100%;
          }
          .ws-btn-checkout,
          .ws-btn-secondary,
          .ws-btn-final {
            justify-content: center;
            text-align: center;
          }
          .ws-hero-trust,
          .ws-final-trust {
            align-items: flex-start;
            text-align: left;
          }
          .ws-checkout-card {
            border-radius: var(--radius-md);
          }
          .ws-checkout-card-top,
          .ws-checkout-body,
          .ws-hour-card,
          .ws-faq-item {
            padding: 20px;
          }
          .ws-price-current {
            font-size: 36px;
          }
          .ws-for-grid,
          .ws-why-card,
          .ws-about-inner {
            gap: 28px;
          }
          .ws-why-card {
            padding: 24px;
            border-radius: var(--radius-md);
          }
          .ws-why-stat {
            padding: 16px;
          }
          .ws-why-stat-val {
            font-size: 32px;
          }
          .ws-about-img-wrap {
            border-radius: var(--radius-md);
            aspect-ratio: 4 / 5;
            min-height: 320px;
          }
          .ws-for-item,
          .ws-cred-item {
            padding: 12px 14px;
          }
          .ws-final-price-current {
            font-size: 44px;
          }
          .ws-site-footer {
            padding-bottom: calc(28px + env(safe-area-inset-bottom));
          }
        }

        @media (max-width: 380px) {
          .ws-container {
            padding: 0 14px;
          }
          .ws-nav {
            padding-left: 12px;
            padding-right: 12px;
          }
          .ws-nav-cta {
            padding-left: 10px;
            padding-right: 10px;
          }
          .ws-btn-checkout,
          .ws-btn-secondary,
          .ws-btn-final {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>

      {/* NAV */}
      <nav className="ws-nav">
        <Link href="/" className="ws-nav-logo">
          Temitope<span>.</span>
        </Link>
        <div className="ws-nav-right">
          <span className="ws-nav-date">July 25th · 2PM London Time</span>
          <a
            href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
            target="_blank"
            rel="noopener noreferrer"
            className="ws-nav-cta"
          >
            Reserve seat — $97
          </a>
        </div>
      </nav>

      {/* COUNTDOWN */}
      <div className="ws-countdown">
        <strong>Early access pricing closes soon.</strong> Full price is $147.
        Lock in $97 now.
      </div>

      {/* HOOK */}
      <section className="ws-hook">
        <div className="ws-container">
          <div className="ws-hook-inner">
            <h2>
              You have spent years getting good at something. You have not
              spent a single day getting paid{" "}
              <em>what it is actually worth.</em>
            </h2>
            <p>
              The market does not reward expertise. It rewards packaged
              expertise. Right now, yours is not packaged. This workshop
              changes that — in three hours.
            </p>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="ws-hero">
        <div className="ws-container">
          <div className="ws-hero-inner">
            <div>
              <div className="ws-hero-eyebrow">
                <span className="ws-hero-eyebrow-dot" />
                Live Workshop · The Intelligence Layer
              </div>
              <h1>
                The Intelligence Layer:
                <br />
                Go <em>From Expertise</em>
                <br />to Offer
              </h1>
              <p className="ws-hero-sub">
                A 3-hour live working session for ambitious professionals
                who are done leaving money on the table. Walk in with
                expertise. Walk out with an AI-powered offer, a pricing
                strategy, and the infrastructure to deliver it.
              </p>
              <div className="ws-hero-meta">
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  July 25th, 2025
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  2:00 PM London Time
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" /></svg>
                  Live on Zoom
                </div>
                <div className="ws-hero-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  3 hours · Recording included
                </div>
              </div>
              <div className="ws-hero-actions">
                <a
                  href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ws-btn-checkout"
                >
                  Reserve my seat — $97
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <Link href="/" className="ws-btn-secondary">
                  Take the free profile quiz first
                </Link>
              </div>
              <div className="ws-hero-trust">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Powered by Stripe. Secure checkout. Recording sent within 24
                hours if you miss the live session.
              </div>
            </div>

            {/* CHECKOUT CARD */}
            <div className="ws-checkout-card">
              <div className="ws-checkout-card-top">
                <div className="ws-checkout-date">
                  July 25th · 2PM London Time · Live on Zoom
                </div>
                <div className="ws-checkout-title">
                  The Intelligence Layer: Go From Expertise to Offer
                </div>
                <div className="ws-checkout-sub">
                  The Intelligence Layer — 3-hour working session
                </div>
              </div>
              <div className="ws-checkout-body">
                <div>
                  <div className="ws-price-original">$147 full price</div>
                  <div className="ws-price-current">
                    <sup>$</sup>97
                  </div>
                  <div className="ws-price-badge">
                    Early access — closes soon
                  </div>
                </div>
                <div className="ws-seats-notice">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  Limited seats available. This session stays small by
                  design.
                </div>
                <div>
                  <div className="ws-checkout-includes-label">
                    What is included
                  </div>
                  {[
                    "3-hour live working session on Zoom",
                    "Your Intelligence Layer mapped live",
                    "AI infrastructure built in the session",
                    "90-day GTM plan you leave with",
                    "Session recording within 24 hours",
                    "All working templates and frameworks",
                  ].map((item) => (
                    <div className="ws-include-item" key={item}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  className="ws-btn-checkout-full"
                  onClick={() =>
                    window.open(
                      "https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k",
                      "_blank"
                    )
                  }
                >
                  Reserve my seat — $97
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
                <div className="ws-checkout-trust">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  Secure checkout via Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-section-eyebrow">What happens in the room</div>
          <h2 className="ws-section-h2">
            Three hours. One working session.
            <br />
            One offer you can sell next week.
          </h2>
          <p className="ws-section-sub">
            This is not a lecture. It is a structured build session. You leave
            with tangible deliverables, not notes you will never open.
          </p>
          <div className="ws-hours-grid">
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 01</div>
              <div className="ws-hour-title">Map</div>
              <div className="ws-hour-desc">
                You will identify your Intelligence Layer — the specific
                expertise, judgment, and pattern recognition that AI cannot
                replicate and the market will pay a premium for. Most people
                spend years guessing at this. You will have it documented
                before the first hour ends.
              </div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
                Documented expertise architecture
              </div>
            </div>
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 02</div>
              <div className="ws-hour-title">Model and Machine</div>
              <div className="ws-hour-desc">
                You will structure your Intelligence Layer into an offer. Then
                you will build the AI infrastructure underneath it — the
                diagnostic layer, the delivery layer, and the outreach layer.
                Not theory. Built in the room.
              </div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
                AI operating stack for your offer
              </div>
            </div>
            <div className="ws-hour-card">
              <div className="ws-hour-num">Hour 03</div>
              <div className="ws-hour-title">Monetise and Move</div>
              <div className="ws-hour-desc">
                You will price your offer, package it, and map the first 90
                days of getting it to market. You leave with a concrete
                go-to-market plan, not a workbook you will never open.
              </div>
              <div className="ws-hour-deliver">You leave with</div>
              <div className="ws-hour-output">
                90-day GTM plan, ready to execute
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
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

      {/* WHY WORKING SESSION */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-why-card">
            <div>
              <div className="ws-section-eyebrow">
                Why a working session and not a webinar
              </div>
              <h2>
                A webinar gives you information. This gives you a built offer.
              </h2>
              <p>
                Information without implementation is just content. This room
                is designed to end with something in your hands — not a
                notebook full of ideas and a Zoom fatigue headache.
              </p>
              <p style={{ marginTop: "1rem" }}>
                The level of specificity required to actually build your
                Intelligence Layer, price it correctly, and map the
                go-to-market requires a room that stays small. Seats are
                limited and will not reopen at this price once they close.
              </p>
            </div>
            <div className="ws-why-stats">
              <div className="ws-why-stat">
                <div className="ws-why-stat-val">3 hrs</div>
                <div className="ws-why-stat-label">
                  One focused working session — everything built in the room,
                  not as homework
                </div>
              </div>
              <div className="ws-why-stat">
                <div
                  className="ws-why-stat-val"
                  style={{ color: "var(--green)" }}
                >
                  $97
                </div>
                <div className="ws-why-stat-label">
                  Early access price. Goes to $147 when this closes. Next
                  session will be higher.
                </div>
              </div>
              <div className="ws-why-stat">
                <div className="ws-why-stat-val">24 hrs</div>
                <div className="ws-why-stat-label">
                  Recording delivered within 24 hours if you cannot attend live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="ws-about-section ws-section">
        <div className="ws-container">
          <div className="ws-about-inner">
            <div className="ws-about-img-wrap">
              <img
                src="/PHOTO-2026-06-19-12-56-31.jpg"
                alt="Temitope Saliu"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div className="ws-about-img-tag">
                <div className="ws-about-img-tag-name">Temitope Saliu</div>
                <div className="ws-about-img-tag-role">
                  Solutions Architect, Strategist and Teacher
                </div>
              </div>
            </div>
            <div className="ws-about-content">
              <div className="ws-section-eyebrow">Who is running this</div>
              <h2>
                The system she wished existed when she started.
              </h2>
              <p>
                Temitope Saliu sits at the intersection of people, marketing &
                technology — building concepts & solutions architecture, GTM
                strategy for brands to increase revenue with the right people,
                structure and systems.
              </p>
              <p>
                In 2017, she sold a gold chain to fund her first digital
                marketing course.{" "}
                <strong>
                  That decision — and everything built from it — is why she
                  understands exactly what it costs to bet on yourself before
                  anyone else does.
                </strong>{" "}
                The Intelligence Layer is the structured methodology she built
                from that journey.
              </p>
              <p>
                She does not teach AI basics. She teaches ambitious people how
                to take what they already know and build something the market
                will pay a premium for.
              </p>
              <div className="ws-creds-grid">
                {[
                  "Google Elite Trainer — 1 of 20 women selected for Sub-Saharan Africa. 3,000+ professionals trained.",
                  "Microsoft Africa Developer Training — 1 of 5 companies selected",
                  "USAID and Peace Corps facilitation at ambassador level",
                  "UK Global Talent — Exceptional Talent endorsement",
                ].map((cred) => (
                  <div className="ws-cred-item" key={cred}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    {cred}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ws-section" style={{ background: "var(--white)" }}>
        <div className="ws-container">
          <div className="ws-section-eyebrow">Common questions</div>
          <h2 className="ws-section-h2">Everything you need to know.</h2>
          <div className="ws-faq-grid">
            {[
              {
                q: "Is this session recorded?",
                a: "Yes. If you cannot attend live, the full recording and all working documents will be delivered within 24 hours. The live session is where the real work happens, but you will not lose your investment if your schedule shifts.",
              },
              {
                q: "What do I need to come prepared with?",
                a: "Your expertise and an honest answer to one question: what problem do you solve better than most people you know? Everything else gets built in the room. No prep slides, no pre-work required.",
              },
              {
                q: "Is $97 the final price?",
                a: "No. Early access closes when seats fill or when I decide it closes — whichever comes first. The full price is $147. After this session, when testimonials exist, future sessions will be priced higher.",
              },
              {
                q: "I already use AI in my work. Is this still relevant?",
                a: "Good. This session is not about learning AI basics. It is about building a structured, monetisable system around your specific expertise. If you already use AI tactically, this takes you to strategic.",
              },
              {
                q: "What platform is the session on?",
                a: "Zoom. Your link will be sent immediately after purchase with a confirmation email. You will receive a reminder 24 hours before the session and 1 hour before it starts.",
              },
              {
                q: "Do I need any technical background?",
                a: "None. This workshop is built for professionals who are expert in their field — not in technology. If you can use a laptop and have expertise worth monetising, you are ready.",
              },
            ].map((faq) => (
              <div className="ws-faq-item" key={faq.q}>
                <div className="ws-faq-q">{faq.q}</div>
                <div className="ws-faq-a">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ws-final-cta ws-section">
        <div className="ws-container">
          <div className="ws-final-cta-inner">
            <h2>
              Limited seats. $97. July 25th
              <br />
              at 2PM <em>London Time.</em>
            </h2>
            <p>
              This is the room where your expertise stops being invisible.
            </p>
            <div style={{ marginBottom: "2rem" }}>
              <div className="ws-final-price-original">$147 full price</div>
              <div className="ws-final-price-current">$97</div>
              <div className="ws-final-price-badge">
                Early access — closes soon
              </div>
            </div>
            <a
              className="ws-btn-final"
              href="https://buy.stripe.com/9B614o3xtefK9k7cT13oA0k"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve my seat now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <div className="ws-final-trust">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Stripe checkout. Instant confirmation. Recording included.
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-site-footer">
        <div className="ws-container">

          <div className="ws-footer-copy">
            2026 Temitope Saliu. The Intelligence Layer is a proprietary
            methodology. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
