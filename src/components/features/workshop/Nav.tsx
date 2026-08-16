import Link from "next/link";
import { WORKSHOP_PRICE } from "./workshop.data";
import WorkshopCheckoutButton from "./WorkshopCheckoutButton";

export default function Nav() {
  return (
    <nav className="ws-nav">
      <Link href="/" className="ws-nav-logo">
        Your Intelligence Layer + AI<span>.</span>
      </Link>
      <div className="ws-nav-right">
        <WorkshopCheckoutButton className="ws-nav-cta" showArrow={false}>
          Reserve seat — {WORKSHOP_PRICE}
        </WorkshopCheckoutButton>
      </div>
    </nav>
  );
}
