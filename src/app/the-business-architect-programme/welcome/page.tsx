import Link from "next/link";
import PurchaseTracker from "@/components/purchase-tracker";
import { COHORT_START } from "@/components/features/business-architect/business-architect.data";

export const metadata = {
  title: "You're in — The Business Architect Programme",
  robots: "noindex, nofollow",
};

/**
 * Post-payment landing for the Business Architect Programme.
 *
 * Deliberately NOT /payment-successful — that page is hard-coded to the AI
 * Stadium Live Class and fires a purchase event of $97 under the item id
 * "stadium-live". Sending buyers there would log every $597 and $997 sale as a
 * $97 stadium ticket in GA4 and the Meta Pixel.
 */
export default async function BusinessArchitectWelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  const isAccelerator = tier === "accelerator";

  return (
    <div className="bap-welcome">
      <PurchaseTracker
        productId={isAccelerator ? "bap-accelerator" : "bap-builder"}
        productName={
          isAccelerator
            ? "Business Architect Programme — Accelerator"
            : "Business Architect Programme — Builder"
        }
        value={isAccelerator ? 997 : 597}
        currency="USD"
      />

      <div className="bapw-card">
        <div className="bapw-eyebrow">Payment received</div>
        <h1 className="bapw-title">
          You&rsquo;re in.
          <br />
          <em>Founding Cohort.</em>
        </h1>
        <p className="bapw-sub">
          You joined as{" "}
          <strong>{isAccelerator ? "The Accelerator" : "The Builder"}</strong>.
          Your receipt is on its way from Stripe, and a welcome email with your
          joining details is landing in your inbox now.
        </p>

        <div className="bapw-next">
          <div className="bapw-next-lbl">What happens next</div>
          <ol className="bapw-list">
            <li>
              Check your inbox for the welcome email. If it is not there in ten
              minutes, look in spam and promotions before you worry.
            </li>
            <li>
              Put <strong>{COHORT_START}</strong> in your calendar. That is week
              one, live.
            </li>
            {isAccelerator && (
              <li>
                Reply to the welcome email with the name and email of the person
                taking your <strong>Builder Seat</strong>, so we can get them
                set up before day one.
              </li>
            )}
            <li>
              Bring the offer, ICP and site you built at the workshop. Week one
              starts from what you already have.
            </li>
          </ol>
        </div>

        <p className="bapw-help">
          Anything missing or wrong, email{" "}
          <a href="mailto:hello@temitopesaliu.com">hello@temitopesaliu.com</a>{" "}
          and we will sort it.
        </p>

        <Link href="/the-business-architect-programme" className="bapw-back">
          Back to the programme page
        </Link>
      </div>
    </div>
  );
}
