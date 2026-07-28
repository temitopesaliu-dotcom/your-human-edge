"use client";

import { useEffect } from "react";
import {
  initNavScroll,
  initMobileMenu,
  initStickyCta,
  initScrollReveal,
  initFaqAccordion,
  initOutcomesTabs,
  initTimelineHover,
  initDiagramAnimation,
  initProblemCardStagger,
  initSmoothScroll,
} from "./aios-dom-effects";

export default function AiosScripts() {
  useEffect(() => {
    const cleanups = [
      initNavScroll(),
      initMobileMenu(),
      initStickyCta(),
      initScrollReveal(),
      initFaqAccordion(),
      initOutcomesTabs(),
      initTimelineHover(),
      initDiagramAnimation(),
      initProblemCardStagger(),
      initSmoothScroll(),
    ].filter((fn): fn is () => void => typeof fn === "function");

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
