import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-brand">human<span>+</span>ai</div>
      <ul className="f-links">
        <li><Link href="/quiz">Take the quiz</Link></li>
        <li><Link href="/resources">Resources</Link></li>
      </ul>
      <div style={{ fontSize: '.7rem', opacity: 0.25 }}>
        &copy; 2026
      </div>
    </footer>
  );
}
