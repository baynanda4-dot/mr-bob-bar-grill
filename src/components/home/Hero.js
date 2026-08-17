import Image from "next/image";
import Link from "next/link";
import Parallax from "@/components/motion/Parallax";
import HeroBackground from "@/components/home/HeroBackground";

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-mrbob-black text-white">
      {/* Backdrop drifts slower than the page, which is what sells the depth. */}
      <Parallax speed={0.18} scale={1.12} className="absolute inset-0">
        <HeroBackground />
        {/* Darkened for legibility. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/50 to-black/75" />
      </Parallax>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Image
          src="/images/shared/logo.png"
          alt="Mr Bob Bar and Grill"
          width={680}
          height={628}
          priority
          className="mb-6 h-28 w-28 rounded-full border border-mrbob-yellow/30 object-cover sm:h-32 sm:w-32 md:h-36 md:w-36"
        />

        {/* No entrance animation on the text below (unlike the rest of the
            page) — this is the LCP candidate, so it must paint on the first
            frame instead of fading in after a delay. Everything past it
            still gets the usual animate-rise treatment. */}
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-mrbob-yellow sm:text-xs">
          Grill. Pour. Savor.
        </p>

        <h1 className="text-5xl font-light tracking-normal sm:text-6xl md:text-7xl">
          The Best <span className="text-mrbob-yellow">Pork Ribs</span> in Town
        </h1>

        <p
          className="animate-rise mt-6 max-w-2xl text-sm leading-relaxed text-gray-200 sm:text-base"
          style={{ animationDelay: "120ms" }}
        >
          Hand-cut steaks, tomahawk chops, and our signature ribs off the
          grill, poured alongside a curated wine list in Nusa Dua, Bali.
        </p>

        <div
          className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/reservation"
            className="btn-primary u-press px-8 py-3 text-sm tracking-widest"
          >
            RESERVE TABLE
          </Link>
          <Link
            href="/menu/food"
            className="btn-outline u-press px-8 py-3 text-sm tracking-widest"
          >
            VIEW MENU
          </Link>
        </div>
      </div>

      {/* Positioning lives on the wrapper so the entrance and idle animations
          each own a transform without fighting the centring. */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <Link
          href="#welcome"
          aria-label="Scroll to content"
          className="animate-rise block p-2"
          style={{ animationDelay: "700ms" }}
        >
          <span className="animate-cue block h-10 w-px bg-gradient-to-b from-white/0 via-white/70 to-white/0" />
        </Link>
      </div>
    </section>
  );
}
