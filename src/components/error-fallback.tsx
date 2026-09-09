"use client";

export default function ErrorFallback({
  reset,
  title = "Something went wrong.",
  message = "This page hit an unexpected error. Try again, or head back to the homepage.",
  homeHref = "/",
}: {
  reset: () => void;
  title?: string;
  message?: string;
  homeHref?: string;
}) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
        textAlign: "center",
        fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        color: "var(--ds-ink, #221f1a)",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>{title}</h1>
      <p style={{ color: "var(--ds-muted, #655f74)", maxWidth: 420 }}>{message}</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid transparent",
            background: "var(--ds-accent, #6c4fd6)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
        <a
          href={homeHref}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid var(--ds-border, #e7e1f5)",
            color: "var(--ds-ink, #221f1a)",
            textDecoration: "none",
          }}
        >
          Go home
        </a>
      </div>
    </div>
  );
}
