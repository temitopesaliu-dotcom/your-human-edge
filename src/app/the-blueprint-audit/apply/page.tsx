"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AiosNav from "../_components/AiosNav";
import AiosFooter from "../_components/AiosFooter";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  website: string;
  businessType: string;
  industry: string;
  teamSize: string;
  businessDesc: string;
  biggestPain: string;
  bottleneck: string;
  systematize: string[];
  currentTools: string;
  implementationBudget: string;
  timeline: string;
  howHeard: string;
  additionalContext: string;
  contactPref: string;
}

const TOTAL_STEPS = 5;

export default function ApplyPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    website: "",
    businessType: "",
    industry: "",
    teamSize: "",
    businessDesc: "",
    biggestPain: "",
    bottleneck: "",
    systematize: [],
    currentTools: "",
    implementationBudget: "",
    timeline: "",
    howHeard: "",
    additionalContext: "",
    contactPref: "",
  });

  const update = (field: keyof FormData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleSystematize = (value: string) => {
    setData((prev) => {
      const arr = prev.systematize.includes(value)
        ? prev.systematize.filter((v) => v !== value)
        : [...prev.systematize, value];
      return { ...prev, systematize: arr };
    });
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    const req = (field: string, label: string) => {
      const v =
        typeof data[field as keyof FormData] === "string"
          ? (data[field as keyof FormData] as string).trim()
          : "";
      if (!v) newErrors[field] = `${label} is required.`;
    };

    if (step === 1) {
      req("firstName", "First name");
      req("lastName", "Last name");
      req("email", "Email");
      req("businessName", "Business name");
    } else if (step === 2) {
      req("businessType", "Business type");
      req("industry", "Industry");
      req("teamSize", "Team size");
      req("businessDesc", "Business description");
    } else if (step === 3) {
      req("biggestPain", "Biggest pain point");
      req("bottleneck", "Bottleneck");
      req("currentTools", "Current tools");
    } else if (step === 4) {
      req("implementationBudget", "Budget");
      req("timeline", "Timeline");
    } else if (step === 5) {
      req("howHeard", "How you heard about us");
      req("contactPref", "Contact preference");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(current)) return;

    // Budget redirect on step 4
    if (current === 4) {
      const LOW = ["under-1000", "1000-2500"];
      if (LOW.includes(data.implementationBudget)) {
        router.push("/the-blueprint-audit/apply/not-a-fit");
        return;
      }
    }

    if (current < TOTAL_STEPS) setCurrent(current + 1);
  };

  const goBack = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(current)) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/the-blueprint-audit/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/the-blueprint-audit/apply/confirmation");
      } else {
        setErrors({ submit: "Submission failed. Please try again." });
        setSubmitting(false);
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
      setSubmitting(false);
    }
  };

  const progressWidth = (current / TOTAL_STEPS) * 100;

  const FieldError = ({ field }: { field: string }) =>
    errors[field] ? <p className="form-error">{errors[field]}</p> : null;

  return (
    <>
      <AiosNav variant="apply" />

      <div className="form-page">
        <div className="form-page-header">
          <p className="label mb-2">Application</p>
          <h1 className="heading-2">Blueprint Session Application</h1>
          <p className="body-md mt-2" style={{ color: "var(--text-2)" }}>
            Takes 5–7 minutes. All applications reviewed within 48 hours.
          </p>
        </div>

        <div className="form-progress" aria-label="Application progress">
          <div className="form-progress-bar">
            <div
              className="form-progress-fill"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="form-progress-label">
            Step <span>{current}</span> of <span>{TOTAL_STEPS}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Blueprint application form">
          {/* STEP 1 */}
          {current === 1 && (
            <div className="form-step active" role="group">
              <p className="form-step-label">Step 1 of 5</p>
              <h2 className="form-step-title">Tell us about yourself.</h2>
              <p className="form-step-subtitle">
                Basic contact information. We use this to review your
                application and send you a decision.
              </p>

              <div className="form-fields">
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label" htmlFor="firstName">
                      First name <span className="form-required">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="firstName"
                      placeholder="Sarah"
                      value={data.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      autoComplete="given-name"
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lastName">
                      Last name <span className="form-required">*</span>
                    </label>
                    <input
                      className="form-input"
                      type="text"
                      id="lastName"
                      placeholder="Johnson"
                      value={data.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      autoComplete="family-name"
                    />
                    <FieldError field="lastName" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="email">
                    Email address <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    placeholder="sarah@company.com"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                  />
                  <FieldError field="email" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="businessName">
                    Business name <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="businessName"
                    placeholder="Your business or practice name"
                    value={data.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                  />
                  <FieldError field="businessName" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="website">
                    Website URL
                  </label>
                  <input
                    className="form-input"
                    type="url"
                    id="website"
                    placeholder="https://yourbusiness.com"
                    value={data.website}
                    onChange={(e) => update("website", e.target.value)}
                    autoComplete="url"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-arrow btn-next"
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {current === 2 && (
            <div className="form-step active" role="group">
              <p className="form-step-label">Step 2 of 5</p>
              <h2 className="form-step-title">Tell us about your business.</h2>
              <p className="form-step-subtitle">
                Help us understand what you do and who you serve.
              </p>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label" htmlFor="businessType">
                    What type of business do you operate?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="businessType"
                    value={data.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                  >
                    <option value="" disabled>
                      Select your business type
                    </option>
                    <option value="coach">Coach (1:1 or group)</option>
                    <option value="consultant">Consultant</option>
                    <option value="agency">Agency</option>
                    <option value="saas-founder">SaaS / Tech Founder</option>
                    <option value="creator">Creator / Educator</option>
                    <option value="service-business">Service Business</option>
                    <option value="professional-services">
                      Professional Services (legal, finance, medical)
                    </option>
                    <option value="ecommerce">
                      E-commerce / Product Business
                    </option>
                    <option value="other">Other</option>
                  </select>
                  <FieldError field="businessType" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="industry">
                    Industry or niche <span className="form-required">*</span>
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    id="industry"
                    placeholder="e.g. Executive coaching, B2B marketing, health & wellness"
                    value={data.industry}
                    onChange={(e) => update("industry", e.target.value)}
                  />
                  <FieldError field="industry" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="teamSize">
                    How many people are on your team (including you)?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="teamSize"
                    value={data.teamSize}
                    onChange={(e) => update("teamSize", e.target.value)}
                  >
                    <option value="" disabled>
                      Select team size
                    </option>
                    <option value="solo">Solo (just me)</option>
                    <option value="2-5">2–5</option>
                    <option value="6-15">6–15</option>
                    <option value="16-25">16–25</option>
                    <option value="25+">25+</option>
                  </select>
                  <FieldError field="teamSize" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="businessDesc">
                    Describe what your business does in 2–3 sentences.{" "}
                    <span className="form-required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="businessDesc"
                    rows={4}
                    placeholder="We help marketing agencies systematize their client onboarding..."
                    value={data.businessDesc}
                    onChange={(e) => update("businessDesc", e.target.value)}
                  />
                  <FieldError field="businessDesc" />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-back"
                  onClick={goBack}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-arrow btn-next"
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {current === 3 && (
            <div className="form-step active" role="group">
              <p className="form-step-label">Step 3 of 5</p>
              <h2 className="form-step-title">Where are you right now?</h2>
              <p className="form-step-subtitle">
                We want to understand your current operational reality.
              </p>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label" htmlFor="biggestPain">
                    What is your biggest operational pain point right now?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="biggestPain"
                    rows={4}
                    placeholder="Describe the single biggest friction or bottleneck in your business operations."
                    value={data.biggestPain}
                    onChange={(e) => update("biggestPain", e.target.value)}
                  />
                  <FieldError field="biggestPain" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="bottleneck">
                    Where does your business stop when you stop?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="bottleneck"
                    rows={3}
                    placeholder="What specific processes depend entirely on you showing up personally?"
                    value={data.bottleneck}
                    onChange={(e) => update("bottleneck", e.target.value)}
                  />
                  <FieldError field="bottleneck" />
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Which areas do you most want to systematize? (select all
                    that apply)
                  </label>
                  <div
                    className="form-checkbox-group"
                    role="group"
                    aria-label="Areas to systematize"
                  >
                    {[
                      { value: "lead-capture", label: "Lead capture and qualification" },
                      { value: "client-onboarding", label: "Client onboarding" },
                      { value: "client-delivery", label: "Client delivery and communication" },
                      { value: "content", label: "Content creation and distribution" },
                      { value: "knowledge", label: "Internal knowledge management" },
                      { value: "sales", label: "Sales intelligence and follow-up" },
                      { value: "ops", label: "General operations and team coordination" },
                      { value: "support", label: "Customer support" },
                      { value: "reporting", label: "Reporting and visibility" },
                    ].map((opt) => (
                      <label className="form-checkbox-item" key={opt.value}>
                        <input
                          type="checkbox"
                          checked={data.systematize.includes(opt.value)}
                          onChange={() => toggleSystematize(opt.value)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="currentTools">
                    What tools are you currently using for operations and
                    communication? <span className="form-required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    id="currentTools"
                    rows={3}
                    placeholder="e.g. HubSpot CRM, Gmail, Slack, Notion, Calendly, Zapier..."
                    value={data.currentTools}
                    onChange={(e) => update("currentTools", e.target.value)}
                  />
                  <FieldError field="currentTools" />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-back"
                  onClick={goBack}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-arrow btn-next"
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {current === 4 && (
            <div className="form-step active" role="group">
              <p className="form-step-label">Step 4 of 5</p>
              <h2 className="form-step-title">Investment readiness.</h2>
              <p className="form-step-subtitle">
                We ask directly because we want to protect your time. If the
                investment range isn&apos;t right for your situation, we&apos;ll
                point you toward better options.
              </p>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label" htmlFor="implementationBudget">
                    If the Blueprint session reveals the right opportunity, what
                    is your likely implementation budget?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <p className="form-hint">
                    Implementation projects typically range from
                    $2,500–$10,000+. This is not a commitment.
                  </p>
                  <select
                    className="form-select"
                    id="implementationBudget"
                    value={data.implementationBudget}
                    onChange={(e) =>
                      update("implementationBudget", e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select your budget range
                    </option>
                    <option value="under-1000">Under $1,000</option>
                    <option value="1000-2500">$1,000–$2,500</option>
                    <option value="2500-5000">$2,500–$5,000</option>
                    <option value="5000-10000">$5,000–$10,000</option>
                    <option value="10000-plus">$10,000+</option>
                    <option value="not-sure">
                      Not sure yet — the Blueprint will help me decide
                    </option>
                  </select>
                  <FieldError field="implementationBudget" />
                </div>

                <div className="form-field">
                  <label className="form-label">
                    When are you looking to get started?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <div
                    className="form-radio-group"
                    role="radiogroup"
                    aria-label="Timeline preference"
                  >
                    {[
                      { value: "asap", title: "Ready now", desc: "I want to move forward as soon as possible" },
                      { value: "30-days", title: "Within 30 days", desc: "I'm planning ahead but want to move this quarter" },
                      { value: "60-90-days", title: "60–90 days", desc: "I'm evaluating options and gathering information" },
                      { value: "exploring", title: "Just exploring", desc: "No firm timeline — I want to understand what's possible" },
                    ].map((opt) => (
                      <label
                        className={`form-radio-option${data.timeline === opt.value ? " selected" : ""}`}
                        key={opt.value}
                      >
                        <input
                          type="radio"
                          name="timeline"
                          value={opt.value}
                          checked={data.timeline === opt.value}
                          onChange={(e) => update("timeline", e.target.value)}
                        />
                        <div className="form-radio-content">
                          <div className="form-radio-title">{opt.title}</div>
                          <div className="form-radio-desc">{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <FieldError field="timeline" />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-back"
                  onClick={goBack}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-arrow btn-next"
                  onClick={goNext}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {current === 5 && (
            <div className="form-step active" role="group">
              <p className="form-step-label">Step 5 of 5</p>
              <h2 className="form-step-title">Almost done.</h2>
              <p className="form-step-subtitle">
                A few final details to complete your application.
              </p>

              <div className="form-fields">
                <div className="form-field">
                  <label className="form-label" htmlFor="howHeard">
                    How did you hear about us?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="howHeard"
                    value={data.howHeard}
                    onChange={(e) => update("howHeard", e.target.value)}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">
                      Referral from someone I know
                    </option>
                    <option value="google">Google search</option>
                    <option value="podcast">Podcast</option>
                    <option value="twitter-x">Twitter / X</option>
                    <option value="instagram">Instagram</option>
                    <option value="content">Article or blog post</option>
                    <option value="other">Other</option>
                  </select>
                  <FieldError field="howHeard" />
                </div>

                <div className="form-field">
                  <label className="form-label" htmlFor="additionalContext">
                    Is there anything else you want us to know before we review
                    your application?
                  </label>
                  <textarea
                    className="form-textarea"
                    id="additionalContext"
                    rows={4}
                    placeholder="Any context about your situation, timing, or specific goals..."
                    value={data.additionalContext}
                    onChange={(e) =>
                      update("additionalContext", e.target.value)
                    }
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">
                    How would you prefer to be contacted with our decision?{" "}
                    <span className="form-required">*</span>
                  </label>
                  <div
                    className="form-radio-group"
                    role="radiogroup"
                    aria-label="Contact preference"
                  >
                    {[
                      { value: "email", title: "Email only" },
                      {
                        value: "email-calendar",
                        title: "Email + calendar invite for an intro call",
                      },
                    ].map((opt) => (
                      <label
                        className={`form-radio-option${data.contactPref === opt.value ? " selected" : ""}`}
                        key={opt.value}
                      >
                        <input
                          type="radio"
                          name="contactPref"
                          value={opt.value}
                          checked={data.contactPref === opt.value}
                          onChange={(e) =>
                            update("contactPref", e.target.value)
                          }
                        />
                        <div className="form-radio-content">
                          <div className="form-radio-title">{opt.title}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <FieldError field="contactPref" />
                </div>

                <div className="form-field">
                  <label className="form-checkbox-item form-terms">
                    <input type="checkbox" required />
                    <span>
                      I understand that submitting this application does not
                      guarantee a spot. Applications are reviewed and not all
                      are accepted. I agree to the{" "}
                      <a href="#privacy" style={{ color: "var(--accent)" }}>
                        privacy policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="#terms-conditions"
                        style={{ color: "var(--accent)" }}
                      >
                        terms of service
                      </a>
                      .
                    </span>
                  </label>
                </div>
              </div>

              {errors.submit && (
                <p className="form-error" style={{ marginBottom: 16 }}>
                  {errors.submit}
                </p>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-back"
                  onClick={goBack}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-arrow"
                  disabled={submitting}
                >
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <AiosFooter variant="apply" />
    </>
  );
}
