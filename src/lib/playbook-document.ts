import { getArchetypeByKey, type Archetype } from '@/lib/archetypes';
import { SITE_DISPLAY } from '@/lib/site';

type PlaybookRenderOptions = {
  archetype: Archetype;
  sessionId: string;
  storedName?: string;
};

const NINETY_DAY_PLAN: Record<string, { phase: string; title: string; tasks: string[] }[]> = {
  H: [
    {
      phase: 'Week 1–2',
      title: 'Foundation',
      tasks: [
        'Set up Claude — create a "session prep" prompt template',
        'Identify your top 3 current coaching/helping contexts',
        'Run one full session using AI for notes and follow-up',
      ],
    },
    {
      phase: 'Week 3–4',
      title: 'First Product',
      tasks: [
        'Define your niche clearly: who do you help and with what?',
        'Create a 1-pager service offer using AI to draft',
        'Post one piece of content about AI + your area of expertise',
      ],
    },
    {
      phase: 'Month 2',
      title: 'Build & Test',
      tasks: [
        'Get your first 3 paid clients at your new AI-augmented rate',
        'Build a Notion AI knowledge base from your session patterns',
        'Start a weekly email to a small list (use Claude to draft)',
      ],
    },
    {
      phase: 'Month 3',
      title: 'Scale',
      tasks: [
        'Launch a simple community or group programme',
        'Repurpose content into short-form video using HeyGen',
        'Document your system — it becomes your course later',
      ],
    },
  ],
  C: [
    {
      phase: 'Week 1–2',
      title: 'Creative Setup',
      tasks: [
        'Subscribe to Midjourney + set up Claude for narrative work',
        'Identify your signature aesthetic — what do you uniquely make?',
        'Create one complete project entirely with AI tools — show your taste',
      ],
    },
    {
      phase: 'Week 3–4',
      title: 'First Client',
      tasks: [
        'Package one service: AI Brand Kit, AI Content System, or AI Visuals',
        'Post 3 pieces showing before/after of your AI workflow',
        'Land one paid brief — even $500 to start',
      ],
    },
    {
      phase: 'Month 2',
      title: 'Portfolio & Proof',
      tasks: [
        'Document 3 case studies with real outcomes',
        'Raise your rates — AI halves your time, double your margin',
        'Approach 5 dream clients with a specific AI offer',
      ],
    },
    {
      phase: 'Month 3',
      title: 'Studio Model',
      tasks: [
        'Hire one VA to handle admin — AI-augmented human team',
        'Launch a productised service at fixed price',
        'Begin building an email list from your content',
      ],
    },
  ],
  S: [
    {
      phase: 'Week 1–2',
      title: 'Stack Setup',
      tasks: [
        'Build your first Make workflow: automate something you do manually',
        'Connect Claude to an n8n or Make pipeline',
        'Map one client process that could be AI-automated',
      ],
    },
    {
      phase: 'Week 3–4',
      title: 'First System',
      tasks: [
        'Build a complete automation for one business: start-to-finish',
        'Document it with a Loom walkthrough',
        'Price it and offer to a contact or small business',
      ],
    },
    {
      phase: 'Month 2',
      title: 'Consulting Setup',
      tasks: [
        'Create a "Systems Audit" offer — $500–$2000',
        'Land 2–3 small clients using your audit as entry point',
        'Build a template library of your most repeatable systems',
      ],
    },
    {
      phase: 'Month 3',
      title: 'Scale to Retainer',
      tasks: [
        'Convert audit clients to monthly retainers ($2k–$5k)',
        'Partner with 1–2 agencies who need an AI systems person',
        'Document your process — it becomes a paid course or SOP library',
      ],
    },
  ],
  G: [
    {
      phase: 'Week 1–2',
      title: 'Intelligence Layer',
      tasks: [
        'Set up Clay — build your first lead list with AI enrichment',
        'Connect Claude to write personalised first lines at scale',
        'Map one growth lever you\'ve been doing manually',
      ],
    },
    {
      phase: 'Week 3–4',
      title: 'First Campaign',
      tasks: [
        'Run one AI-powered outreach campaign — 200+ contacts',
        'Track response rates against your baseline',
        'Create one piece of growth content from the data',
      ],
    },
    {
      phase: 'Month 2',
      title: 'System + Offer',
      tasks: [
        'Package your approach as a "Growth Acceleration" offer ($5k+)',
        'Approach 5 founders in your network with a specific outcome promise',
        'Build a case study from your first results',
      ],
    },
    {
      phase: 'Month 3',
      title: 'Revenue Machine',
      tasks: [
        'Close 2–3 clients at $5k–$15k/month',
        'Build an AI-powered content engine to attract inbound leads',
        'Document your playbook — it becomes your premium offer',
      ],
    },
  ],
};

