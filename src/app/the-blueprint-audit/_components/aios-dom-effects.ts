type Cleanup = () => void;

/** Toggles .scrolled on .nav past 20px of scroll. */
export function initNavScroll(): Cleanup | undefined {
  const nav = document.querySelector(".nav") as HTMLElement | null;
  if (!nav) return undefined;

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}

/** Hamburger toggle + auto-close mobile menu on link click. */
export function initMobileMenu(): Cleanup | undefined {
  const hamburger = document.querySelector(".nav-hamburger");
  const mobileMenu = document.querySelector(".nav-mobile-menu");
  if (!hamburger || !mobileMenu) return undefined;

  const handleHamburgerClick = () => {
    const open = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  hamburger.addEventListener("click", handleHamburgerClick);

  const linkClicks: Cleanup[] = [];
  mobileMenu.querySelectorAll("a").forEach((link) => {
    const handler = () => {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    };
    link.addEventListener("click", handler);
    linkClicks.push(() => link.removeEventListener("click", handler));
  });

  return () => {
    hamburger.removeEventListener("click", handleHamburgerClick);
    linkClicks.forEach((fn) => fn());
  };
}

/** Reveals .sticky-cta-bar once .hero scrolls out of view. */
export function initStickyCta(): Cleanup | undefined {
  const stickyCTA = document.querySelector(".sticky-cta-bar");
  const hero = document.querySelector(".hero");
  if (!stickyCTA || !hero) return undefined;

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      stickyCTA.classList.toggle("visible", !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: "0px 0px -100px 0px" }
  );
  heroObserver.observe(hero);
  return () => heroObserver.disconnect();
}

/** Adds .visible to .fade-up elements as they scroll into view (once each). */
export function initScrollReveal(): Cleanup | undefined {
  const fadeEls = document.querySelectorAll(".fade-up");
  if (!fadeEls.length) return undefined;

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  fadeEls.forEach((el) => revealObserver.observe(el));
  return () => revealObserver.disconnect();
}

/** Single-open .faq-item accordion driven by .faq-question clicks. */
export function initFaqAccordion(): Cleanup | undefined {
  const faqClicks: Cleanup[] = [];
  document.querySelectorAll(".faq-question").forEach((btn) => {
    const handler = () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const isOpen = item.classList.contains("open");
      document
        .querySelectorAll(".faq-item.open")
        .forEach((el) => el.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    };
    btn.addEventListener("click", handler);
    faqClicks.push(() => btn.removeEventListener("click", handler));
  });
  if (!faqClicks.length) return undefined;
  return () => faqClicks.forEach((fn) => fn());
}

/** .outcomes-tab / .outcome-panel tab switcher keyed by data-tab. */
export function initOutcomesTabs(): Cleanup | undefined {
  const tabs = document.querySelectorAll(".outcomes-tab");
  const panels = document.querySelectorAll(".outcome-panel");
  const tabClicks: Cleanup[] = [];
  tabs.forEach((tab) => {
    const handler = () => {
      const target = (tab as HTMLElement).dataset.tab;
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById("panel-" + target);
      if (panel) panel.classList.add("active");
    };
    tab.addEventListener("click", handler);
    tabClicks.push(() => tab.removeEventListener("click", handler));
  });
  if (!tabClicks.length) return undefined;
  return () => tabClicks.forEach((fn) => fn());
}

/** Highlights the hovered .timeline-step, reverting to the [data-default] one on leave. */
export function initTimelineHover(): Cleanup | undefined {
  const timelineEnters: Cleanup[] = [];
  const timelineLeaves: Cleanup[] = [];
  const steps = document.querySelectorAll(".timeline-step");
  steps.forEach((step) => {
    const enterHandler = () => {
      document
        .querySelectorAll(".timeline-step")
        .forEach((s) => s.classList.remove("highlight"));
      step.classList.add("highlight");
    };
    const leaveHandler = () => {
      const defaultHighlight = document.querySelector(
        ".timeline-step[data-default]"
      );
      if (defaultHighlight) {
        document
          .querySelectorAll(".timeline-step")
          .forEach((s) => s.classList.remove("highlight"));
        defaultHighlight.classList.add("highlight");
      }
    };
    step.addEventListener("mouseenter", enterHandler);
    step.addEventListener("mouseleave", leaveHandler);
    timelineEnters.push(() => step.removeEventListener("mouseenter", enterHandler));
    timelineLeaves.push(() => step.removeEventListener("mouseleave", leaveHandler));
  });
  if (!timelineEnters.length) return undefined;
  return () => {
    timelineEnters.forEach((fn) => fn());
    timelineLeaves.forEach((fn) => fn());
  };
}

/** Draws .diagram-line strokes in with a stagger once the diagram scrolls into view. */
export function initDiagramAnimation(): Cleanup | undefined {
  const diagramLines = document.querySelectorAll(".diagram-line");
  if (!diagramLines.length) return undefined;

  const diagramObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        diagramLines.forEach((line, i) => {
          setTimeout(() => {
            (line as HTMLElement).style.strokeDashoffset = "0";
            (line as HTMLElement).style.opacity = "1";
          }, i * 60);
        });
        diagramObserver.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  const diagramWrapper = document.querySelector(".ai-os-diagram-wrapper");
  if (diagramWrapper) diagramObserver.observe(diagramWrapper);
  return () => diagramObserver.disconnect();
}

/** Fades/slides .problem-card items in with a stagger once .problems-grid is visible. */
export function initProblemCardStagger(): Cleanup | undefined {
  const problemCards = document.querySelectorAll(".problem-card");
  if (!problemCards.length) return undefined;

  const pcObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        problemCards.forEach((card, i) => {
          setTimeout(() => {
            (card as HTMLElement).style.opacity = "1";
            (card as HTMLElement).style.transform = "translateY(0)";
          }, i * 60);
        });
        pcObserver.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  const problemsGrid = document.querySelector(".problems-grid");
  if (problemsGrid) {
    problemCards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(16px)";
      (card as HTMLElement).style.transition =
        "opacity 0.4s ease, transform 0.4s ease";
    });
    pcObserver.observe(problemsGrid);
  }
  return () => pcObserver.disconnect();
}

/** Smooth-scrolls same-page anchor links with an 80px offset for the fixed nav. */
export function initSmoothScroll(): Cleanup | undefined {
  const anchorClicks: Cleanup[] = [];
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const handler = (e: Event) => {
      const href = (link as HTMLAnchorElement).getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };
    link.addEventListener("click", handler);
    anchorClicks.push(() => link.removeEventListener("click", handler));
  });
  if (!anchorClicks.length) return undefined;
  return () => anchorClicks.forEach((fn) => fn());
}
