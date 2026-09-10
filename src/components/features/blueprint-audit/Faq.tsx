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
            <p className="faq-group-label">About the Blueprint</p>

            {[
              {
                q: "Why is the Blueprint paid?",
                a: "Because it is not a sales call—it is a consulting engagement. In 90 minutes we produce a strategic document that has genuine value on its own: a workflow map, an AI architecture, a build sequence and a costed estimate. That takes real preparation and expertise. Paying for it also means you arrive prepared and serious, and clients with skin in the game get better outcomes.",
              },
              {
                q: "How is my price decided?",
                a: "By what your business actually needs. We read your application, work out the architecture your operation requires, and price the engagement to that scope. Mapping two workflows for a solo consultant is a different job to mapping a twenty-person service business. Blueprints run from $1,000 to $5,000+, and you receive your exact figure in writing with your acceptance—before you are asked to pay anything.",
              },
              {
                q: "What happens after I get the Blueprint?",
                a: "It is yours to act on however you want. Most clients take the architecture to their own developer or team. If you would rather it be built by someone who already knows this kind of specification, we can point you to implementation partners and make the introduction. The document is yours either way, with no obligation.",
              },
              {
                q: "Do you build the system for me?",
                a: "No. We design the architecture; we do not implement it. That keeps the work focused on getting the specification right rather than on winning a build contract. You take it to your own team, your own developer, or to implementation partners we can point you to.",
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

          <div className="faq-group">
            <p className="faq-group-label">About the Engagement</p>

            {[
              {
                q: "How long does the build usually take?",
                a: "Typically 4–10 weeks depending on scope, though that is the builder's timeline rather than ours. A focused build covering 3–4 core systems usually runs 4–6 weeks; a full operating system covering every business function can take 8–12. Your Blueprint sets out the sequence and the dependencies, so whoever builds it works to a defined plan rather than discovering the scope as they go.",
              },
              {
                q: "What tools and software do you work with?",
                a: "We work across the major platforms. AI models and assistants: Claude, ChatGPT, Gemini, Perplexity, and Claude Code or Cursor where a build is involved. Automation: Make, Zapier, n8n, Power Automate, Airtable. CRM and pipeline: HubSpot, GoHighLevel, Pipedrive, Salesforce, Notion, Airtable. Knowledge and documents: Notion, Obsidian, Coda, Google Workspace, SharePoint. Communication: Gmail, Outlook, Slack, Teams, WhatsApp Business. Scheduling and forms: Calendly, Cal.com, Tally, Typeform. Data and reporting: Looker Studio, Metabase, Google Sheets. Plus whatever industry-specific system you already run on — a practice management tool, an LMS, a case system, a booking platform. We select the right tools for your business, not our preferences.",
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
                q: "How much will the build cost me?",
                a: "That depends on scope and on who you choose to build it, and it is not money that comes to us. What the Blueprint gives you is a costed estimate for your specific architecture — so you walk into that conversation with a defined scope and a realistic number, instead of asking a builder to price something nobody has specified yet. That estimate is one of the more valuable pages in the document.",
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
                a: "Good — that gives us a foundation to build on. Having individual AI tools is very different from having an AI Operating System. Most clients we work with have already tried ChatGPT, Zapier or various AI writing tools. The problem is those tools aren't connected into a coherent system. That is precisely what we design and build.",
              },
              {
                q: "Who is this NOT for?",
                a: "This is not for you if: you are in the very early stages of business with no established processes yet (you need processes before you can systematize them); you want a done-for-you build rather than an architecture to build from; you want someone to hand you a tool and disappear; you are not willing to invest time in the Blueprint process and preparation; or you do not believe AI has a role in your business model. There is no judgment in any of these — this specific service just will not deliver the right outcome for you.",
              },
              {
                q: "Do I need technical knowledge?",
                a: "No. You need to understand your business — the flows, the bottlenecks, the decisions you make every day. We handle the technical design and write the specification in language a builder can act on. Most of our clients describe themselves as \"not technical.\" What matters is operational clarity, not coding skills.",
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
                a: "Typically: 6–12 hours per week recovered from operational tasks. Client-facing processes running without your personal involvement. A knowledge base your team can access without asking you. Fewer dropped balls. Less reactive decision-making. And often new revenue streams — capacity you did not have before turns into offers you could not previously deliver, whether that is a productised service, a second delivery line, or serving a client size you had to turn away. The specific outcomes depend on your business and what gets built — the Blueprint defines the exact success metrics for your situation, so you can hold the build to them.",
              },
              {
                q: "How do you measure ROI?",
                a: "The Blueprint defines the metrics before anything is built. Primary ones: hours recovered per week and the dollar value of that time, reduction in operational errors, client response time, team hours saved, and revenue per founder hour. The ROI opportunity map quantifies the expected return for your specific architecture — which is what lets you judge whether a build is worth commissioning at all.",
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
