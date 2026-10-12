export default function Faq() {
  return (
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
          <div className="faq-group">
            <p className="faq-group-label">About the Audit</p>

            {[
              {
                q: "Why is the session paid?",
                a: "Because it is not a sales call. It is two hours of consulting on your real business: a roadmap in priority order, a recommended tool stack, your first system designed, and a clear answer on who should build it and what it should cost. Paying for it also means you arrive prepared, and clients with skin in the game get better outcomes.",
              },
              {
                q: "How is my price decided?",
                a: "By the size of your business. Founder-led businesses with up to 20 people book the AI Strategy Session at $500. Companies with 21 or more people, or $2M+ in revenue, book the Leadership session at $1,500, which covers you and up to three of your leaders. The free Blueprint quiz shows you which one fits before you pay anything.",
              },
              {
                q: "What happens after the session?",
                a: "You leave with a summary document of your next steps, yours to act on however you want. If you want the full design, the Full Solutions Architecture starts at $2,500 and your session fee comes off it if you continue within 30 days. Your team or a recommended partner builds it, and Temitope can oversee the build.",
              },
              {
                q: "What exactly do I walk away with?",
                a: "A written Audit document: your workflow map, the AI architecture, technology recommendations, a priority sequence and a costed estimate. It is a complete design for your operating system, specified clearly enough to hand to anyone. What we do from there is something we talk through together on the call.",
              },
              {
                q: "Can my team attend the Audit Session?",
                a: "Yes, and for larger businesses we recommend bringing the team member most responsible for operations. Having the right people in the room produces a more accurate and actionable Audit. We recommend a maximum of 3 people from your side to keep the session focused.",
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

          <div className="faq-group">
            <p className="faq-group-label">About the Engagement</p>

            {[
              {
                q: "How long does it take?",
                a: "The Blueprint quiz takes about three minutes. The session runs two hours. If you continue, your Full Solutions Architecture is delivered within 7 business days of the session. From there, the build timeline depends on scope, and the architecture sets out the sequence and dependencies in advance.",
              },
              {
                q: "What tools and software do you work with?",
                a: "We work across the major platforms. AI models and assistants: Claude, ChatGPT, Gemini, Perplexity, and Claude Code or Cursor. Automation: Make, Zapier, n8n, Power Automate, Airtable. CRM and pipeline: HubSpot, GoHighLevel, Pipedrive, Salesforce, Notion, Airtable. Knowledge and documents: Notion, Obsidian, Coda, Google Workspace, SharePoint. Communication: Gmail, Outlook, Slack, Teams, WhatsApp Business. Scheduling and forms: Calendly, Cal.com, Tally, Typeform. Data and reporting: Looker Studio, Metabase, Google Sheets. Plus whatever industry-specific system you already run on — a practice management tool, an LMS, a case system, a booking platform. We select the right tools for your business, not our preferences.",
              },
              {
                q: "Can you integrate with my existing tech stack?",
                a: "Almost always, yes. We assess your current tools during the session and design around them wherever possible. We only recommend replacements when a tool is genuinely creating more friction than value. We do not push specific platforms.",
              },
              {
                q: "Do you work with international clients?",
                a: "Yes. All engagements are conducted remotely via video. We work with clients across North America, Europe, Africa, the Middle East and Asia-Pacific. Sessions are scheduled to accommodate your timezone.",
              },
              {
                q: "How much does it cost?",
                a: "The Blueprint quiz is free. The AI Strategy Session is $500 for founder-led businesses and $1,500 for leadership teams. The Full Solutions Architecture starts at $2,500, less your session fee if you continue within 30 days.",
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

          <div className="faq-group">
            <p className="faq-group-label">About Fit</p>

            {[
              {
                q: "What if I'm already using some AI tools?",
                a: "Good — that gives us a foundation to work from. Having individual AI tools is very different from having an AI Operating System. Most clients we work with have already tried ChatGPT, Zapier or various AI writing tools. The problem is those tools aren't connected into a coherent system. That is precisely what we design.",
              },
              {
                q: "Who is this NOT for?",
                a: "This is not for you if: you are in the very early stages of business with no established processes yet (you need processes before you can systematize them); you want someone to hand you a tool and disappear; you are not willing to invest time in the Audit process and preparation; or you do not believe AI has a role in your business model. There is no judgment in any of these — this specific service just will not deliver the right outcome for you.",
              },
              {
                q: "Do I need technical knowledge?",
                a: "No. You need to understand your business — the flows, the bottlenecks, the decisions you make every day. We handle the technical design and write the specification in plain language anyone can act on. Most of our clients describe themselves as \"not technical.\" What matters is operational clarity, not coding skills.",
              },
              {
                q: "What size business is ideal?",
                a: "Solo operators to teams of 25, and founders with teams starting from 5 people upward — that group tends to get the most out of it, because there are already enough hands for a system to coordinate. The sweet spot is a founder-led business where the founder is still the primary operational bottleneck. Large enterprises have their own internal teams for this work. The businesses that transform most from an AI OS are those generating real revenue but still too dependent on the founder's personal involvement.",
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

          <div className="faq-group">
            <p className="faq-group-label">About Outcomes</p>

            {[
              {
                q: "What does success look like 90 days after the system is live?",
                a: "Typically: 6–12 hours per week recovered from operational tasks. Client-facing processes running without your personal involvement. A knowledge base your team can access without asking you. Fewer dropped balls. Less reactive decision-making. And often new revenue streams — capacity you did not have before turns into offers you could not previously deliver, whether that is a productised service, a second delivery line, or serving a client size you had to turn away. The specific outcomes depend on your business — the Audit defines the exact success metrics for your situation, so you can measure everything against them.",
              },
              {
                q: "How do you measure ROI?",
                a: "The Audit defines the metrics up front. Primary ones: hours recovered per week and the dollar value of that time, reduction in operational errors, client response time, team hours saved, and revenue per founder hour. The ROI opportunity map quantifies the expected return for your specific architecture — which is what lets you judge the opportunity for your business with a clear head.",
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
  );
}
