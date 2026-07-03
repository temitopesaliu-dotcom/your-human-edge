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

/* ── Spinner keyframe — minimal, can't be expressed purely in Tailwind ── */
const SPINNER_CSS = `
  @keyframes pb-spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes toast-in {
    0%   { opacity: 0; transform: translateX(40px) scale(0.95); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes toast-out {
    0%   { opacity: 1; transform: translateX(0) scale(1); }
    100% { opacity: 0; transform: translateX(40px) scale(0.95); }
  }
  body { padding-bottom: 0 !important; }
  @media (max-width: 640px) {
    .pb-toast {
      top: calc(54px + env(safe-area-inset-top) + 8px) !important;
      right: 8px !important;
      left: 8px !important;
      max-width: none !important;
      width: auto !important;
    }
  }
`;

function Spinner() {
  return (
    <div
      className="w-10 h-10 rounded-full border-[3px] border-[#e4ddd4] border-t-[#534ab7]"
      style={{ animation: 'pb-spin 0.8s linear infinite' }}
    />
  );
}

function PdfNav() {
  return (
    <nav className="sticky top-0 z-[99] bg-[rgba(26,16,64,0.94)] backdrop-blur-[14px] border-b border-white/[0.07] px-8 flex items-center h-[62px]">
      <a
        href="/quiz"
        className="font-['Cormorant_Garamond',Georgia,serif] text-[0.95rem] font-medium text-white/90 tracking-[0.04em] no-underline whitespace-nowrap"
      >
        Your Human Edge in the AI Era
      </a>
    </nav>
  );
}

export default function PlaybookPdfViewer({
  archetypeKey,
  userName,
  userEmail,
}: PlaybookPdfViewerProps) {
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      <div className="text-center px-6 py-[60px] text-[#4a3f6b] text-base">
        <p>No premium playbook available for this archetype.</p>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-[#f5f3ef] flex flex-col font-['DM_Sans',sans-serif]">
        <style>{SPINNER_CSS}</style>
        <PdfNav />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 py-10">
          <Spinner />
          <p className="text-[#4a3f6b] text-[0.95rem]">Loading your premium playbook...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{SPINNER_CSS}</style>
      <div className="min-h-dvh bg-[#f5f3ef] flex flex-col font-['DM_Sans',sans-serif]">
        {showToast && <EmailToast email={userEmail!} />}
        <Suspense
          fallback={
            <>
              <PdfNav />
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-5 py-10">
                <Spinner />
                <p className="text-[#4a3f6b] text-[0.95rem]">Loading your premium playbook...</p>
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

/** Top-right toast that shows once per session (localStorage). Auto-fades after 4.5s. */
function EmailToast({ email }: { email: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try { localStorage.setItem("yhe_email_toast_shown", "true"); } catch (e) { console.warn('[playbook] Failed to set toast flag:', e); }
    const timer = setTimeout(() => setVisible(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="pb-toast fixed top-4 right-4 z-[9999] bg-white border border-[#e2dbd0] rounded-[10px] px-[14px] py-[10px] pl-3 shadow-[0_6px_28px_rgba(26,16,64,0.1),0_2px_8px_rgba(26,16,64,0.06)] flex items-center gap-[9px] font-['DM_Sans',sans-serif] text-[0.82rem] text-[#4a3f6b] max-w-[340px]"
      style={{
        animation: visible ? 'toast-in 0.35s ease-out' : 'toast-out 0.3s ease-in forwards',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span className="text-[1rem] flex-shrink-0 opacity-70">📧</span>
      <span>
        Sent to <strong className="text-[#534ab7] font-semibold">{email}</strong>
      </span>
    </div>
  );
}
