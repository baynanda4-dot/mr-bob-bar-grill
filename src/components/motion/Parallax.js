"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "./ticker";

/**
 * Depth on scroll: the element drifts against the page at `speed` (fraction of
 * the distance its centre is from the viewport centre). Small values only —
 * 0.05–0.2 reads as depth, anything larger reads as a bug.
 */
export default function Parallax({
  children,
  className = "",
  speed = 0.12,
  scale = 1,
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);
  // Document-relative geometry, measured once instead of read on every scroll
  // frame — a getBoundingClientRect() per frame forces a synchronous layout
  // recalc right after the previous frame's transform write, which is what
  // turns scrolling choppy once a couple of these are mounted on one page.
  const geometry = useRef({ top: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      geometry.current = { top: rect.top + window.scrollY, height: rect.height };
    };
    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    window.addEventListener("resize", measure, { passive: true });

    const unsubscribe = onScrollFrame(({ y, height }) => {
      const { top, height: elHeight } = geometry.current;
      const viewportTop = top - y;

      // Skip anything off screen — no layout thrash for sections nobody sees.
      if (viewportTop + elHeight < -height || viewportTop > height * 2) return;

      const distance = viewportTop + elHeight / 2 - height / 2;
      const shift = -distance * speed;
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(${scale})`;
    });

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [speed, scale]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: "transform" }} {...rest}>
      {children}
    </Tag>
  );
}
