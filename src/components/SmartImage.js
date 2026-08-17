"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Drop-in replacement for next/image on placeholder slots: renders the real
 * photo once it exists at `src`, but falls back to the site's shimmer
 * placeholder (`.u-media`, see globals.css) on a load error instead of a
 * broken-image icon. Lets pages go live with "not uploaded yet" slots that
 * still look intentional, and upgrade automatically the moment a file is
 * dropped into place — no code change needed.
 */
export default function SmartImage({ src, alt, sizes, priority, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <div className={`u-media absolute inset-0 h-full w-full ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      // Next doesn't reliably set this from `priority` alone on every
      // version — set it explicitly so the browser's preload scanner
      // actually treats hero images as high priority for LCP.
      fetchPriority={priority ? "high" : undefined}
      className={`object-cover ${className}`}
      onError={() => setErrored(true)}
    />
  );
}
