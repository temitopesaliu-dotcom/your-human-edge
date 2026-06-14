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
    background: "#fff",
    borderBottom: "1px solid #e4ddd4",
    overflow: "hidden",
  },
  btn: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "1px solid #e4ddd4",
    background: "#f5f3ef",
    color: "#1a1040",
    fontSize: "1.3rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    flexShrink: 0,
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#4a3f6b",
    minWidth: "44px",
    textAlign: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  slider: {
    flex: 1,
    minWidth: 0,
    maxWidth: "140px",
    height: "6px",
    accentColor: "#534ab7",
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
