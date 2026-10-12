import Link from "next/link";
import { demos, type Demo } from "@/data/demos";
import styles from "./demos.module.css";

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

export const metadata = {
  title: "Sample Builds | AI Operating System",
  description:
    "Sample AI Operating Systems for five kinds of business. See what an architecture from the Blueprint Audit looks like before you book.",
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
          Five sample builds, each designed around how that kind of business
          runs. Open one to see the level of detail your own architecture
          gets.
        </p>
        <span className={styles.demoNotice}>
          <span>
            These are sample builds for fictional businesses. <strong>None
            of them is client work</strong>. They show what&apos;s possible.
          </span>
        </span>
      </header>

      {/* Grid */}
      <section className={styles.gridWrapper}>
        <div className={styles.grid}>
          {demos.map((demo) => (
            <DemoCard key={demo.slug} demo={demo} />
          ))}
        </div>
      </section>

      {/* Bottom CTA band */}
      <div className={styles.ctaBand}>
        <div className={styles.ctaText}>
          <h2>Want one built for your business?</h2>
          <p>
            Start with your free blueprint. It takes about three minutes and
            shows where AI fits in your business.
          </p>
        </div>
        <Link href="/the-blueprint-audit/apply" className={styles.ctaBtn}>
          Get My Blueprint →
        </Link>
      </div>
    </div>
  );
}
