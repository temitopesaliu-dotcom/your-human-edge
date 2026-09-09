"use client";

import React from "react";

interface PdfNavProps {
  pageNumber: number;
  numPages: number | null;
  isMobile: boolean;
  scale: number;
  showZoomControls: boolean;
  onToggleZoom: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const navStyles: Record<string, React.CSSProperties> = {
  root: {
    position: "sticky",
    top: 0,
    zIndex: 99,
    background: "rgba(255,255,255,.9)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid var(--ds-border, #e7e1f5)",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "62px",
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  },
  rootMobile: {
    padding: "0 14px",
    height: "54px",
    paddingTop: "env(safe-area-inset-top)",
  },
  logo: {
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    fontSize: ".95rem",
    fontWeight: 600,
    color: "var(--ds-ink, #221f1a)",
    letterSpacing: ".02em",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  logoMobile: {
    fontSize: ".82rem",
    maxWidth: "60vw",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  pageInfo: {
    fontSize: "0.82rem",
    color: "var(--ds-muted, #655f74)",
    marginRight: "4px",
    whiteSpace: "nowrap",
  },
  btn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid var(--ds-border, #e7e1f5)",
    background: "var(--ds-tint, #f7f5fc)",
    color: "var(--ds-ink, #221f1a)",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  },
  zoomToggleBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid var(--ds-border, #e7e1f5)",
    background: "var(--ds-tint, #f7f5fc)",
    color: "var(--ds-ink, #221f1a)",
    fontSize: "0.78rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    minHeight: "44px",
    whiteSpace: "nowrap",
  },
  zoomLevel: {
    fontSize: "0.82rem",
    color: "var(--ds-muted, #655f74)",
    minWidth: "40px",
    textAlign: "center",
  },
};

export default function PdfNav({
  pageNumber,
  numPages,
  isMobile,
  scale,
  showZoomControls,
  onToggleZoom,
  onZoomIn,
  onZoomOut,
}: PdfNavProps) {
  return (
    <nav
      style={{
        ...navStyles.root,
        ...(isMobile ? navStyles.rootMobile : {}),
      }}
    >
      <a
        href="/quiz"
        style={{
          ...navStyles.logo,
          ...(isMobile ? navStyles.logoMobile : {}),
        }}
      >
        Your Human Edge in the AI Era
      </a>
      <div style={navStyles.right}>
        <span style={navStyles.pageInfo}>
          {pageNumber}/{numPages || "--"}
        </span>
        {isMobile ? (
          <button
            onClick={onToggleZoom}
            style={navStyles.zoomToggleBtn}
            aria-label="Toggle zoom controls"
          >
            {showZoomControls ? "✕" : "Zoom"}
          </button>
        ) : (
          <>
            <button
              onClick={onZoomOut}
              style={navStyles.btn}
              title="Zoom out"
              aria-label="Zoom out"
            >
              −
            </button>
            <span style={navStyles.zoomLevel}>
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={onZoomIn}
              style={navStyles.btn}
              title="Zoom in"
              aria-label="Zoom in"
            >
              +
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
