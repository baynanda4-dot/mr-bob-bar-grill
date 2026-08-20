import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { LOCATIONS } from "@/lib/site";

function AwardCard({ award, restaurantName }) {
  return (
    <div className="card-glass u-lift w-60 shrink-0 px-6 py-8 text-center sm:w-64 md:w-72">
      <Image
        src={award.logo}
        alt={award.title}
        width={64}
        height={64}
        className="mx-auto mb-4 rounded-full"
      />
      <p className="mb-2 text-sm tracking-[0.3em] text-mrbob-yellow">★★★★★</p>
      <h3 className="mb-1 text-sm font-semibold">{award.title}</h3>
      <p className="mb-3 text-xs font-semibold text-white/50">{restaurantName}</p>
      <p className="text-xs leading-relaxed text-white/50">{award.desc}</p>
    </div>
  );
}

export default function Recognition({ dict }) {
  const tripadvisorUrl = LOCATIONS[0].sameAs?.find((url) => url.includes("tripadvisor.com"));

  const awards = [
    { theme: "ctrip", title: "Ctrip Gourmet List 2018", desc: dict.ctripDesc, logo: "/images/home/CTRIP.png" },
    { theme: "ctrip", title: "Ctrip Gourmet List 2019", desc: dict.ctripDesc, logo: "/images/home/CTRIP.png" },
    // 2021 excluded — no award that year.
    ...[2018, 2019, 2020, 2022, 2023, 2024, 2025].map((year) => ({
      theme: "tripadvisor",
      title: `Tripadvisor Travellers' Choice Awards ${year}`,
      desc: dict.tripadvisorDesc,
      logo: "/images/home/TripAdvisor.png",
    })),
  ];

  return (
    <section className="overflow-hidden border-t border-white/10 bg-mrbob-black py-20 text-white md:py-24">
      <Reveal as="h2" className="mb-4 px-6 text-center text-3xl font-light tracking-normal">
        {dict.heading}
      </Reveal>

      {/* Both real, current ratings (checked 2026-08-18) — rounded down
          ("1,100+"/"1,500+") so this line doesn't read as stale the moment
          either count ticks up further. */}
      <Reveal
        delay={40}
        className="mb-6 flex flex-col items-center justify-center gap-2 px-6 text-center sm:flex-row sm:gap-8"
      >
        <p className="text-2xl font-light tracking-normal text-mrbob-yellow">
          4.7 <span aria-hidden="true">★</span>{" "}
          <span className="text-base text-white/50">{dict.googleRatingSuffix}</span>
        </p>
        <span className="hidden h-6 w-px bg-white/20 sm:block" aria-hidden="true" />
        <p className="text-2xl font-light tracking-normal text-mrbob-yellow">
          4.7 <span aria-hidden="true">★</span>{" "}
          <span className="text-base text-white/50">{dict.tripadvisorRatingSuffix}</span>
        </p>
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={90}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-mrbob-yellow pl-6 text-left text-sm leading-relaxed text-white/60"
        >
          {dict.body}
        </Reveal>
      </div>

      <Marquee speed={38} gap={24} direction="right" fadeClassName="from-mrbob-black">
        {awards.map((award) => (
          <AwardCard key={award.title} award={award} restaurantName={dict.restaurantName} />
        ))}
      </Marquee>

      {tripadvisorUrl && (
        <Reveal delay={80} className="mt-8 flex justify-center px-6">
          <a
            href={tripadvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline u-press px-8 py-3 text-center text-sm tracking-widest"
          >
            {dict.ctaLabel}
          </a>
        </Reveal>
      )}
    </section>
  );
}
