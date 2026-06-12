'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QUIZ_QUESTIONS, type ArchetypeKey } from '@/lib/archetypes';
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
      const ARCHETYPE_PRIORITY: ArchetypeKey[] = ['H', 'C', 'S', 'G'];
      const tied = ARCHETYPE_PRIORITY.filter(k => newScores[k] === max);
      const arch = tied[0];
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
        <div id="landing" className="landing">
          <div className="landing-center">
            <div className="landing-content">
              <div className="eyebrow eyebrow--teal">Free Archetype Quiz</div>
              <h1 className="hero-title">
                Which part of AI was<br />made for <em style={{ color: 'var(--coral)' }}>you?</em>
              </h1>
              <div className="hero-subtitle">Based on DISC, Myers-Briggs & Personality Science.</div>
              <div className="social-proof">
                <span className="dot dot--teal"></span>
                Join 2,000+ people who found their AI path
              </div>
              <p className="hero-desc">
                Stop trying to learn all of AI. Discover which corner of the AI world fits your inherent skills, personality and values — and get a clear path forward.
              </p>
              <button className="btn-hero" onClick={startQuiz} aria-label="Start AI archetype quiz">
                Find my AI archetype
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <div className="feat-pills">
                {['10 questions', '4 archetypes', 'Personalised guide', 'Free to take'].map(t => (
                  <span key={t} className="feat-pill">
                    <span className="dot dot--gold dot--sm"></span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'quiz' && (
        <div id="quiz" className="quiz-section">
          <div className="container container--narrow">
            <p className="quiz-hint">Answer honestly. There are no wrong archetypes.</p>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="quiz-counter">
              Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
            </div>
            <div className="quiz-card">
              <div className="quiz-q-label">Question {currentQ + 1}</div>
              <div className="quiz-q-text">{q.q}</div>
              <div className="quiz-nudge">{q.nudge}</div>
              <div className="quiz-options">
                {q.opts.map((o, i) => (
                  <button
                    key={i}
                    className={`quiz-option${selected === o.a ? ' quiz-option--selected' : ''}`}
                    onClick={() => pick(o.a as ArchetypeKey)}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${o.t}`}
                  >
                    <span className="quiz-option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{o.t}</span>
                  </button>
                ))}
              </div>
              <div className="quiz-actions">
                <button
                  className="quiz-next"
                  onClick={nextQ}
                  disabled={!selected}
                  aria-label={isLast ? 'See my archetype results' : 'Go to next question'}
                >
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
