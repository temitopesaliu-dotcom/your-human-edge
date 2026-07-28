"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { track, handleBuy as buyPlaybook } from "@/hooks/use-buy-playbook";
import SiteNav from "@/components/site-nav";
import './archetype-layout.css';
import type { ArchetypeConfig } from "./archetype-layout/types";
import ResultHero from "./archetype-layout/ResultHero";
import WhoYouAre from "./archetype-layout/WhoYouAre";
import CareerPaths from "./archetype-layout/CareerPaths";
import LeverageMatrix from "./archetype-layout/LeverageMatrix";
import Testimonials from "./archetype-layout/Testimonials";
import IncomeModel from "./archetype-layout/IncomeModel";
import Paywall from "./archetype-layout/Paywall";
import Footer from "./archetype-layout/Footer";

export type {
  CareerPath,
  BeforeAfterRow,
  CaseStudy,
  IncomeCard,
  ArchetypeConfig,
} from "./archetype-layout/types";

function getNameFromURL() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("name");
}

export default function ArchetypeResultLayout({ config }: { config: ArchetypeConfig }) {
  const [buying, setBuying] = useState(false);
  const [buyError, setBuyError] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [fallbackEmail, setFallbackEmail] = useState("");

  useEffect(() => {
    track("result_view", { archetype: config.archetypeKey });
  }, [config.archetypeKey]);

  async function onBuy(email?: string) {
    setBuyError("");
    setShowEmailInput(false);
    setBuying(true);
    try {
      const url = await buyPlaybook(config.archetypeKey, email);
      window.location.href = url;
    } catch (err: unknown) {
      setBuying(false);
      if (err instanceof Error && err.message === "EMAIL_REQUIRED") {
        setShowEmailInput(true);
      } else {
        setBuyError(err instanceof Error ? err.message : "Checkout unavailable.");
      }
    }
  }

  const name = useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    getNameFromURL,
    () => null
  );
  const greeting = name ? `${name}, meet your archetype.` : "Your result is in.";

  return (
      <div
  className="root"
  style={{
    '--primary': config.primaryColor,
    '--secondary': config.secondaryColor,
    '--nav-rgb': config.navRgb,
    '--hero-grad': config.heroGrad,
    '--cta-bg': config.ctaBg,
  } as React.CSSProperties}
>

      <SiteNav ctaLabel="Get the Playbook →" ctaHref="#paywall" />

      <ResultHero config={config} greeting={greeting} />
      <WhoYouAre config={config} />
      <CareerPaths config={config} />
      <LeverageMatrix config={config} />
      <Testimonials config={config} />
      <IncomeModel config={config} />
      <Paywall
        config={config}
        buying={buying}
        buyError={buyError}
        showEmailInput={showEmailInput}
        fallbackEmail={fallbackEmail}
        onFallbackEmailChange={setFallbackEmail}
        onBuy={onBuy}
      />
      <Footer />
    </div>
  );
}
