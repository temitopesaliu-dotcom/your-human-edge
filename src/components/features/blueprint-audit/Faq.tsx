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
                a: "Because it is not a sales call—it is a consulting engagement. In 90 minutes we produce a strategic document that has genuine value: a workflow map, AI architecture, implementation roadmap and investment estimate. This takes significant preparation and expertise. The $1,000 also ensures you arrive prepared and serious. Clients who have skin in the game get better outcomes. And if you proceed within 30 days, every dollar is credited toward your project.",
              },
              {
                q: "Can I skip the Blueprint and go straight to implementation?",
                a: "No. All engagements begin with the Blueprint. This is not a formality—it is the foundation. Building without a Blueprint is like building a house without plans. The Blueprint is how we ensure the right system is built for your specific business, in the right order, with the right tools. It protects you from expensive mistakes.",
              },
              {
                q: "What if I decide not to proceed after the Blueprint?",
                a: "That is completely fine. You keep the Blueprint document, roadmap and all recommendations. Many clients use the Blueprint to guide their own implementation or hire others to execute it. The document is yours. No obligation exists beyond the $1,000 session.",
              },
              {
                q: "Is the $1,000 credited toward the project?",
                a: "Yes. If you move forward with implementation within 30 days of your Blueprint session, the full $1,000 is credited toward your project investment. The Blueprint effectively costs you nothing if you proceed.",
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
                a: "We do not publish fixed pricing because every engagement is scoped to your specific business. Most projects range from $3,500 for focused single-system builds to $10,000+ for comprehensive operating system implementations. The Blueprint includes an exact investment estimate for your project. The $1,000 Blueprint fee is credited in full if you proceed.",
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
                a: "This is not for you if: you are in the very early stages of business with no established processes yet (you need processes before you can systematize them); you are looking for a cheap solution or want to spend less than $3,500 on implementation; you want someone to hand you a tool and disappear; you are not willing to invest time in the Blueprint process and preparation; or you do not believe AI has a role in your business model. There is no judgment in any of these — this specific service just will not deliver the right outcome for you.",
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
  );
}
