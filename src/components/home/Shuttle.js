import LocalizedLink from "@/components/LocalizedLink";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";

export default function Shuttle({ dict }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 border-t border-white/10 px-6 py-16 md:flex-row md:py-20">
      <Reveal x={-36} y={12} className="group relative w-full overflow-hidden border border-white/10 md:w-1/2">
        <div className="h-64 overflow-hidden md:h-72">
          <Parallax speed={0.06} scale={1.08} className="relative h-full w-full">
            <SmartImage
              src="/images/home/shuttle.jpg"
              alt="Complimentary shuttle around Nusa Dua"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Parallax>
        </div>
      </Reveal>

      <Reveal x={36} y={12} delay={120} className="w-full border-l-4 border-mrbob-yellow pl-6 md:w-1/2">
        <h2 className="mb-4 text-2xl font-light tracking-normal md:text-3xl">{dict.heading}</h2>
        <p className="mb-6 leading-relaxed text-white/70">{dict.body}</p>
        <LocalizedLink
          href="/reservation"
          className="btn-primary u-press group inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest"
        >
          {dict.cta}
          <span className="u-nudge">→</span>
        </LocalizedLink>
      </Reveal>
    </section>
  );
}
