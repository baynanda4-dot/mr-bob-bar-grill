"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "./ticker";

/** Hairline read-progress bar pinned under the navbar. */
export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return onScrollFrame(({ y, max }) => {
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    });
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        ref={ref}
        className="h-full w-full origin-left scale-x-0 bg-mrbob-yellow"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
