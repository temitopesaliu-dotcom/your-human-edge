import Link from "next/link";
import { demos, type Demo } from "@/data/demos";
import styles from "./demos.module.css";

// Number of open "Coming soon" slots kept at the end of the grid.
const PLACEHOLDER_SLOTS = 4;

function DemoCard({ demo }: { demo: Demo }) {
  return (
    <a
      href={demo.file}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.demoCard}
    >
      <div className={styles.demoCardBody}>
        <h2>{demo.title}</h2>
        <span className={styles.demoTag}>{demo.tag}</span>
        <p>{demo.description}</p>
        <span className={styles.demoCta}>Open Demo →</span>
      </div>
    </a>
  );
}

function PlaceholderCard() {
  return (
    <div className={styles.placeholder} aria-hidden="true">
      <div className={styles.placeholderBody}>
        <div className={styles.placeholderIcon} />
        <h3 className={styles.placeholderTitle}>Your product here</h3>
        <p className={styles.placeholderText}>
          The next demo is in the works — a system built around a specific
          business, its workflow and its goals.
        </p>
        <span className={styles.placeholderLabel}>Coming Soon</span>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Sample Solutions — AI Operating System",
  description:
    "Working demos of AI Operating Systems built for real businesses. See what a system built around your workflow looks like in practice.",
};

export default function DemosPage() {
  return (
    <div className={styles.page}>
      {/* Ambient background */}
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* Nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <span className={styles.navLogoDot} aria-hidden="true" />
          Home
        </Link>
        <Link href="/the-blueprint-audit" className={styles.navBack}>
          ← Back to the Audit
        </Link>
      </nav>

      {/* Page Header */}
      <header className={styles.pageHeader}>
        <span className={styles.label}>Sample Solutions</span>
        <h1>What a system built for you looks like.</h1>
        <p className={styles.subhead}>
          Every system below was built around how a specific business actually
          runs. Open one — see what an AI Operating System looks like in
          practice.
        </p>
        <span className={styles.demoNotice}>
          <span>
            These are example builds. <strong>Every product you see is a
            demo</strong> — built to show you what&apos;s possible.
          </span>
        </span>
      </header>

      {/* Grid */}
      <section className={styles.gridWrapper}>
        <div className={styles.grid}>
          {demos.map((demo) => (
            <DemoCard key={demo.slug} demo={demo} />
          ))}
          {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, i) => (
            <PlaceholderCard key={`placeholder-${i}`} />
          ))}
        </div>
      </section>

      {/* Bottom CTA band */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaText}>
          <h2>Want one built for your business?</h2>
          <p>
            Everything here is a demo. Your version gets built around your
            exact workflow, audience, and goals.
          </p>
        </div>
        <Link href="/the-blueprint-audit/apply" className={styles.ctaBtn}>
          Apply for the Audit →
        </Link>
      </div>
    </div>
  );
}
