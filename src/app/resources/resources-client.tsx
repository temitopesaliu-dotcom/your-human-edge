'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';

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
  {
    id: 'b2b-prompt',
    icon: '',
    title: 'B2B Lead Acquisition Prompt',
    description:
      'A master prompt that builds a complete, tailored 7-stage lead acquisition playbook for any B2B company. Paste into any AI assistant, fill in 8 fields, and get an operational playbook in under 2 minutes.',
    href: '/resources/b2b-lead-acquisition-prompt',
    cta: 'Get the prompt →',
    badge: 'New',
    category: 'company',
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
    ghost: 'rgba(83,74,183,.15)',
  },
  {
    key: 'company' as const,
    label: 'For Companies',
    description: 'Team frameworks, workshops and organisational resources for building AI-ready teams.',
    color: 'var(--teal)',
    colorSolid: '#0f6e56',
    bgColor: 'rgba(15, 110, 86, 0.08)',
    borderColor: 'rgba(15, 110, 86, 0.15)',
    ghost: 'rgba(15,110,86,.15)',
  },
];

const VALUE_BULLETS = [
  'Career maps across 5 personality categories',
  'Recommended tools and platforms per path',
  'Monetisation strategies and income ranges',
];


export default function ResourcesClient() {
  const [activeTab, setActiveTab] = useState<'individual' | 'company'>('individual');

  useEffect(() => {
    track('resources_page_view', undefined, '/resources');
  }, []);

  const filtered = RESOURCES.filter((r) => r.category === activeTab);
  const activeCategory = CATEGORIES.find((c) => c.key === activeTab)!;
  const featured = filtered.length > 0 ? filtered[0] : null;
  const remaining = filtered.slice(1);

  const accentVars = {
    '--accent': activeCategory.color,
    '--accent-solid': activeCategory.colorSolid,
    '--accent-bg': activeCategory.bgColor,
    '--accent-border': activeCategory.borderColor,
    '--accent-ghost': activeCategory.ghost,
  } as React.CSSProperties;

  return (
    <div className="rb-page" style={accentVars}>
      {/* ── NAV ── */}
      <nav>
        <Link href="/quiz" className="nav-logo">Your Human Edge in the AI Era</Link>
        <ul className="nav-links">
          <li><Link href="/quiz">Home</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <Link href="/quiz" className="nav-cta">Find my archetype</Link>
      </nav>

      {/* ═══ HERO ═══ */}
      <div className="rb-hero">
        <div className="rb-hero-glow" aria-hidden />
        <div className="rb-hero-inner">
          <div className="eyebrow eyebrow--gold" style={{ marginBottom: 20, borderColor: 'rgba(200,148,10,.25)' }}>Free resource library</div>
          <h1 className="rb-hero-title">
            Explore guides, frameworks and tools for thriving{' '}
            <em style={{ color: '#c8940a', fontStyle: 'italic' }}>with AI.</em>
          </h1>
          <p className="rb-hero-desc">
            Free resources curated for individuals and organisations navigating the AI era — built around how you actually think and work.
          </p>

          {/* ── Category selector cards ── */}
          <div className="rb-cat-grid">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`rb-cat-card${isActive ? ' rb-cat-card--active' : ''}`}
                  style={{ '--accent': cat.color, '--accent-ghost': cat.ghost } as React.CSSProperties}
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveTab(cat.key);
                    track('resources_category_switch', { category: cat.key }, '/resources');
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute', inset: 0,
                        background: cat.key === 'individual'
                          ? 'radial-gradient(ellipse at 20% 50%, rgba(83,74,183,.12), transparent 70%)'
                          : 'radial-gradient(ellipse at 20% 50%, rgba(15,110,86,.12), transparent 70%)',
                        pointerEvents: 'none',
                      }}
                      aria-hidden
                    />
                  )}
                  <div className="rb-cat-card-header">
                    <span className="rb-cat-card-label">{cat.label}</span>
                    <span
                      className="rb-cat-card-count"
                      aria-hidden
                    >
                      {RESOURCES.filter((r) => r.category === cat.key).length}
                    </span>
                  </div>
                  <span className="rb-cat-desc">{cat.description}</span>
                </button>
              );
            })}
          </div>

          <div className="rb-resource-count">
            <span className="dot dot--sm" style={{ background: activeCategory.color }} aria-hidden />
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''} available
            {filtered.length > 0 && activeTab === 'individual' && ' — 1 featured below'}
          </div>
        </div>
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      <div className="rb-content-bg">
        <div className="rb-content-pad">
          {/* ── FEATURED RESOURCE ── */}
          {featured && (
            <div className="rb-fade" style={{ animationDelay: '0.1s' }}>
              <div className="rb-featured-card">
                <div
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                    background: `linear-gradient(90deg, ${activeCategory.colorSolid}, rgba(200,148,10,.3))`,
                  }}
                  aria-hidden
                />

                {featured.badge && (
                  <span className="rb-badge">
                    <span className="dot dot--sm" style={{ background: 'var(--coral)' }} aria-hidden />
                    {featured.badge}
                  </span>
                )}

                <div style={{ minWidth: 0 }}>
                  <h2 className="rb-featured-title">{featured.title}</h2>
                  <p className="rb-featured-desc">{featured.description}</p>

                  <ul className="rb-value-list">
                    {VALUE_BULLETS.map((b, i) => (
                      <li key={i} className="rb-value-item">
                        <span className="dot dot--sm" style={{ background: activeCategory.color, flexShrink: 0 }} aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link href={featured.href} className="rb-featured-cta">
                    {featured.cta}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── RESOURCE COLLECTION ── */}
          <div className="rb-fade" style={{ animationDelay: '0.2s' }}>
            <div className="rb-section-header" style={{ marginTop: featured ? 52 : 0 }}>
              <div className="rb-section-eyebrow" style={{ color: activeCategory.color }}>Resource collection</div>
              <h2 className="rb-section-title">{activeCategory.label}</h2>
              <p className="rb-section-desc">{activeCategory.description}</p>
            </div>

            {filtered.length === 0 ? (
              <div className="rb-empty-card">
                <div style={{ fontSize: '2.4rem', marginBottom: 16, opacity: 0.4 }} aria-hidden>
                  {activeTab === 'company' ? '🏢' : '🧭'}
                </div>
                <h3 className="rb-empty-title">More resources coming soon</h3>
                <p className="rb-empty-desc">
                  We&apos;re building new guides and tools for this category. Check back soon or join the waitlist to get notified.
                </p>
              </div>
            ) : (
              <>
                {remaining.length > 0 ? (
                  <div className="rb-grid-2">
                    {remaining.map((r) => (
                      <div key={r.id} className="rb-resource-card">
                        {r.badge && <span className="rb-resource-badge">{r.badge}</span>}
                        <h3 className="rb-resource-title">{r.title}</h3>
                        <p className="rb-resource-desc">{r.description}</p>
                        <Link href={r.href} className="rb-resource-cta">
                          {r.cta}
                          <svg className="rb-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  featured && (
                    <div className="rb-dev-card">
                      <p style={{ fontSize: '.85rem', color: 'var(--soft)', lineHeight: 1.7, opacity: 0.7 }}>
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
      <footer className="rb-footer-custom">
        <div className="footer-brand">human<span>+</span>ai</div>
        <ul className="f-links">
          <li><Link href="/quiz">Take the quiz</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: 0.25 }}>&copy; 2026</div>
      </footer>
    </div>
  );
}
