"use client";

import { useState } from "react";
import { useAsyncForm } from "@/hooks/use-async-form";
import { isValidEmail } from "@/lib/utils/validation";
import type { BlueprintQuizResponse } from "@/types/blueprint-apply";
import {
  BUDGET_OPTIONS,
  EMPTY_ANSWERS,
  LINKS,
  OPTIONS,
  PATH_OPTIONS,
  buildResult,
  type CardOption,
  type MultiKey,
  type QuizAnswers,
  type ResultModel,
  type SingleKey,
} from "./quiz.data";

const STEP_LABELS = ["Step 1 of 3 · Your business", "Step 2 of 3 · Your project", "Step 3 of 3 · Where to send it"];

export default function BlueprintQuiz() {
  const [a, setA] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultModel | null>(null);
  const submit = useAsyncForm<Record<string, string>, BlueprintQuizResponse>({ url: "/api/the-blueprint-audit/submit" });
  const submitting = submit.status === "submitting";

  const setSingle = (k: SingleKey, v: string) => setA((p) => ({ ...p, [k]: v }));
  const toggleMulti = (k: MultiKey, v: string) =>
    setA((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));
  const setText = (k: keyof QuizAnswers, v: string) => setA((p) => ({ ...p, [k]: v }));

  const go = (n: number) => {
    setError(null);
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const need = (checks: [unknown, string][]) => {
    const missing = checks.filter(([ok]) => !ok).map(([, label]) => label);
    setError(missing.length ? `Still needed: ${missing.join(", ")}.` : null);
    return missing.length === 0;
  };

  const next1 = () => {
    if (need([[a.businessDesc.trim(), "what your business does"], [a.team, "team size"], [a.revenue, "revenue"], [a.automate.length, "what you want to automate"], [a.timego.length, "where time goes"]])) go(2);
  };
  const next2 = () => {
    if (need([[a.path, "what you're looking for"], [a.budget, "investment"], [a.timeline, "when you want to start"]])) go(3);
  };
  const finish = async () => {
    if (!need([[a.firstName.trim(), "first name"], [isValidEmail(a.email.trim()), "a valid email"], [a.companyName.trim(), "company name"]])) return;
    const model = buildResult(a);
    const payload: Record<string, string> = {
      route: model.route,
      bestFit: model.fit,
      firstName: a.firstName.trim(),
      email: a.email.trim(),
      companyName: a.companyName.trim(),
      website: a.website.trim(),
      businessDesc: a.businessDesc.trim(),
      teamSize: a.team,
      revenue: a.revenue,
      automate: a.automate.join(", "),
      tools: a.tools.join(", "),
      dataLives: a.data.join(", "),
      dataOwner: a.owner,
      timeGoes: a.timego.join(", "),
      manualHours: a.hours,
      lookingFor: PATH_OPTIONS.find((o) => o.value === a.path)?.title || a.path,
      investment: BUDGET_OPTIONS.find((o) => o.value === a.budget)?.title || a.budget,
      techLevel: a.tech,
      security: a.security.join(", "),
      matters: a.matters.join(", "),
      timeline: a.timeline,
      decider: a.decider,
      whoDoesWhat: a.whoDoesWhat.trim(),
      breaksDown: a.breaksDown.trim(),
      anythingElse: a.anythingElse.trim(),
    };
    const res = await submit.submit(payload);
    if (!res.ok) {
      setError("We couldn't save your answers. Please try again.");
      return;
    }
    setResult(model);
    go(4);
  };

  return (
    <div className="bq">
      <style>{CSS}</style>
      {step < 4 && (
        <>
          <div className="bq-brand">Temitope Saliu <b>&middot;</b> The Blueprint Audit</div>
          <h1 className="bq-h1">See where AI fits in your business, <em>in about three minutes.</em></h1>
          <p className="bq-lede">Tap through three short steps. You get a first-draft architecture for your business on the spot: where the time goes, the systems to build first, and what 90 days from now looks like.</p>
          <div className="bq-progress"><div className="bq-bar"><i style={{ width: `${step * 33.4}%` }} /></div><span>{STEP_LABELS[step - 1]}</span></div>
        </>
      )}

      {step === 1 && (
        <section>
          <Q label="What does your business do?" req hint="One line is enough." htmlFor="bq-desc">
            <input id="bq-desc" className="bq-input" type="text" value={a.businessDesc} onChange={(e) => setText("businessDesc", e.target.value)} placeholder="e.g. Executive coaching for first-time founders" />
          </Q>
          <Q label="Team size" req hint="Including contractors."><Single opts={OPTIONS.team} value={a.team} onPick={(v) => setSingle("team", v)} /></Q>
          <Q label="Annual revenue" req hint="A range is fine. Never shared."><Single opts={OPTIONS.revenue} value={a.revenue} onPick={(v) => setSingle("revenue", v)} /></Q>
          <Q label="What do you want to automate?" req hint="Tap all that apply."><Multi opts={OPTIONS.automate} values={a.automate} onToggle={(v) => toggleMulti("automate", v)} /></Q>
          <Q label="What are you running on today?" hint="Tap anything your team uses. It tells us what we'd plug into."><Multi opts={OPTIONS.tools} values={a.tools} onToggle={(v) => toggleMulti("tools", v)} /></Q>
          <Q label="Where does your data live today?" hint="Tap all that apply. This tells us what we'd have to read from and write to."><Multi opts={OPTIONS.data} values={a.data} onToggle={(v) => toggleMulti("data", v)} /></Q>
          <Q label="Who owns that data internally?"><Single opts={OPTIONS.owner} value={a.owner} onPick={(v) => setSingle("owner", v)} /></Q>
          <Q label="Where does time actually go?" req hint="Tap every bottleneck that sounds familiar."><Multi opts={OPTIONS.timego} values={a.timego} onToggle={(v) => toggleMulti("timego", v)} /></Q>
          <Q label="Roughly how much time goes to manual work each week?" hint="Across the whole team. A rough guess is fine."><Single opts={OPTIONS.hours} value={a.hours} onPick={(v) => setSingle("hours", v)} /></Q>
          {error && <p className="bq-err" role="alert">{error}</p>}
          <div className="bq-actions"><button type="button" className="bq-btn bq-primary" onClick={next1}>Continue</button></div>
          <p className="bq-fine">Three short steps. Nothing is shared outside this business.</p>
        </section>
      )}

      {step === 2 && (
        <section>
          <Q label="What are you looking for?" req><Cards opts={PATH_OPTIONS} value={a.path} onPick={(v) => setSingle("path", v)} /></Q>
          <Q label="Investment" req hint="Strategy sessions start at $500 for two hours with Temitope. A full solutions architecture starts at $2,500, and your session fee comes off it. Is that in range?">
            <Cards opts={BUDGET_OPTIONS} value={a.budget} onPick={(v) => setSingle("budget", v)} />
            {a.budget === "smaller" && <div className="bq-note">That&apos;s fair. Your blueprint is yours either way, and we&apos;ll point you to the next step that fits where you are now.</div>}
          </Q>
          <Q label="How technical is your team?"><Single opts={OPTIONS.tech} value={a.tech} onPick={(v) => setSingle("tech", v)} /></Q>
          <Q label="Any data security or access control needs?" hint="Tap anything that applies. This shapes how we design from day one."><Multi opts={OPTIONS.security} values={a.security} onToggle={(v) => toggleMulti("security", v)} /></Q>
          <Q label="What matters most to you here?" hint="Tap all that apply."><Multi opts={OPTIONS.matters} values={a.matters} onToggle={(v) => toggleMulti("matters", v)} /></Q>
          <Q label="When are you looking to start?" req><Single opts={OPTIONS.timeline} value={a.timeline} onPick={(v) => setSingle("timeline", v)} /></Q>
          <Q label="Who makes the final call on this?"><Single opts={OPTIONS.decider} value={a.decider} onPick={(v) => setSingle("decider", v)} /></Q>
          <Q label="Who does what in this process today?" hint="Walk us through the steps and who handles each one." htmlFor="bq-who">
            <textarea id="bq-who" className="bq-input" value={a.whoDoesWhat} onChange={(e) => setText("whoDoesWhat", e.target.value)} placeholder="e.g. A lead fills our website form, it lands in a shared inbox, Priya copies it into HubSpot by hand, then whoever is free tries to follow up." />
          </Q>
          <Q label="Where does it break down?" hint="The specific point where things get slow, get dropped, or go wrong." htmlFor="bq-breaks">
            <textarea id="bq-breaks" className="bq-input" value={a.breaksDown} onChange={(e) => setText("breaksDown", e.target.value)} placeholder="e.g. Half the leads go cold because nobody owns the chase, and we find duplicates from two people logging the same lead." />
          </Q>
          <Q label="Anything else we should know?" hint="Constraints, a system that has to stay, a deadline, something you've already tried." htmlFor="bq-else">
            <textarea id="bq-else" className="bq-input" value={a.anythingElse} onChange={(e) => setText("anythingElse", e.target.value)} placeholder="Optional, but useful." />
          </Q>
          {error && <p className="bq-err" role="alert">{error}</p>}
          <div className="bq-actions"><button type="button" className="bq-btn" onClick={() => go(1)}>Back</button><button type="button" className="bq-btn bq-primary" onClick={next2}>Continue</button></div>
        </section>
      )}

      {step === 3 && (
        <section>
          <div className="bq-grid2">
            <Q label="First name" req htmlFor="bq-fname"><input id="bq-fname" className="bq-input" type="text" autoComplete="given-name" value={a.firstName} onChange={(e) => setText("firstName", e.target.value)} /></Q>
            <Q label="Work email" req htmlFor="bq-email"><input id="bq-email" className="bq-input" type="email" autoComplete="email" value={a.email} onChange={(e) => setText("email", e.target.value)} /></Q>
          </div>
          <div className="bq-grid2">
            <Q label="Company name" req htmlFor="bq-company"><input id="bq-company" className="bq-input" type="text" autoComplete="organization" value={a.companyName} onChange={(e) => setText("companyName", e.target.value)} /></Q>
            <Q label="Website" htmlFor="bq-site"><input id="bq-site" className="bq-input" type="url" value={a.website} onChange={(e) => setText("website", e.target.value)} placeholder="yourcompany.com" /></Q>
          </div>
          {error && <p className="bq-err" role="alert">{error}</p>}
          <div className="bq-actions"><button type="button" className="bq-btn" onClick={() => go(2)}>Back</button><button type="button" className="bq-btn bq-primary" onClick={finish} disabled={submitting}>{submitting ? "Building your blueprint…" : "Generate my blueprint"}</button></div>
          <p className="bq-fine">Generated instantly, on the next screen.</p>
        </section>
      )}

      {step === 4 && result && <Result a={a} r={result} />}
    </div>
  );
}

function Q({ label, req, hint, htmlFor, children }: { label: string; req?: boolean; hint?: string; htmlFor?: string; children: React.ReactNode }) {
  const Label = htmlFor ? "label" : "span";
  return (
    <div className="bq-q">
      <Label className="bq-t" {...(htmlFor ? { htmlFor } : {})}>{label}{req && <span className="bq-req"> *</span>}</Label>
      {hint && <span className="bq-h">{hint}</span>}
      {children}
    </div>
  );
}

function Single({ opts, value, onPick }: { opts: readonly string[]; value: string; onPick: (v: string) => void }) {
  return <div className="bq-chips">{opts.map((o) => <button key={o} type="button" className="bq-chip" aria-pressed={value === o} onClick={() => onPick(o)}>{o}</button>)}</div>;
}

function Multi({ opts, values, onToggle }: { opts: readonly string[]; values: string[]; onToggle: (v: string) => void }) {
  return <div className="bq-chips">{opts.map((o) => <button key={o} type="button" className="bq-chip" aria-pressed={values.includes(o)} onClick={() => onToggle(o)}>{o}</button>)}</div>;
}

function Cards({ opts, value, onPick }: { opts: CardOption[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="bq-cards">
      {opts.map((o) => (
        <button key={o.value} type="button" className="bq-card" aria-pressed={value === o.value} onClick={() => onPick(o.value)}>
          {o.title}{o.desc && <small>{o.desc}</small>}
        </button>
      ))}
    </div>
  );
}

function SessionCard({ title, tag, intro, price, who, href, company, first }: { title: string; tag: string; intro: string; price: string; who: string; href: string; company: string; first: string }) {
  return (
    <div className="bq-offer">
      <div className="bq-ohead"><span className="bq-eyebrow">01 / Private</span><span className="bq-pill">{tag}</span></div>
      <h2>{title}</h2>
      <p className="bq-muted">{intro}</p>
      <div className="bq-pricerow"><span className="bq-price">{price}</span><span className="bq-meta"><b>2 hours</b><br />{who}</span></div>
      <ul>
        <li>A clear AI roadmap for {company}, in priority order</li>
        <li>A recommended tool stack that fits what you already run</li>
        <li>Your first system designed step by step: {first}</li>
        <li>Who should build it, how long it takes, and what it should cost</li>
        <li>A summary document of your next steps after the call</li>
      </ul>
      <a className="bq-btn bq-primary bq-block" href={href}>Book my session &middot; {price}</a>
      <p className="bq-fine">Pay securely, then pick your time. Comes off your solutions architecture if you continue within 30 days.</p>
    </div>
  );
}

function ArchCard({ company }: { company: string }) {
  return (
    <div className="bq-offer bq-alt">
      <div className="bq-ohead"><span className="bq-eyebrow">02 / If you continue</span><span className="bq-pill">Delivered in 7 business days</span></div>
      <h2>Full Solutions Architecture</h2>
      <p className="bq-muted">The complete solutions architecture for {company}.</p>
      <div className="bq-pricerow"><span className="bq-price">$2,500</span><span className="bq-meta"><b>From</b><br />Less your session fee</span></div>
      <ul>
        <li>Workflow map and AI opportunity assessment</li>
        <li>Solutions architecture for every priority system</li>
        <li>Priority matrix, investment estimate and ROI map</li>
        <li>Optional: Temitope oversees your build</li>
      </ul>
    </div>
  );
}

function Result({ a, r }: { a: QuizAnswers; r: ResultModel }) {
  const company = a.companyName.trim();
  const first = r.flows[0]?.name.toLowerCase() || "your first system";
  return (
    <section>
      <div className="bq-brand">Temitope Saliu <b>&middot;</b> The Blueprint Audit</div>
      <h1 className="bq-h1">{a.firstName.trim()}, here is your <em>first-draft architecture.</em></h1>
      <p className="bq-lede">Built from your answers. This is how we would start. In a session we refine it against how {company} really runs.</p>

      <div className="bq-eyebrow bq-sec">Where you are today</div>
      <p className="bq-today">{r.where}</p>

      <div className="bq-eyebrow bq-sec">Your biggest automation opportunities</div>
      {r.flows.map(({ name, tpl }) => (
        <div className="bq-flow" key={name}>
          <h3>{name}</h3>
          <div className="bq-sub">{tpl.sub}</div>
          <div className="bq-out"><b>Trigger</b>{tpl.trigger}</div>
          <ol>{tpl.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <div className="bq-out"><b>Outcome</b>{tpl.outcome}</div>
          <div className="bq-out"><b>Tools</b>{r.tools}</div>
        </div>
      ))}

      <div className="bq-eyebrow bq-sec">Best fit for you</div>
      <span className="bq-pill bq-gold">{r.fit}</span>
      <p className="bq-muted">{r.why}</p>

      <div className="bq-eyebrow bq-sec">What success looks like</div>
      <p className="bq-muted">{r.success}</p>

      <div className="bq-eyebrow bq-sec">What we&apos;d need to nail down with you</div>
      <ul className="bq-nail">{r.nail.map((n) => <li key={n}>{n}</li>)}</ul>

      {r.route === "company" && (
        <>
          <div className="bq-offers">
            <SessionCard title="Leadership AI Strategy Session" tag="Leadership team" intro="Two hours with you and up to three of your leaders. We design how AI fits across the organisation, then pick the first system to prove it." price="$1,500" who="You and up to 3 leaders" href={LINKS.leadershipSession} company={company} first={first} />
            <ArchCard company={company} />
          </div>
          <p className="bq-fine bq-left">Organisations your size usually continue as an advisory engagement while their own team or a partner builds. We cover that on the call.</p>
        </>
      )}
      {r.route === "founder" && (
        <>
          <div className="bq-offers">
            <SessionCard title="AI Strategy Session" tag="One-to-one" intro="We work on your real business, not a generic AI talk. You leave knowing exactly what to build first and how." price="$500" who="One-to-one with Temitope" href={LINKS.founderSession} company={company} first={first} />
            <ArchCard company={company} />
          </div>
          <a className="bq-secondary" href={LINKS.samples}>Not ready? See sample solutions</a>
        </>
      )}
      {r.route === "intensive" && (
        <>
          <div className="bq-offer bq-single">
            <span className="bq-pill bq-gold">Your next step</span>
            <h2>The Expert Framework Intensive</h2>
            <div className="bq-price">$1,599</div>
            <ul>
              <li>Six weeks live, Saturdays 2pm London</li>
              <li>Learn to design AI Operating Systems for your business and your clients</li>
              <li>Discovery, architecture, leads engine, agents and automations</li>
              <li>Capped at 12 seats</li>
            </ul>
            <a className="bq-btn bq-primary bq-block" href={LINKS.intensive}>Join the Intensive &middot; $1,599</a>
          </div>
          <a className="bq-secondary" href={LINKS.founderSession}>Want it designed for you instead? Book a Strategy Session &middot; $500</a>
        </>
      )}
      {r.route === "nurture" && (
        <div className="bq-offer bq-single">
          <span className="bq-pill bq-gold">Your next step</span>
          <h2>Start with this blueprint</h2>
          <p className="bq-muted">Save this page and build the first system on it yourself. When you&apos;re ready for an architect, the session is here.</p>
          <a className="bq-secondary" href={LINKS.founderSession}>Book a Strategy Session &middot; $500</a>
        </div>
      )}
    </section>
  );
}

const CSS = `
.bq{max-width:680px;margin:0 auto;padding:calc(var(--nav-h,72px) + 24px) 16px 96px;color:var(--text);font-family:var(--font-body);font-size:15px;line-height:1.6}
.bq-brand{font-family:var(--font-display);font-size:20px;color:var(--text-2)}
.bq-brand b{color:var(--accent);font-weight:600}
.bq-h1{font-family:var(--font-display);font-weight:500;font-size:clamp(34px,7vw,46px);line-height:1.08;margin:10px 0 12px;text-wrap:balance;color:var(--text)}
.bq-h1 em{color:var(--accent)}
.bq-lede{color:var(--text-2);max-width:60ch;margin:0}
.bq-progress{display:flex;align-items:center;gap:12px;margin:28px 0 8px;font-size:12px;color:var(--text-3)}
.bq-bar{flex:1;height:2px;background:var(--border);border-radius:2px;overflow:hidden}
.bq-bar i{display:block;height:100%;background:var(--accent);transition:width .4s ease}
.bq-q{margin-top:28px;display:flex;flex-direction:column}
.bq-t{font-weight:500;font-size:14px;color:var(--text)}
.bq-req{color:var(--accent)}
.bq-h{font-size:12px;color:var(--text-3);margin:2px 0 10px}
.bq-t+.bq-chips,.bq-t+.bq-cards,.bq-t+.bq-input{margin-top:10px}
.bq-chips{display:flex;flex-wrap:wrap;gap:8px}
.bq-chip{font:inherit;font-size:13px;background:var(--bg-1);border:1px solid var(--border);color:var(--text-2);padding:7px 12px;border-radius:6px;cursor:pointer;transition:all .15s ease}
.bq-chip:hover{color:var(--text);border-color:#3a3a3a}
.bq-chip[aria-pressed="true"]{color:var(--accent-light);border-color:var(--accent);background:var(--accent-dim)}
.bq-cards{display:grid;gap:8px}
.bq-card{font:inherit;text-align:left;background:var(--bg-1);border:1px solid var(--border);color:var(--text);padding:12px 14px;border-radius:8px;cursor:pointer}
.bq-card small{display:block;color:var(--text-3);font-size:12px;margin-top:2px}
.bq-card[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-dim)}
.bq-input{width:100%;font:inherit;font-size:14px;background:var(--bg-1);border:1px solid var(--border);color:var(--text);padding:11px 13px;border-radius:6px}
textarea.bq-input{min-height:84px;resize:vertical}
.bq-input::placeholder{color:var(--text-3)}
.bq-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:520px){.bq-grid2{grid-template-columns:1fr}}
.bq-note{margin-top:10px;background:var(--bg-2);border:1px solid var(--border);border-left:2px solid var(--accent);padding:12px 14px;border-radius:6px;font-size:13px;color:var(--text-2)}
.bq-actions{display:flex;gap:10px;margin-top:32px}
.bq-btn{font:inherit;font-weight:600;font-size:14px;border-radius:6px;padding:13px 18px;cursor:pointer;border:1px solid var(--border);background:var(--bg-2);color:var(--text);text-decoration:none;text-align:center}
.bq-btn:disabled{opacity:.6;cursor:wait}
.bq-primary{flex:1;background:var(--accent);border-color:var(--accent);color:#14110b}
.bq-primary:hover{background:var(--accent-light)}
.bq-block{display:block;width:100%;margin-top:8px}
.bq-fine{font-size:12px;color:var(--text-3);text-align:center;margin-top:10px}
.bq-left{text-align:left;margin-top:14px}
.bq-err{color:var(--red,#C05252);font-size:13px;margin-top:16px}
.bq-eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.bq-sec{margin:34px 0 8px}
.bq-today{font-family:var(--font-display);font-size:22px;line-height:1.4;margin:0}
.bq-muted{color:var(--text-2)}
.bq-flow{background:var(--bg-1);border:1px solid var(--border);border-radius:10px;padding:16px 18px;margin-top:12px}
.bq-flow h3{margin:0;font-size:16px;font-weight:600;color:var(--text);font-family:var(--font-body)}
.bq-sub{font-size:12px;color:var(--text-3);margin:2px 0 10px}
.bq-flow ol{margin:8px 0;padding-left:20px;font-size:13px;color:var(--text-2)}
.bq-out{font-size:13px;margin-top:6px;color:var(--text)}
.bq-out b{color:var(--accent);font-weight:500;font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin-right:6px}
.bq-pill{display:inline-block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:99px;border:1px solid var(--border);color:var(--text-2)}
.bq-gold{color:var(--accent);border-color:rgba(200,169,110,.4);background:var(--accent-dim)}
.bq-nail{color:var(--text-2);font-size:14px;padding-left:18px;margin:0}
.bq-offers{display:grid;gap:16px;margin-top:36px}
.bq-offer{border:1px solid rgba(200,169,110,.45);background:linear-gradient(180deg,rgba(200,169,110,.08),rgba(200,169,110,.02));border-radius:12px;padding:22px}
.bq-single{margin-top:36px}
.bq-alt{border-color:var(--border);background:var(--bg-1)}
.bq-offer h2{font-family:var(--font-display);font-weight:500;font-size:30px;margin:14px 0 6px;line-height:1.15;color:var(--text)}
.bq-offer ul{padding-left:18px;color:var(--text-2);font-size:14px}
.bq-ohead{display:flex;justify-content:space-between;align-items:center;gap:10px}
.bq-pricerow{display:flex;align-items:center;gap:16px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.bq-price{font-family:var(--font-display);font-size:40px;color:var(--accent)}
.bq-meta{border-left:1px solid var(--border);padding-left:16px;font-size:13px;color:var(--text-2);line-height:1.4}
.bq-meta b{color:var(--text);font-weight:500}
.bq-secondary{display:block;text-align:center;margin-top:14px;font-size:13px;color:var(--text-2)}
.bq button:focus-visible,.bq a:focus-visible,.bq-input:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.bq *{transition:none!important}}
`;
