"use client";

import React, { forwardRef } from "react";
import { Document, Page } from "react-pdf";

interface PdfDocumentAreaProps {
  pdfUrl: string;
  pageNumber: number;
  scale: number;
  isMobile: boolean;
  loading: boolean;
  error: string | null;
  wrapperWidth: number | undefined;
  onDocumentLoadSuccess: (params: { numPages: number }) => void;
  onDocumentLoadError: (err: Error) => void;
}

const docStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 12px",
    position: "relative",
    minHeight: "500px",
  },
  wrapperMobile: {
    padding: "8px 4px 20px",
    minHeight: "400px",
    overflowX: "auto",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  overlayMobile: {
    gap: "12px",
    padding: "0 20px",
  },
};

const errStyles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "60px 24px",
    color: "#4a3f6b",
    fontSize: "1rem",
  },
  detail: { color: "#c94f2a", fontSize: "0.82rem", marginTop: "8px" },
};

const PdfDocumentArea = forwardRef<HTMLDivElement, PdfDocumentAreaProps>(
  function PdfDocumentArea(
    {
      pdfUrl,
      pageNumber,
      scale,
      isMobile,
      loading,
      error,
      wrapperWidth,
      onDocumentLoadSuccess,
      onDocumentLoadError,
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        style={{
          ...docStyles.wrapper,
          ...(isMobile ? docStyles.wrapperMobile : {}),
        }}
      >
        {loading && (
          <div
            style={{
              ...docStyles.overlay,
              ...(isMobile ? docStyles.overlayMobile : {}),
            }}
          >
            <div className="pb-spinner"></div>
            <p
              style={{
                color: "#4a3f6b",
                fontSize: isMobile ? "0.85rem" : "0.95rem",
              }}
            >
              Loading your premium playbook...
            </p>
          </div>
        )}

        {error && (
          <div style={errStyles.container}>
            <p>⚠️ Unable to load your playbook.</p>
            <p style={errStyles.detail}>{error}</p>
            <p>Please try refreshing the page or contact support.</p>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={!isMobile}
            renderAnnotationLayer={!isMobile}
            width={
              isMobile
                ? Math.min(wrapperWidth ?? 600, 600)
                : undefined
            }
          />
        </Document>
      </div>
    );
  }
);

export default PdfDocumentArea;
