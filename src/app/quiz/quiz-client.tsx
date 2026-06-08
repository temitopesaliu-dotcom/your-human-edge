'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS, type ArchetypeKey } from '@/lib/archetypes';
import { SITE_DISPLAY } from '@/lib/site';
import Link from 'next/link';

type Scores = Record<ArchetypeKey, number>;

export default function QuizClient() {
  const router = useRouter();
  const [phase, setPhase] = useState<'landing' | 'quiz'>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Scores>({ H: 0, C: 0, S: 0, G: 0 });
  const [selected, setSelected] = useState<ArchetypeKey | null>(null);

  function startQuiz() {
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    track('quiz_start');
  }

  function pick(a: ArchetypeKey) {
    setSelected(a);
    track('quiz_question_answered', { question: currentQ + 1, answer: a });
  }

  function nextQ() {
    if (!selected) return;
    const newScores = { ...scores, [selected]: scores[selected] + 1 };
    setScores(newScores);
    const nextIdx = currentQ + 1;
    if (nextIdx < QUIZ_QUESTIONS.length) {
      setCurrentQ(nextIdx);
      setSelected(null);
    } else {
      const max = Math.max(...Object.values(newScores));
      const arch = (Object.keys(newScores) as ArchetypeKey[]).filter(k => newScores[k] === max).sort()[0];
      track('quiz_complete', { archetype: arch });
      router.push(`/gate?arch=${arch}`);
    }
  }

  const q = QUIZ_QUESTIONS[currentQ];
  const pct = ((currentQ + 1) / QUIZ_QUESTIONS.length) * 100;
  const isLast = currentQ === QUIZ_QUESTIONS.length - 1;

  return (
    <div className="home-page">
      <nav>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
        <ul className="nav-links">
          <li><Link href="/quiz">Home</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <button className="nav-cta" onClick={startQuiz} aria-label="Start archetype quiz">Find my archetype</button>
      </nav>

      {phase === 'landing' && (
        <div id="landing" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '62px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '52px 24px 72px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <div className="eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--teal)', fontWeight: 500, marginBottom: '22px', padding: '5px 16px', border: '1px solid var(--teal)', borderRadius: '40px' }}>
                Free Archetype Quiz
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem,7vw,4rem)', fontWeight: 400, lineHeight: 1.1, color: 'var(--ink)', marginBottom: '16px' }}>
                Which part of AI was<br />made for <em style={{ color: 'var(--coral)', fontStyle: 'italic' }}>you?</em>
              </h1>
              <div style={{ fontSize: '.84rem', color: 'var(--soft)', marginBottom: '8px', fontStyle: 'italic' }}>Based on DISC, Myers-Briggs & Personality Science.</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '40px', padding: '5px 15px', fontSize: '.78rem', color: 'var(--soft)', marginBottom: '30px' }}>
                <span style={{ width: 6, height: 6, background: 'var(--teal)', borderRadius: '50%', flexShrink: 0 }}></span>
                Join 2,000+ people who found their AI path
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--soft)', maxWidth: '440px', margin: '0 auto 32px', lineHeight: 1.8 }}>
                Stop trying to learn all of AI. Discover which corner of the AI world fits your inherent skills, personality and values — and get a clear path forward.
              </p>
              <button onClick={startQuiz} aria-label="Start AI archetype quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--ink)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 500, padding: '15px 34px', borderRadius: '50px', border: 'none', cursor: 'pointer', transition: 'transform .2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                Find my AI archetype
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '22px', flexWrap: 'wrap' }}>
                {['10 questions', '4 archetypes', 'Personalised guide', 'Free to take'].map(t => (
                  <span key={t} style={{ fontSize: '.76rem', color: 'var(--soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }}></span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'quiz' && (
        <div id="quiz" style={{ padding: '52px 0 80px', paddingTop: '114px' }}>
          <div className="container" style={{ maxWidth: '660px' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--soft)', fontStyle: 'italic' }}>Answer honestly. There are no wrong archetypes.</p>
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: '40px', height: '4px', margin: '0 auto 8px', maxWidth: '360px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--coral)', borderRadius: '40px', width: `${pct}%`, transition: 'width .4s cubic-bezier(.4,0,.2,1)' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: '.74rem', color: 'var(--soft)', marginBottom: '28px', letterSpacing: '.04em' }}>
              Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--border)', padding: '34px 30px', boxShadow: '0 2px 20px rgba(26,16,64,.07)', animation: 'fadeSlide .35s ease' }}>
              <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}`}</style>
              <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--coral)', fontWeight: 500, marginBottom: '10px' }}>Question {currentQ + 1}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.2rem,3vw,1.5rem)', fontWeight: 500, lineHeight: 1.35, color: 'var(--ink)', marginBottom: '7px' }}>{q.q}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--soft)', fontStyle: 'italic', marginBottom: '22px', opacity: .85 }}>{q.nudge}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.opts.map((o, i) => (
                  <button key={i} onClick={() => pick(o.a as ArchetypeKey)} aria-label={`Option ${String.fromCharCode(65 + i)}: ${o.t}`}
                    style={{
                      background: selected === o.a ? '#fdf0ea' : 'var(--warm)',
                      border: `1.5px solid ${selected === o.a ? 'var(--coral)' : 'var(--border)'}`,
                      borderRadius: '10px', padding: '13px 16px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '11px',
                      fontSize: '.92rem', color: 'var(--ink)', textAlign: 'left',
                      fontFamily: "'DM Sans', sans-serif", width: '100%', transition: 'all .18s',
                    }}
                    onFocus={(e) => e.currentTarget.style.outline = '2px solid var(--coral)'}
                    onBlur={(e) => e.currentTarget.style.outline = 'none'}>
                    <span style={{
                      width: 25, height: 25, borderRadius: '50%',
                      background: selected === o.a ? 'var(--coral)' : 'var(--paper)',
                      border: `1px solid ${selected === o.a ? 'var(--coral)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.72rem', fontWeight: 500,
                      color: selected === o.a ? '#fff' : 'var(--soft)', flexShrink: 0,
                    }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{o.t}</span>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={nextQ} disabled={!selected} aria-label={isLast ? 'See my archetype results' : 'Go to next question'}
                  style={{
                    background: 'var(--ink)', color: '#fff', border: 'none',
                    padding: '11px 26px', borderRadius: '40px', cursor: selected ? 'pointer' : 'not-allowed',
                    fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', fontWeight: 500,
                    opacity: selected ? 1 : .35, transition: 'all .2s',
                  }}
                  onFocus={(e) => selected && (e.currentTarget.style.outline = '2px solid var(--coral)')}
                  onBlur={(e) => e.currentTarget.style.outline = 'none'}>
                  {isLast ? 'See my archetype →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="footer-brand">human<span>+</span>ai</div>
        <ul className="f-links">
          <li><Link href="/quiz">Take the quiz</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: .25 }}>© 2026</div>
      </footer>
      <TrackingScript />
    </div>
  );
}

function track(event: string, data?: Record<string, unknown>) {
  try {
    const payload = JSON.stringify({ event, data, page: '/quiz', ts: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true });
    }
  } catch {}
}

function TrackingScript() {
  useEffect(() => { track('page_view'); }, []);
  return null;
}
