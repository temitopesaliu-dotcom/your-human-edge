'use client';
import { useState, useEffect, useRef } from 'react';
import {
  isLocallySubscribed,
  markLocallySubscribed,
  checkRemoteSubscriber,
} from '@/lib/subscriber';

export type GatePhase = 'gate' | 'checking' | 'content' | null;
export type SignupRole = 'professional' | 'creator' | 'coach' | 'consultant' | 'founder' | 'company';

export function useEmailGate(source: string) {
  const [gatePhase, setGatePhase] = useState<GatePhase>(null);
  const [gateName, setGateName] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateType, setGateType] = useState<SignupRole>('professional');
  const [gateError, setGateError] = useState('');
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    // Safety timeout: if still null after 3s, show the gate
    const safety = setTimeout(() => {
      if (mountedRef.current && gatePhase === null) {
        setGatePhase('gate');
      }
    }, 3000);

    if (isLocallySubscribed()) {
      clearTimeout(safety);
      setGatePhase('content');
      return;
    }
    const storedEmail = (() => {
      try { return localStorage.getItem('yhe_email'); } catch { return null; }
    })();
    if (!storedEmail) {
      clearTimeout(safety);
      setGatePhase('gate');
      return;
    }
    setGatePhase('checking');
    checkRemoteSubscriber(storedEmail).then(subscribed => {
      if (!mountedRef.current) return;
      clearTimeout(safety);
      if (subscribed) {
        const storedName = (() => {
          try { return localStorage.getItem('yhe_name') || ''; } catch { return ''; }
        })();
        markLocallySubscribed(storedName, storedEmail);
        setGatePhase('content');
      } else {
        try {
          localStorage.removeItem('yhe_subscribed');
          localStorage.removeItem('yhe_name');
          localStorage.removeItem('yhe_email');
        } catch (e) { console.error('[email-gate] localStorage cleanup failed:', e); }
        setGatePhase('gate');
      }
    }).catch(() => {
      if (!mountedRef.current) return;
      clearTimeout(safety);
      setGatePhase('gate');
    });

    return () => clearTimeout(safety);
  }, []);

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGateError('');
    const name = gateName.trim();
    const email = gateEmail.trim().toLowerCase();
    if (!name || !email) { setGateError('Please fill in both fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGateError('Please enter a valid email address.');
      return;
    }
    setGateSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, archetype: 'H', source, signupType: gateType }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }
      if (!mountedRef.current) return;
      markLocallySubscribed(name, email);
      setGatePhase('content');
    } catch (err: unknown) {
      if (!mountedRef.current) return;
      setGateError(err instanceof Error ? err.message : 'Something went wrong.');
      setGateSubmitting(false);
    }
  }

  return {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType: setGateType as (v: SignupRole) => void, gateError, gateSubmitting, handleGateSubmit,
  };
}

