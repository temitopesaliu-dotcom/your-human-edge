'use client';
import { useState, useEffect, useRef } from 'react';
import {
  isLocallySubscribed,
  markLocallySubscribed,
  checkRemoteSubscriber,
} from '@/lib/services/subscriber';
import { isValidEmail } from '@/lib/utils/validation';
import { useAsyncForm } from '@/hooks/use-async-form';
import type { SubscribeRequest, SubscribeResponse } from '@/types/subscribe';

export type GatePhase = 'gate' | 'checking' | 'content' | null;
export type SignupRole = 'professional' | 'creator' | 'coach' | 'consultant' | 'founder' | 'company';

export function useEmailGate(source: string) {
  const [gatePhase, setGatePhase] = useState<GatePhase>(null);
  const [gateName, setGateName] = useState('');
  const [gateEmail, setGateEmail] = useState('');
  const [gateType, setGateType] = useState<SignupRole>('professional');
  const [gateError, setGateError] = useState('');
  const { status: subscribeStatus, submit: submitSubscribe } = useAsyncForm<SubscribeRequest, SubscribeResponse>({
    url: '/api/subscribe',
  });
  const gateSubmitting = subscribeStatus === 'submitting';
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
      // Deliberately synchronous: isLocallySubscribed() reads localStorage,
      // which isn't available during SSR. Computing gatePhase during render
      // instead would read browser-only state and cause a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    if (!isValidEmail(email)) {
      setGateError('Please enter a valid email address.');
      return;
    }

    const result = await submitSubscribe({ email, name, archetype: 'H', source, signupType: gateType });
    if (!mountedRef.current) return;

    if (!result.ok) {
      setGateError(result.error || 'Something went wrong.');
      return;
    }

    markLocallySubscribed(name, email);
    setGatePhase('content');
  }

  return {
    gatePhase, gateName, setGateName, gateEmail, setGateEmail,
    gateType, setGateType: setGateType as (v: SignupRole) => void, gateError, gateSubmitting, handleGateSubmit,
  };
}

