import LocalizedLink from "@/components/LocalizedLink";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import PosterViewer from "@/components/home/PosterViewer";

// Two-card "what's on" teaser — each card is self-contained (no dedicated
// promotions page to link out to), so this is the full story, not a
// preview. "View Poster" opens the card's own image in a lightbox (see
// PosterViewer.js) — once a real designed flyer replaces the photo at that
// path, it just works, no code change needed. Image paths never change per
// locale, so they stay static here and merge with the dict's translated
// schedule/location/title/detail by index.
const CARD_IMAGES = ["/images/home/live-music-friday.jpg", "/images/home/promotions.jpg"];

export default function WhatsOn({ dict }) {
  const cards = dict.cards.map((card, i) => ({ ...card, image: CARD_IMAGES[i] }));

  return (
    <section className="border-t border-white/10 bg-mrbob-black py-20 text-white">
      <div className="px-6">
        <div className="mx-auto mb-12 flex max-w-5xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal as="h2" className="max-w-lg text-3xl font-light tracking-normal md:text-4xl">
            {dict.heading}
          </Reveal>
          <Reveal as="p" delay={90} className="max-w-sm text-sm leading-relaxed text-white/60 sm:text-right">
            {dict.subheading}
          </Reveal>
        </div>

        <Stagger className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2" itemClassName="h-full" base={150}>
          {cards.map((card) => (
            <div key={card.title} className="u-lift flex h-full flex-col border border-white/10 bg-black/30">
              <div className="group relative h-64 shrink-0 overflow-hidden">
                <SmartImage
                  src={card.image}
                  alt={card.title}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="u-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <PosterViewer image={card.image} title={card.title} />
              </div>

              <div className="flex flex-1 flex-col px-6 py-6">
                <div className="flex flex-col gap-1 border-b border-white/10 pb-3 text-[11px] uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-mrbob-yellow">{card.schedule}</span>
                  <span className="text-white/50">{card.location}</span>
                </div>

                <h3 className="mt-4 font-serif text-2xl font-normal tracking-normal text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{card.detail}</p>
              </div>
            </div>
          ))}
        </Stagger>

        <Reveal
          delay={260}
          className="mx-auto mt-14 flex max-w-5xl flex-col items-center justify-between gap-4 border border-mrbob-yellow/30 bg-mrbob-yellow/5 px-6 py-6 text-center sm:flex-row sm:text-left"
        >
          <p className="text-sm text-white/80">{dict.ctaText}</p>
          <LocalizedLink href="/reservation" className="btn-primary u-press shrink-0 px-6 py-3 text-sm tracking-widest">
            {dict.ctaLabel}
          </LocalizedLink>
        </Reveal>
      </div>
    </section>
  );
}
