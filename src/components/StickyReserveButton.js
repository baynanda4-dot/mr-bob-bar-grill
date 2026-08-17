"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { onScrollFrame } from "./motion/ticker";

// Mobile only — each page's own hero button scrolls away with it, so this
// picks up once the user has scrolled past that point, acting as a shortcut
// straight to that page's reservation form (or /reservation, for pages
// without one of their own). Mirrors the navbar's show/hide, but inverted:
// the navbar hides on scroll-down and shows on scroll-up/idle, so this one
// shows on scroll-down/idle and hides only while actively scrolling up (an
// "up" gesture reads as heading back toward the hero's own button).
export default function StickyReserveButton({ href = "/reservation", label = "RESERVE TABLE" }) {
  const [hidden, setHidden] = useState(true);
  const [atTarget, setAtTarget] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef(null);
  const targetId = href.startsWith("#") ? href.slice(1) : null;

  useEffect(() => {
    lastY.current = window.scrollY;

    return onScrollFrame(({ y, height }) => {
      const pastHero = y > height * 0.6;

      if (!pastHero) {
        setHidden(true);
        lastY.current = y;
        clearTimeout(idleTimer.current);
        return;
      }

      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta < 0);
        lastY.current = y;
      }

      // Idle: once scrolling settles (no significant movement for a beat),
      // always reveal rather than leaving it stuck hidden from a prior
      // upward scroll.
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(false), 150);
    });
  }, []);

  useEffect(() => () => clearTimeout(idleTimer.current), []);

  // Native/Next.js hash navigation only scrolls on an actual hash *change*.
  // The first tap sets the URL hash to #reservation and scrolls fine, but
  // once a guest scrolls away and taps the reappeared button again, the
  // hash is already #reservation — same href, no change, so nothing
  // scrolls and the tap looks like it's doing nothing. Scrolling manually
  // on every click sidesteps that entirely.
  const handleClick = targetId
    ? (e) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        // replaceState (not pushState) so repeated taps don't pile up
        // history entries the back button would have to click through.
        if (window.location.hash !== `#${targetId}`) {
          window.history.replaceState(null, "", `#${targetId}`);
        }
      }
    : undefined;

  // Once the reservation form the button points to is on screen — whether
  // the guest tapped the button or just scrolled there themselves — the
  // shortcut has done its job, so it disappears instead of sitting on top
  // of the form guests are trying to fill in.
  useEffect(() => {
    if (!targetId) return undefined;
    const target = document.getElementById(targetId);
    if (!target) return undefined;

    // Shrinks the intersection root to the middle third of the viewport, so
    // only a real chunk of the form counts as "arrived" — not just a sliver
    // grazing the very top edge. That sliver case is real: on pages where
    // the form sits close to the end of the document, scrolling to the
    // bottom can leave a few px of the (very tall) form permanently poking
    // into the top of the viewport with nowhere further to scroll, which
    // would otherwise pin the button hidden forever with no way back.
    const observer = new IntersectionObserver(([entry]) => setAtTarget(entry.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  // z-30 is deliberately one below the mobile nav drawer's z-40
  // (Navbar.js) so it sinks behind the drawer automatically once opened
  // instead of floating on top of the menu.
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-transform duration-500 ease-expo md:hidden ${
        hidden || atTarget ? "translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="btn-primary u-press block w-full py-4 text-center text-sm tracking-widest shadow-[0_4px_24px_-4px_rgb(0_0_0/0.6)]"
      >
        {label}
      </Link>
    </div>
  );
}
