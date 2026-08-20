import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/motion/Reveal";
import { LOCATIONS } from "@/lib/site";

// TODO: replace with a real Instagram embed (or static export of recent
// posts) now that the account is live — this is a static placeholder grid,
// not a live feed, so it never breaks or shows stale content in the meantime.
const tiles = Array.from({ length: 6 }, (_, i) => `/images/home/instagram-${i + 1}.jpg`);

export default function InstagramPreview({ dict }) {
  const instagramHref = LOCATIONS[0].sameAs.find((url) => url.includes("instagram.com"));

  return (
    <section className="border-t border-white/10 px-6 py-20">
      <Reveal as="p" className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-mrbob-yellow">
        {dict.eyebrow}
      </Reveal>
      <Reveal as="h2" delay={90} className="mb-2 text-center text-3xl font-light tracking-normal md:text-4xl">
        {dict.heading}
      </Reveal>
      <Reveal as="p" delay={130} className="mb-10 text-center text-sm text-white/50">
        <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="u-link hover:text-mrbob-yellow">
          @mrbobbarandgrill
        </a>
      </Reveal>

      <Reveal delay={170} className="mx-auto grid max-w-3xl grid-cols-3 gap-2 sm:gap-3">
        {tiles.map((src, index) => (
          <div key={src} className="group relative aspect-square overflow-hidden border border-white/10">
            <SmartImage src={src} alt={`Mr Bob Bar and Grill Instagram photo ${index + 1}`} sizes="(min-width: 640px) 30vw, 33vw" className="u-zoom" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
