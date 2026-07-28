export default function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid var(--border, #e2dbd0)",
          borderTopColor: "var(--coral, #d85a30)",
          animation: "loading-fallback-spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes loading-fallback-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
