import { scrollToPricing } from "./scroll-to-pricing";

export default function AnnounceBar({ countdown }: { countdown: string }) {
  return (
    <div className="announce">
      <p>
        ⚡ Founding Cohort pricing closes in <strong>{countdown}</strong> —{" "}
        <a onClick={scrollToPricing}>claim your seat before it goes</a>
      </p>
    </div>
  );
}
