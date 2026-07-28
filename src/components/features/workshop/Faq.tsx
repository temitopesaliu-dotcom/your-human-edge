export default function Faq() {
  return (
    <section className="ws-section" style={{ background: "var(--white)" }}>
      <div className="ws-container">
        <div className="ws-section-eyebrow">Common questions</div>
        <h2 className="ws-section-h2">Everything you need to know.</h2>
        <div className="ws-faq-grid">
          {[
            {
              q: "Is this session recorded?",
              a: "Yes. If you cannot attend live, the full recording and all working documents will be delivered within 72 hours. The live session is where the real work happens, but you will not lose your investment if your schedule shifts.",
            },
            {
              q: "What do I need to come prepared with?",
              a: "Your expertise and an honest answer to one question: what problem do you solve better than most people you know? Everything else gets built in the room. No prep slides, no pre-work required.",
            },
            {
              q: "Is $157 the final price?",
              a: "No. Early access closes when seats fill or when I decide it closes — whichever comes first. The full price is $299. After this session, when testimonials exist, future sessions will be priced higher.",
            },
            {
              q: "I already use AI in my work. Is this still relevant?",
              a: "Good. This session is not about learning AI basics. It is about building a structured, monetisable system around your specific expertise. If you already use AI tactically, this takes you to strategic.",
            },
            {
              q: "What platform is the session on?",
              a: "Zoom. Your link will be sent immediately after purchase with a confirmation email. You will receive a reminder 24 hours before the session and 1 hour before it starts.",
            },
            {
              q: "Do I need any technical background?",
              a: "None. This workshop is built for professionals who are expert in their field — not in technology. If you can use a laptop and have expertise worth monetising, you are ready.",
            },
          ].map((faq) => (
            <div className="ws-faq-item" key={faq.q}>
              <div className="ws-faq-q">{faq.q}</div>
              <div className="ws-faq-a">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
