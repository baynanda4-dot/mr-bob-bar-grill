"use client";

import { createElement, useEffect, useLayoutEffect, useRef } from "react";
import { watch, unwatch } from "./observer";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-triggered reveal. Animates only opacity / transform / filter so every
 * frame stays on the compositor.
 *
 *   <Reveal y={32} delay={120} blur>...</Reveal>
 *
 * Content is visible by default (see [data-reveal] in globals.css) — this
 * effect only ever ADDS the pre-reveal hidden state via "reveal-armed"
 * before the observer/fallback reveals it again. If this effect never runs
 * at all on some device/browser, the element simply stays at its visible
 * default instead of being stuck invisible, which is the failure mode that
 * actually matters for a marketing page.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  blur = 0,
  once = true,
  style,
  ...rest
}) {
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    el.classList.add("reveal-armed");

    return watch(el, () => {
      el.classList.add("is-in");
      if (once) unwatch(el);
    });
  }, [once]);

  return createElement(
    as,
    {
      ref,
      "data-reveal": "",
      className,
      style: {
        "--rv-y": `${y}px`,
        "--rv-x": `${x}px`,
        "--rv-s": scale,
        "--rv-blur": blur ? `${blur === true ? 6 : blur}px` : "0px",
        "--rv-delay": `${delay}ms`,
        ...style,
      },
      ...rest,
    },
    children
  );
}
