'use client';
import { useState, useCallback } from 'react';
import { useEmailGate } from '@/hooks/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import SiteNav from '@/components/site-nav';
import '@/components/features/b2b-lead-acquisition-prompt/b2b-prompt.css';
import { PROMPT_TEXT } from '@/components/features/b2b-lead-acquisition-prompt/b2b-prompt.data';
import Hero from '@/components/features/b2b-lead-acquisition-prompt/Hero';
import StagesSection from '@/components/features/b2b-lead-acquisition-prompt/StagesSection';
import PromptBox from '@/components/features/b2b-lead-acquisition-prompt/PromptBox';
import HowToUse from '@/components/features/b2b-lead-acquisition-prompt/HowToUse';
import Footer from '@/components/features/b2b-lead-acquisition-prompt/Footer';

export default function B2BPromptClient() {
  const [copied, setCopied] = useState(false);

  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('b2b-prompt');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <>
      {gatePhase === null && (
        <div className="b2b-loading">
          <div className="b2b-loading-spin" />
          <p>Loading resource…</p>
        </div>
      )}

      <EmailGateOverlay
        gatePhase={gatePhase}
        title="B2B Lead Acquisition Prompt"
        description="Enter your details below to unlock this free resource — and get notified when new resources drop."
        gateName={gateName}
        setGateName={setGateName}
        gateEmail={gateEmail}
        setGateEmail={setGateEmail}
        gateType={gateType}
        setGateType={setGateType}
        gateError={gateError}
        gateSubmitting={gateSubmitting}
        onSubmit={handleGateSubmit}
      />
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        background: 'var(--warm)',
        color: 'var(--ink)',
        minHeight: '100dvh',
      }}>

        <SiteNav />

        <Hero />

        <div
          className="b2b-content-pad"
          style={{ maxWidth: 860, margin: '0 auto', padding: '56px 28px 100px' }}
        >
          <StagesSection />
          <PromptBox copied={copied} onCopy={handleCopy} />
          <HowToUse />
        </div>

        <Footer />
      </div>
    </>
  );
}
