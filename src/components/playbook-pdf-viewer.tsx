"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { type ArchetypeKey } from "@/lib/archetypes";

// Import PDF CSS eagerly so it's available before the lazy-loaded renderer mounts
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const PDF_MAP: Record<ArchetypeKey, string> = {
  H: "/pdfs/Human_Bridge_Premium_Playbook.pdf",
  C: "/pdfs/Creative_Amplifier_Premium_Playbook.pdf",
  S: "/pdfs/Systems_Architect_Premium_Playbook.pdf",
  G: "/pdfs/Growth_Catalyst_Premium_Playbook.pdf",
};

interface PlaybookPdfViewerProps {
  archetypeKey: ArchetypeKey;
  userName?: string;
  userEmail?: string;
}

// Lazy-load the actual PDF renderer that imports react-pdf
const PdfRenderer = lazy(() => import("./pdf-renderer"));

const TOAST_STORAGE_KEY = "yhe_email_toast_shown";

export default function PlaybookPdfViewer({
  archetypeKey,
  userName,
  userEmail,
}: PlaybookPdfViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show toast if it hasn't been shown before
    if (userEmail) {
      const alreadyShown = (() => {
        try { return localStorage.getItem(TOAST_STORAGE_KEY) === "true"; } catch { return false; }
      })();
      setShowToast(!alreadyShown);
    }
  }, [userEmail]);

  const pdfUrl = PDF_MAP[archetypeKey];

  if (!pdfUrl) {
    return (
      <div style={errorStyles.container}>
        <p>No premium playbook available for this archetype.</p>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div style={rootStyles.container}>
        <nav style={navStyles.root}>
          <a href="/quiz" style={navStyles.logo}>Your Human Edge in the AI Era</a>
        </nav>
        <div style={rootStyles.loadingArea}>
          <div className="pb-spinner"></div>
          <p style={{ color: "#4a3f6b", fontSize: "0.95rem" }}>
            Loading your premium playbook...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pb-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .pb-spinner {
          width: 40px; height: 40px; border-radius: 50%;
          border: 3px solid #e4ddd4; border-top-color: #534ab7;
          animation: pb-spin 0.8s linear infinite;
        }
        @keyframes toast-in {
          0% { opacity: 0; transform: translateX(40px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toast-out {
          0% { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(40px) scale(0.95); }
        }
        body { padding-bottom: 0 !important; }

        /* Mobile responsive toast */
        @media (max-width: 640px) {
          .pb-toast {
            top: 8px !important;
            right: 8px !important;
            left: 8px !important;
            max-width: none !important;
            width: auto !important;
          }
        }
      `}</style>
      <div style={rootStyles.container}>
        {showToast && <EmailToast email={userEmail!} />}
        <Suspense
          fallback={
            <>
              <nav style={navStyles.root}>
                <a href="/quiz" style={navStyles.logo}>Your Human Edge in the AI Era</a>
              </nav>
              <div style={rootStyles.loadingArea}>
                <div className="pb-spinner"></div>
                <p style={{ color: "#4a3f6b", fontSize: "0.95rem" }}>
                  Loading your premium playbook...
                </p>
              </div>
            </>
          }
        >
          <PdfRenderer
            archetypeKey={archetypeKey}
            userName={userName}
            userEmail={userEmail}
            pdfUrl={pdfUrl}
          />
        </Suspense>
      </div>
    </>
  );
}

/** Top-right toast that shows once per session (localStorage). Auto-fades after 4s. */
function EmailToast({ email }: { email: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Mark as shown so it doesn't reappear on refresh
    try { localStorage.setItem("yhe_email_toast_shown", "true"); } catch {}
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="pb-toast"
      style={{
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 9999,
        background: "#fff",
        border: "1px solid #e2dbd0",
        borderRadius: "10px",
        padding: "10px 14px 10px 12px",
        boxShadow: "0 6px 28px rgba(26,16,64,0.1), 0 2px 8px rgba(26,16,64,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "9px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.82rem",
        color: "#4a3f6b",
        animation: visible ? "toast-in 0.35s ease-out" : "toast-out 0.3s ease-in forwards",
        pointerEvents: visible ? "auto" : "none",
        maxWidth: "340px",
      }}
    >
      <span style={{ fontSize: "1rem", flexShrink: 0, opacity: 0.7 }}>📧</span>
      <span>
        Sent to <strong style={{ color: "#534ab7", fontWeight: 600 }}>{email}</strong>
      </span>
    </div>
  );
}

/* ─── Styles ─── */

const rootStyles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    background: "#f5f3ef",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', sans-serif",
  },
  loadingArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "40px 20px",
  },
};

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
};

const errorStyles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "60px 24px",
    color: "#4a3f6b",
    fontSize: "1rem",
  },
};
