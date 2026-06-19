export function StadiumStyles() {
  return (
    <style>{`
      .as-loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100dvh;
        gap: 16px;
      }
      .as-loading-spin {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid var(--border);
        border-top-color: var(--teal);
        animation: as-spin .8s linear infinite;
      }
      @keyframes as-spin { to { transform: rotate(360deg); } }

      .ai-stadium-root {
        --chalk: #F6F1E4;
        --chalk-2: #ECE4D0;
        --ink: #1C1A17;
        --stadium: #14171F;
        --stadium-2: #1D2230;
        --floodlight: #F2A93C;
        --floodlight-dim: #C98A2E;
        --turf: #2E7D5B;
        --turf-dim: #225C44;
        --dust: #756C5A;
        --line: rgba(28, 26, 23, 0.14);
        --line-dark: rgba(246, 241, 228, 0.16);

        font-family: 'Literata', Georgia, serif;
        color: var(--ink);
        background: var(--chalk);
        width: 100%;
        max-width: none;
        margin: 0;
        border: none;
        border-radius: 0;
        overflow: hidden;
      }
      .ai-stadium-root * { box-sizing: border-box; margin: 0; padding: 0; }

      .as-display {
        font-family: 'Anton', 'Oswald', sans-serif;
        font-weight: 400;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .as-label {
        font-family: 'Oswald', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1.4px;
      }
      .as-mono { font-family: 'IBM Plex Mono', monospace; }

      /* ── PANELS ── */
      .as-panels { animation: as-fade 0.25s ease; }
      @keyframes as-fade {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .as-panel-head {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 28px;
        padding: 36px 32px 22px;
        border-bottom: 1px solid var(--line);
      }
      .as-panel-head .as-icon {
        width: 46px;
        height: 46px;
        flex: none;
        border-radius: 50%;
        background: var(--stadium);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .as-panel-head .as-icon svg {
        width: 22px;
        height: 22px;
        stroke: var(--floodlight);
      }
      .as-panel-head h2 {
        font-size: clamp(22px, 3.4vw, 30px);
        line-height: 1.05;
      }
      .as-panel-head .as-sub {
        font-family: 'Literata', serif;
        font-style: italic;
        color: var(--dust);
        font-size: 16px;
        margin-top: 6px;
        max-width: 520px;
      }

      .as-section-label {
        font-family: 'Oswald', sans-serif;
        font-size: 14px;
        letter-spacing: 1.6px;
        text-transform: uppercase;
        color: var(--turf-dim);
        margin: 30px 0 12px;
        padding: 0 32px;
      }
      .as-section-label:first-child { margin-top: 0; }

      /* ── TOOL CARDS ── */
      .as-tools {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 12px;
        padding: 0 32px;
      }
      .as-tool {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 14px 16px;
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .as-tool:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(28, 26, 23, 0.08);
      }
      .as-tool .tname { font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 15px; }
      .as-tool .ttag {
        display: inline-block;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 12px;
        background: var(--chalk-2);
        color: var(--dust);
        padding: 2px 7px;
        border-radius: 20px;
        margin: 6px 0 8px;
      }
      .as-tool p { font-size: 15px; color: var(--ink); line-height: 1.45; }

      /* ── PROMPT CARDS ── */
      .as-prompt {
        background: var(--stadium);
        border-radius: 10px;
        padding: 16px 18px 18px;
        margin: 0 32px 14px;
      }
      .as-prompt-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .as-prompt-name {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        letter-spacing: 0.8px;
        text-transform: uppercase;
        color: var(--floodlight);
      }
      .as-copybtn {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        background: transparent;
        border: 1px solid var(--line-dark);
        color: var(--chalk);
        padding: 6px 12px;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.15s;
      }
      .as-copybtn:hover { background: rgba(246, 241, 228, 0.1); }
      .as-copybtn.copied {
        background: var(--turf);
        border-color: var(--turf);
        color: #fff;
      }
      .as-prompt pre {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 14px;
        line-height: 1.65;
        color: rgba(246, 241, 228, 0.92);
        white-space: pre-wrap;
        word-break: break-word;
      }

      /* ── CHECKLIST ── */
      .as-checklist {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 10px;
        padding: 0 32px;
      }
      .as-check {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 10px 12px;
        cursor: pointer;
      }
      .as-check input {
        width: 18px;
        height: 18px;
        accent-color: var(--turf);
        flex: none;
      }
      .as-check span { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 500; }

      /* ── COMMITMENT + STREAK ── */
      .as-commit-wrap { padding: 0 32px; }
      .as-commit {
        display: inline-flex;
        border: 1px solid var(--ink);
        border-radius: 30px;
        overflow: hidden;
        margin-bottom: 18px;
      }
      .as-commit button {
        background: var(--chalk);
        border: none;
        padding: 8px 20px;
        font-family: 'Oswald', sans-serif;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        color: var(--ink);
      }
      .as-commit button.active { background: var(--ink); color: var(--floodlight); }
      .as-stats {
        display: flex;
        gap: 26px;
        margin-bottom: 16px;
      }
      .as-stat .n { font-family: 'Anton', sans-serif; font-size: 26px; color: var(--turf-dim); }
      .as-stat .l {
        font-family: 'Oswald', sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--dust);
      }
      .as-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 5px;
        margin-bottom: 12px;
      }
      .as-day {
        aspect-ratio: 1;
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 4px;
        cursor: pointer;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        color: var(--dust);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.1s;
      }
      .as-day:hover { border-color: var(--turf); }
      .as-day.done { background: var(--turf); color: #fff; border-color: var(--turf); }

      .as-reset {
        background: none;
        border: none;
        font-family: 'Oswald', sans-serif;
        font-size: 12px;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        color: var(--dust);
        text-decoration: underline;
        cursor: pointer;
        margin-top: 14px;
      }

      /* ── OFFER BUILDER ── */
      .offer-builder-wrap {
        background: #F0EBE0;
        padding: 28px 24px;
        border-radius: 16px;
        border: 2px solid var(--floodlight);
        margin: 24px 32px 16px;
        box-shadow: 0 8px 20px rgba(28, 26, 23, 0.08);
      }
      .offer-builder-wrap .as-section-label {
        font-size: 20px;
        color: var(--floodlight-dim);
        border-bottom: 3px solid var(--floodlight);
        padding-bottom: 8px;
        margin-bottom: 18px;
        padding-left: 0;
      }
      .as-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 18px;
      }
      .as-field label {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--dust);
        display: block;
        margin-bottom: 6px;
      }
      .as-field input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px 14px;
        font-size: 16px;
        background: #fff;
        color: var(--ink);
      }
      .as-field input:focus { border-color: var(--turf); outline: none; }
      .as-offer-out {
        background: #FFF8EC;
        border: 2px solid var(--floodlight);
        border-radius: 10px;
        padding: 20px 24px;
        margin-bottom: 16px;
      }
      .as-offer-out .ol {
        font-family: 'Oswald', sans-serif;
        font-size: 12px;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        color: var(--turf-dim);
      }
      .as-offer-out .ov {
        font-family: 'Literata', serif;
        font-size: 22px;
        font-style: italic;
        margin-top: 6px;
        line-height: 1.45;
      }

      /* ── MIND SET TEXT ── */
      .as-text-block { padding: 0 32px; }
      .as-text-block p {
        font-size: 16px;
        line-height: 1.6;
        max-width: 580px;
      }

      /* ── MONETIZATION CARDS ── */
      .as-mon {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 14px;
        margin: 0 32px 8px;
      }
      .as-mon-card {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 18px;
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .as-mon-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 22px rgba(28, 26, 23, 0.08);
      }
      .as-mon-card .mh { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
      .as-mon-card .mh svg { width: 20px; height: 20px; stroke: var(--turf-dim); flex: none; }
      .as-mon-card .mh h3 { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; }
      .as-mon-card .mrange {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 14px;
        color: var(--floodlight-dim);
        margin: 8px 0;
      }
      .as-mon-card p { font-size: 15px; line-height: 1.5; color: var(--ink); }
      .as-mon-card .mtool {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        color: var(--dust);
        margin-top: 10px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
      }
      .mtool-highlight { color: black; font-weight: 700; }

      /* ── CURRENCY ── */
      .as-currency-wrap {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0 32px 20px;
      }
      .as-currency-wrap .label {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        color: var(--dust);
        letter-spacing: 1px;
      }
      .currency-select {
        font-family: 'Oswald', sans-serif;
        font-size: 13px;
        font-weight: 600;
        border: 1px solid var(--ink);
        border-radius: 20px;
        padding: 6px 14px;
        background: var(--chalk);
        color: var(--ink);
        cursor: pointer;
      }
      .as-price-wrap {
        display: inline-flex;
        align-items: center;
        gap: 0;
      }
      .as-price-wrap .cur-sym {
        font-size: 13px;
        font-weight: 600;
        color: var(--ink);
        line-height: 1;
        pointer-events: none;
        padding-right: 2px;
      }
      .as-price-wrap input { width: 100%; }

      /* ── CALCULATOR ── */
      .as-calc { padding: 0 32px; }
      .as-calc-row {
        display: grid;
        grid-template-columns: 1.6fr 1fr 1fr 1fr;
        gap: 10px;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--line);
      }
      .as-calc-row.head {
        font-family: 'Oswald', sans-serif;
        font-size: 14px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--dust);
        border-bottom: none;
        padding-bottom: 4px;
      }
      .as-calc-row .rn { font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 15px; }
      .as-calc-row input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 6px;
        padding: 7px 8px;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 14px;
        background: #fff;
      }
      .as-calc-row .rtotal {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 15px;
        font-weight: 600;
        color: var(--turf-dim);
      }
      .as-scoreboard {
        margin: 22px 32px 0;
        background: var(--stadium);
        border-radius: 10px;
        padding: 22px 24px;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 10px;
      }
      .as-scoreboard .sl {
        font-family: 'Oswald', sans-serif;
        font-size: 14px;
        letter-spacing: 1.4px;
        text-transform: uppercase;
        color: rgba(246, 241, 228, 0.6);
      }
      .as-scoreboard .sv {
        font-family: 'Anton', sans-serif;
        font-size: clamp(30px, 5vw, 46px);
        color: var(--floodlight);
      }
      .as-disclaimer {
        font-size: 13px;
        color: var(--dust);
        margin: 10px 32px 0;
        font-style: italic;
      }

      /* ── PROMPT HEADER WRAP ── */
      .prompt-header-wrap {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 12px;
        margin: 30px 32px 12px;
        padding-bottom: 10px;
        border-bottom: 1px solid var(--line);
      }
      .prompt-header-wrap .as-section-label {
        margin: 0;
        padding-bottom: 0;
        border-bottom: none;
        display: inline;
        white-space: nowrap;
        padding-left: 0;
      }

      /* ── PROMPT CTA ── */
      .prompt-cta {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 16px;
        background: var(--floodlight);
        color: var(--ink);
        border-radius: 50px;
        text-decoration: none;
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        transition: all 0.2s ease;
        box-shadow: 0 3px 12px rgba(242, 169, 60, 0.3);
        border: 2px solid var(--floodlight);
        flex-shrink: 0;
      }
      .prompt-cta:hover {
        background: var(--ink);
        color: var(--floodlight);
        border-color: var(--floodlight);
        box-shadow: 0 4px 18px rgba(242, 169, 60, 0.45);
        transform: translateY(-2px);
      }
      .prompt-cta-icon { font-size: 16px; line-height: 1; }
      .prompt-cta-text { line-height: 1; }
      .prompt-cta-arrow { font-size: 14px; line-height: 1; transition: transform 0.2s ease; }
      .prompt-cta:hover .prompt-cta-arrow { transform: translateX(4px); }

      @media (max-width: 600px) {
        .prompt-header-wrap { flex-direction: column; align-items: stretch; gap: 8px; }
        .prompt-cta { justify-content: center; padding: 12px 20px; font-size: 14px; }
      }

      /* ── GATE NAV ── */
      .as-nav {
        display: flex;
        gap: 2px;
        background: var(--ink);
        padding: 0;
      }
      .as-gate-btn {
        flex: 1 1 0;
        min-width: 0;
        background: var(--ink);
        color: rgba(246, 241, 228, 0.55);
        border: none;
        padding: 12px 8px 10px;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s, color 0.15s;
        border-bottom: 3px solid transparent;
      }
      .as-gate-btn.active {
        background: var(--chalk);
        color: var(--ink);
        border-bottom-color: var(--floodlight);
      }
      .as-gate-btn:hover:not(.active) {
        background: rgba(246, 241, 228, 0.06);
      }
      .as-gate-num {
        font-family: 'Oswald', sans-serif;
        font-size: 10px;
        letter-spacing: 1.5px;
        color: var(--floodlight);
        display: block;
      }
      .as-gate-btn.active .as-gate-num {
        color: var(--floodlight-dim);
      }
      .as-gate-label {
        font-family: 'Anton', sans-serif;
        font-size: 13px;
        letter-spacing: 0.3px;
        display: block;
        margin-top: 3px;
      }

      @media (max-width: 640px) {
        .as-nav {
          flex-wrap: wrap;
        }
        .as-gate-btn {
          flex: 0 0 calc(100% / 3);
          text-align: center;
          padding: 10px 4px 8px;
          border-bottom-width: 2px;
        }
        .as-gate-label {
          font-size: 11px;
        }
      }

      /* ── GATE 6 ── */
      .as-tagline {
        background: var(--stadium);
        color: var(--chalk);
        border-radius: 12px;
        padding: 28px 26px;
        margin: 0 32px 32px;
      }
      .as-tagline p {
        font-family: 'Literata', serif;
        font-style: italic;
        font-size: clamp(15px, 2.6vw, 19px);
        line-height: 1.6;
      }
      .as-tagline strong { color: var(--floodlight); font-style: normal; }
      .as-coach {
        display: flex;
        gap: 22px;
        align-items: center;
        margin: 0 32px 0;
        flex-wrap: wrap;
      }
      .as-avatar-img {
        width: 200px;
        height: 260px;
        object-fit: cover;
        border-radius: 16px;
        border: 3px solid var(--floodlight);
        flex: none;
        background: var(--stadium);
        display: block;
      }
      .as-coach-info { flex: 1; min-width: 240px; }
      .as-coach-info h3 { font-family: 'Oswald', sans-serif; font-size: 18px; font-weight: 600; }
      .as-coach-info .role {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 11px;
        color: var(--dust);
        margin: 4px 0 10px;
        text-transform: uppercase;
        letter-spacing: 0.6px;
      }
      .as-coach-info p.bio { font-size: 14px; line-height: 1.6; margin-bottom: 0; }
      .as-awards { list-style: none; display: grid; gap: 14px; padding: 0 32px; margin: 18px 0 44px; }
      .as-awards li {
        font-size: 16px;
        padding-left: 18px;
        position: relative;
        line-height: 1.6;
      }
      .as-awards li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 6px;
        width: 7px;
        height: 7px;
        background: var(--turf);
        border-radius: 50%;
      }
      .as-gold {
        color: black;
        font-weight: 700;
      }

      .as-cta-section {
        display: flex;
        gap: 52px;
        align-items: flex-start;
        padding: 0 32px 40px;
      }
      .as-cta-section .as-learn {
        flex: 0 1 440px;
        min-width: 0;
      }
      .as-cta-section .as-learn .as-section-label {
        padding-left: 0;
        padding-right: 0;
      }
      .as-learn-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .as-learn-list li {
        font-size: 16px;
        line-height: 1.5;
        padding-left: 20px;
        position: relative;
      }
      .as-learn-list li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 7px;
        width: 8px;
        height: 8px;
        background: var(--turf);
        border-radius: 50%;
      }
      .as-cta-section .as-pricing-wrap {
        flex: 1 1 0;
        min-width: 0;
        padding: 0;
        max-width: none;
        margin: 0;
      }
      .as-section-headline {
        font-size: 22px !important;
        font-weight: 800 !important;
        font-family: 'Anton', 'Oswald', sans-serif !important;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        line-height: 1.2;
        color: var(--ink) !important;
        padding-bottom: 16px;
        margin-bottom: 8px;
      }
      .as-cta-section .as-pricing-wrap .as-section-label {
        text-align: left;
        padding-left: 0;
        padding-right: 0;
      }
      .as-pricing {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .as-price-card {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 22px 20px;
        transition: transform 0.15s, box-shadow 0.15s;
      }
      .as-price-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 26px rgba(28, 26, 23, 0.1);
      }
      .as-price-card.featured { border: 2px solid var(--floodlight); }
      .as-price-tier {
        font-family: 'Oswald', sans-serif;
        font-weight: 600;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        color: var(--turf-dim);
      }
      .as-price-row { display: flex; align-items: baseline; gap: 10px; margin: 10px 0 4px; }
      .as-price-old {
        font-family: 'IBM Plex Mono', monospace;
        font-size: 16px;
        color: var(--dust);
        text-decoration: line-through;
      }
      .as-price-new { font-size: 38px; color: var(--ink); }
      .as-price-note {
        font-family: 'Oswald', sans-serif;
        font-size: 10px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--floodlight-dim);
        margin-bottom: 14px;
      }
      .as-price-list { list-style: none; margin: 14px 0 18px; }
      .as-price-list li {
        font-size: 13px;
        padding-left: 16px;
        position: relative;
        line-height: 1.6;
      }
      .as-price-list li::before {
        content: '\\2014';
        position: absolute;
        left: 0;
        color: var(--dust);
        font-size: 11px;
      }
      .as-price-card a {
        text-decoration: none;
        display: block;
      }
      .as-price-cta {
        display: block;
        width: 100%;
        text-align: center;
        background: var(--stadium);
        color: var(--chalk);
        font-family: 'Oswald', sans-serif;
        font-weight: 600;
        font-size: 15px;
        letter-spacing: 0.6px;
        text-transform: uppercase;
        padding: 12px;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        transition: background 0.15s;
      }
      .as-price-cta:hover { background: #28241f; }
      .as-price-cta:focus-visible { outline: none; }

      /* ── STADIUM NAV OVERRIDES ── */
      .ai-stadium-root nav {
        background: var(--stadium) !important;
        border-bottom: 1px solid var(--line-dark) !important;
      }
      .ai-stadium-root .nav-logo {
        color: var(--chalk) !important;
      }
      .ai-stadium-root .nav-logo span { color: var(--floodlight) !important; }
      .ai-stadium-root .nav-links a {
        color: rgba(246, 241, 228, 0.55) !important;
      }
      .ai-stadium-root .nav-links a:hover {
        color: var(--chalk) !important;
      }
      .ai-stadium-root .nav-cta {
        background: var(--floodlight) !important;
        color: var(--ink) !important;
      }
      .ai-stadium-root .nav-cta:hover {
        background: var(--chalk) !important;
        color: var(--ink) !important;
      }

      /* ── STADIUM FOOTER ── */
      .as-footer {
        position: static !important;
        background: var(--stadium) !important;
        color: var(--chalk) !important;
        margin-top: 40px;
        display: flex !important;
      }
      .as-footer .f-links a { color: rgba(246, 241, 228, 0.7) !important; }

      /* ── RESPONSIVE ── */
      @media (max-width: 640px) {
        .as-coach { flex-direction: column; align-items: center; text-align: center; }
        .as-avatar-img { width: 160px; height: 210px; margin-bottom: 16px; }
        .as-coach-info { text-align: center; }
        .as-awards { text-align: left; max-width: 460px; margin-left: auto; margin-right: auto; }
        .as-fields, .as-calc-row { grid-template-columns: 1fr 1fr; }
        .as-calc-row.head span:first-child,
        .as-calc-row .rn { grid-column: 1 / -1; }
        .as-grid { grid-template-columns: repeat(7, 1fr); }
        .as-pricing { grid-template-columns: 1fr; }
        .as-cta-section { flex-direction: column; padding-left: 16px; padding-right: 16px; }
        .as-cta-section .as-learn { flex: none; width: 100%; }
        .as-section-label,
        .as-tools,
        .as-prompt,
        .as-checklist,
        .as-text-block,
        .as-commit-wrap,
        .as-mon,
        .as-currency-wrap,
        .as-calc,
        .as-tagline,
        .as-coach,
        .as-awards,
        .offer-builder-wrap,
        .prompt-header-wrap,
        .as-scoreboard,
        .as-disclaimer,
        .as-tagline{
        margin-left:16px;
        margin-right: 16px;
        }
        .as-panel-head { padding-left: 16px; padding-right: 16px; margin-left: 0; margin-right: 0; }
        .as-prompt { margin-left: 16px; margin-right: 16px; }
        .offer-builder-wrap { margin-left: 16px; margin-right: 16px; }
      }
    `}</style>
  );
}

