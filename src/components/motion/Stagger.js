"use client";

import { Children, createElement } from "react";
import Reveal from "./Reveal";

/**
 * Wraps each child in a Reveal with an incrementing delay, so a grid or list
 * cascades in instead of snapping as one block. The container itself stays a
 * plain element, so grid/flex classes on it behave exactly as before.
 *
 * `step` is capped by `max` so a 20-item grid never leaves its last tile
 * waiting two seconds.
 */
export default function Stagger({
  children,
  as = "div",
  className = "",
  itemClassName = "",
  base = 0,
  step = 90,
  max = 600,
  y = 28,
  ...rest
}) {
  const items = Children.toArray(children);

  return createElement(
    as,
    { className, ...rest },
    items.map((child, index) => (
      <Reveal
        key={child.key ?? index}
        className={itemClassName}
        delay={base + Math.min(index * step, max)}
        y={y}
      >
        {child}
      </Reveal>
    ))
  );
}
