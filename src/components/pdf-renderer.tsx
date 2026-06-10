"use client";

import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { type ArchetypeKey } from "@/lib/archetypes";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfs/pdf.worker.min.mjs";

interface PdfRendererProps {
  archetypeKey: ArchetypeKey;
  userName?: string;
  userEmail?: string;
  pdfUrl: string;
}

export default function PdfRenderer({
  archetypeKey: _archetypeKey,
  userName,
  userEmail,
  pdfUrl,
}: PdfRendererProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((err: Error) => {
    setLoading(false);
    setError(err.message || "Failed to load PDF");
  }, []);

  const goToPage = (page: number) => {
    if (numPages) {
      setPageNumber(Math.max(1, Math.min(page, numPages)));
    }
  };

  const zoomIn = () => setScale((s) => Math.min(s + 0.25, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5));

  return (
    <>
      {/* Nav bar matching quiz page style */}
      <nav style={navStyles.root}>
        <a href="/quiz" style={navStyles.logo}>Your Human Edge in the AI Era</a>
        <div style={navStyles.right}>
          <span style={navStyles.pageInfo}>
            Page {pageNumber} of {numPages || "--"}
          </span>
          <button onClick={zoomOut} style={navStyles.btn} title="Zoom out">−</button>
          <span style={navStyles.zoomLevel}>{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} style={navStyles.btn} title="Zoom in">+</button>
        </div>
      </nav>

      <div style={pageNavStyles.bar}>
        <button
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber <= 1}
          style={{
            ...pageNavStyles.btn,
            opacity: pageNumber <= 1 ? 0.4 : 1,
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
        >
          ← Previous
        </button>
        <div style={pageNavStyles.jump}>
          <span>Go to page:</span>
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={(e) => goToPage(parseInt(e.target.value, 10) || 1)}
            style={pageNavStyles.input}
          />
        </div>
        <button
          onClick={() => goToPage(pageNumber + 1)}
          disabled={numPages !== null && pageNumber >= numPages}
          style={{
            ...pageNavStyles.btn,
            opacity: numPages !== null && pageNumber >= numPages ? 0.4 : 1,
            cursor: numPages !== null && pageNumber >= numPages ? "not-allowed" : "pointer",
          }}
        >
          Next →
        </button>
      </div>

      <div style={docStyles.wrapper}>
        {loading && (
          <div style={docStyles.overlay}>
            <div className="pb-spinner"></div>
            <p style={{ color: "#4a3f6b", fontSize: "0.95rem" }}>
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
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </>
  );
}

const navStyles: Record<string, React.CSSProperties> = {
  root: {
    position: "sticky",
    top: 0,
    zIndex: 99,
    background: "rgba(26,16,64,.94)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,.07)",
    padding: "0 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "62px",
    fontFamily: "'DM Sans', sans-serif",
  },
  logo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: ".95rem",
    fontWeight: 500,
    color: "rgba(255,255,255,.9)",
    letterSpacing: ".04em",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  pageInfo: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.6)",
    marginRight: "4px",
  },
  btn: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
  zoomLevel: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.6)",
    minWidth: "40px",
    textAlign: "center",
  },
};

const pageNavStyles: Record<string, React.CSSProperties> = {
  bar: {
    background: "#fff",
    borderBottom: "1px solid #e4ddd4",
    padding: "8px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  btn: {
    background: "#f5f3ef",
    border: "1px solid #e4ddd4",
    borderRadius: "8px",
    padding: "6px 16px",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#1a1040",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  jump: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.85rem",
    color: "#4a3f6b",
  },
  input: {
    width: "60px",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #e4ddd4",
    fontSize: "0.85rem",
    textAlign: "center",
    fontFamily: "'DM Sans', sans-serif",
  },
};

const docStyles: Record<string, React.CSSProperties> = {
  wrapper: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    padding: "20px 12px",
    position: "relative",
    minHeight: "500px",
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
