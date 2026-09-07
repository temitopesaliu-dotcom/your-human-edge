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
              a: "For this cohort, yes. $157 is what you pay and there is nothing cheaper — no code, no bundle, no countdown. The next cohort is $299. This one is priced lower because it is earlier, not because there is a sale running.",
            },
            {
              q: "I already use AI in my work. Is this still relevant?",
              a: "Good. This session is not about learning AI basics. It is about building a structured, monetisable system around your specific expertise. If you already use AI tactically, this takes you to strategic.",
            },
            {
              q: "What platform is the session on?",
              a: "Zoom. Your payment confirmation arrives immediately, and the joining link is sent closer to the day. You will also get a reminder 24 hours before the session and one an hour before it starts.",
            },
            {
              q: "What if I pay and then cannot attend?",
              a: "Seats are non-refundable, but they are transferable. Email us before the session and we will move you to the next cohort at no extra cost, even though the price will be higher by then — you keep the price you paid. One transfer per seat. Either way you are not left empty-handed: the full recording and all working documents reach you within 72 hours and are yours to keep.",
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