export function buildPlaybookPageMarkup({ archetype, sessionId, storedName }: PlaybookRenderOptions) {
  const plan = NINETY_DAY_PLAN[archetype.key] || NINETY_DAY_PLAN.H;
  const storedNameText = storedName ? `${escapeHtml(storedName)},` : 'Welcome,';
  const safeSessionId = encodeURIComponent(sessionId);
  const downloadHref = `/api/download-pdf?session_id=${safeSessionId}&arch=${archetype.key}`;

  return `
    <style>
      * {
        box-sizing: border-box;
      }
      html {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body {
        margin: 0;
        background: #faf8f4;
        color: #1a1040;
        font-family: 'DM Sans', Arial, sans-serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .container {
        padding: 0 32px;
        margin: 0 auto;
        width: 100%;
      }
      .playbook-nav {
        position: sticky;
        top: 0;
        z-index: 99;
        background: rgba(26,16,64,.96);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid rgba(255,255,255,.07);
        padding: 0 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 62px;
      }
      .playbook-banner {
        background: linear-gradient(90deg, ${archetype.colorDark}, ${archetype.color});
        padding: 14px 28px;
        text-align: center;
        border-bottom: 1px solid rgba(255,255,255,.1);
      }
      .playbook-hero {
        background: var(--ink);
        padding: 80px 28px 60px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      .playbook-main {
        padding: 60px 0 80px;
      }
      .playbook-container {
        max-width: 780px;
      }
      .playbook-section {
        break-inside: avoid-page;
        page-break-inside: avoid;
        break-after: auto;
      }
      .playbook-section + .playbook-section {
        margin-top: 0;
      }
      .playbook-step,
      .playbook-card,
      .playbook-bonus {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .mobile-quick-actions {
        display: none;
      }
      .playbook-footer {
        padding: 40px 32px 28px;
        text-align: center;
        border-top: 1px solid rgba(26,16,64,.08);
        background: #faf8f4;
        color: var(--soft);
      }
      .f-links {
        list-style: none;
        display: flex;
        justify-content: center;
        gap: 18px;
        flex-wrap: wrap;
        margin: 16px 0;
        padding: 0;
      }
      .f-links a {
        color: var(--ink);
        text-decoration: none;
        font-size: .82rem;
        opacity: .8;
      }
      .f-links a:hover {
        opacity: 1;
      }
      @media (max-width: 768px) {
        .playbook-nav {
          padding: 0 16px !important;
        }
        .playbook-nav > div {
          gap: 10px !important;
        }
        .playbook-nav span {
          display: none;
        }
        .container {
          padding: 0 16px;
        }
        .mobile-quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          position: sticky;
          bottom: 0;
          z-index: 50;
          padding: 12px 14px calc(12px + env(safe-area-inset-bottom));
          background: rgba(250,248,244,.92);
          backdrop-filter: blur(14px);
          border-top: 1px solid rgba(26,16,64,.08);
        }
        .mobile-quick-actions__primary,
        .mobile-quick-actions__secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          border-radius: 999px;
          text-decoration: none;
          font: 600 .92rem 'DM Sans', sans-serif;
          padding: 0 16px;
        }
        .mobile-quick-actions__primary {
          background: var(--gold);
          color: var(--ink);
        }
        .mobile-quick-actions__secondary {
          background: #fff;
          color: var(--ink);
          border: 1px solid rgba(26,16,64,.12);
        }
        .playbook-footer {
          padding-bottom: 110px;
        }
      }
      @media print {
        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          background: #faf8f4 !important;
        }
        .playbook-nav {
          background: #1a1040 !important;
        }
        .playbook-banner {
          background: linear-gradient(90deg, ${archetype.colorDark}, ${archetype.color}) !important;
        }
        .playbook-hero {
          background: #1a1040 !important;
        }
        .playbook-bonus {
          background: #1a1040 !important;
        }
        .playbook-footer {
          background: #faf8f4 !important;
        }
        .playbook-nav,
        .playbook-banner,
        .playbook-hero,
        .playbook-bonus,
        .playbook-footer {
          box-shadow: none !important;
        }
        .playbook-section + .playbook-section {
          break-before: page;
          page-break-before: always;
        }
        .playbook-section {
          break-inside: avoid-page;
          page-break-inside: avoid;
        }
        .mobile-quick-actions {
          display: none !important;
        }
      }
    </style>
    <nav class="playbook-nav">
      <a href="/quiz" style="font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:#fff;text-decoration:none;letter-spacing:.02em;">human<span style="color:var(--gold);">+</span>ai</a>
      <div style="display:flex;align-items:center;gap:16px;">
        <span style="font-size:.72rem;color:rgba(255,255,255,.4);letter-spacing:.04em;">✓ Verified Access</span>
        <a href="${downloadHref}" style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:500;padding:8px 16px;border-radius:40px;text-decoration:none;">↓ Download PDF</a>
      </div>
    </nav>

    <div class="playbook-banner">
      <a href="${downloadHref}" style="display:inline-flex;align-items:center;gap:8px;color:#fff;font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:600;text-decoration:none;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:40px;padding:9px 22px;">
        ↓ Download Your Playbook PDF
        <span style="font-size:.78rem;color:rgba(255,255,255,.6);font-weight:400;">· Print or save for offline access</span>
      </a>
    </div>

    <div class="playbook-hero">
      <div style="position:absolute;top:-30%;left:50%;transform:translateX(-50%);width:600px;height:600px;border-radius:50%;background:radial-gradient(ellipse,${archetype.color}33,transparent 70%);" aria-hidden="true"></div>
      <div style="font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:16px;position:relative;z-index:1;">Your Personal Playbook</div>
      <h1 style="font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.2rem);font-weight:400;color:#fff;line-height:1.1;margin-bottom:14px;position:relative;z-index:1;">
        ${storedNameText} your <em style="color:var(--gold);">${escapeHtml(archetype.name)}</em> guide.
      </h1>
      <p style="font-size:.95rem;color:rgba(255,255,255,.6);max-width:460px;margin:0 auto;line-height:1.8;position:relative;z-index:1;">
        Everything below is built specifically for how you think and work. Bookmark this page — it&apos;s yours permanently.
      </p>
    </div>

    <div class="playbook-main">
      <div class="container playbook-container">
        ${buildPlaybookSectionsMarkup(archetype, plan)}
        <div class="playbook-bonus" style="background:var(--ink);border-radius:16px;padding:36px 40px;text-align:center;margin-top:40px;">
          <div style="font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;">Buyer Bonus</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.6rem;color:#fff;margin-bottom:10px;">The Full 50 AI Career Paths Directory</div>
          <p style="font-size:.9rem;color:rgba(255,255,255,.55);margin-bottom:22px;">Every AI career path mapped — with income ranges, required skills, and your archetype&apos;s top picks highlighted.</p>
          <a href="/paths" style="display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--ink);font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:600;padding:14px 30px;border-radius:40px;text-decoration:none;">Explore All 50 Paths →</a>
        </div>
      </div>
    </div>

    <div class="mobile-quick-actions" aria-label="Quick actions">
      <a class="mobile-quick-actions__primary" href="${downloadHref}">Download PDF</a>
      <a class="mobile-quick-actions__secondary" href="/paths">Explore Paths</a>
    </div>

    <footer class="playbook-footer">
      <div><strong>${SITE_DISPLAY}</strong> &nbsp;·&nbsp; <span style="font-style:italic;opacity:.6;">AI x Human Psychology</span></div>
      <ul class="f-links">
        <li><a href="/quiz">Take the quiz</a></li>
        <li><a href="/coming-soon">Community</a></li>
        <li><a href="/paths">50 AI Paths</a></li>
      </ul>
      <div style="font-size:.7rem;opacity:.25;">© 2025 ${SITE_DISPLAY}</div>
    </footer>
  `;
}

