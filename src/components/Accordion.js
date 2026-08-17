"use client";

import { useRef, useState } from "react";

/**
 * `<details>` can't animate its own open/close. The 0fr → 1fr grid row does,
 * on any content height, without measuring anything in JS.
 */
export default function Accordion({ items, single = true }) {
  const [openKeys, setOpenKeys] = useState(() => new Set());
  const lastToggle = useRef(0);

  const toggle = (index) => {
    // Belt-and-suspenders for mobile browsers where the synthetic click
    // after a tap has been unreliable: this fires from both onClick and
    // onTouchEnd, guarded so the usual touchend -> click sequence doesn't
    // toggle it twice and cancel itself out.
    const now = Date.now();
    if (now - lastToggle.current < 500) return;
    lastToggle.current = now;

    setOpenKeys((current) => {
      const next = single ? new Set() : new Set(current);
      if (current.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, index) => {
        const isOpen = openKeys.has(index);

        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => toggle(index)}
              onTouchEnd={() => toggle(index)}
              aria-expanded={isOpen}
              className="group flex w-full touch-manipulation items-center justify-between gap-6 py-5 text-left"
            >
              <span
                className={`font-semibold transition-colors duration-500 ease-expo group-hover:text-mrbob-yellow ${
                  isOpen ? "text-mrbob-yellow" : ""
                }`}
              >
                {item.q}
              </span>

              <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                <span className="absolute h-px w-4 bg-current transition-colors duration-500 ease-expo" />
                <span
                  className={`absolute h-px w-4 bg-current transition-transform duration-[600ms] ease-expo ${
                    isOpen ? "rotate-0" : "rotate-90"
                  }`}
                />
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-[600ms] ease-expo ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-10 text-sm leading-relaxed text-white/60">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
