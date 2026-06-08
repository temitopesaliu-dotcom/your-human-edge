'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SITE_DISPLAY } from '@/lib/site';

type Resource = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  badge?: string;
  category: 'individual' | 'company';
};

const RESOURCES: Resource[] = [
  {
    id: 'paths',
    icon: '',
    title: '50 AI Career Paths',
    description:
      'The complete directory of 50 AI career paths across creative, human-centered, business, technical and niche roles. Each path includes upskill steps, specific tools, and monetisation strategies.',
    href: '/paths',
    cta: 'Access the paths →',
    badge: 'Most popular',
    category: 'individual',
  },
];

const CATEGORIES = [
  {
    key: 'individual' as const,
    label: 'For Individuals',
    description: 'Career paths, frameworks and practical tools for finding your edge in the AI economy.',
    color: 'var(--purple)',
    colorSolid: '#534ab7',
    bgColor: 'rgba(83, 74, 183, 0.08)',
    borderColor: 'rgba(83, 74, 183, 0.15)',
    lightBg: 'rgba(83, 74, 183, 0.04)',
  },
  {
    key: 'company' as const,
    label: 'For Companies',
    description: 'Team frameworks, workshops and organisational resources for building AI-ready teams.',
    color: 'var(--teal)',
    colorSolid: '#0f6e56',
    bgColor: 'rgba(15, 110, 86, 0.08)',
    borderColor: 'rgba(15, 110, 86, 0.15)',
    lightBg: 'rgba(15, 110, 86, 0.04)',
  },
];

const VALUE_BULLETS = [
  'Career maps across 5 personality categories',
  'Recommended tools and platforms per path',
  'Monetisation strategies and income ranges',
];

function track_event(event: string, data?: Record<string, unknown>) {
  try {
    const payload = JSON.stringify({
      event,
      data,
      page: '/resources',
      ts: Date.now(),
    });
    if (navigator?.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
    }
  } catch {}
}

