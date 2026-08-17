import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";

const CTRIP_DESC = "Recognized by Ctrip for consistently great food and genuine hospitality.";
const TRIPADVISOR_DESC = "Reviews from millions of Tripadvisor travelers place this winner in the top 10% worldwide.";

const awards = [
  { theme: "ctrip", title: "Ctrip Gourmet List 2018", desc: CTRIP_DESC, logo: "/images/home/ctrip.png" },
  { theme: "ctrip", title: "Ctrip Gourmet List 2019", desc: CTRIP_DESC, logo: "/images/home/ctrip.png" },
  // 2021 excluded — no award that year.
  ...[2018, 2019, 2020, 2022, 2023, 2024, 2025].map((year) => ({
    theme: "tripadvisor",
    title: `Tripadvisor Travellers' Choice Awards ${year}`,
    desc: TRIPADVISOR_DESC,
    logo: "/images/home/tripadvisor.png",
  })),
];

function AwardCard({ award }) {
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
      <p className="mb-3 text-xs font-semibold text-white/50">
        Mr Bob Bar and Grill
      </p>
      <p className="text-xs leading-relaxed text-white/50">{award.desc}</p>
    </div>
  );
}

export default function Recognition() {
  return (
    <section className="overflow-hidden border-t border-white/10 bg-mrbob-black py-20 text-white md:py-24">
      <Reveal as="h2" className="mb-6 px-6 text-center text-3xl font-light tracking-normal">
        Recognition
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={90}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-mrbob-yellow pl-6 text-left text-sm leading-relaxed text-white/60"
        >
          Mr Bob Bar and Grill is the #1-rated restaurant in Tanjung Benoa,
          Nusa Dua on Tripadvisor, recognized with the Tripadvisor
          Travelers&apos; Choice Award, placing us among the top 10% of
          restaurants worldwide, along with a Ctrip Gourmet List Certificate
          of Excellence, recognition we&apos;re genuinely proud of, and a
          reflection of the care we put into every plate and every guest.
        </Reveal>
      </div>

      <Marquee speed={38} gap={24} direction="right" fadeClassName="from-mrbob-black">
        {awards.map((award) => (
          <AwardCard key={award.title} award={award} />
        ))}
      </Marquee>
    </section>
  );
}
