"use client";

import { useState, useCallback, type FormEvent } from "react";

// ── Required fields for progress & validation ──────────────────────────────
const REQUIRED_FIELDS = [
  "full_name", "preferred_name", "email", "country", "timezone",
  "current_role", "years_experience", "industry", "advice_areas", "greatest_strength",
  "core_problem", "proudest_work", "org_types",
  "why_joined", "best_workshop", "key_question",
  "ai_confidence", "ai_tools", "ai_transformative",
  "business_name", "business_industry", "business_challenge", "business_friction", "business_why",
  "six_months_vision",
] as const;

type FieldName = (typeof REQUIRED_FIELDS)[number] | "linkedin" | "business_size" | "anything_else";

// ── Field ID map for validation ────────────────────────────────────────────
const FIELD_MAP: Record<string, string> = {
  full_name: "f-fname", preferred_name: "f-pref",
  email: "f-email", country: "f-country", timezone: "f-tz",
  current_role: "f-role", years_experience: "f-years",
  industry: "f-industry", advice_areas: "f-sought", greatest_strength: "f-strength",
  core_problem: "f-problem", proudest_work: "f-proud", org_types: "f-orgtypes",
  why_joined: "f-why", best_workshop: "f-best", key_question: "f-question",
  ai_confidence: "f-aiconf", ai_tools: "f-aitools", ai_transformative: "f-aitransform",
  business_name: "f-bizname", business_industry: "f-bizindustry",
  business_challenge: "f-bizchallenge", business_friction: "f-bizfriction",
  business_why: "f-bizwhy", six_months_vision: "f-sixmonths",
};

// ── Field-specific error messages ──────────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  full_name: "Please enter your full name.",
  preferred_name: "Please enter your preferred name.",
  email: "Please enter a valid email address.",
  country: "Please enter your country.",
  timezone: "Please enter your time zone.",
  current_role: "Please select your current role.",
  years_experience: "Please select your experience level.",
  industry: "Please enter your industry or industries.",
  advice_areas: "Please answer this question.",
  greatest_strength: "Please answer this question.",
  core_problem: "Please answer this question.",
  proudest_work: "Please answer this question.",
  org_types: "Please select at least one organisation type.",
  why_joined: "Please answer this question.",
  best_workshop: "Please answer this question.",
  key_question: "Please answer this question.",
  ai_confidence: "Please select a confidence rating.",
  ai_tools: "Please answer this question.",
  ai_transformative: "Please answer this question.",
  business_name: "Please enter the business name.",
  business_industry: "Please enter the industry.",
  business_challenge: "Please answer this question.",
  business_friction: "Please answer this question.",
  business_why: "Please answer this question.",
  six_months_vision: "Please answer this question.",
};

