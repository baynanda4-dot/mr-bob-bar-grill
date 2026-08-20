import Marquee from "@/components/motion/Marquee";

// Confirmed, defensible claims only (see PRODUCT.md) — no invented
// superlatives like "best restaurant in Nusa Dua". Shared across the
// homepage and reservation page so the claims never drift between the two.
// `items` comes from the locale dictionary's content.json `promoTicker` array.
export default function PromoTicker({ items, className = "" }) {
  return (
    <div className={`border-y border-white/10 py-5 ${className}`}>
      <Marquee speed={24} gap={56} fadeClassName="from-mrbob-black">
        {items.map((text) => (
          <span
            key={text}
            className="flex items-center gap-4 whitespace-nowrap px-2 text-sm uppercase tracking-[0.3em] text-white/70"
          >
            {text}
            <span className="text-mrbob-yellow">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
