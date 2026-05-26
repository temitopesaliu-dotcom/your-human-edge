import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '50 AI Career Paths | Your Human Edge',
  description: 'The complete directory of AI-era careers — with income ranges, required skills, and which archetype they suit most.',
};

const PATHS = [
  // HUMAN BRIDGE
  { id: 1, title: 'AI Life Coach (Augmented)', arch: 'H', income: '$60K–$200K', tags: ['Coaching', 'AI Tools'], desc: 'Use AI to scale a coaching practice — prep, notes, content — while staying fully present with clients.' },
  { id: 2, title: 'Human-AI Integration Consultant', arch: 'H', income: '$80K–$220K', tags: ['Consulting', 'Change Management'], desc: 'Help organisations navigate the human side of AI adoption. The most overlooked role in the market.' },
  { id: 3, title: 'AI Community Architect', arch: 'H', income: '$50K–$180K', tags: ['Community', 'Content'], desc: 'Build and run a paid community. AI handles the content infrastructure. You hold the space.' },
  { id: 4, title: 'AI Career Transition Coach', arch: 'H', income: '$60K–$150K', tags: ['Coaching', 'HR'], desc: 'Guide professionals rebuilding their identity and direction after AI disruption.' },
  { id: 5, title: 'AI Wellbeing Trainer (Corporate)', arch: 'H', income: '$80K–$200K', tags: ['Training', 'Enterprise'], desc: 'Run workshops on psychological safety, empathy, and thriving in AI-integrated workplaces.' },
  { id: 6, title: 'AI Educator / Course Creator', arch: 'H', income: '$30K–$300K', tags: ['Education', 'Passive Income'], desc: 'Package your knowledge into scalable courses. AI builds the infrastructure; you bring the insight.' },
  { id: 7, title: 'AI Therapist Support Specialist', arch: 'H', income: '$60K–$130K', tags: ['Mental Health', 'AI Tools'], desc: 'Integrate AI tools ethically into therapeutic or counselling practice to extend reach.' },
  { id: 8, title: 'Workplace AI Empathy Advisor', arch: 'H', income: '$70K–$160K', tags: ['HR', 'Consulting'], desc: 'Advise leadership on how to manage teams experiencing AI anxiety and displacement.' },
  { id: 9, title: 'AI Relationship Facilitator', arch: 'H', income: '$50K–$120K', tags: ['Coaching', 'Relationships'], desc: 'Coach individuals, couples, and teams on connection and communication in an AI-saturated world.' },
  { id: 10, title: 'AI Onboarding Experience Designer', arch: 'H', income: '$70K–$150K', tags: ['UX', 'HR Tech'], desc: 'Design the human experience layer of AI product onboarding — the part that drives actual adoption.' },
  { id: 11, title: 'AI Ethics Facilitator', arch: 'H', income: '$80K–$180K', tags: ['Ethics', 'Consulting'], desc: 'Facilitate ethical AI discussions and policy development inside organisations and institutions.' },
  { id: 12, title: 'AI Customer Experience Strategist', arch: 'H', income: '$90K–$200K', tags: ['CX', 'Strategy'], desc: 'Ensure AI touchpoints in customer journeys retain warmth, clarity, and genuine helpfulness.' },

  // CREATIVE AMPLIFIER
  { id: 13, title: 'AI Brand Strategist', arch: 'C', income: '$70K–$180K', tags: ['Branding', 'Strategy'], desc: 'Define brand voice, visual identity, and positioning using AI for rapid prototyping and execution.' },
  { id: 14, title: 'AI Creative Director', arch: 'C', income: '$90K–$220K', tags: ['Creative', 'Leadership'], desc: 'Lead AI-augmented creative studios. Your taste and editorial vision are the differentiator.' },
  { id: 15, title: 'AI Content Studio Owner', arch: 'C', income: '$50K–$200K', tags: ['Content', 'Agency'], desc: 'Package content production at scale: writing, video, and design delivered via AI + your editorial eye.' },
  { id: 16, title: 'AI Visual Storyteller', arch: 'C', income: '$60K–$160K', tags: ['Design', 'Visual'], desc: 'Midjourney, Runway, Sora — you direct the narrative and aesthetic. AI executes at speed.' },
  { id: 17, title: 'AI Music Producer', arch: 'C', income: '$40K–$180K', tags: ['Music', 'Creative'], desc: 'Use Suno, Udio, and Splice AI for composition. Your ear and taste are the product.' },
  { id: 18, title: 'AI UX / Product Designer', arch: 'C', income: '$90K–$200K', tags: ['UX', 'Product'], desc: 'Figma AI + v0 + Claude. Design systems in hours, not weeks. Design judgment still matters most.' },
  { id: 19, title: 'AI Copywriter / Content Strategist', arch: 'C', income: '$60K–$150K', tags: ['Copywriting', 'Strategy'], desc: 'AI writes the first draft. You bring voice, judgment, and the insight that converts.' },
  { id: 20, title: 'AI Video Director', arch: 'C', income: '$70K–$180K', tags: ['Video', 'Creative'], desc: 'Produce high-end AI-augmented video campaigns. Runway + CapCut AI + your cinematic vision.' },
  { id: 21, title: 'AI Fashion Designer', arch: 'C', income: '$60K–$160K', tags: ['Fashion', 'Design'], desc: 'Rapid collection ideation and visual prototyping using AI. Your taste remains the editorial compass.' },
  { id: 22, title: 'AI Advertising Creative', arch: 'C', income: '$70K–$180K', tags: ['Advertising', 'Creative'], desc: 'Concept and produce AI-generated ad creative at volume. Iterate at speeds agencies cannot match.' },
  { id: 23, title: 'AI Game Designer', arch: 'C', income: '$80K–$180K', tags: ['Gaming', 'Design'], desc: 'Build game worlds, narratives, and assets using generative AI. Creativity is the differentiator.' },
  { id: 24, title: 'AI Architecture / Interior Designer', arch: 'C', income: '$70K–$200K', tags: ['Architecture', 'Design'], desc: 'Rapid-prototype spatial designs using Midjourney and AI rendering tools. Present before a single pixel of CAD.' },

  // SYSTEMS ARCHITECT
  { id: 25, title: 'AI Automation Consultant', arch: 'S', income: '$80K–$200K', tags: ['Automation', 'Consulting'], desc: 'Build Make, Zapier, and n8n workflows for SMBs and enterprises. Retainer model, high leverage.' },
  { id: 26, title: 'No-Code AI Systems Designer', arch: 'S', income: '$70K–$180K', tags: ['No-Code', 'Systems'], desc: 'Create business intelligence systems that replace engineering teams. No CS degree required.' },
  { id: 27, title: 'AI Integration Architect', arch: 'S', income: '$120K–$280K', tags: ['Engineering', 'Enterprise'], desc: 'Connect existing company systems to AI layers. High complexity, high demand, high pay.' },
  { id: 28, title: 'AI Ops Engineer', arch: 'S', income: '$100K–$220K', tags: ['MLOps', 'Engineering'], desc: 'Build, deploy, and monitor LLM pipelines in production environments.' },
  { id: 29, title: 'Prompt Engineering Consultant', arch: 'S', income: '$80K–$180K', tags: ['LLMs', 'Consulting'], desc: 'Build systematic prompt libraries, evaluation frameworks, and fine-tuning pipelines for enterprises.' },
  { id: 30, title: 'AI Product Manager', arch: 'S', income: '$110K–$220K', tags: ['Product', 'Management'], desc: 'Spec, prioritise and ship AI-native features. Bridge between engineers and business outcomes.' },
  { id: 31, title: 'AI Workflow Designer', arch: 'S', income: '$70K–$160K', tags: ['Workflow', 'Operations'], desc: 'Redesign business processes from the ground up with AI in the loop from day one.' },
  { id: 32, title: 'AI Data Analyst', arch: 'S', income: '$80K–$180K', tags: ['Data', 'Analytics'], desc: 'Use AI to extract insight from data at speeds that make traditional analysts obsolete.' },
  { id: 33, title: 'AI Security Specialist', arch: 'S', income: '$100K–$220K', tags: ['Security', 'AI Risk'], desc: 'Protect AI systems from adversarial attacks, prompt injection, and data leakage. Urgent demand.' },
  { id: 34, title: 'AI QA / Evaluation Engineer', arch: 'S', income: '$90K–$180K', tags: ['QA', 'LLMs'], desc: 'Build testing and eval frameworks for LLM outputs. The discipline every AI team needs.' },
  { id: 35, title: 'AI Solutions Architect', arch: 'S', income: '$130K–$260K', tags: ['Cloud', 'Architecture'], desc: 'Design end-to-end AI system architecture for enterprise clients. AWS / Azure / GCP AI stacks.' },
  { id: 36, title: 'RAG System Developer', arch: 'S', income: '$100K–$200K', tags: ['Engineering', 'LLMs'], desc: 'Build Retrieval-Augmented Generation systems that let companies use AI on their own data.' },

  // GROWTH CATALYST
  { id: 37, title: 'AI Growth Strategist', arch: 'G', income: '$90K–$250K', tags: ['Growth', 'Strategy'], desc: 'Build AI-powered acquisition and retention systems for startups and scale-ups.' },
  { id: 38, title: 'AI GTM Architect', arch: 'G', income: '$100K–$240K', tags: ['Sales', 'Marketing'], desc: 'Design go-to-market systems using Clay, Apollo, and AI for hyper-personalised outbound.' },
  { id: 39, title: 'Revenue Acceleration Consultant', arch: 'G', income: '$120K–$300K', tags: ['Sales', 'Consulting'], desc: 'Audit and rebuild sales pipelines with AI tooling. Results tied to revenue, not hours.' },
  { id: 40, title: 'AI Marketing Director', arch: 'G', income: '$120K–$250K', tags: ['Marketing', 'Leadership'], desc: 'Own performance, content, and lifecycle marketing with an AI-native strategy and team.' },
  { id: 41, title: 'Fractional CMO (AI-Native)', arch: 'G', income: '$120K–$400K', tags: ['CMO', 'Fractional'], desc: 'Serve 3–5 companies simultaneously. AI gives you the leverage to deliver CMO-level output at scale.' },
  { id: 42, title: 'AI Affiliate / Growth Partner', arch: 'G', income: '$30K–$300K', tags: ['Affiliate', 'Content'], desc: 'Build content and funnels to monetise AI tool referrals at scale. Pure leverage business model.' },
  { id: 43, title: 'AI Business Development Lead', arch: 'G', income: '$90K–$200K', tags: ['BD', 'Sales'], desc: 'Use AI to research, personalise, and accelerate partnership and enterprise sales at 10x speed.' },
  { id: 44, title: 'AI Investor / VC Analyst', arch: 'G', income: '$100K–$250K', tags: ['Finance', 'Investing'], desc: 'Apply AI to deal sourcing, due diligence, and portfolio monitoring. AI makes the research obsolete.' },
  { id: 45, title: 'AI E-commerce Strategist', arch: 'G', income: '$70K–$200K', tags: ['E-commerce', 'Growth'], desc: 'Build AI-powered product discovery, personalisation, and conversion systems for DTC brands.' },
  { id: 46, title: 'AI SEO Strategist', arch: 'G', income: '$60K–$160K', tags: ['SEO', 'Content'], desc: 'Combine AI content production with search intelligence. Build organic growth machines at scale.' },
  { id: 47, title: 'AI Startup Founder', arch: 'G', income: 'Unlimited', tags: ['Entrepreneurship', 'AI'], desc: 'Build an AI-native product or service. A solo founder can now build what previously took a team.' },
  { id: 48, title: 'AI Business Analyst', arch: 'G', income: '$80K–$180K', tags: ['Analytics', 'Strategy'], desc: 'Use AI to synthesise competitive intelligence, market sizing, and strategic recommendations at speed.' },
  { id: 49, title: 'AI PR / Communications Strategist', arch: 'G', income: '$70K–$160K', tags: ['PR', 'Comms'], desc: 'Pitch AI narratives, manage AI crises, and help brands find a credible voice in the AI era.' },
  { id: 50, title: 'AI Venture Studio Operator', arch: 'G', income: '$100K–$500K+', tags: ['Ventures', 'Operations'], desc: 'Build and operate multiple AI-native ventures simultaneously using shared infrastructure and AI leverage.' },
];

