import { WORKSHOP_PRICE, WORKSHOP_PRICE_NEXT } from "./workshop.data";

export default function Countdown() {
  return (
    <div className="ws-countdown">
      <strong>This cohort is {WORKSHOP_PRICE}.</strong> The next cohort is{" "}
      {WORKSHOP_PRICE_NEXT}.
    </div>
  );
}
