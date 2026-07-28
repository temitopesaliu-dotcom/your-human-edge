"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import "@/components/features/intel/intel.css";
import LiveClassPopup from "@/components/live-class-popup";
import { useAsyncForm } from "@/hooks/use-async-form";
import { isValidEmail } from "@/lib/utils/validation";
import type { IntelSubscribeRequest, IntelSubscribeResponse } from "@/types/intel-subscribe";
import { Q, LAYERS, STACKS, DEFAULT_STACK, PRICING, STEPS, TIERS, domainKey, type IntelResult } from "@/components/features/intel/intel.data";
import Nav from "@/components/features/intel/Nav";
import Hero from "@/components/features/intel/Hero";
import EntryScreen from "@/components/features/intel/EntryScreen";
import QuizScreen from "@/components/features/intel/QuizScreen";
import GateScreen from "@/components/features/intel/GateScreen";
import ResultScreen from "@/components/features/intel/ResultScreen";
import Footer from "@/components/features/intel/Footer";

export default function IntelHomePage() {
  const [screen, setScreen] = useState<"entry" | "quiz" | "gate" | "result">(
    "entry"
  );
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<IntelResult | null>(null);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const { status: intelSubscribeStatus, submit: submitIntelSubscribe } = useAsyncForm<
    IntelSubscribeRequest,
    IntelSubscribeResponse
  >({ url: "/api/intel-subscribe" });
  const gateSubmitting = intelSubscribeStatus === "submitting";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (screen === "quiz" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [screen, cur]);

  const pct = Math.round(((cur + 1) / 7) * 100);
  const q = Q[cur];

  const handleScrollToQuiz = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document
      .getElementById("quiz")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const startQuiz = useCallback(() => {
    setScreen("quiz");
    setCur(0);
  }, []);

  const selectOption = useCallback(
    (key: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleTextarea = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const goNext = useCallback(() => {
    if (cur < Q.length - 1) {
      setCur((c) => c + 1);
    } else {
      setScreen("gate");
    }
  }, [cur]);

  const goBack = useCallback(() => {
    if (cur > 0) setCur((c) => c - 1);
  }, [cur]);

  const revealResult = useCallback(async () => {
    // Fire-and-forget: add subscriber to FREE_INTELLIGENCE_LAYER group
    if (gateEmail && isValidEmail(gateEmail)) {
      const result = await submitIntelSubscribe({ email: gateEmail, name: gateName });
      if (!result.ok) {
        console.error("[intel] subscribe failed:", result.error);
      }
    }

    const tier = TIERS[answers.years] || "Established Expert";
    const domain = (answers.domain || "Business").split(" / ")[0];
    const dk = domainKey(domain);
    const pricing = PRICING[answers.goal] || PRICING["Launch a consulting or advisory offer"];
    const steps = STEPS[answers.time] || STEPS["3 to 7 hours a week"];
    const stack = STACKS[dk] || DEFAULT_STACK;
    const layer = LAYERS[dk] || LAYERS.Business;

    setResult({
      badge: `${tier} · ${domain}`,
      name: `You are a ${tier} in ${domain}.`,
      sub: "Here is exactly how your expertise becomes an AI-powered offer — and what it is worth.",
      layer,
      stack,
      pricing,
      steps,
    });
    setScreen("result");
  }, [answers, gateEmail, gateName, submitIntelSubscribe]);

  const handlePopupRegister = useCallback(() => {
    window.location.href = "/workshop";
  }, []);

  return (
    <>
      <LiveClassPopup onRegister={handlePopupRegister} />

      <Nav />

      <Hero onScrollToQuiz={handleScrollToQuiz} />

      <section className="ilp-quiz-section" id="quiz">
        <div className="ilp-quiz-card">
          {screen === "entry" && <EntryScreen onStart={startQuiz} />}

          {screen === "quiz" && (
            <QuizScreen
              question={q}
              cur={cur}
              pct={pct}
              answers={answers}
              textareaRef={textareaRef}
              onSelectOption={selectOption}
              onTextarea={handleTextarea}
              onBack={goBack}
              onNext={goNext}
            />
          )}

          {screen === "gate" && (
            <GateScreen
              gateName={gateName}
              gateEmail={gateEmail}
              gateSubmitting={gateSubmitting}
              onNameChange={setGateName}
              onEmailChange={setGateEmail}
              onSubmit={revealResult}
            />
          )}

          {screen === "result" && result && <ResultScreen result={result} />}
        </div>
      </section>

      <Footer />
    </>
  );
}
