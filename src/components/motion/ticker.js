"use client";

/**
 * A single passive scroll/resize listener feeding one rAF pass, shared by every
 * scroll-driven effect (parallax, progress bar, nav state). Each subscriber
 * gets `{ y, max, height }` and is expected to only write transforms.
 */
const subscribers = new Set();
let frame = 0;
let bound = false;

function flush() {
  frame = 0;
  const state = {
    y: window.scrollY,
    max: Math.max(document.documentElement.scrollHeight - window.innerHeight, 0),
    height: window.innerHeight,
  };
  for (const run of subscribers) run(state);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function unbind() {
  if (!bound || subscribers.size) return;
  bound = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) cancelAnimationFrame(frame);
  frame = 0;
}

export function onScrollFrame(run) {
  subscribers.add(run);
  bind();
  schedule();
  return () => {
    subscribers.delete(run);
    unbind();
  };
}
