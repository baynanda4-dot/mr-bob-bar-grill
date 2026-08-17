"use client";

import { Children, cloneElement, useEffect, useState } from "react";

/**
 * Edge-to-edge infinite scroller. Takes pre-rendered cards as children (not a
 * render-prop function — functions can't cross the server/client boundary,
 * and this needs to stay callable from a plain Server Component) and holds
 * the set twice back to back, animating translateX by exactly -50%. Since
 * both halves are the same width, that lands precisely on the seam and the
 * loop reads as seamless.
 *
 * Paused on hover/focus so a row of cards can actually be read. Under
 * prefers-reduced-motion the duplicate set and the animation both drop out
 * client-side (checked post-mount, so SSR output still matches on first
 * paint) and the row becomes a single, manually-scrollable list instead.
 */
export default function Marquee({
  children,
  speed = 40,
  direction = "left",
  gap = 24,
  className = "",
  fadeClassName = "from-white",
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const items = Children.toArray(children);

  return (
    <div className={`marquee-row relative ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r ${fadeClassName} to-transparent sm:w-24`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l ${fadeClassName} to-transparent sm:w-24`}
      />

      <div
        data-native-scroll
        className={`marquee-viewport ${reduced ? "overflow-x-auto" : ""}`}
      >
        <div
          className={`marquee-track flex ${reduced ? "" : "is-animated"}`}
          data-direction={direction}
          style={{ "--marquee-duration": `${speed}s`, gap: `${gap}px` }}
        >
          <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
            {items}
          </div>

          {!reduced && (
            <div
              className="flex shrink-0"
              style={{ gap: `${gap}px` }}
              aria-hidden="true"
            >
              {items.map((item, index) => cloneElement(item, { key: `dup-${index}` }))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