export function buildPlaybookDocumentHtml(options: PlaybookRenderOptions) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body { margin: 0; background: #faf8f4; }
      </style>
    </head>
    <body>
      ${buildPlaybookPageMarkup(options)}
    </body>
  </html>`;
}

function buildPlaybookSectionsMarkup(archetype: Archetype, plan: { phase: string; title: string; tasks: string[] }[]) {
  const planMarkup = plan
    .map(
      (item, index) => `
        <div class="playbook-step" style="display:flex;gap:20px;padding-bottom:28px;position:relative;">
          ${index < plan.length - 1 ? `<div style="position:absolute;left:19px;top:40px;bottom:0;width:1px;background:var(--border);"></div>` : ''}
          <div style="width:40px;height:40px;border-radius:50%;background:${archetype.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:.85rem;color:#fff;font-weight:500;">${index + 1}</div>
          <div style="flex:1;padding-top:8px;">
            <div style="font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);font-weight:600;margin-bottom:4px;">${escapeHtml(item.phase)}</div>
            <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:500;color:var(--ink);margin-bottom:8px;">${escapeHtml(item.title)}</h3>
            <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;">
              ${item.tasks
                .map(
                  task => `
                    <li style="font-size:.87rem;color:var(--soft);display:flex;align-items:flex-start;gap:8px;line-height:1.55;">
                      <span style="color:${archetype.color};flex-shrink:0;">→</span>${escapeHtml(task)}
                    </li>
                  `
                )
                .join('')}
            </ul>
          </div>
        </div>
      `
    )
    .join('');

  return `
    <div class="playbook-section" style="padding-bottom:48px;border-bottom:1px solid var(--border);margin-bottom:48px;">
      <span style="font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--coral);font-weight:600;margin-bottom:10px;display:block;">Your Psychology</span>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:400;color:var(--ink);line-height:1.2;margin-bottom:20px;">Why <em style="color:var(--coral);">you</em> have the advantage</h2>
      <p style="font-size:.97rem;color:var(--soft);line-height:1.85;margin-bottom:16px;">${escapeHtml(archetype.tagline)}</p>
      <div style="background:var(--paper);border-left:3px solid var(--coral);border-radius:0 10px 10px 0;padding:18px 22px;margin:22px 0;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.05rem;color:var(--ink);">
        ${escapeHtml(archetype.reframe)}
      </div>
      <p style="font-size:.97rem;color:var(--soft);line-height:1.85;margin-bottom:16px;">Your deepest fear: ${escapeHtml(archetype.fear)}. Here&apos;s why that fear is protecting you from a future that no longer exists.</p>
    </div>

    <div class="playbook-section" style="padding-bottom:48px;border-bottom:1px solid var(--border);margin-bottom:48px;">
      <span style="font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--coral);font-weight:600;margin-bottom:10px;display:block;">Your 90-Day Blueprint</span>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:400;color:var(--ink);line-height:1.2;margin-bottom:20px;">Week by week. <em style="color:var(--coral);">No guesswork.</em></h2>
      <div style="display:flex;flex-direction:column;gap:0;margin:24px 0;">${planMarkup}</div>
    </div>

    <div class="playbook-section" style="padding-bottom:48px;border-bottom:1px solid var(--border);margin-bottom:48px;">
      <span style="font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:var(--coral);font-weight:600;margin-bottom:10px;display:block;">Income Strategy</span>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:clamp(1.6rem,4vw,2.2rem);font-weight:400;color:var(--ink);line-height:1.2;margin-bottom:20px;">How you build <em style="color:var(--coral);">real income</em></h2>
      <p style="font-size:.97rem;color:var(--soft);line-height:1.85;margin-bottom:16px;">Income range for your archetype: <strong>${escapeHtml(archetype.income)}</strong>. Here&apos;s the three-stage model that gets you there.</p>
      ${[
        {
          stage: 'Stage 1 — Service Income',
          desc: 'Sell your expertise directly, AI-augmented. You can charge more because you deliver more. This is your first $3k–$10k/month.',
        },
        {
          stage: 'Stage 2 — Productised Income',
          desc: 'Package your process into a repeatable offer. Fixed price, defined scope. This is leverage — time investment goes down, margin goes up.',
        },
        {
          stage: 'Stage 3 — Passive / Community Income',
          desc: 'A course, membership, or digital product that earns while you sleep. AI built the infrastructure. You built the audience.',
        },
      ]
        .map(
          s => `
            <div class="playbook-card" style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:16px 18px;border-left:3px solid ${archetype.color};margin-bottom:10px;">
              <div style="font-weight:600;font-size:.93rem;color:var(--ink);margin-bottom:6px;">${escapeHtml(s.stage)}</div>
              <div style="font-size:.85rem;color:var(--soft);line-height:1.6;">${escapeHtml(s.desc)}</div>
            </div>
          `
        )
        .join('')}
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function getPlaybookArchetype(key: string) {
  return getArchetypeByKey(key);
}
