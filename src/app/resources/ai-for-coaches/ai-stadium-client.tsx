'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import { useEmailGate } from '@/lib/use-email-gate';
import EmailGateOverlay from '@/components/email-gate-overlay';
import LiveClassPopup from '@/components/live-class-popup';
import { StadiumStyles } from './stadium-styles';
import { GateHero } from './gates/gate-hero';
import { GateNav } from './gates/gate-nav';
import { Gate01Clone } from './gates/gate-01-clone';
import { Gate02Floor } from './gates/gate-02-floor';
import { Gate03Monetize } from './gates/gate-03-monetize';
import { Gate04Payout } from './gates/gate-04-payout';
import { Gate05Scoreboard } from './gates/gate-05-scoreboard';
import { Gate06Advanced } from './gates/gate-06-advanced';

type GateId = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6';

const GATE_LABELS: Record<GateId, { num: string; label: string }> = {
  g1: { num: 'Gate 01', label: 'The Clone' },
  g2: { num: 'Gate 02', label: 'The Floor' },
  g3: { num: 'Gate 03', label: 'Monetize' },
  g4: { num: 'Gate 04', label: 'The Payout' },
  g5: { num: 'Gate 05', label: 'Scoreboard' },
  g6: { num: 'Gate 06', label: 'Advanced' },
};

export default function AiStadiumClient() {
  const [activeGate, setActiveGate] = useState<GateId>('g1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType, gateError, gateSubmitting, handleGateSubmit,
  } = useEmailGate('ai-for-coaches');

  useEffect(() => {
    track('ai_stadium_view', { gate: activeGate }, '/resources/ai-for-coaches');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGateChange = useCallback((id: GateId) => {
    setActiveGate(id);
    track('ai_stadium_gate_switch', { gate: id }, '/resources/ai-for-coaches');
  }, []);

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1600);
  }, []);

  return (
    <>
      <StadiumStyles />

      <LiveClassPopup />

      <EmailGateOverlay
        gatePhase={gatePhase}
        title="AI for Teachers and Coaches"
        description="Enter your details below to unlock this free interactive guide — and get notified when new free resources drop."
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

      <div className="ai-stadium-root">
        <GateHero />

          <GateNav activeGate={activeGate} onGateChange={handleGateChange} />

        <div className="as-panels">
          {activeGate === 'g1' && <Gate01Clone copiedId={copiedId} onCopy={handleCopy} />}
          {activeGate === 'g2' && <Gate02Floor copiedId={copiedId} onCopy={handleCopy} />}
          {activeGate === 'g3' && <Gate03Monetize copiedId={copiedId} onCopy={handleCopy} />}
          {activeGate === 'g4' && <Gate04Payout copiedId={copiedId} onCopy={handleCopy} />}
          {activeGate === 'g5' && <Gate05Scoreboard />}
          {activeGate === 'g6' && <Gate06Advanced />}
        </div>
      </div>
    </>
  );
}
