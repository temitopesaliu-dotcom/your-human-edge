"use client";

import React from "react";

interface PdfZoomControlsProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onScaleChange: (scale: number) => void;
}

const mobileZoomStyles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "8px 14px",
    background: "var(--ds-surface, #fff)",
    borderBottom: "1px solid var(--ds-border, #e7e1f5)",
    overflow: "hidden",
  },
  btn: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid var(--ds-border, #e7e1f5)",
    background: "var(--ds-tint, #f7f5fc)",
    color: "var(--ds-ink, #221f1a)",
    fontSize: "1.3rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
    flexShrink: 0,
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--ds-muted, #655f74)",
    minWidth: "44px",
    textAlign: "center",
    fontFamily: "var(--ds-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
  },
  slider: {
    flex: 1,
    minWidth: 0,
    maxWidth: "140px",
    height: "6px",
    accentColor: "var(--ds-accent, #6c4fd6)",
  },
};

export default function PdfZoomControls({
  scale,
  onZoomIn,
  onZoomOut,
  onScaleChange,
}: PdfZoomControlsProps) {
  return (
    <div className="zoom-slide" style={mobileZoomStyles.container}>
      <button
        onClick={onZoomOut}
        style={mobileZoomStyles.btn}
        aria-label="Zoom out"
      >
        −
      </button>
      <span style={mobileZoomStyles.label}>
        {Math.round(scale * 100)}%
      </span>
      <input
        type="range"
        min={50}
        max={300}
        step={10}
        value={Math.round(scale * 100)}
        onChange={(e) => onScaleChange(parseInt(e.target.value, 10) / 100)}
        style={mobileZoomStyles.slider}
        aria-label="Zoom level"
      />
      <button
        onClick={onZoomIn}
        style={mobileZoomStyles.btn}
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
}
