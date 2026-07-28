import Link from "next/link";

export default function Outcomes() {
  return (
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
  );
}
