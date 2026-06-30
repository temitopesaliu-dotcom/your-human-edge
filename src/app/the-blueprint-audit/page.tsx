import AiosNav from "./_components/AiosNav";
import AiosFooter from "./_components/AiosFooter";
import AiosScripts from "./_components/AiosScripts";
import Link from "next/link";

export default function AiosLandingPage() {
  return (
    <>
      <AiosScripts />
      <AiosNav />

      {/* ============================================================
           HERO SECTION
           ============================================================ */}
      <section className="hero" id="hero" aria-label="Hero">
        <div className="hero-bg" aria-hidden="true"></div>
        <div className="hero-grid-lines" aria-hidden="true"></div>

        <div className="hero-inner">
          <div className="hero-label fade-up">
            <div className="hero-label-dot" aria-hidden="true"></div>
            <span className="label">AI Operating Systems</span>
          </div>

          <h1 className="hero-title fade-up delay-1">
            Stop babysitting
            <br />
            <em className="line-2">your business.</em>
          </h1>

          <p className="hero-subtitle fade-up delay-2">
            Build an AI Operating System that runs your business with you—not
            because of you. For founders, coaches, consultants and growing teams
            who are done being the bottleneck.
          </p>

          <div className="hero-ctas fade-up delay-3">
            <Link
              href="/the-blueprint-audit/apply"
              className="btn btn-primary btn-lg btn-arrow"
            >
              Apply for Blueprint
            </Link>
            <a href="#how-it-works" className="btn btn-ghost btn-arrow">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ============================================================
           CREDIBILITY BAR
           ============================================================ */}
      <div className="credibility" aria-label="Key metrics">
        <div className="container">
          <div className="credibility-inner">
            <div className="credibility-stat fade-up">
              <div className="credibility-stat-number">47+</div>
              <div className="credibility-stat-label">
                Businesses Transformed
              </div>
            </div>
            <div className="credibility-divider" aria-hidden="true"></div>
            <div className="credibility-stat fade-up delay-1">
              <div className="credibility-stat-number">9</div>
              <div className="credibility-stat-label">Industries Served</div>
            </div>
            <div className="credibility-divider" aria-hidden="true"></div>
            <div className="credibility-stat fade-up delay-2">
              <div className="credibility-stat-number">10yr</div>
              <div className="credibility-stat-label">
                Business Systems Experience
              </div>
            </div>
            <div className="credibility-divider" aria-hidden="true"></div>
            <div className="credibility-stat fade-up delay-3">
              <div className="credibility-stat-number">100%</div>
              <div className="credibility-stat-label">
                Blueprint Credit on Implementation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
           PROBLEM SECTION
           ============================================================ */}
      <section
        className="problems section"
        id="problems"
        aria-labelledby="problems-heading"
      >
        <div className="container">
          <div className="section-header fade-up">
            <p className="label mb-3">The Reality</p>
            <h2 className="heading-1">If any of this sounds familiar.</h2>
            <p className="body-lg mt-3">
              You didn&apos;t start a business to become its most overworked
              employee. But here you are.
            </p>
          </div>

          <div className="problems-grid" role="list">
            {[
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                text: '"My business stops the moment I stop."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M3 10h18M3 6h18M3 14h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                text: '"I answer the same questions every single day."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                ),
                text: '"I have tools everywhere but no actual system."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                text: '"My team wastes hours on things that should be automatic."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ),
                text: '"Clients wait too long because I\'m the only one who can respond."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <ellipse cx="12" cy="12" rx="9" ry="5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M12 7v10M3 12c0 2.76 4.03 5 9 5s9-2.24 9-5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                ),
                text: '"All the knowledge is in my head. If I leave, it disappears."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                text: '"Onboarding new clients takes hours of my personal time."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                text: '"Growth feels like more chaos, not less. Scaling breaks everything."',
              },
              {
                icon: (
                  <svg className="problem-icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.3" />
                    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
                text: '"Operations are invisible until they break — and they always break."',
              },
            ].map((item, i) => (
              <div className="problem-card" role="listitem" key={i}>
                {item.icon}
                <p className="problem-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           REFRAME SECTION
           ============================================================ */}
      <section
        className="reframe section-sm"
        id="reframe"
        aria-labelledby="reframe-heading"
      >
        <div className="container">
          <div className="section-header fade-up">
            <p className="label mb-3">A Different Way</p>
            <h2 className="heading-1" id="reframe-heading">
              The problem isn&apos;t your work ethic.
            </h2>
            <p className="body-lg mt-3">
              You&apos;ve been building a business around you, not a business
              that operates without you. Those are two different architectures.
            </p>
          </div>

          <div className="reframe-comparison fade-up delay-1">
            <div className="comparison-side old">
              <p className="comparison-side-label">Old Architecture</p>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>You are the system</span>
              </div>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Knowledge lives in your head</span>
              </div>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Tools that don&apos;t talk to each other</span>
              </div>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Every task requires your attention</span>
              </div>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Growth multiplies your workload</span>
              </div>
              <div className="comparison-item">
                <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Reactive. Chaotic. Exhausting.</span>
              </div>
            </div>

            <div className="comparison-divider" aria-hidden="true">
              <div className="comparison-divider-line"></div>
              <span className="comparison-divider-vs">vs</span>
              <div className="comparison-divider-line"></div>
            </div>

            <div className="comparison-side new">
              <p className="comparison-side-label">AI Operating System</p>
              {[
                "AI and process are the system",
                "Knowledge is documented and accessible",
                "Tools connected into one coherent layer",
                "Routine decisions handled without you",
                "Growth compounds instead of costs",
                "Proactive. Structured. Scalable.",
              ].map((text, i) => (
                <div className="comparison-item" key={i}>
                  <svg className="comparison-item-icon" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SOLUTION — AI OS DIAGRAM
           ============================================================ */}
      <section
        className="solution section"
        id="solution"
        aria-labelledby="solution-heading"
      >
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">The Architecture</p>
            <h2 className="heading-1" id="solution-heading">
              What an AI Operating System looks like.
            </h2>
            <p className="body-lg mt-3">
              Not a collection of tools. A connected intelligence layer that
              sits across your entire business.
            </p>
          </div>

          <div
            className="ai-os-diagram-wrapper fade-up delay-1"
            aria-label="AI Operating System architecture diagram"
            role="img"
          >
            <svg
              viewBox="0 0 560 560"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g stroke="#232323" strokeWidth="1">
                {[
                  { x2: 280, y2: 80, delay: "0s" },
                  { x2: 430, y2: 150, delay: "0.06s" },
                  { x2: 490, y2: 280, delay: "0.12s" },
                  { x2: 430, y2: 420, delay: "0.18s" },
                  { x2: 350, y2: 490, delay: "0.24s" },
                  { x2: 210, y2: 490, delay: "0.30s" },
                  { x2: 130, y2: 420, delay: "0.36s" },
                  { x2: 70, y2: 280, delay: "0.42s" },
                  { x2: 130, y2: 150, delay: "0.48s" },
                  { x2: 190, y2: 80, delay: "0.54s" },
                  { x2: 370, y2: 80, delay: "0.60s" },
                  { x2: 490, y2: 180, delay: "0.66s" },
                ].map((l, i) => (
                  <line
                    key={i}
                    className="diagram-line"
                    x1="280"
                    y1="280"
                    x2={l.x2}
                    y2={l.y2}
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: 300,
                      opacity: 0,
                      transition: `stroke-dashoffset 0.6s ease ${l.delay}, opacity 0.3s ease ${l.delay}`,
                    }}
                  />
                ))}
              </g>

              <circle cx="280" cy="280" r="80" fill="rgba(200,169,110,0.04)" />
              <circle cx="280" cy="280" r="60" fill="rgba(200,169,110,0.06)" />

              <circle
                cx="280"
                cy="280"
                r="52"
                fill="#0D0D0D"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <text
                x="280"
                y="274"
                textAnchor="middle"
                fill="#C8A96E"
                fontFamily="Cormorant Garamond, Georgia, serif"
                fontSize="13"
                fontWeight="400"
              >
                AI Operating
              </text>
              <text
                x="280"
                y="292"
                textAnchor="middle"
                fill="#C8A96E"
                fontFamily="Cormorant Garamond, Georgia, serif"
                fontSize="13"
                fontWeight="400"
              >
                System
              </text>

              <circle
                cx="280"
                cy="280"
                r="190"
                stroke="#1A1A1A"
                strokeWidth="1"
                strokeDasharray="3 6"
              />

              {[
                { cx: 280, cy: 80, label: "CRM", sub: "Contacts" },
                { cx: 430, cy: 150, label: "EMAIL", sub: "Outreach" },
                { cx: 490, cy: 280, label: "LEADS", sub: "Pipeline" },
                { cx: 430, cy: 420, label: "CLIENTS", sub: "Delivery" },
                { cx: 350, cy: 490, label: "CONTENT", sub: "Engine" },
                { cx: 210, cy: 490, label: "SUPPORT", sub: "AI" },
                { cx: 130, cy: 420, label: "OPS", sub: "Internal" },
                { cx: 70, cy: 280, label: "CAL", sub: "Scheduling" },
                { cx: 130, cy: 150, label: "KNOW.", sub: "Base" },
                { cx: 190, cy: 80, label: "DOCS", sub: "Templates" },
                { cx: 370, cy: 80, label: "MEET.", sub: "Intelligence" },
                { cx: 490, cy: 180, label: "TEAM", sub: "Workflows" },
              ].map((node, i) => (
                <g key={i} transform={`translate(${node.cx},${node.cy})`}>
                  <circle
                    r="30"
                    fill="#0D0D0D"
                    stroke="#232323"
                    strokeWidth="1"
                  />
                  <text
                    y="-6"
                    textAnchor="middle"
                    fill="#9A9894"
                    fontFamily="Inter, sans-serif"
                    fontSize="9"
                    letterSpacing="0.08em"
                  >
                    {node.label}
                  </text>
                  <text
                    y="8"
                    textAnchor="middle"
                    fill="#555"
                    fontFamily="Inter, sans-serif"
                    fontSize="8"
                  >
                    {node.sub}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div
            className="section-header centered fade-up delay-2"
            style={{ marginTop: "var(--space-6)", marginBottom: 0 }}
          >
            <p className="body-md">
              Every node is connected. Every action is tracked. Every routine
              that can be handled without you — is.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
           OUTCOMES / DEMO SECTION
           ============================================================ */}
      <section
        className="outcomes section"
        id="outcomes"
        aria-labelledby="outcomes-heading"
      >
        <div className="container">
          <div className="section-header fade-up">
            <p className="label mb-3">What Changes</p>
            <h2 className="heading-1" id="outcomes-heading">
              What your business looks like after.
            </h2>
            <p className="body-lg mt-3">
              Not features. Not tools. Outcomes. Select any area below to see
              what your AI OS delivers.
            </p>
          </div>

          <div
            className="outcomes-tabs fade-up delay-1"
            role="tablist"
            aria-label="Outcome categories"
          >
            <button className="outcomes-tab active" data-tab="leads" role="tab" aria-selected="true" aria-controls="panel-leads">Lead Capture</button>
            <button className="outcomes-tab" data-tab="onboarding" role="tab" aria-selected="false" aria-controls="panel-onboarding">Client Onboarding</button>
            <button className="outcomes-tab" data-tab="knowledge" role="tab" aria-selected="false" aria-controls="panel-knowledge">Knowledge Base</button>
            <button className="outcomes-tab" data-tab="sales" role="tab" aria-selected="false" aria-controls="panel-sales">Sales Intelligence</button>
            <button className="outcomes-tab" data-tab="meetings" role="tab" aria-selected="false" aria-controls="panel-meetings">Meeting Intelligence</button>
            <button className="outcomes-tab" data-tab="content" role="tab" aria-selected="false" aria-controls="panel-content">Content Engine</button>
            <button className="outcomes-tab" data-tab="proposals" role="tab" aria-selected="false" aria-controls="panel-proposals">Proposals</button>
            <button className="outcomes-tab" data-tab="email" role="tab" aria-selected="false" aria-controls="panel-email">Email Automation</button>
            <button className="outcomes-tab" data-tab="support" role="tab" aria-selected="false" aria-controls="panel-support">Customer Support</button>
            <button className="outcomes-tab" data-tab="ops" role="tab" aria-selected="false" aria-controls="panel-ops">Operations</button>
          </div>

          {/* Lead Capture Panel */}
          <div className="outcome-panel active fade-up delay-2" id="panel-leads" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Lead Capture & Qualification</p>
              <h3 className="heading-2 mt-3">New leads, qualified and routed before you wake up.</h3>
              <p className="body-md mt-3">Your AI OS captures inquiries from any channel, scores them against your ideal client profile, sends a personalised first response, and routes qualified leads to your pipeline—all before you open your laptop.</p>
              <p className="body-md mt-3">Result: You speak only with leads who already understand your offer and are ready to move forward.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Lead capture preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> New inquiry received from website form</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> AI qualifies against ICP criteria</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Score: 87 / 100 — High fit</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Personalised response sent in 90 seconds</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Lead added to pipeline → Stage: Qualified</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> You notified with summary + recommended next step</div>
            </div>
          </div>

          {/* Client Onboarding Panel */}
          <div className="outcome-panel" id="panel-onboarding" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Client Onboarding</p>
              <h3 className="heading-2 mt-3">New clients onboarded completely. Without your involvement.</h3>
              <p className="body-md mt-3">Contract signed → welcome email sent → portal access granted → intake form triggered → kickoff call scheduled. Every step, without you lifting a finger.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Client onboarding preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Contract signed — trigger: onboarding sequence</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Welcome email + portal link sent</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> Intake form completed by client</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Kickoff call auto-scheduled</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> CRM updated, team notified</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> You join the kickoff — everything already done.</div>
            </div>
          </div>

          {/* Knowledge Base Panel */}
          <div className="outcome-panel" id="panel-knowledge" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Internal Knowledge Assistant</p>
              <h3 className="heading-2 mt-3">Your business knowledge, instantly accessible to anyone who needs it.</h3>
              <p className="body-md mt-3">SOPs, client history, processes, decisions, templates — all indexed and accessible through a single AI interface.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Knowledge base preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> &quot;How do we handle refund requests?&quot;</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI retrieves exact SOP in 2 seconds</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> &quot;What did we agree with Acme in June?&quot;</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI surfaces meeting notes + email thread</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> Zero interruptions to you.</div>
            </div>
          </div>

          {/* Sales Intelligence Panel */}
          <div className="outcome-panel" id="panel-sales" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Sales Intelligence</p>
              <h3 className="heading-2 mt-3">Every sales conversation, better prepared and better followed up.</h3>
              <p className="body-md mt-3">Before every call, your AI prepares a brief on the prospect. After every call, it writes the follow-up, updates the CRM, and schedules next steps.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Sales intelligence preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Call in 30 min — AI brief generated</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Prospect pain points identified from research</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Call ends — follow-up drafted in 3 minutes</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> CRM notes updated automatically</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Next step task created for you</div>
            </div>
          </div>

          {/* Meeting Intelligence Panel */}
          <div className="outcome-panel" id="panel-meetings" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Meeting Intelligence</p>
              <h3 className="heading-2 mt-3">Every meeting summarised, actioned and filed — automatically.</h3>
              <p className="body-md mt-3">Every meeting is transcribed, summarised, and distilled into action items assigned to the right people.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Meeting intelligence preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Meeting ends — transcript captured</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> AI summary generated in 60 seconds</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> 4 action items identified + assigned</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Client recap sent automatically</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Logged to project + CRM</div>
            </div>
          </div>

          {/* Content Engine Panel */}
          <div className="outcome-panel" id="panel-content" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Content Engine</p>
              <h3 className="heading-2 mt-3">Your ideas turned into content. At scale. In your voice.</h3>
              <p className="body-md mt-3">One idea becomes a newsletter, three social posts, a LinkedIn article and a script — in your exact voice and tone.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Content engine preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Voice note: &quot;3 minute idea about founder burnout&quot;</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI transcribes + extracts core insight</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Newsletter draft generated</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> 3 LinkedIn posts drafted</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> All in your voice. Ready to review.</div>
            </div>
          </div>

          {/* Proposals Panel */}
          <div className="outcome-panel" id="panel-proposals" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Proposal Generator</p>
              <h3 className="heading-2 mt-3">Proposals written in minutes, not hours.</h3>
              <p className="body-md mt-3">Using context from your discovery call, your AI OS generates a personalised, professional proposal in your brand voice.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Proposal generator preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Discovery call ends</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI reads transcript + CRM notes</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Proposal drafted with correct scope</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Pricing calculated from your rate card</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Sent for your review → 2 edits → out the door</div>
            </div>
          </div>

          {/* Email Automation Panel */}
          <div className="outcome-panel" id="panel-email" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Email Automation</p>
              <h3 className="heading-2 mt-3">Your inbox, handled. The right emails sent, every time.</h3>
              <p className="body-md mt-3">Routine emails — follow-ups, check-ins, reminders, confirmations — sent automatically.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Email automation preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Proposal sent 3 days ago — no response</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI sends personalised follow-up automatically</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Client books call via embedded link</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Confirmation + prep email sent to both parties</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> You never touched it.</div>
            </div>
          </div>

          {/* Customer Support Panel */}
          <div className="outcome-panel" id="panel-support" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Customer Support AI</p>
              <h3 className="heading-2 mt-3">First-line support handled. Complex issues escalated intelligently.</h3>
              <p className="body-md mt-3">Your AI handles 80% of support queries using your knowledge base and SOPs.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Customer support preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> &quot;How do I access my deliverables?&quot;</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> AI responds in 45 seconds with exact steps</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> &quot;I need a refund&quot; — escalation triggered</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Your team notified with full context + history</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> 80% resolved without human touch</div>
            </div>
          </div>

          {/* Operations Panel */}
          <div className="outcome-panel" id="panel-ops" role="tabpanel">
            <div className="outcome-info">
              <p className="label outcome-tag">Operations Dashboard</p>
              <h3 className="heading-2 mt-3">The full picture of your business. Always current.</h3>
              <p className="body-md mt-3">Revenue, pipeline, project status, team capacity, outstanding tasks — aggregated into one operational view.</p>
              <Link href="/the-blueprint-audit/apply" className="btn btn-outline mt-4 btn-arrow">Get this built for your business</Link>
            </div>
            <div className="outcome-visual" aria-label="Operations dashboard preview">
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Revenue this month: on track ↑ 14%</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot blue"></span> Pipeline: 6 active, 2 proposals out</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Projects: 4/5 on schedule</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot"></span> 1 item needs your attention today</div>
              <div className="outcome-visual-row"><span className="outcome-visual-row-dot green"></span> Everything else — running.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           PROCESS TIMELINE
           ============================================================ */}
      <section
        className="process section"
        id="how-it-works"
        aria-labelledby="process-heading"
      >
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">The Process</p>
            <h2 className="heading-1" id="process-heading">
              From first conversation to running system.
            </h2>
            <p className="body-lg mt-3">
              A defined path. No ambiguity. No wasted time on either side.
            </p>
          </div>

          <div className="timeline fade-up delay-1">
            <div className="timeline-step" data-default>
              <div className="timeline-number">1</div>
              <p className="timeline-step-label">First Step</p>
              <h3 className="timeline-step-title">Application</h3>
              <p className="timeline-step-desc">
                You complete a focused application that gives us the context
                needed to assess fit. No lengthy forms. No guesswork.
              </p>
            </div>
            <div className="timeline-step">
              <div className="timeline-number">2</div>
              <p className="timeline-step-label">Within 48 hours</p>
              <h3 className="timeline-step-title">Review & Decision</h3>
              <p className="timeline-step-desc">
                We review your application and determine whether this
                engagement makes sense. If it does, you receive an acceptance
                email with next steps. If not, we tell you clearly why and
                point you toward better options.
              </p>
            </div>
            <div className="timeline-step highlight" data-default>
              <div className="timeline-number">3</div>
              <p className="timeline-step-label">The Starting Point</p>
              <h3 className="timeline-step-title">Blueprint Session</h3>
              <p className="timeline-step-desc">
                A focused 90-minute strategy session where we map your business,
                identify AI opportunities, and design the architecture of your
                operating system. This is a consulting engagement, not a sales
                call.
              </p>
              <span className="timeline-step-badge">
                $500 — Credited to implementation
              </span>
            </div>
            <div className="timeline-step">
              <div className="timeline-number">4</div>
              <p className="timeline-step-label">Within 5 Business Days</p>
              <h3 className="timeline-step-title">Roadmap Delivery</h3>
              <p className="timeline-step-desc">
                You receive a written Blueprint document with your workflow map,
                AI architecture, technology recommendations, priority matrix and
                implementation roadmap.
              </p>
            </div>
            <div className="timeline-step">
              <div className="timeline-number">5</div>
              <p className="timeline-step-label">Your Decision</p>
              <h3 className="timeline-step-title">Proposal</h3>
              <p className="timeline-step-desc">
                If you choose to proceed with implementation, you receive a
                scoped proposal with timeline and investment. No pressure. The
                Blueprint has value whether or not you continue.
              </p>
            </div>
            <div className="timeline-step">
              <div className="timeline-number">6</div>
              <p className="timeline-step-label">The Build</p>
              <h3 className="timeline-step-title">Implementation</h3>
              <p className="timeline-step-desc">
                We build your AI Operating System to specification. Projects
                typically run 4–10 weeks depending on scope. You have visibility
                throughout. Most implementations range from $2,500–$10,000+
                depending on complexity.
              </p>
            </div>
            <div className="timeline-step">
              <div className="timeline-number">7</div>
              <p className="timeline-step-label">Ongoing</p>
              <h3 className="timeline-step-title">
                AI Optimization Partnership
              </h3>
              <p className="timeline-step-desc">
                Monthly improvements, new automations, performance reviews and
                quarterly strategy. Your operating system evolves as your
                business does.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           BLUEPRINT SECTION
           ============================================================ */}
      <section
        className="blueprint-section section"
        id="blueprint"
        aria-labelledby="blueprint-heading"
      >
        <div className="container">
          <div className="section-header fade-up">
            <p className="label mb-3">The First Step</p>
            <h2 className="heading-1" id="blueprint-heading">
              AI Operating System Blueprint.
            </h2>
            <p className="body-lg mt-3">
              Not an audit. Not a consultation. A consulting engagement with one
              purpose: clarity on exactly what your AI OS should look like and
              how to build it.
            </p>
          </div>

          <div className="blueprint-grid">
            <div className="blueprint-info fade-up delay-1">
              <h3 className="heading-3 mb-3">
                What the Blueprint covers.
              </h3>
              <p className="body-md mb-4">
                In 90 minutes, we map your entire business operation, identify
                every AI opportunity, and design an architecture that fits the
                way you actually work — not a generic template.
              </p>

              <p className="label mb-3">What you receive</p>
              <div className="deliverables-list">
                {[
                  "90-minute strategy session",
                  "Business workflow mapping",
                  "AI opportunity assessment",
                  "Technology recommendations",
                  "Automation architecture design",
                  "Implementation roadmap",
                  "Priority matrix",
                  "Investment estimate",
                  "ROI opportunity map",
                  "Written Blueprint document",
                ].map((item, i) => (
                  <div className="deliverable-item" key={i}>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="blueprint-why mt-5">
                <p className="blueprint-why-title">
                  Why is the Blueprint paid?
                </p>
                <p className="blueprint-why-text">
                  Because this is not a sales call. It is a consulting
                  engagement. In 90 minutes, we produce a strategic document
                  that has real value regardless of whether you proceed. The
                  $500 ensures you arrive prepared and serious. It protects both
                  sides. And if you move forward within 30 days, it is credited
                  in full toward your project.
                </p>
              </div>
            </div>

            <div className="blueprint-pricing-card fade-up delay-2">
              <p className="label mb-4">AI Operating System Blueprint</p>
              <div style={{ marginBottom: "var(--space-3)" }}>
                <span className="price-currency">$</span>
                <span className="price-amount">500</span>
              </div>
              <p className="body-sm mb-4">
                One-time. Credited 100% toward implementation if you proceed
                within 30 days.
              </p>

              <div
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "var(--space-4)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {[
                  "90-minute consulting session",
                  "Written Blueprint document",
                  "Full implementation roadmap",
                  "Delivered within 5 business days",
                ].map((item, i) => (
                  <div className="deliverable-item mb-2" key={i}>
                    <svg viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#C8A96E" strokeWidth="1.2" />
                      <path d="M5 8l2 2 4-4" stroke="#C8A96E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/the-blueprint-audit/apply"
                className="btn btn-primary btn-lg btn-arrow"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Apply to Book Your Blueprint
              </Link>

              <div className="blueprint-credit-note">
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 5v4M8 11v0.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span>
                  If you proceed with implementation within 30 days, the full
                  $500 Blueprint fee is credited toward your project. No
                  questions asked.
                </span>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--text-3)",
                  marginTop: "var(--space-3)",
                }}
              >
                Applications reviewed within 48 hours.
                <br />
                Not all applications are accepted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           SOCIAL PROOF
           ============================================================ */}
      <section
        className="social-proof section"
        id="proof"
        aria-labelledby="proof-heading"
      >
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">Client Results</p>
            <h2 className="heading-1" id="proof-heading">
              From dependency to operational freedom.
            </h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                text: "Before this, I was answering the same 12 client questions every week. Now the AI handles all of them. I get notified only when something genuinely needs me. I got back 8 hours a week from day one.",
                name: "Sarah M.",
                role: "Executive Coach, 1:1 Practice",
              },
              {
                text: "My onboarding used to take me 3 hours per new client. Scheduling, contracts, emails, intake, kickoff. Now it's fully automated. I join the kickoff call and everything is already done. Game-changing for a solo consultant.",
                name: "James O.",
                role: "Strategy Consultant",
              },
              {
                text: "The Blueprint alone was worth the $500. I got clarity on what to build and in what order. We'd been spinning our wheels with tools for 18 months. In 90 minutes we had a clear architecture. That decision alone saved us months.",
                name: "Priya K.",
                role: "Founder, 12-person agency",
              },
            ].map((t, i) => (
              <div
                className={`testimonial-card fade-up${i > 0 ? ` delay-${i}` : ""}`}
                key={i}
              >
                <div className="testimonial-quote-mark" aria-hidden="true">
                  &ldquo;
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" aria-hidden="true"></div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="metrics-strip fade-up delay-1">
            {[
              { number: "8hrs", label: "Avg. weekly time recovered" },
              { number: "72hrs", label: "Avg. onboarding time → 20 min" },
              {
                number: "80%",
                label: "Of support queries resolved by AI",
              },
              {
                number: "4–10wk",
                label: "Typical implementation timeline",
              },
            ].map((m, i) => (
              <div className="metric-item" key={i}>
                <div className="metric-number">{m.number}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           FAQ SECTION
           ============================================================ */}
      <section
        className="faq section"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <div className="container">
          <div className="section-header centered fade-up">
            <p className="label mb-3">Questions</p>
            <h2 className="heading-1" id="faq-heading">
              Everything you need to know.
            </h2>
          </div>

          <div className="faq-groups fade-up delay-1">
            {/* Group 1: About the Blueprint */}
            <div className="faq-group">
              <p className="faq-group-label">About the Blueprint</p>

              {[
                {
                  q: "Why is the Blueprint paid?",
                  a: "Because it is not a sales call—it is a consulting engagement. In 90 minutes we produce a strategic document that has genuine value: a workflow map, AI architecture, implementation roadmap and investment estimate. This takes significant preparation and expertise. The $500 also ensures you arrive prepared and serious. Clients who have skin in the game get better outcomes. And if you proceed within 30 days, every dollar is credited toward your project.",
                },
                {
                  q: "Can I skip the Blueprint and go straight to implementation?",
                  a: "No. All engagements begin with the Blueprint. This is not a formality—it is the foundation. Building without a Blueprint is like building a house without plans. The Blueprint is how we ensure the right system is built for your specific business, in the right order, with the right tools. It protects you from expensive mistakes.",
                },
                {
                  q: "What if I decide not to proceed after the Blueprint?",
                  a: "That is completely fine. You keep the Blueprint document, roadmap and all recommendations. Many clients use the Blueprint to guide their own implementation or hire others to execute it. The document is yours. No obligation exists beyond the $500 session.",
                },
                {
                  q: "Is the $500 credited toward the project?",
                  a: "Yes. If you move forward with implementation within 30 days of your Blueprint session, the full $500 is credited toward your project investment. The Blueprint effectively costs you nothing if you proceed.",
                },
                {
                  q: "Can my team attend the Blueprint Session?",
                  a: "Yes, and for larger businesses we recommend bringing the team member most responsible for operations. Having the right people in the room produces a more accurate and actionable Blueprint. We recommend a maximum of 3 people from your side to keep the session focused.",
                },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-question" aria-expanded="false">
                    {faq.q}
                    <svg className="faq-question-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 2: About the Engagement */}
            <div className="faq-group">
              <p className="faq-group-label">About the Engagement</p>

              {[
                {
                  q: "How long does implementation take?",
                  a: "Typically 4–10 weeks depending on scope and complexity. A focused engagement covering 3–4 core systems usually runs 4–6 weeks. A full operating system covering every business function can take 8–12 weeks. The Blueprint gives you the exact timeline for your specific project.",
                },
                {
                  q: "What tools and software do you work with?",
                  a: "We work across the major platforms: CRM tools (HubSpot, GoHighLevel, Notion), automation platforms (Make, Zapier, n8n), AI models (GPT-4, Claude, Gemini), knowledge management (Notion, Obsidian, Coda), communication (Gmail, Outlook, Slack), document management, scheduling (Calendly, Cal.com) and more. We select the right tools for your business, not our preferences.",
                },
                {
                  q: "Can you integrate with my existing tech stack?",
                  a: "Almost always, yes. We assess your current tools during the Blueprint and design around them wherever possible. We only recommend replacements when a tool is genuinely creating more friction than value. We do not push specific platforms.",
                },
                {
                  q: "Do you work with international clients?",
                  a: "Yes. All engagements are conducted remotely via video. We work with clients across North America, Europe, Africa, the Middle East and Asia-Pacific. Sessions are scheduled to accommodate your timezone.",
                },
                {
                  q: "How much does implementation cost?",
                  a: "We do not publish fixed pricing because every engagement is scoped to your specific business. Most projects range from $2,500 for focused single-system builds to $10,000+ for comprehensive operating system implementations. The Blueprint includes an exact investment estimate for your project. The $500 Blueprint fee is credited in full if you proceed.",
                },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-question" aria-expanded="false">
                    {faq.q}
                    <svg className="faq-question-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 3: About Fit */}
            <div className="faq-group">
              <p className="faq-group-label">About Fit</p>

              {[
                {
                  q: "What if I'm already using some AI tools?",
                  a: "Good — that gives us a foundation to build on. Having individual AI tools is very different from having an AI Operating System. Most clients we work with have already tried ChatGPT, Zapier or various AI writing tools. The problem is those tools aren't connected into a coherent system. That is precisely what we design and build.",
                },
                {
                  q: "Who is this NOT for?",
                  a: "This is not for you if: you are in the very early stages of business with no established processes yet (you need processes before you can systematize them); you are looking for a cheap solution or want to spend less than $2,500 on implementation; you want someone to hand you a tool and disappear; you are not willing to invest time in the Blueprint process and preparation; or you do not believe AI has a role in your business model. There is no judgment in any of these — this specific service just will not deliver the right outcome for you.",
                },
                {
                  q: "Do I need technical knowledge?",
                  a: "No. You need to understand your business — the flows, the bottlenecks, the decisions you make every day. We handle all technical design and implementation. Most of our clients describe themselves as \"not technical.\" What matters is operational clarity, not coding skills.",
                },
                {
                  q: "What size business is ideal?",
                  a: "Solo operators to teams of 25. The sweet spot is a founder-led business with 1–10 team members where the founder is still the primary operational bottleneck. Large enterprises have their own internal teams for this work. The businesses that transform most from an AI OS are those generating real revenue but still too dependent on the founder's personal involvement.",
                },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-question" aria-expanded="false">
                    {faq.q}
                    <svg className="faq-question-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 4: About Outcomes */}
            <div className="faq-group">
              <p className="faq-group-label">About Outcomes</p>

              {[
                {
                  q: "What does success look like 90 days after implementation?",
                  a: "Typically: 6–12 hours per week recovered from operational tasks. Client-facing processes running without your personal involvement. A knowledge base your team can access without asking you. Fewer dropped balls. Less reactive decision-making. The specific outcomes depend on your business and what we build — the Blueprint will define the exact success metrics for your situation.",
                },
                {
                  q: "What is the AI Optimization Partnership?",
                  a: "A monthly ongoing relationship for clients who want their AI OS to evolve with their business. It includes: monthly system improvements and new automations, prompt optimization as AI models update, performance monitoring, quarterly strategy sessions, team training as needed, and priority access for new requests. It is not maintenance. It is active optimization.",
                },
                {
                  q: "What if I need changes or additions after implementation?",
                  a: "Small adjustments within scope are handled during implementation at no additional cost. Significant new additions or new systems are scoped as separate projects. The AI Optimization Partnership includes ongoing small improvements as standard. Your operating system should evolve — we build for that from the start.",
                },
                {
                  q: "How do you measure ROI?",
                  a: "We define success metrics during the Blueprint and track them through implementation. Primary metrics include: hours recovered per week (and the dollar value of that time), reduction in operational errors, client response time improvement, team hours saved, and revenue per founder hour. The ROI opportunity map delivered with your Blueprint quantifies the expected return before you commit to implementation.",
                },
              ].map((faq, i) => (
                <div className="faq-item" key={i}>
                  <button className="faq-question" aria-expanded="false">
                    {faq.q}
                    <svg className="faq-question-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           FINAL CTA SECTION
           ============================================================ */}
      <section className="final-cta" id="apply" aria-labelledby="final-cta-heading">
        <div className="final-cta-bg" aria-hidden="true"></div>
        <div className="final-cta-inner fade-up">
          <p className="label mb-4">Ready?</p>
          <h2
            className="heading-1"
            id="final-cta-heading"
            style={{
              maxWidth: 640,
              margin: "0 auto var(--space-5)",
            }}
          >
            Your business should run without you holding everything together.
          </h2>
          <Link
            href="/the-blueprint-audit/apply"
            className="btn btn-primary btn-lg btn-arrow"
          >
            Apply for Your Blueprint
          </Link>
          <p className="final-cta-note">
            $500 · Credited in full if you proceed · Applications reviewed
            within 48 hours
          </p>
        </div>
      </section>

      <AiosFooter variant="landing" />
    </>
  );
}
