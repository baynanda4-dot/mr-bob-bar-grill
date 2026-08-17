"use client";

import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";

// Real hero photography (5 photos, confirmed 2026-08-17).
const SLIDES = [
  { src: "/images/home/hero-1.jpg", alt: "Mr Bob Bar and Grill dining room" },
  { src: "/images/home/hero-2.jpg", alt: "Steak off the grill at Mr Bob Bar and Grill" },
  { src: "/images/home/hero-3.jpg", alt: "Live music night at Mr Bob Bar and Grill" },
  { src: "/images/home/hero-4.jpg", alt: "Mr Bob Bar and Grill" },
  { src: "/images/home/hero-5.jpg", alt: "Mr Bob Bar and Grill" },
];

// Every 3s the active slide swaps and the crossfade (same 3s duration,
// hardcoded below as duration-[3000ms] since SmartImage doesn't forward a
// style prop) carries it, so one fade finishes right as the next begins.
const INTERVAL_MS = 3000;

export default function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((slide, index) => (
        <SmartImage
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          priority={index === 0}
          sizes="100vw"
          className={`transition-opacity duration-[3000ms] ease-in-out ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}
