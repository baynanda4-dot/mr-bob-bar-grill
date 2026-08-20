import LocalizedLink from "@/components/LocalizedLink";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import { BEVERAGE_SIGNATURE } from "@/lib/signatureMenu";

function MenuItemRow({ item }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
      <div>
        <p className="font-semibold text-white">{item.name}</p>
        {item.desc && <p className="text-sm text-white/60">{item.desc}</p>}
      </div>
      {item.price && <p className="whitespace-nowrap font-semibold text-mrbob-yellow">{item.price}</p>}
    </div>
  );
}

function MenuPanel({ panel }) {
  return (
    <div className="card-glass flex h-full flex-col p-6">
      <h3 className="mb-1 text-lg font-light uppercase tracking-wide text-mrbob-yellow">{panel.heading}</h3>
      {panel.note && <p className="mb-4 text-xs text-white/50">{panel.note}</p>}

      <div className={`space-y-4 ${panel.note ? "" : "mt-4"}`}>
        {panel.items.map((item) => (
          <MenuItemRow key={item.name} item={item} />
        ))}
      </div>

      {/* mt-auto pins this footer block to the bottom of the flex-col card
          regardless of how tall the item list above is, so the two panels'
          CTA links line up even when one has more items than the other. */}
      <div className="mt-auto pt-4">
        <LocalizedLink
          href={panel.href}
          className="u-link u-press group inline-flex w-fit items-center gap-2 text-sm tracking-widest text-mrbob-yellow"
        >
          {panel.cta.toUpperCase()}
          <span className="u-nudge">→</span>
        </LocalizedLink>
      </div>
    </div>
  );
}

// `foodItems`/`beverageItems` are pre-localized by the page (matched by
// English name against the full translated menu — see
// lib/menuLocalization.js's localizeByEnglishName), since these are
// hand-picked cross-section highlights, not one contiguous menu section.
export default function MenuHighlight({ dict, foodItems, beverageItems }) {
  const panels = [
    {
      key: "food",
      heading: dict.foodHeading,
      items: foodItems,
      href: "/menu/food",
      cta: dict.foodCta,
    },
    {
      key: "beverage",
      heading: dict.beverageHeading,
      note: `${BEVERAGE_SIGNATURE.note} ${dict.eachLabel}`,
      items: beverageItems,
      href: "/menu/beverage",
      cta: dict.beverageCta,
    },
  ];

  return (
    <section className="border-t border-white/10 px-6 py-20">
      <Reveal as="h2" className="mb-10 text-center text-3xl font-light tracking-normal">
        {dict.heading}
      </Reveal>

      <Stagger className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2" itemClassName="h-full">
        {panels.map((panel) => (
          <MenuPanel key={panel.key} panel={panel} />
        ))}
      </Stagger>
    </section>
  );
}
