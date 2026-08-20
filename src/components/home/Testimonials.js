import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import { LOCATIONS } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";

function ReviewCard({ review, viaLabel }) {
  return (
    <blockquote className="card-glass u-lift w-64 shrink-0 px-6 py-8 text-center sm:w-72 md:w-80">
      <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-full">
        <Image src={review.avatar} alt={review.name} fill sizes="64px" className="object-cover" />
      </div>
      <p className="text-lg font-semibold">{review.name}</p>
      {review.meta && <p className="mb-1 text-xs text-white/40">{review.meta}</p>}
      <p className={`${review.meta ? "" : "mt-1"} mb-3 text-sm tracking-[0.3em] text-mrbob-yellow`}>★★★★★</p>
      <p className="mb-2 text-sm font-semibold underline decoration-mrbob-yellow/40 underline-offset-4">
        {review.title}
      </p>
      <p className="text-xs italic leading-relaxed text-white/50">
        {review.text}
      </p>
      <p className="mt-3 text-[10px] uppercase tracking-widest text-white/30">{viaLabel}</p>
    </blockquote>
  );
}

export default function Testimonials({ dict }) {
  const location = LOCATIONS[0];
  // Only shown once set (see src/lib/site.js) — no reviews link is shown
  // until there's a real place to send guests to instead of a guessed URL.
  const reviewHref = location.googleReviewUrl || location.hasMap || null;

  return (
    <section className="overflow-hidden border-t border-white/10 py-20 md:py-24">
      <Reveal as="p" className="mb-3 px-6 text-center text-xs uppercase tracking-[0.35em] text-mrbob-yellow">
        {dict.eyebrow}
      </Reveal>
      <Reveal as="h2" delay={90} className="mb-6 px-6 text-center text-3xl font-light tracking-normal">
        {dict.heading}
      </Reveal>

      <div className="px-6">
        <Reveal
          as="p"
          delay={130}
          className="mx-auto mb-12 max-w-2xl border-l-4 border-mrbob-yellow pl-6 text-left text-sm leading-relaxed text-white/60"
        >
          {dict.intro}
        </Reveal>
      </div>

      <Marquee speed={50} gap={20} direction="right" fadeClassName="from-mrbob-black" className="mb-8">
        {REVIEWS.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} review={review} viaLabel={dict.viaTripadvisor} />
        ))}
      </Marquee>

      {reviewHref ? (
        <Reveal delay={80} className="mb-8 flex justify-center px-6">
          <a
            href={reviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline u-press px-8 py-3 text-center text-sm tracking-widest"
          >
            {dict.reviewCta}
          </a>
        </Reveal>
      ) : (
        <p className="mb-8 px-6 text-center text-xs text-white/30">{dict.reviewComingSoon}</p>
      )}

      <Reveal delay={120} className="flex flex-col justify-center gap-3 px-6 sm:flex-row sm:gap-4">
        <LocalizedLink href="/reservation" className="btn-primary u-press px-8 py-3 text-center text-sm tracking-widest">
          {dict.reserveCta}
        </LocalizedLink>
        <LocalizedLink href="/group-reservation" className="btn-outline u-press px-8 py-3 text-center text-sm tracking-widest">
          {dict.groupCta}
        </LocalizedLink>
      </Reveal>
    </section>
  );
}
