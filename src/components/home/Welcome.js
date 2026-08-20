import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import Reveal from "@/components/motion/Reveal";

export default function Welcome({ dict }) {
  return (
    <section
      id="welcome"
      className="mx-auto flex max-w-5xl scroll-mt-24 flex-col items-center gap-10 border-t border-white/10 px-6 py-20 md:flex-row md:py-28"
    >
      <Reveal x={-36} y={12} className="w-full shrink-0 md:w-2/5">
        <div className="mx-auto flex aspect-square w-48 items-center justify-center overflow-hidden rounded-full border border-mrbob-yellow/30 sm:w-64 md:w-full">
          <Image
            src="/images/shared/logo.png"
            alt="Mr Bob Bar and Grill"
            width={680}
            height={628}
            className="h-full w-full object-cover"
          />
        </div>
      </Reveal>

      <Reveal x={36} y={12} delay={120} className="w-full md:w-3/5">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-mrbob-yellow">{dict.eyebrow}</p>
        <h2 className="mb-6 text-3xl font-light tracking-normal md:text-4xl">
          {dict.titleBefore} <span className="text-mrbob-yellow">{dict.titleHighlight}</span>
        </h2>

        <p className="mb-6 leading-relaxed text-white/70">{dict.body}</p>

        <blockquote className="font-serif mb-8 border-l-4 border-mrbob-yellow pl-6 text-xl italic font-light text-white/80">
          &ldquo;{dict.quote}&rdquo;
        </blockquote>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <LocalizedLink
            href="/reservation"
            className="btn-primary u-press px-6 py-3 text-sm tracking-widest"
          >
            {dict.reserveCta}
          </LocalizedLink>
          <LocalizedLink
            href="/group-reservation"
            className="btn-outline u-press px-6 py-3 text-sm tracking-widest"
          >
            {dict.groupCta}
          </LocalizedLink>
        </div>
      </Reveal>
    </section>
  );
}
