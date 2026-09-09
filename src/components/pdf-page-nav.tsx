"use client";

import React from "react";

interface PdfPageNavProps {
  pageNumber: number;
  numPages: number | null;
  isMobile: boolean;
  onGoToPage: (page: number) => void;
}

const baseBar: React.CSSProperties = {
  background: "var(--ds-surface, #fff)",
  borderBottom: "1px solid var(--ds-border, #e7e1f5)",
  padding: "8px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const mobileBar: React.CSSProperties = {
  padding: "8px 12px",
  gap: "8px",
  position: "sticky",
  top: "calc(54px + env(safe-area-inset-top))",
  zIndex: 50,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const baseBtn: React.CSSProperties = {
  background: "var(--ds-tint, #f7f5fc)",
  border: "1px solid var(--ds-border, #e7e1f5)",
  borderRadius: "8px",
  padding: "6px 16px",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "var(--ds-ink, #221f1a)",
  cursor: "pointer",
  fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  minHeight: "36px",
};

const mobileBtn: React.CSSProperties = {
  padding: "10px 20px",
  minWidth: "48px",
  minHeight: "44px",
  fontSize: "1rem",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const baseJump: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.85rem",
  color: "var(--ds-muted, #655f74)",
};

const mobileJump: React.CSSProperties = {
  fontSize: "0.82rem",
  gap: "4px",
  flex: 1,
  justifyContent: "center",
};

const baseInput: React.CSSProperties = {
  width: "60px",
  padding: "4px 8px",
  borderRadius: "6px",
  border: "1px solid var(--ds-border, #e7e1f5)",
  fontSize: "0.85rem",
  textAlign: "center",
  fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
};

const mobileInput: React.CSSProperties = {
  width: "52px",
  padding: "8px 6px",
  fontSize: "0.95rem",
  minHeight: "40px",
  borderRadius: "8px",
};

export default function PdfPageNav({
  pageNumber,
  numPages,
  isMobile,
  onGoToPage,
}: PdfPageNavProps) {
  const canGoPrev = pageNumber <= 1;
  const canGoNext = numPages !== null && pageNumber >= numPages;
  const barStyle = isMobile ? { ...baseBar, ...mobileBar } : baseBar;
  const btnStyle = isMobile ? { ...baseBtn, ...mobileBtn } : baseBtn;
  const jumpStyle = isMobile ? { ...baseJump, ...mobileJump } : baseJump;
  const inputStyle = isMobile ? { ...baseInput, ...mobileInput } : baseInput;

  return (
    <div style={barStyle}>
      <button
        onClick={() => onGoToPage(pageNumber - 1)}
        disabled={canGoPrev}
        style={{ ...btnStyle, opacity: canGoPrev ? 0.4 : 1, cursor: canGoPrev ? "not-allowed" : "pointer" }}
        aria-label="Previous page"
      >
        ←
      </button>

      <div style={jumpStyle}>
        {isMobile ? (
          <>
            <span>Page</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              pattern="[0-9]*"
              max={numPages || 1}
              value={pageNumber}
              onChange={(e) => onGoToPage(parseInt(e.target.value, 10) || 1)}
              style={inputStyle}
              aria-label="Go to page number"
            />
            <span>of {numPages || "--"}</span>
          </>
        ) : (
          <>
            <span>Go to page:</span>
            <input
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNumber}
              onChange={(e) => onGoToPage(parseInt(e.target.value, 10) || 1)}
              style={inputStyle}
            />
          </>
        )}
      </div>

      <button
        onClick={() => onGoToPage(pageNumber + 1)}
        disabled={canGoNext}
        style={{ ...btnStyle, opacity: canGoNext ? 0.4 : 1, cursor: canGoNext ? "not-allowed" : "pointer" }}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
