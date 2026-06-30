"use client";

import { useEffect } from "react";

export default function AiosScripts() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    /* 1. NAVIGATION — scroll behaviour + mobile menu */
    const nav = document.querySelector(".nav") as HTMLElement | null;
    const hamburger = document.querySelector(".nav-hamburger");
    const mobileMenu = document.querySelector(".nav-mobile-menu");

    if (nav) {
      const onScroll = () => {
        nav.classList.toggle("scrolled", window.scrollY > 20);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    if (hamburger && mobileMenu) {
      const handleHamburgerClick = () => {
        const open = hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      };
      hamburger.addEventListener("click", handleHamburgerClick);

      const linkClicks: (() => void)[] = [];
      mobileMenu.querySelectorAll("a").forEach((link) => {
        const handler = () => {
          hamburger.classList.remove("open");
          mobileMenu.classList.remove("open");
          document.body.style.overflow = "";
        };
        link.addEventListener("click", handler);
        linkClicks.push(() => link.removeEventListener("click", handler));
      });

      cleanups.push(() => {
        hamburger.removeEventListener("click", handleHamburgerClick);
        linkClicks.forEach((fn) => fn());
      });
    }

    /* 2. STICKY CTA BAR — appears after hero scrolls out */
    const stickyCTA = document.querySelector(".sticky-cta-bar");
    const hero = document.querySelector(".hero");
    let heroObserver: IntersectionObserver | undefined;

    if (stickyCTA && hero) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          stickyCTA.classList.toggle("visible", !entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "0px 0px -100px 0px" }
      );
      heroObserver.observe(hero);
      cleanups.push(() => heroObserver?.disconnect());
    }

    /* 3. SCROLL REVEAL — .fade-up elements */
    const fadeEls = document.querySelectorAll(".fade-up");
    let revealObserver: IntersectionObserver | undefined;
    if (fadeEls.length) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      fadeEls.forEach((el) => revealObserver!.observe(el));
      cleanups.push(() => revealObserver?.disconnect());
    }

    /* 4. FAQ ACCORDION */
    const faqClicks: (() => void)[] = [];
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
    if (faqClicks.length) cleanups.push(() => faqClicks.forEach((fn) => fn()));

    /* 5. OUTCOMES TABS */
    const tabs = document.querySelectorAll(".outcomes-tab");
    const panels = document.querySelectorAll(".outcome-panel");
    const tabClicks: (() => void)[] = [];
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
    if (tabClicks.length) cleanups.push(() => tabClicks.forEach((fn) => fn()));

    /* 6. TIMELINE HOVER HIGHLIGHT */
    const timelineEnters: (() => void)[] = [];
    const timelineLeaves: (() => void)[] = [];
    document.querySelectorAll(".timeline-step").forEach((step) => {
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
    if (timelineEnters.length) {
      cleanups.push(() => {
        timelineEnters.forEach((fn) => fn());
        timelineLeaves.forEach((fn) => fn());
      });
    }

    /* 7. AI OS DIAGRAM — draw lines animation */
    const diagramLines = document.querySelectorAll(".diagram-line");
    let diagramObserver: IntersectionObserver | undefined;
    if (diagramLines.length) {
      diagramObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            diagramLines.forEach((line, i) => {
              setTimeout(() => {
                (line as HTMLElement).style.strokeDashoffset = "0";
                (line as HTMLElement).style.opacity = "1";
              }, i * 60);
            });
            diagramObserver?.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      const diagramWrapper = document.querySelector(".ai-os-diagram-wrapper");
      if (diagramWrapper) diagramObserver.observe(diagramWrapper);
      cleanups.push(() => diagramObserver?.disconnect());
    }

    /* 8. PROBLEM CARDS — stagger entrance */
    const problemCards = document.querySelectorAll(".problem-card");
    let pcObserver: IntersectionObserver | undefined;
    if (problemCards.length) {
      pcObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            problemCards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = "1";
                (card as HTMLElement).style.transform = "translateY(0)";
              }, i * 60);
            });
            pcObserver?.disconnect();
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
      cleanups.push(() => pcObserver?.disconnect());
    }

    /* 9. SMOOTH SCROLL for anchor links */
    const anchorClicks: (() => void)[] = [];
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
    if (anchorClicks.length) {
      cleanups.push(() => anchorClicks.forEach((fn) => fn()));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
