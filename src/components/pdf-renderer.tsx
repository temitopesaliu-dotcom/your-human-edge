"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import { type ArchetypeKey } from "@/lib/archetypes";
import PdfNav from "@/components/pdf-nav";
import PdfZoomControls from "@/components/pdf-zoom-controls";
import PdfPageNav from "@/components/pdf-page-nav";
import PdfDocumentArea from "@/components/pdf-document-area";

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
      const fitScale = Math.max(0.5, Math.min(w / 600, 1.0));
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
        const fitScale = Math.max(0.5, Math.min(w / 600, 1.0));
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

  const zoomIn = () => setScale((s) => Math.round(Math.min(s + 0.25, 3) * 100) / 100);
  const zoomOut = () => setScale((s) => Math.round(Math.max(s - 0.25, 0.5) * 100) / 100);

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
        touch-action: pan-x pan-y !important;
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

      <PdfNav
        pageNumber={pageNumber}
        numPages={numPages}
        isMobile={isMobile}
        scale={scale}
        showZoomControls={showZoomControls}
        onToggleZoom={() => setShowZoomControls((v) => !v)}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />

      {isMobile && showZoomControls && (
        <PdfZoomControls
          scale={scale}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onScaleChange={(s) => setScale(s)}
        />
      )}

      <PdfPageNav
        pageNumber={pageNumber}
        numPages={numPages}
        isMobile={isMobile}
        onGoToPage={goToPage}
      />

      <PdfDocumentArea
        ref={wrapperRef}
        pdfUrl={pdfUrl}
        pageNumber={pageNumber}
        scale={scale}
        isMobile={isMobile}
        loading={loading}
        error={error}
        wrapperWidth={wrapperRef.current?.clientWidth}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        onDocumentLoadError={onDocumentLoadError}
      />
    </>
  );
}
