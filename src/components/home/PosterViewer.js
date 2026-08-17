"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * "View Poster" trigger + full-screen lightbox, rendered via a portal to
 * document.body — the trigger sits inside a Reveal/Stagger-wrapped card,
 * and Reveal's "is-in" state leaves a non-none `transform` on that
 * ancestor (translate3d(0,0,0) for GPU compositing), which would otherwise
 * trap a `position: fixed` child to the card's box instead of the viewport.
 * Closing just dismisses the overlay — the homepage underneath was never
 * left, so "Close" is really "back to the homepage".
 */
export default function PosterViewer({ image, title }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="u-press absolute bottom-4 left-4 border border-white/40 bg-black/60 px-4 py-2 text-[11px] uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-500 ease-expo hover:border-mrbob-yellow hover:text-mrbob-yellow"
      >
        View Poster
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} poster`}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-6"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="u-press absolute right-6 top-6 flex items-center gap-2 border border-white/30 px-4 py-2 text-xs uppercase tracking-widest text-white transition-colors duration-500 ease-expo hover:border-mrbob-yellow hover:text-mrbob-yellow"
            >
              ✕ Close
            </button>

            <div
              onClick={(event) => event.stopPropagation()}
              className="relative h-full max-h-[80vh] w-full max-w-2xl"
            >
              <Image src={image} alt={title} fill sizes="90vw" className="object-contain" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
