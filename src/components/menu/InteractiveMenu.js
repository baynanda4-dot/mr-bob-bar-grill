"use client";

import { useState } from "react";

/**
 * Menu-specific sibling to components/Accordion.js — same "0fr -> 1fr grid
 * row" open/close animation, but each panel holds a full menu category
 * (title/note/items) instead of a single FAQ answer, and open state is
 * lifted here (not per-item) so "Expand All / Collapse All" can drive every
 * panel at once.
 */
export default function InteractiveMenu({ sections, expandAllLabel, collapseAllLabel }) {
  const [openKeys, setOpenKeys] = useState(() => new Set([0]));

  const toggle = (index) => {
    setOpenKeys((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const expandAll = () => setOpenKeys(new Set(sections.map((_, index) => index)));
  const collapseAll = () => setOpenKeys(new Set());

  return (
    <div>
      <div className="mb-6 flex justify-end gap-3 text-xs uppercase tracking-widest">
        <button type="button" onClick={expandAll} className="u-link text-mrbob-yellow">
          {expandAllLabel}
        </button>
        <span className="text-white/20">/</span>
        <button type="button" onClick={collapseAll} className="u-link text-white/50 hover:text-mrbob-yellow">
          {collapseAllLabel}
        </button>
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {sections.map((section, index) => {
          const isOpen = openKeys.has(index);

          return (
            <div key={section.title}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span>
                  <span
                    className={`block text-lg font-light uppercase tracking-wide transition-colors duration-500 ease-expo group-hover:text-mrbob-yellow ${
                      isOpen ? "text-mrbob-yellow" : "text-white"
                    }`}
                  >
                    {section.title}
                  </span>
                  {section.note && <span className="mt-1 block text-xs text-white/50">{section.note}</span>}
                </span>

                <span className="relative grid h-5 w-5 shrink-0 place-items-center text-white">
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
                  <div className="grid grid-cols-1 gap-x-10 gap-y-5 pb-8 sm:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between gap-4 border-b border-white/5 pb-3">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          {item.desc && <p className="text-sm text-white/60">{item.desc}</p>}
                        </div>
                        {item.price && (
                          <p className="whitespace-nowrap font-semibold text-mrbob-yellow">{item.price}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
