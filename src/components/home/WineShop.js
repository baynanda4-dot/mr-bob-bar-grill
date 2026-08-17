import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

// No wine list/prices here on purpose — selection is based on what's
// currently in stock, not a fixed menu, so the only accurate CTA is to
// come in and see what's pouring (in person only, no online ordering).
export default function WineShop() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-white/10 px-6 py-16 md:flex-row-reverse md:py-20">
      <Reveal x={36} y={12} className="group relative w-full overflow-hidden border border-white/10 md:w-1/2">
        <div className="h-64 overflow-hidden md:h-72">
          <Parallax speed={0.06} scale={1.08} className="relative h-full w-full">
            <SmartImage
              src="/images/home/wine-shop.jpg"
              alt="Mr Bob wine shop selection"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Parallax>
        </div>
      </Reveal>

      <Reveal x={-36} y={12} delay={120} className="w-full border-l-4 border-mrbob-yellow pl-6 md:w-1/2">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-mrbob-yellow">
          Cheapest Wine Selection in Nusa Dua
        </p>
        <h2 className="mb-4 text-2xl font-light tracking-normal md:text-3xl">
          Wine Shop
        </h2>
        <p className="mb-6 leading-relaxed text-white/70">
          Our wine shop is stocked with the best-priced selection around
          Nusa Dua, but what&apos;s on the shelf changes with availability,
          so there&apos;s no fixed list to browse online. Come by the
          restaurant and see what we&apos;ve got pouring.
        </p>
        <Link
          href="/reservation"
          className="btn-primary u-press group inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest"
        >
          RESERVE TABLE
          <span className="u-nudge">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
