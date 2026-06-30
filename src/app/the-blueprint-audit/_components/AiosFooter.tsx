/**
 * Landing: Blueprint, Apply, Privacy, Terms
 * Blueprint: Home, Apply, Privacy, Terms
 * Apply: Home, Blueprint, Privacy
 * Confirmation/NotAFit: Home, Privacy
 */
export default function AiosFooter({
  variant = "landing",
}: {
  variant?: "landing" | "blueprint" | "apply" | "confirmation";
}) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} AI Operating System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