const ARCH_META = {
  H: { name: 'Human Bridge', color: '#0f6e56', light: '#E1F5EE' },
  C: { name: 'Creative Amplifier', color: '#c94f2a', light: '#FEF0EA' },
  S: { name: 'Systems Architect', color: '#534ab7', light: '#EEEDFE' },
  G: { name: 'Growth Catalyst', color: '#1565C0', light: '#E8F0FE' },
};

export default function PathsPage() {
  const grouped = Object.entries(ARCH_META).map(([key, meta]) => ({
    key, meta,
    paths: PATHS.filter(p => p.arch === key),
  }));

  return (
    <div className="paths-page">
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99, background: 'rgba(26,16,64,.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
        <Link href="/quiz" className="nav-logo">human<span>+</span>ai</Link>
        <ul className="nav-links">
          <li><Link href="/quiz">Home</Link></li>
          <li><Link href="/coming-soon">Community</Link></li>
        </ul>
        <Link href="/quiz" className="nav-cta">Take the quiz</Link>
      </nav>

      {/* HERO */}
      <div style={{ background: 'var(--ink)', padding: '120px 28px 72px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '.7rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '20px', padding: '5px 16px', border: '1px solid rgba(200,148,10,.4)', borderRadius: '40px' }}>
          The Complete Directory
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>
          50 AI Career <em style={{ color: 'var(--gold)' }}>Paths</em>
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.55)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.8 }}>
          Every AI-era career mapped — with income ranges, what the role actually involves, and which archetype it suits most. Not theory. This is happening right now.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {Object.entries(ARCH_META).map(([key, m]) => (
            <a key={key} href={`#arch-${key}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '40px', padding: '7px 18px', fontSize: '.8rem', color: 'rgba(255,255,255,.7)', textDecoration: 'none', transition: 'all .2s' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
              {m.name} ({PATHS.filter(p => p.arch === key).length})
            </a>
          ))}
        </div>
      </div>

      {/* CTA BAND */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--border)', padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '.88rem', color: 'var(--soft)' }}>Not sure which archetype you are?</span>
        <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--coral)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', fontWeight: 600, padding: '9px 20px', borderRadius: '40px', textDecoration: 'none' }}>
          Take the free 10-question quiz →
        </Link>
      </div>

      {/* PATHS BY ARCHETYPE */}
      <div style={{ padding: '60px 0 80px' }}>
        <div className="container">
          {grouped.map(({ key, meta, paths }) => (
            <div key={key} id={`arch-${key}`} style={{ marginBottom: '64px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '6px', paddingBottom: '18px', borderBottom: '2px solid var(--border)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: meta.color, flexShrink: 0 }} />
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 500, color: 'var(--ink)' }}>
                  {meta.name} <em style={{ color: meta.color, fontStyle: 'italic', fontWeight: 300 }}>Archetype</em>
                </h2>
                <span style={{ fontSize: '.74rem', color: 'var(--soft)', marginLeft: 'auto' }}>{paths.length} paths</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      {['#', 'Career Path', 'What You Do', 'Income Range', 'Tags'].map(h => (
                        <th key={h} style={{ padding: '9px 12px', textAlign: 'left', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--soft)', fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paths.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : 'var(--warm)' }}>
                        <td style={{ padding: '11px 12px', fontSize: '.8rem', color: 'var(--soft)', fontWeight: 500, minWidth: '28px' }}>{p.id}</td>
                        <td style={{ padding: '11px 12px', fontWeight: 600, fontSize: '.92rem', color: 'var(--ink)', minWidth: '200px' }}>{p.title}</td>
                        <td style={{ padding: '11px 12px', fontSize: '.84rem', color: 'var(--soft)', lineHeight: 1.5, minWidth: '220px' }}>{p.desc}</td>
                        <td style={{ padding: '11px 12px', minWidth: '120px' }}>
                          <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '5px', fontSize: '.78rem', fontWeight: 600, background: meta.light, color: meta.color, whiteSpace: 'nowrap' }}>{p.income}</span>
                        </td>
                        <td style={{ padding: '11px 12px', minWidth: '140px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {p.tags.map(t => (
                              <span key={t} style={{ fontSize: '.72rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--paper)', color: 'var(--soft)', border: '1px solid var(--border)' }}>{t}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: 'var(--ink)', padding: '60px 28px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 400, color: '#fff', marginBottom: '14px', lineHeight: 1.2 }}>
          Know your archetype.<br />Get a personalised map.
        </div>
        <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.5)', maxWidth: '440px', margin: '0 auto 28px' }}>
          The quiz takes 3 minutes. Your archetype shapes which of these 50 paths you should actually pursue — and in what order.
        </p>
        <Link href="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'var(--coral)', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: 600, padding: '15px 34px', borderRadius: '50px', textDecoration: 'none' }}>
          Find My Archetype — Free →
        </Link>
      </div>

      <div className="mobile-quick-actions" aria-label="Quick actions">
        <Link className="mobile-quick-actions__secondary" href="/quiz">
          Take Quiz
        </Link>
        <Link className="mobile-quick-actions__primary" href="/coming-soon">
          Join Community
        </Link>
      </div>

      <footer>
        <div><strong>temitopesaliu.com</strong> &nbsp;·&nbsp; <span style={{ fontStyle: 'italic', opacity: .6 }}>AI x Human Psychology</span></div>
        <ul className="f-links">
          <li><Link href="/quiz">Take the quiz</Link></li>
          <li><Link href="/coming-soon">Community</Link></li>
        </ul>
        <div style={{ fontSize: '.7rem', opacity: .25 }}>© 2025 temitopesaliu.com</div>
      </footer>
    </div>
  );
}
