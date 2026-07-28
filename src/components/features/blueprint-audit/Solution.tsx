export default function Solution() {
  return (
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
  );
}
