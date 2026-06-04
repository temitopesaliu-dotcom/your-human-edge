'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE_DISPLAY } from '@/lib/site';

const STYLES = `
  .cs-root{font-family:'DM Sans',sans-serif;background:#faf8f4;color:#1a1040;min-height:100vh;display:flex;flex-direction:column}
  .cs-nav{background:rgba(26,16,64,.96);backdrop-filter:blur(14px);padding:0 32px;display:flex;align-items:center;justify-content:space-between;height:62px}
  .cs-nav-logo{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:500;color:rgba(255,255,255,.9);letter-spacing:.06em;text-decoration:none}
  .cs-nav-logo span{color:#d85a30}
  .cs-nav-back{display:inline-flex;align-items:center;gap:6px;font-size:.8rem;color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
  .cs-nav-back:hover{color:#fff}
  .cs-hero{background:linear-gradient(135deg,#1a1040 0%,#2d1b6e 100%);padding:100px 28px 80px;text-align:center;position:relative;overflow:hidden}
  .cs-hero::before{content:'';position:absolute;top:-40%;left:50%;transform:translateX(-50%);width:700px;height:700px;border-radius:50%;background:radial-gradient(ellipse,rgba(83,74,183,.25),transparent 70%)}
  .cs-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:#c8940a;font-weight:500;margin-bottom:20px;border:1px solid rgba(200,148,10,.3);padding:5px 16px;border-radius:40px;position:relative;z-index:1}
  .cs-eyebrow .dot{width:6px;height:6px;background:#c8940a;border-radius:50%;animation:cs-pulse 2s infinite}
  @keyframes cs-pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .cs-hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,6vw,3.6rem);font-weight:400;color:#fff;line-height:1.1;margin-bottom:18px;position:relative;z-index:1}
  .cs-hero h1 em{color:#c8940a;font-style:italic}
  .cs-hero p{font-size:1rem;color:rgba(255,255,255,.65);max-width:480px;margin:0 auto 14px;line-height:1.8;position:relative;z-index:1}
  .cs-counter{display:inline-block;background:rgba(200,148,10,.12);border:1px solid rgba(200,148,10,.25);border-radius:40px;padding:6px 18px;font-size:.78rem;color:#c8940a;margin-top:10px;letter-spacing:.03em;position:relative;z-index:1}
  .cs-form-section{max-width:520px;margin:0 auto;padding:64px 28px 80px;flex:1;width:100%}
  .cs-form-card{background:#fff;border-radius:16px;border:1px solid #e2dbd0;padding:44px 40px;box-shadow:0 4px 40px rgba(26,16,64,.08)}
  .cs-form-card h2{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:500;margin-bottom:8px;color:#1a1040}
  .cs-form-card .lead{font-size:.9rem;color:#4a3f6b;line-height:1.7;margin-bottom:24px}
  .cs-included{list-style:none;margin:0 0 28px;background:#f2ede6;border-radius:10px;padding:18px 20px}
  .cs-included li{font-size:.88rem;color:#4a3f6b;padding:6px 0;display:flex;align-items:flex-start;gap:9px;line-height:1.5}
  .cs-included li::before{content:'✓';color:#0f6e56;font-weight:500;flex-shrink:0}
  .cs-form{display:flex;flex-direction:column;gap:10px}
  .cs-form input{width:100%;padding:13px 15px;border-radius:10px;border:1.5px solid #e2dbd0;font-family:'DM Sans',sans-serif;font-size:.92rem;color:#1a1040;background:#faf8f4;outline:none;transition:border-color .2s}
  .cs-form input:focus{border-color:#534ab7}
  .cs-form button{width:100%;padding:14px;background:#0f6e56;color:#fff;border:none;border-radius:40px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:500;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
  .cs-form button:hover:not(:disabled){background:#1a1040;transform:translateY(-1px)}
  .cs-form button:disabled{opacity:.6;cursor:not-allowed}
  .cs-form-note{font-size:.72rem;color:#4a3f6b;margin-top:8px;opacity:.6;text-align:center}
  .cs-error{color:#c0392b;font-size:.8rem;margin-top:6px;text-align:center}
  .cs-success{text-align:center;padding:20px 0}
  .cs-success-icon{font-size:2.5rem;margin-bottom:16px;color:#0f6e56}
  .cs-success h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:500;margin-bottom:10px}
  .cs-success p{font-size:.92rem;color:#4a3f6b;line-height:1.7}
  .cs-back{display:inline-flex;align-items:center;gap:6px;margin-top:24px;font-size:.88rem;color:#0f6e56;text-decoration:none;font-weight:500}
  .cs-back:hover{text-decoration:underline}
  .cs-foot{background:#1a1040;color:rgba(255,255,255,.4);padding:20px 32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:auto}
  .cs-foot strong{color:rgba(255,255,255,.8);font-family:'Cormorant Garamond',serif;font-size:12px}
  .cs-foot ul{display:flex;gap:20px;list-style:none}
  .cs-foot a{font-size:.72rem;color:rgba(255,255,255,.3);text-decoration:none;letter-spacing:.04em;transition:color .2s}
  .cs-foot a:hover{color:rgba(255,255,255,.7)}
  @media(max-width:520px){.cs-form-card{padding:32px 24px}.cs-hero{padding:80px 20px 60px}}
`;

