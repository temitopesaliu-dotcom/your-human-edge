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
        fontFamily: "'DM Sans', sans-serif",
        color: "var(--ink, #1a1040)",
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>{title}</h1>
      <p style={{ color: "var(--soft, #4a3f6b)", maxWidth: 420 }}>{message}</p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid var(--border, #e2dbd0)",
            background: "var(--coral, #d85a30)",
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
            border: "1px solid var(--border, #e2dbd0)",
            color: "var(--ink, #1a1040)",
            textDecoration: "none",
          }}
        >
          Go home
        </a>
      </div>
    </div>
  );
}
