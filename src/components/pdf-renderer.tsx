"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { type ArchetypeKey } from "@/lib/archetypes";

// Configure pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdfs/pdf.worker.min.mjs";

interface PdfRendererProps {
  archetypeKey: ArchetypeKey;
  userName?: string;
  userEmail?: string;
  pdfUrl: string;
}

const MOBILE_BREAKPOINT = 768;

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
  const [isMobile, setIsMobile] = useState(false);
  const [showZoomControls, setShowZoomControls] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-fit PDF width on mobile once loaded — use a lower initial scale
  // to reduce canvas bitmap size and memory usage on mobile devices.
  useEffect(() => {
    if (isMobile && wrapperRef.current && !loading) {
      const w = wrapperRef.current.clientWidth - 16;
      const fitScale = Math.max(0.4, Math.min(w / 600, 1.0));
      setScale((prev) => Math.min(prev, fitScale));
    }
  }, [isMobile, loading]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
      setError(null);
      // Auto-scale once we know the doc is loaded on mobile
      if (isMobile && wrapperRef.current) {
        const w = wrapperRef.current.clientWidth - 16;
        const fitScale = Math.max(0.4, Math.min(w / 600, 1.0));
        setScale(fitScale);
      }
    },
    [isMobile]
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
      {/* Responsive + animation styles */}
      <style>{`
        .react-pdf__Page {
          margin: 0 auto;
        }
        .react-pdf__message {
          padding: 40px 20px;
          text-align: center;
          color: #4a3f6b;
        }
        /* Allow browser pinch-zoom to work naturally on the canvas */
        .react-pdf__Page canvas {
          touch-action: pan-y pinch-zoom !important;
        }
        @keyframes pb-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .pb-spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 3px solid #e4ddd4; border-top-color: #534ab7;
          animation: pb-spin 0.8s linear infinite;
        }
        @keyframes zoomSlide {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 60px; }
        }
        .zoom-slide {
          animation: zoomSlide 0.2s ease-out;
        }
      `}</style>

      {/* ── Nav bar ── */}
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
              onClick={() => setShowZoomControls((v) => !v)}
              style={navStyles.zoomToggleBtn}
              aria-label="Toggle zoom controls"
            >
              {showZoomControls ? "✕" : "Zoom"}
            </button>
          ) : (
            <>
              <button
                onClick={zoomOut}
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
                onClick={zoomIn}
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

      {/* ── Mobile collapsible zoom controls ── */}
      {isMobile && showZoomControls && (
        <div className="zoom-slide" style={mobileZoomStyles.container}>
          <button
            onClick={zoomOut}
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
            onChange={(e) => setScale(parseInt(e.target.value, 10) / 100)}
            style={mobileZoomStyles.slider}
            aria-label="Zoom level"
          />
          <button
            onClick={zoomIn}
            style={mobileZoomStyles.btn}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      )}

      {/* ── Page navigation bar ── */}
      <div
        style={{
          ...pageNavStyles.bar,
          ...(isMobile ? pageNavStyles.barMobile : {}),
        }}
      >
        <button
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber <= 1}
          style={{
            ...pageNavStyles.btn,
            ...(isMobile ? pageNavStyles.btnMobile : {}),
            opacity: pageNumber <= 1 ? 0.4 : 1,
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
          aria-label="Previous page"
        >
          ←
        </button>

        <div
          style={{
            ...pageNavStyles.jump,
            ...(isMobile ? pageNavStyles.jumpMobile : {}),
          }}
        >
          {isMobile ? (
            <>
              <span>Page</span>
              <input
                type="number"
                min={1}
                max={numPages || 1}
                value={pageNumber}
                onChange={(e) => goToPage(parseInt(e.target.value, 10) || 1)}
                style={{
                  ...pageNavStyles.input,
                  ...(isMobile ? pageNavStyles.inputMobile : {}),
                }}
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
                onChange={(e) => goToPage(parseInt(e.target.value, 10) || 1)}
                style={pageNavStyles.input}
              />
            </>
          )}
        </div>

        <button
          onClick={() => goToPage(pageNumber + 1)}
          disabled={numPages !== null && pageNumber >= numPages}
          style={{
            ...pageNavStyles.btn,
            ...(isMobile ? pageNavStyles.btnMobile : {}),
            opacity: numPages !== null && pageNumber >= numPages ? 0.4 : 1,
            cursor:
              numPages !== null && pageNumber >= numPages
                ? "not-allowed"
                : "pointer",
          }}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      {/* ── PDF document area ── */}
      <div
        ref={wrapperRef}
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
                ? Math.min(wrapperRef.current?.clientWidth ?? 600, 600)
                : undefined
            }
          />
        </Document>
      </div>
    </>
  );
}

/* ─── Styles ─── */

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
  rootMobile: {
    padding: "0 14px",
    height: "54px",
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
    color: "rgba(255,255,255,0.6)",
    marginRight: "4px",
    whiteSpace: "nowrap",
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
  zoomToggleBtn: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "0.78rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    minHeight: "44px",
    whiteSpace: "nowrap",
  },
  zoomLevel: {
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.6)",
    minWidth: "40px",
    textAlign: "center",
  },
};

const mobileZoomStyles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
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
    maxWidth: "200px",
    height: "6px",
    accentColor: "#534ab7",
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
  barMobile: {
    padding: "8px 12px",
    gap: "8px",
    position: "sticky",
    top: "54px",
    zIndex: 50,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
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
    minHeight: "36px",
  },
  btnMobile: {
    padding: "10px 20px",
    minWidth: "48px",
    minHeight: "44px",
    fontSize: "1rem",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  jump: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.85rem",
    color: "#4a3f6b",
  },
  jumpMobile: {
    fontSize: "0.82rem",
    gap: "4px",
    flex: 1,
    justifyContent: "center",
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
  inputMobile: {
    width: "52px",
    padding: "8px 6px",
    fontSize: "0.95rem",
    minHeight: "40px",
    borderRadius: "8px",
  },
};

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


