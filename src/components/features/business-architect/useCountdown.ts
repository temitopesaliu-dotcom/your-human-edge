import { useEffect, useState } from "react";
import { COUNTDOWN_TARGET, pad } from "./business-architect.data";

export function useCountdown() {
  const [display, setDisplay] = useState("72:00:00");

  useEffect(() => {
    const deadline = COUNTDOWN_TARGET.getTime();
    let timeoutId: ReturnType<typeof setTimeout>;
    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setDisplay(`${pad(h)}:${pad(m)}:${pad(s)}`);
      if (diff > 0) timeoutId = setTimeout(tick, 1000);
    };
    tick();

    return () => clearTimeout(timeoutId);
  }, []);

  return display;
}
