/**
 * Per-variant footer links (Privacy, Terms, etc.) were planned but never
 * built — no Privacy/Terms pages exist in the app yet. `variant` is kept
 * as the intended seam for when those links are added.
 * Landing: Blueprint, Apply, Privacy, Terms
 * Blueprint: Home, Apply, Privacy, Terms
 * Apply: Home, Blueprint, Privacy
 * Confirmation/NotAFit: Home, Privacy
 */
export default function AiosFooter({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