export default function ComingSoonClient() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedEmail, setConfirmedEmail] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    const form = e.currentTarget;
    const name = (new FormData(form).get('name') as string || '').trim();
    const email = ((new FormData(form).get('email') as string || '').trim()).toLowerCase();

    if (!name || !email) {
      setError('Please fill in both fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setConfirmedEmail(email);
      setSubmitted(true);
    } catch (err) {
      setSubmitting(false);
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div className="cs-root">
        <nav className="cs-nav">
          <Link href="/" className="cs-nav-logo">human<span>+</span>ai</Link>
          <Link href="/quiz" className="cs-nav-back">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to quiz
          </Link>
        </nav>

        <div className="cs-hero">
          <div className="cs-eyebrow"><span className="dot" />Coming soon</div>
          <h1>The place where your<br />archetype meets <em>others like you.</em></h1>
          <p>Monthly live sessions, archetype-specific tools, peer groups, and a direct line to the human + AI edge — curated for how you actually think.</p>
          <div className="cs-counter">Waitlist open · Limited founding spots available</div>
        </div>

        <div className="cs-form-section">
          <div className="cs-form-card">
            {!submitted ? (
              <>
                <h2>Reserve your founding spot.</h2>
                <p className="lead">Founding members get early access, locked-in pricing, and a seat in the archetype cohort that fits them. Drop your details below.</p>

                <ul className="cs-included">
                  <li>Monthly live sessions with Temitope on AI and human psychology</li>
                  <li>Archetype peer groups — work alongside people who think like you</li>
                  <li>Curated AI tool recommendations, updated monthly by archetype</li>
                  <li>Early access to all new playbooks, courses and digital products</li>
                  <li>Community space to share wins, ask questions and get unstuck</li>
                </ul>

                <form className="cs-form" onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Your first name" required autoComplete="given-name" aria-label="First name" />
                  <input type="email" name="email" placeholder="Your email address" required autoComplete="email" aria-label="Email address" />
                  <button type="submit" disabled={submitting} aria-label="Reserve waitlist spot">
                    {submitting ? 'Reserving your spot…' : 'Reserve my spot →'}
                  </button>
                </form>
                {error && <div className="cs-error">{error}</div>}
                <p className="cs-form-note">No spam, ever. We&apos;ll email you when the doors open.</p>
              </>
            ) : (
              <div className="cs-success">
                <div className="cs-success-icon">✓</div>
                <h3>You&apos;re on the list.</h3>
                <p>
                  We&apos;ll email <strong>{confirmedEmail}</strong> the moment founding spots open.<br />
                  In the meantime — go back and explore your full archetype results.
                </p>
                <Link href="/" className="cs-back">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  Back to my archetype
                </Link>
              </div>
            )}
          </div>
        </div>

        <footer className="cs-foot">
          <div><strong>{SITE_DISPLAY}</strong> &nbsp;·&nbsp; <span style={{ fontStyle: 'italic', opacity: .6 }}>AI x Human Psychology</span></div>
          <ul>
            <li><Link href="/quiz">Take the quiz</Link></li>
            <li><Link href="/paths">50 AI Paths</Link></li>
          </ul>
          <div style={{ fontSize: '.7rem', opacity: .25 }}>© 2025 {SITE_DISPLAY}</div>
        </footer>
      </div>
    </>
  );
}