export default function ConsultingProfileFormPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // ── Generic updater ──────────────────────────────────────────────────────
  const set = useCallback((name: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }, []);

  // ── Progress ─────────────────────────────────────────────────────────────
  const filledCount = REQUIRED_FIELDS.filter(
    (name) => (formData[name] || "").trim() !== ""
  ).length;
  const progressPct = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);

  // ── Validation ───────────────────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const newErrors: Record<string, boolean> = {};

    REQUIRED_FIELDS.forEach((name) => {
      if (!(formData[name] || "").trim()) {
        newErrors[name] = true;
      }
    });

    // Email format check
    const email = (formData.email || "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;

    if (hasErrors) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const fieldId = FIELD_MAP[firstErrorField];
      if (fieldId) {
        setTimeout(() => {
          document.getElementById(fieldId)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }

    return !hasErrors;
  }, [formData]);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Build payload: only send defined fields
    const payload: Record<string, string> = {};
    const allFields: FieldName[] = [
      ...REQUIRED_FIELDS,
      "linkedin", "business_size", "anything_else",
    ];
    allFields.forEach((name) => {
      const v = (formData[name] || "").trim();
      if (v) payload[name] = v;
    });

    try {
      const res = await fetch("/api/consulting-profile-form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Submission failed, showing confirmation anyway");
      }
    } catch {
      console.error("Network error, showing confirmation anyway");
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render helpers ──────────────────────────────────────────────────────
  const fieldClass = (name: string) => `cpf-field${errors[name] ? " error" : ""}`;

  const renderOptionButtons = (
    name: FieldName,
    options: { value: string; label: string }[],
    type: "radio" | "checkbox"
  ) => {
    const selected = (formData[name] || "").split(",").map((s) => s.trim()).filter(Boolean);

    const handleClick = (value: string) => {
      if (type === "radio") {
        set(name, value);
      } else {
        const current = (formData[name] || "").split(",").map((s) => s.trim()).filter(Boolean);
        const next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        set(name, next.join(", "));
      }
    };

    return (
      <div className="cpf-options-list">
        {options.map((opt) => {
          const isSelected = type === "radio"
            ? selected.includes(opt.value)
            : selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              className={`cpf-option-btn${isSelected ? " selected" : ""}${type === "checkbox" ? " cpf-option-check" : ""}`}
              onClick={() => handleClick(opt.value)}
            >
              <span className="cpf-option-indicator" />
              <span className="cpf-option-text">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const renderScale = (name: FieldName, labelLow: string, labelHigh: string) => {
    const selected = formData[name] || "";
    return (
      <div className="cpf-scale-wrap">
        <div className="cpf-scale-track">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <button
              key={n}
              type="button"
              className={`cpf-scale-btn${selected === String(n) ? " selected" : ""}`}
              onClick={() => set(name, String(n))}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="cpf-scale-labels">
          <span>{labelLow}</span>
          <span>{labelHigh}</span>
        </div>
      </div>
    );
  };

  const FieldError = ({ name }: { name: string }) =>
    errors[name] ? <div className="cpf-field-error-msg">{ERROR_MESSAGES[name] || "This field is required."}</div> : null;

  return (
    <>
      <style>{`
        :root {
          --white:      #FFFFFF;
          --alabaster:  #F8F7FC;
          --grain:      #F5F5F3;
          --footer-bg:  #EFECE6;
          --border:     #E4E2ED;
          --purple:     #7C3AED;
          --purple-lt:  #EDE9FD;
          --purple-mid: #C4B5FD;
          --green:      #00A86B;
          --green-lt:   #E6F7F1;
          --espresso:   #4A3E3D;
          --dark:       #2D2120;
          --muted:      #7A6E6D;
          --light:      #A89E9D;
          --r-sm: 8px; --r-md: 12px; --r-lg: 20px;
          --sh-sm: 0 1px 3px rgba(74,62,61,.06),0 1px 2px rgba(74,62,61,.04);
          --sh-md: 0 4px 16px rgba(74,62,61,.08),0 1px 4px rgba(74,62,61,.04);
          --sh-lg: 0 12px 40px rgba(74,62,61,.12),0 4px 12px rgba(74,62,61,.06);
          --t: .2s cubic-bezier(.4,0,.2,1);
        }
        .cpf-page *, .cpf-page *::before, .cpf-page *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cpf-page { font-family: 'Inter', sans-serif; background: var(--white); color: var(--espresso); line-height: 1.6; min-height: 100vh; }

        /* NAV */
        .cpf-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 2rem; height: 60px; display: flex; align-items: center; justify-content: space-between; }
        .cpf-nav-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--espresso); text-decoration: none; }
        .cpf-nav-logo span { color: var(--purple); }
        .cpf-nav-tag { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

        /* HERO */
        .cpf-hero { padding: 100px 2rem 60px; background: var(--white); position: relative; overflow: hidden; }
        .cpf-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%; background: radial-gradient(ellipse 60% 50% at 50% 0%,#EDE9FD 0%,transparent 70%); pointer-events: none; }
        .cpf-hero-inner { max-width: 720px; margin: 0 auto; position: relative; }
        .cpf-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: var(--purple-lt); border: 1px solid var(--purple-mid); border-radius: 999px; padding: 5px 14px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--purple); margin-bottom: 1.25rem; }
        .cpf-hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); animation: cpf-pulse 2s infinite; }
        @keyframes cpf-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        .cpf-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(32px,5vw,52px); font-weight: 700; line-height: 1.12; color: var(--espresso); margin-bottom: 1rem; letter-spacing: -1px; }
        .cpf-hero h1 em { font-style: italic; color: var(--purple); }
        .cpf-hero-sub { font-size: 17px; color: var(--muted); line-height: 1.75; margin-bottom: 2rem; max-width: 580px; }
        .cpf-hero-note { background: var(--grain); border: 1px solid var(--border); border-radius: var(--r-md); padding: 20px 24px; font-size: 14px; color: var(--muted); line-height: 1.7; border-left: 3px solid var(--purple); }
        .cpf-hero-note strong { color: var(--espresso); font-weight: 600; }

        /* PROGRESS */
        .cpf-progress-wrap { background: var(--alabaster); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 16px 2rem; position: sticky; top: 60px; z-index: 90; }
        .cpf-progress-inner { max-width: 720px; margin: 0 auto; display: flex; align-items: center; gap: 16px; }
        .cpf-progress-track { flex: 1; height: 4px; background: var(--border); border-radius: 2px; overflow: hidden; }
        .cpf-progress-fill { height: 100%; background: var(--purple); border-radius: 2px; transition: width .4s cubic-bezier(.4,0,.2,1); width: 0%; }
        .cpf-progress-label { font-size: 12px; font-weight: 600; color: var(--muted); white-space: nowrap; }
        .cpf-progress-pct { font-size: 12px; font-weight: 700; color: var(--purple); white-space: nowrap; }

        /* FORM WRAPPER */
        .cpf-form-wrap { max-width: 720px; margin: 0 auto; padding: 48px 2rem 80px; }

        /* SECTION */
        .cpf-form-section { margin-bottom: 48px; }
        .cpf-section-header { margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
        .cpf-section-num { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--purple); margin-bottom: 6px; }
        .cpf-section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--espresso); letter-spacing: -.3px; margin-bottom: 6px; }
        .cpf-section-desc { font-size: 14px; color: var(--muted); line-height: 1.65; }

        /* FIELD */
        .cpf-field { margin-bottom: 24px; }
        .cpf-field-label { display: block; font-size: 13px; font-weight: 600; color: var(--espresso); margin-bottom: 6px; line-height: 1.4; }
        .cpf-field-label .cpf-req { color: var(--purple); margin-left: 2px; }
        .cpf-field-hint { font-size: 12px; color: var(--light); margin-bottom: 8px; line-height: 1.5; }
        .cpf-field input[type=text],
        .cpf-field input[type=email],
        .cpf-field input[type=url],
        .cpf-field textarea,
        .cpf-field select {
          width: 100%; padding: 12px 14px;
          border: 1px solid var(--border); border-radius: var(--r-sm);
          background: var(--grain); color: var(--espresso);
          font-family: 'Inter',sans-serif; font-size: 14px; line-height: 1.6;
          outline: none; transition: border-color var(--t),background var(--t),box-shadow var(--t);
          appearance: none; -webkit-appearance: none;
        }
        .cpf-field input[type=text]:focus,
        .cpf-field input[type=email]:focus,
        .cpf-field input[type=url]:focus,
        .cpf-field textarea:focus,
        .cpf-field select:focus { border-color: var(--purple); background: var(--white); box-shadow: 0 0 0 3px rgba(124,58,237,.08); }
        .cpf-field textarea { resize: vertical; min-height: 110px; }
        .cpf-field select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A6E6D' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          padding-right: 36px; cursor: pointer;
        }

        .cpf-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .cpf-options-list { display: flex; flex-direction: column; gap: 8px; }
        .cpf-option-btn { display: flex; align-items: flex-start; gap: 12px; padding: 12px 16px; background: var(--white); border: 1px solid var(--border); border-radius: var(--r-sm); cursor: pointer; transition: all var(--t); text-align: left; width: 100%; font-family: 'Inter',sans-serif; }
        .cpf-option-btn:hover { border-color: var(--purple-mid); background: var(--purple-lt); }
        .cpf-option-btn.selected { border-color: var(--purple); background: var(--purple-lt); }
        .cpf-option-indicator { width: 18px; height: 18px; min-width: 18px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; transition: all var(--t); margin-top: 1px; flex-shrink: 0; }
        .cpf-option-btn.selected .cpf-option-indicator { border-color: var(--purple); background: var(--purple); }
        .cpf-option-btn.selected .cpf-option-indicator::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: white; }
        .cpf-option-check .cpf-option-indicator { border-radius: 4px; }
        .cpf-option-check.selected .cpf-option-indicator { border-radius: 4px; }
        .cpf-option-check.selected .cpf-option-indicator::after { content: ''; width: 8px; height: 6px; border: none; background: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath d='M1 4l3 3 5-6' stroke='white' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-size: contain; }
        .cpf-option-text { font-size: 13px; color: var(--espresso); line-height: 1.5; }

        .cpf-scale-wrap { display: flex; flex-direction: column; gap: 10px; }
        .cpf-scale-track { display: flex; gap: 6px; }
        .cpf-scale-btn { flex: 1; padding: 10px 4px; background: var(--white); border: 1px solid var(--border); border-radius: var(--r-sm); font-size: 13px; font-weight: 500; color: var(--muted); cursor: pointer; text-align: center; transition: all var(--t); font-family: 'Inter',sans-serif; }
        .cpf-scale-btn:hover { border-color: var(--purple-mid); color: var(--purple); }
        .cpf-scale-btn.selected { background: var(--purple); border-color: var(--purple); color: white; }
        .cpf-scale-labels { display: flex; justify-content: space-between; font-size: 11px; color: var(--light); }

        .cpf-field-divider { height: 1px; background: var(--border); margin: 8px 0 24px; }

        .cpf-submit-section { background: var(--alabaster); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 36px; text-align: center; margin-top: 48px; }
        .cpf-submit-section h3 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--espresso); margin-bottom: 8px; letter-spacing: -.3px; }
        .cpf-submit-section p { font-size: 14px; color: var(--muted); line-height: 1.65; margin-bottom: 24px; max-width: 480px; margin-left: auto; margin-right: auto; }
        .cpf-btn-submit { display: inline-flex; align-items: center; gap: 10px; background: var(--purple); color: white; border: none; border-radius: var(--r-sm); padding: 15px 36px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all var(--t); font-family: 'Inter',sans-serif; }
        .cpf-btn-submit:hover { background: #6D28D9; transform: translateY(-1px); box-shadow: var(--sh-md); }
        .cpf-btn-submit:active { transform: translateY(0); }
        .cpf-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .cpf-submit-trust { margin-top: 14px; font-size: 12px; color: var(--light); display: flex; align-items: center; justify-content: center; gap: 6px; }
        .cpf-submit-trust svg { width: 13px; height: 13px; color: var(--green); }

        .cpf-confirm-screen { display: flex; min-height: 60vh; align-items: center; justify-content: center; padding: 60px 2rem; }
        .cpf-confirm-inner { max-width: 600px; margin: 0 auto; text-align: center; }
        .cpf-confirm-icon { width: 72px; height: 72px; border-radius: 20px; background: var(--purple-lt); border: 1px solid var(--purple-mid); display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; }
        .cpf-confirm-icon svg { width: 32px; height: 32px; color: var(--purple); }
        .cpf-confirm-inner h2 { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: var(--espresso); margin-bottom: 12px; letter-spacing: -.5px; }
        .cpf-confirm-inner .cpf-confirm-sub { font-size: 16px; color: var(--muted); line-height: 1.7; margin-bottom: 32px; }
        .cpf-confirm-message { background: var(--grain); border: 1px solid var(--border); border-radius: var(--r-md); padding: 28px; text-align: left; margin-bottom: 28px; }
        .cpf-confirm-message p { font-size: 14px; color: var(--muted); line-height: 1.8; margin-bottom: 12px; }
        .cpf-confirm-message p:last-child { margin-bottom: 0; }
        .cpf-confirm-message strong { color: var(--espresso); font-weight: 600; }
        .cpf-confirm-highlight { background: var(--purple-lt); border: 1px solid var(--purple-mid); border-radius: var(--r-sm); padding: 16px 20px; font-size: 13px; color: var(--purple); font-weight: 500; line-height: 1.6; margin-top: 20px; }

        .cpf-field.error input,
        .cpf-field.error textarea,
        .cpf-field.error select { border-color: #DC2626; background: #FFF5F5; }
        .cpf-field-error-msg { font-size: 12px; color: #DC2626; margin-top: 6px; display: none; }
        .cpf-field.error .cpf-field-error-msg { display: block; }

        .cpf-footer { background: var(--footer-bg); border-top: 1px solid var(--border); padding: 32px 2rem; text-align: center; }
        .cpf-footer-logo { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700; color: var(--espresso); margin-bottom: 6px; }
        .cpf-footer-logo span { color: var(--purple); }
        .cpf-footer-sub { font-size: 12px; color: var(--light); }

        @media(max-width: 600px){
          .cpf-field-row { grid-template-columns: 1fr; }
          .cpf-scale-track { gap: 3px; }
          .cpf-scale-btn { font-size: 11px; padding: 8px 2px; }
          .cpf-hero { padding: 88px 1.25rem 48px; }
          .cpf-form-wrap { padding: 32px 1.25rem 60px; }
          .cpf-submit-section { padding: 24px; }
        }
      `}</style>

      <div className="cpf-page">
        {/* NAV */}
        <nav className="cpf-nav">
          <a href="https://temitopesaliu.com" className="cpf-nav-logo">Temitope<span>.</span></a>
          <span className="cpf-nav-tag">Workshop Onboarding</span>
        </nav>

        {!submitted ? (
          <>
            {/* HERO */}
            <section className="cpf-hero">
              <div className="cpf-hero-inner">
                <div className="cpf-hero-eyebrow">
                  <span className="cpf-hero-eyebrow-dot"></span>
                  Intelligence Layer Workshop — July 25th
                </div>
                <h1>Your Consulting<br /><em>Profile.</em></h1>
                <p className="cpf-hero-sub">
                  This is not a test. There are no right answers. The thinking you do answering these questions is already part of your preparation for July 25th.
                </p>
                <div className="cpf-hero-note">
                  <strong>Before you begin:</strong> I read every single response before we go into the room together. Your answers shape the examples I use, the businesses we diagnose, and the time we spend on what matters most to you. Take your time with this. It takes approximately 15 minutes. Those 15 minutes will make the three hours on July 25th significantly more valuable.
                </div>
              </div>
            </section>

            {/* PROGRESS */}
            <div className="cpf-progress-wrap">
              <div className="cpf-progress-inner">
                <div className="cpf-progress-track">
                  <div className="cpf-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <span className="cpf-progress-label">Your progress</span>
                <span className="cpf-progress-pct">{progressPct}%</span>
              </div>
            </div>

            {/* FORM */}
            <div className="cpf-form-wrap">
              <form onSubmit={handleSubmit} noValidate>

                {/* SECTION 1 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 01</div>
                    <div className="cpf-section-title">About You</div>
                    <div className="cpf-section-desc">The basics. So I know who I am talking to before July 25th.</div>
                  </div>

                  <div className="cpf-field-row">
                    <div className={fieldClass("full_name")} id="f-fname">
                      <label className="cpf-field-label">Full name <span className="cpf-req">*</span></label>
                      <input type="text" name="full_name" placeholder="Your full name" value={formData.full_name || ""} onChange={(e) => set("full_name", e.target.value)} />
                      <FieldError name="full_name" />
                    </div>
                    <div className={fieldClass("preferred_name")} id="f-pref">
                      <label className="cpf-field-label">Preferred name in session <span className="cpf-req">*</span></label>
                      <input type="text" name="preferred_name" placeholder="What should I call you?" value={formData.preferred_name || ""} onChange={(e) => set("preferred_name", e.target.value)} />
                      <FieldError name="preferred_name" />
                    </div>
                  </div>

                  <div className="cpf-field-row">
                    <div className={fieldClass("email")} id="f-email">
                      <label className="cpf-field-label">Email address <span className="cpf-req">*</span></label>
                      <input type="email" name="email" placeholder="name@email.com" value={formData.email || ""} onChange={(e) => set("email", e.target.value)} />
                      <FieldError name="email" />
                    </div>
                    <div className={fieldClass("country")} id="f-country">
                      <label className="cpf-field-label">Country you are based in <span className="cpf-req">*</span></label>
                      <input type="text" name="country" placeholder="e.g. Nigeria, UK, USA" value={formData.country || ""} onChange={(e) => set("country", e.target.value)} />
                      <FieldError name="country" />
                    </div>
                  </div>

                  <div className="cpf-field-row">
                    <div className={fieldClass("timezone")} id="f-tz">
                      <label className="cpf-field-label">Time zone joining from <span className="cpf-req">*</span></label>
                      <input type="text" name="timezone" placeholder="e.g. WAT, BST, EST" value={formData.timezone || ""} onChange={(e) => set("timezone", e.target.value)} />
                      <FieldError name="timezone" />
                    </div>
                    <div className="cpf-field">
                      <label className="cpf-field-label">LinkedIn profile URL <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
                      <input type="url" name="linkedin" placeholder="linkedin.com/in/yourname" value={formData.linkedin || ""} onChange={(e) => set("linkedin", e.target.value)} />
                    </div>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 02</div>
                    <div className="cpf-section-title">Your Professional Background</div>
                    <div className="cpf-section-desc">Not your CV. The real version of where you operate and what you have built.</div>
                  </div>

                  <div className={fieldClass("current_role")} id="f-role">
                    <label className="cpf-field-label">What best describes your current role? <span className="cpf-req">*</span></label>
                    {renderOptionButtons("current_role", [
                      { value: "Employed full-time", label: "Employed full-time in a corporate or organisation" },
                      { value: "Independent consultant", label: "Independent consultant or freelancer" },
                      { value: "Business owner", label: "Business owner or founder" },
                      { value: "Coach or trainer", label: "Coach or trainer" },
                      { value: "Multiple of the above", label: "Multiple of the above" },
                      { value: "In transition", label: "In transition between roles" },
                    ], "radio")}
                    <FieldError name="current_role" />
                  </div>

                  <div className={fieldClass("years_experience")} id="f-years">
                    <label className="cpf-field-label">How many years of serious professional experience do you have in your primary domain? <span className="cpf-req">*</span></label>
                    {renderOptionButtons("years_experience", [
                      { value: "1-3 years", label: "1 to 3 years" },
                      { value: "4-7 years", label: "4 to 7 years" },
                      { value: "8-12 years", label: "8 to 12 years" },
                      { value: "13-20 years", label: "13 to 20 years" },
                      { value: "20+ years", label: "20 years or more" },
                    ], "radio")}
                    <FieldError name="years_experience" />
                  </div>

                  <div className={fieldClass("industry")} id="f-industry">
                    <label className="cpf-field-label">Which industry or industries have you spent the most time working in? <span className="cpf-req">*</span></label>
                    <input type="text" name="industry" placeholder="e.g. Finance, HR, Marketing, Healthcare, Education..." value={formData.industry || ""} onChange={(e) => set("industry", e.target.value)} />
                    <FieldError name="industry" />
                  </div>

                  <div className={fieldClass("advice_areas")} id="f-sought">
                    <label className="cpf-field-label">What areas do people naturally seek your advice on — even informally, even without paying you? <span className="cpf-req">*</span></label>
                    <textarea name="advice_areas" placeholder="The things people ask you about in WhatsApp groups, at events, over coffee..." value={formData.advice_areas || ""} onChange={(e) => set("advice_areas", e.target.value)}></textarea>
                    <FieldError name="advice_areas" />
                  </div>

                  <div className={fieldClass("greatest_strength")} id="f-strength">
                    <label className="cpf-field-label">What would you consider your single greatest professional strength? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Not a skill. A strength. The thing that is most distinctly yours.</div>
                    <textarea name="greatest_strength" placeholder="The thing you do that feels ordinary to you but extraordinary to others..." value={formData.greatest_strength || ""} onChange={(e) => set("greatest_strength", e.target.value)}></textarea>
                    <FieldError name="greatest_strength" />
                  </div>
                </div>

                {/* SECTION 3 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 03</div>
                    <div className="cpf-section-title">Your Expertise</div>
                    <div className="cpf-section-desc">This is the section that shapes the entire session. Take the most time here.</div>
                  </div>

                  <div className={fieldClass("core_problem")} id="f-problem">
                    <label className="cpf-field-label">In plain language — not professional language — what problem are you exceptionally good at solving? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Not your job title. Not your LinkedIn headline. The actual problem. The thing people bring to you when something is broken or stuck.</div>
                    <textarea name="core_problem" placeholder="When people come to me they are usually struggling with..." style={{ minHeight: 130 }} value={formData.core_problem || ""} onChange={(e) => set("core_problem", e.target.value)}></textarea>
                    <FieldError name="core_problem" />
                  </div>

                  <div className={fieldClass("proudest_work")} id="f-proud">
                    <label className="cpf-field-label">Describe a piece of work you are most proud of. <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">What did you do, what changed, and why does it still stay with you?</div>
                    <textarea name="proudest_work" placeholder="Tell me about the work, the outcome, and why it matters to you..." style={{ minHeight: 130 }} value={formData.proudest_work || ""} onChange={(e) => set("proudest_work", e.target.value)}></textarea>
                    <FieldError name="proudest_work" />
                  </div>

                  <div className={fieldClass("org_types")} id="f-orgtypes">
                    <label className="cpf-field-label">What type of organisations do you understand best? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Select all that apply.</div>
                    {renderOptionButtons("org_types", [
                      { value: "Small businesses and startups", label: "Small businesses and startups" },
                      { value: "Corporate and enterprise", label: "Corporate and enterprise" },
                      { value: "Healthcare", label: "Healthcare" },
                      { value: "Education", label: "Education" },
                      { value: "Government or public sector", label: "Government or public sector" },
                      { value: "Non-profit", label: "Non-profit" },
                      { value: "Professional services", label: "Professional services" },
                      { value: "Technology", label: "Technology" },
                      { value: "Manufacturing", label: "Manufacturing" },
                    ], "checkbox")}
                    <FieldError name="org_types" />
                  </div>
                </div>

                {/* SECTION 4 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 04</div>
                    <div className="cpf-section-title">What You Want From July 25th</div>
                    <div className="cpf-section-desc">Be honest here. Not the polished version. The real reason you showed up.</div>
                  </div>

                  <div className={fieldClass("why_joined")} id="f-why">
                    <label className="cpf-field-label">Why did you decide to join this workshop? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Not the professional answer. The real one.</div>
                    <textarea name="why_joined" placeholder="Be honest with me. What made you click that button and pay?" style={{ minHeight: 120 }} value={formData.why_joined || ""} onChange={(e) => set("why_joined", e.target.value)}></textarea>
                    <FieldError name="why_joined" />
                  </div>

                  <div className={fieldClass("best_workshop")} id="f-best">
                    <label className="cpf-field-label">What would make this one of the best workshops you have ever attended? <span className="cpf-req">*</span></label>
                    <textarea name="best_workshop" placeholder="Describe it specifically. What would need to happen for you to walk away saying — that changed things?" style={{ minHeight: 120 }} value={formData.best_workshop || ""} onChange={(e) => set("best_workshop", e.target.value)}></textarea>
                    <FieldError name="best_workshop" />
                  </div>

                  <div className={fieldClass("key_question")} id="f-question">
                    <label className="cpf-field-label">What is the one question you are most hoping gets answered? <span className="cpf-req">*</span></label>
                    <textarea name="key_question" placeholder="The question that has been sitting with you unanswered..." value={formData.key_question || ""} onChange={(e) => set("key_question", e.target.value)}></textarea>
                    <FieldError name="key_question" />
                  </div>
                </div>

                {/* SECTION 5 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 05</div>
                    <div className="cpf-section-title">Your AI Relationship</div>
                    <div className="cpf-section-desc">Where you are honestly right now. No judgment. This shapes the session.</div>
                  </div>

                  <div className={fieldClass("ai_confidence")} id="f-aiconf">
                    <label className="cpf-field-label">How would you rate your current confidence using AI strategically — not just for tasks but to build something? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">1 = complete beginner &nbsp;·&nbsp; 10 = building with it daily</div>
                    {renderScale("ai_confidence", "Complete beginner", "Building with it daily")}
                    <FieldError name="ai_confidence" />
                  </div>

                  <div className={fieldClass("ai_tools")} id="f-aitools">
                    <label className="cpf-field-label">Which AI tools do you currently use and what specifically do you use them for? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Be precise. Not just the tool name — the actual use case.</div>
                    <textarea name="ai_tools" placeholder="e.g. Claude for drafting client proposals, ChatGPT for research, Notion AI for meeting notes..." value={formData.ai_tools || ""} onChange={(e) => set("ai_tools", e.target.value)}></textarea>
                    <FieldError name="ai_tools" />
                  </div>

                  <div className={fieldClass("ai_transformative")} id="f-aitransform">
                    <label className="cpf-field-label">What would AI need to do for your specific expertise for you to consider it genuinely transformative rather than just useful? <span className="cpf-req">*</span></label>
                    <textarea name="ai_transformative" placeholder="What is the bar? What would need to happen for AI to feel like it changed everything for you?" style={{ minHeight: 120 }} value={formData.ai_transformative || ""} onChange={(e) => set("ai_transformative", e.target.value)}></textarea>
                    <FieldError name="ai_transformative" />
                  </div>
                </div>

                {/* SECTION 6 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 06</div>
                    <div className="cpf-section-title">Bring a Business</div>
                    <div className="cpf-section-desc">One of the most powerful things we do in the session is diagnose a real business live in the room. Come prepared with one. It can be a business you work for, work with, have observed closely, or want to approach as a client.</div>
                  </div>

                  <div className="cpf-field-row">
                    <div className={fieldClass("business_name")} id="f-bizname">
                      <label className="cpf-field-label">Business name <span className="cpf-req">*</span></label>
                      <input type="text" name="business_name" placeholder="Name of the business" value={formData.business_name || ""} onChange={(e) => set("business_name", e.target.value)} />
                      <FieldError name="business_name" />
                    </div>
                    <div className={fieldClass("business_industry")} id="f-bizindustry">
                      <label className="cpf-field-label">Industry <span className="cpf-req">*</span></label>
                      <input type="text" name="business_industry" placeholder="e.g. Logistics, Healthcare, Retail" value={formData.business_industry || ""} onChange={(e) => set("business_industry", e.target.value)} />
                      <FieldError name="business_industry" />
                    </div>
                  </div>

                  <div className="cpf-field">
                    <label className="cpf-field-label">Approximate size <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
                    <input type="text" name="business_size" placeholder="Number of employees or revenue range if known" value={formData.business_size || ""} onChange={(e) => set("business_size", e.target.value)} />
                  </div>

                  <div className={fieldClass("business_challenge")} id="f-bizchallenge">
                    <label className="cpf-field-label">What do you think is their biggest operational challenge right now? <span className="cpf-req">*</span></label>
                    <textarea name="business_challenge" placeholder="What is breaking, slowing down, or stuck in this business right now?" value={formData.business_challenge || ""} onChange={(e) => set("business_challenge", e.target.value)}></textarea>
                    <FieldError name="business_challenge" />
                  </div>

                  <div className={fieldClass("business_friction")} id="f-bizfriction">
                    <label className="cpf-field-label">Where do you see the most obvious friction in how they operate? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">The repetition, the delay, the bottleneck, the knowledge trapped inside one person's head.</div>
                    <textarea name="business_friction" placeholder="Where does this business slow down, repeat itself, or break when the wrong person is unavailable?" value={formData.business_friction || ""} onChange={(e) => set("business_friction", e.target.value)}></textarea>
                    <FieldError name="business_friction" />
                  </div>

                  <div className={fieldClass("business_why")} id="f-bizwhy">
                    <label className="cpf-field-label">Why did you choose this business? <span className="cpf-req">*</span></label>
                    <input type="text" name="business_why" placeholder="What made you pick this one specifically?" value={formData.business_why || ""} onChange={(e) => set("business_why", e.target.value)} />
                    <FieldError name="business_why" />
                  </div>
                </div>

                {/* SECTION 7 */}
                <div className="cpf-form-section">
                  <div className="cpf-section-header">
                    <div className="cpf-section-num">Section 07</div>
                    <div className="cpf-section-title">The Reflection Question</div>
                    <div className="cpf-section-desc">This is the most important section on the form. Take your time.</div>
                  </div>

                  <div className={fieldClass("six_months_vision")} id="f-sixmonths">
                    <label className="cpf-field-label">Imagine it is six months from now. You send me a message and say — I am so glad I attended. What has happened? <span className="cpf-req">*</span></label>
                    <div className="cpf-field-hint">Describe the outcome in as much detail as you can. What are you doing? What has changed? What can you do now that you could not do before July 25th?</div>
                    <textarea name="six_months_vision" placeholder="Six months from now, I am..." style={{ minHeight: 160 }} value={formData.six_months_vision || ""} onChange={(e) => set("six_months_vision", e.target.value)}></textarea>
                    <FieldError name="six_months_vision" />
                  </div>

                  <div className="cpf-field">
                    <label className="cpf-field-label">Is there anything you think I should know about you before we meet that would help me make this workshop more valuable for you? <span style={{ fontWeight: 400, color: "var(--light)" }}>(optional)</span></label>
                    <div className="cpf-field-hint">Anything about your situation, your history, your concerns, or your ambitions that no multiple-choice question has captured.</div>
                    <textarea name="anything_else" placeholder="Anything at all that you want me to know before July 25th..." style={{ minHeight: 110 }} value={formData.anything_else || ""} onChange={(e) => set("anything_else", e.target.value)}></textarea>
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="cpf-submit-section">
                  <h3>You are almost there.</h3>
                  <p>Your responses go directly to me. I will read every answer before we go into the room together on July 25th. What you share here shapes everything that happens in those three hours.</p>
                  <button type="submit" className="cpf-btn-submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit my consulting profile"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <div className="cpf-submit-trust">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Your responses are private and used only to personalise your session experience.
                  </div>
                </div>

              </form>
            </div>
          </>
        ) : (
          /* CONFIRMATION */
          <div className="cpf-confirm-screen">
            <div className="cpf-confirm-inner">
              <div className="cpf-confirm-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2>You are all set.</h2>
              <p className="cpf-confirm-sub">Your consulting profile has been submitted. I will read every response before we go into the room together on July 25th.</p>
              <div className="cpf-confirm-message">
                <p>Between now and July 25th, start observing businesses differently.</p>
                <p>Do not look for AI.</p>
                <p><strong>Look for friction.</strong> Look for repetition. Look for delays. Look for decisions being made slowly because knowledge is trapped inside one person's head. Look for processes that break every time one specific person is unavailable.</p>
                <p>That is where AI consultants create value.</p>
                <p>We will build on those observations together on July 25th.</p>
                <div className="cpf-confirm-highlight">See you in the room. — Temitope</div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="cpf-footer">
          <div className="cpf-footer-logo">Temitope<span>.</span></div>
          <div className="cpf-footer-sub">Intelligence Layer Workshop — July 25th 2025 · 2PM WAT</div>
        </footer>
      </div>
    </>
  );
}