export default function ResourcesClient() {
  const [activeTab, setActiveTab] = useState<'individual' | 'company'>('individual');

  useEffect(() => {
    track_event('resources_page_view');
  }, []);

  const filtered = RESOURCES.filter((r) => r.category === activeTab);
  const activeCategory = CATEGORIES.find((c) => c.key === activeTab)!;
  const featured = filtered.length > 0 ? filtered[0] : null;
  const remaining = filtered.slice(1);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: 'var(--warm)',
        color: 'var(--ink)',
        minHeight: '100vh',
        paddingBottom: '88px',
      }}
    >
      <style>{`
        .rb-link { text-decoration: none; color: inherit; display: block; }
        @keyframes rb-fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .rb-fade { animation: rb-fade-up 0.4s ease both; }
        @media (max-width: 640px) {
          .rb-cat-grid { grid-template-columns: 1fr !important; }
          .rb-feat-grid { grid-template-columns: 1fr !important; }
          .rb-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <Link href="/quiz" className="nav-logo">
          human<span>+</span>ai
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/quiz">Home</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
        <Link href="/quiz" className="nav-cta">
          Find my archetype
        </Link>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1040 0%, #2d1b6e 100%)',
          padding: '112px 28px 52px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(83,74,183,.25), transparent 70%)',
          }}
          aria-hidden
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '.68rem',
              letterSpacing: '.2em',
              textTransform: 'uppercase',
              color: '#c8940a',
              fontWeight: 500,
              marginBottom: 20,
              border: '1px solid rgba(200,148,10,.25)',
              padding: '5px 16px',
              borderRadius: 40,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#c8940a',
                display: 'inline-block',
              }}
            />
            Free resource library
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 7vw, 4rem)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Explore guides, frameworks<br />
            and tools for thriving <em style={{ color: '#c8940a', fontStyle: 'italic' }}>with AI.</em>
          </h1>

          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,.6)',
              maxWidth: 500,
              margin: '0 auto 36px',
              lineHeight: 1.8,
            }}
          >
            Free resources curated for individuals and organisations navigating the AI era — built around how you actually think and work.
          </p>

          {/* ── Category selector cards ── */}
          <div
            className="rb-cat-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              maxWidth: 560,
              margin: '0 auto 28px',
              textAlign: 'left',
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(cat.key);
                    track_event('resources_category_switch', { category: cat.key });
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    padding: '20px 22px',
                    borderRadius: 16,
                    border: `1.5px solid ${isActive ? cat.color : 'rgba(255,255,255,.1)'}`,
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    textAlign: 'left',
                    background: isActive
                      ? `rgba(255,255,255,.08)`
                      : 'rgba(255,255,255,.03)',
                    backdropFilter: isActive ? 'blur(4px)' : 'none',
                    transition: 'all 250ms ease, border-color 250ms ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,.06)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: isActive
                          ? cat.key === 'individual'
                            ? 'radial-gradient(ellipse at 20% 50%, rgba(83,74,183,.12), transparent 70%)'
                            : 'radial-gradient(ellipse at 20% 50%, rgba(15,110,86,.12), transparent 70%)'
                          : 'none',
                        pointerEvents: 'none',
                      }}
                      aria-hidden
                    />
                  )}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.1rem',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
                        transition: 'color 250ms ease',
                      }}
                    >
                      {cat.label}
                    </span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '.75rem',
                        fontWeight: 600,
                        color: isActive ? '#fff' : cat.color,
                        background: isActive
                          ? cat.color
                          : cat.bgColor,
                        borderRadius: 40,
                        padding: '2px 10px',
                        transition: 'color 250ms ease, background 250ms ease',
                        border: isActive ? 'none' : `1px solid ${cat.borderColor}`,
                      }}
                    >
                      {RESOURCES.filter((r) => r.category === cat.key).length}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '.76rem',
                      color: isActive ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.35)',
                      lineHeight: 1.45,
                      position: 'relative',
                      zIndex: 1,
                      transition: 'color 250ms ease',
                    }}
                  >
                    {cat.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '.78rem',
              color: 'rgba(255,255,255,.4)',
              letterSpacing: '.04em',
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: activeCategory.color,
                display: 'inline-block',
              }}
            />
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''} available
            {filtered.length > 0 && activeTab === 'individual' && ' — 1 featured below'}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CONTENT AREA
          ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(83,74,183,.04) 0%, transparent 20%)',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: '44px 28px 80px',
          }}
        >
          {/* ───────────────────────────────────────────────────────
              FEATURED RESOURCE
              ─────────────────────────────────────────────────────── */}
          {featured && (
            <div className="rb-fade" style={{ animationDelay: '0.1s' }}>
              <Link
                href={featured.href}
                className="rb-link"
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  padding: '44px 44px 40px',
                  boxShadow: '0 4px 28px rgba(26,16,64,.06)',
                  transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 24px 60px rgba(26,16,64,.12)';
                  e.currentTarget.style.borderColor = activeCategory.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 28px rgba(26,16,64,.06)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${activeCategory.colorSolid}, rgba(200,148,10,.3))`,
                  }}
                  aria-hidden
                />

                {featured.badge && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      fontSize: '.66rem',
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      color: 'var(--coral)',
                      background: 'rgba(216,90,48,.08)',
                      padding: '5px 13px',
                      borderRadius: 40,
                      marginBottom: 20,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: 'var(--coral)',
                        display: 'inline-block',
                      }}
                    />
                    {featured.badge}
                  </span>
                )}

                <div
                  className="rb-feat-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 600,
                        color: 'var(--ink)',
                        lineHeight: 1.15,
                        marginBottom: 12,
                      }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      style={{
                        fontSize: '.95rem',
                        color: 'var(--soft)',
                        lineHeight: 1.8,
                        maxWidth: '42em',
                        marginBottom: 22,
                      }}
                    >
                      {featured.description}
                    </p>

                    <ul
                      style={{
                        listStyle: 'none',
                        margin: 0,
                        padding: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                        marginBottom: 28,
                      }}
                    >
                      {VALUE_BULLETS.map((b, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontSize: '.86rem',
                            color: 'var(--soft)',
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: activeCategory.color,
                              flexShrink: 0,
                            }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'var(--ink)',
                        color: '#fff',
                        fontSize: '.9rem',
                        fontWeight: 500,
                        padding: '12px 26px',
                        borderRadius: 40,
                        transition: 'background 250ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = activeCategory.colorSolid)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ink)')}
                    >
                      {featured.cta}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* ───────────────────────────────────────────────────────
              RESOURCE COLLECTION
              ─────────────────────────────────────────────────────── */}
          <div className="rb-fade" style={{ animationDelay: '0.2s' }}>
            <div
              style={{
                marginTop: featured ? 52 : 0,
                marginBottom: 24,
                borderTop: '1px solid var(--border)',
                paddingTop: 32,
              }}
            >
              <div
                style={{
                  fontSize: '.68rem',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: activeCategory.color,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Resource collection
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                  marginBottom: 6,
                }}
              >
                {activeCategory.label}
              </h2>
              <p
                style={{
                  fontSize: '.88rem',
                  color: 'var(--soft)',
                  lineHeight: 1.7,
                  maxWidth: '36em',
                }}
              >
                {activeCategory.description}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div
                style={{
                  background: '#fff',
                  border: '1px dashed var(--border)',
                  borderRadius: 24,
                  padding: '56px 32px',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    color: 'var(--soft)',
                    marginBottom: 8,
                  }}
                >
                  More resources coming soon
                </h3>
                <p
                  style={{
                    fontSize: '.88rem',
                    color: 'var(--soft)',
                    opacity: 0.6,
                    maxWidth: 380,
                    margin: '0 auto',
                    lineHeight: 1.7,
                  }}
                >
                  We&apos;re building new guides and tools for this category. Check back soon or join the waitlist to get notified.
                </p>
              </div>
            ) : (
              <>
                {remaining.length > 0 ? (
                  <div
                    className="rb-grid-2"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 16,
                    }}
                  >
                    {remaining.map((r) => (
                      <Link
                        key={r.id}
                        href={r.href}
                        className="rb-link"
                        style={{
                          background: '#fff',
                          border: '1px solid var(--border)',
                          borderRadius: 24,
                          padding: '32px 32px 28px',
                          boxShadow: '0 2px 16px rgba(26,16,64,.04)',
                          transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease',
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-6px)';
                          e.currentTarget.style.boxShadow = '0 24px 60px rgba(26,16,64,.12)';
                          e.currentTarget.style.borderColor = activeCategory.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,16,64,.04)';
                          e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                      >
                        {r.badge && (
                          <span
                            style={{
                              position: 'absolute',
                              top: 14,
                              right: 14,
                              fontSize: '.64rem',
                              letterSpacing: '.08em',
                              textTransform: 'uppercase',
                              fontWeight: 600,
                              color: '#fff',
                              background: 'var(--coral)',
                              padding: '3px 11px',
                              borderRadius: 40,
                            }}
                          >
                            {r.badge}
                          </span>
                        )}

                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: 'var(--ink)',
                            lineHeight: 1.2,
                            marginBottom: 8,
                          }}
                        >
                          {r.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '.84rem',
                            color: 'var(--soft)',
                            lineHeight: 1.7,
                            marginBottom: 'auto',
                            flex: 1,
                          }}
                        >
                          {r.description}
                        </p>

                        <div
                          style={{
                            marginTop: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: '.84rem',
                            fontWeight: 500,
                            color: 'var(--ink)',
                            transition: 'color 250ms ease',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = activeCategory.colorSolid)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                        >
                          {r.cta}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  featured && (
                    <div
                      style={{
                        background: 'var(--paper)',
                        border: '1px dashed var(--border)',
                        borderRadius: 20,
                        padding: '32px 28px',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '.85rem',
                          color: 'var(--soft)',
                          lineHeight: 1.7,
                          opacity: 0.7,
                        }}
                      >
                        More resources for this category are in development. Stay tuned — new resources are added regularly.
                      </p>
                    </div>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div>
          <strong>{SITE_DISPLAY}</strong> &nbsp;·&nbsp;{' '}
          <span style={{ fontStyle: 'italic', opacity: 0.6 }}>
            AI x Human Psychology
          </span>
        </div>
        <ul className="f-links">
          <li>
            <Link href="/quiz">Take the quiz</Link>
          </li>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: 0.25 }}>
          © 2026 {SITE_DISPLAY}
        </div>
      </footer>
    </div>
  );
}
