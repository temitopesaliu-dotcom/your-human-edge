import { WORKSHOP_PRICE, WORKSHOP_FINAL_NOTE } from "./workshop.data";

export default function Countdown() {
  return (
    <div className="ws-countdown">
      <strong>{WORKSHOP_PRICE}.</strong> {WORKSHOP_FINAL_NOTE}
    </div>
  );
}
