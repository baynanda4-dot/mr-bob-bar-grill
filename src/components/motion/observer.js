"use client";

/**
 * One IntersectionObserver shared by every reveal on the page — dozens of
 * per-component observers is the usual reason scroll animation starts to feel
 * heavy on long pages.
 */
let observer = null;
const callbacks = new WeakMap();

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const run = callbacks.get(entry.target);
        if (run) run();
      }
    },
    {
      // Fire a touch before the element is fully in view so the motion has
      // already settled by the time the eye lands on it.
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    }
  );
  return observer;
}

// Some mobile browser/tunnel combinations have been observed to never fire
// an IntersectionObserver callback at all (root cause unconfirmed — possibly
// viewport-resize edge cases as the address bar hides/shows). Content is
// worth infinitely more than the scroll-in animation, so every watched
// element gets a hard deadline: if the observer hasn't fired by then, reveal
// it anyway instead of leaving copy permanently invisible.
const FALLBACK_MS = 2000;

export function watch(element, onEnter) {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }

  let fired = false;
  const trigger = () => {
    if (fired) return;
    fired = true;
    onEnter();
  };

  const io = ensureObserver();
  callbacks.set(element, trigger);
  io.observe(element);
  const fallback = setTimeout(trigger, FALLBACK_MS);

  return () => {
    clearTimeout(fallback);
    callbacks.delete(element);
    io.unobserve(element);
  };
}

export function unwatch(element) {
  if (!observer) return;
  callbacks.delete(element);
  observer.unobserve(element);
}
