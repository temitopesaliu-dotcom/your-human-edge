import { WORKSHOP_PRICE, WORKSHOP_PRICE_FULL } from "./workshop.data";

export default function Countdown() {
  return (
    <div className="ws-countdown">
      <strong>Early access pricing closes soon.</strong> Full price is{" "}
      {WORKSHOP_PRICE_FULL}. Lock in at {WORKSHOP_PRICE} now.
    </div>
  );
}
