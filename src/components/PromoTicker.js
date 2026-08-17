import Marquee from "@/components/motion/Marquee";

// Confirmed, defensible claims only (see PRODUCT.md) — no invented
// superlatives like "best restaurant in Nusa Dua". Shared across the
// homepage and reservation page so the claims never drift between the two.
const TICKER_ITEMS = [
  "The Best Pork Ribs in Town",
  "Tripadvisor Travelers' Choice Award",
  "The Cheapest Wine in Nusa Dua",
];

export default function PromoTicker({ className = "" }) {
  return (
    <div className={`border-y border-white/10 py-5 ${className}`}>
      <Marquee speed={24} gap={56} fadeClassName="from-mrbob-black">
        {TICKER_ITEMS.map((text) => (
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
