import dynamic from "next/dynamic";
import LocalizedLink from "@/components/LocalizedLink";
import SmartImage from "@/components/SmartImage";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd, buildWineMenuSection } from "@/lib/menuSchema";
import { BEVERAGE_SECTIONS } from "@/lib/menuData";
import { localizeMenuSections } from "@/lib/menuLocalization";
import { SITE_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its expand/collapse JS ships in its own chunk instead of
// the initial bundle. Still server-rendered (no ssr:false), so there's no
// content/SEO regression, just a smaller initial JS payload.
const InteractiveMenu = dynamic(() => import("@/components/menu/InteractiveMenu"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.menuBeverage.title,
    description: dict.menuBeverage.description,
    alternates: localeAlternates(locale, "/menu/beverage"),
  };
}

// Wine sections (last 3 of BEVERAGE_SECTIONS) are priced by glass only —
// JSON-LD needs them reshaped through buildWineMenuSection (named Offers
// per pour size) instead of the flat-price shape the rest of the menu uses.
const WINE_SECTION_TITLES = new Set(["White Wine", "Red Wine", "Rosé Wine"]);

export default async function BeverageMenuPage({ params }) {
  const { locale } = await params;
  const [metadata, dict, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const title = metadata.menuBeverage.title;
  const description = metadata.menuBeverage.description;

  const localizedSections = localizeMenuSections(BEVERAGE_SECTIONS, dict.beverage.sections);
  const wineSections = localizedSections.filter((_, i) => WINE_SECTION_TITLES.has(BEVERAGE_SECTIONS[i].title));
  const cocktailAndOtherSections = localizedSections.filter((_, i) => !WINE_SECTION_TITLES.has(BEVERAGE_SECTIONS[i].title));

  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/beverage`,
    name: "Mr Bob Bar and Grill Beverage Menu",
    description,
    sections: cocktailAndOtherSections,
  });

  // Combines all 3 wine sections' items into one "Local House Wine" Menu
  // entity for JSON-LD, using each item's flat `price` as its glass price
  // (no bottle option here).
  const allWineItems = wineSections.flatMap((s) => s.items.map((item) => ({ name: item.name, glass: item.price })));
  menuJsonLd.hasMenuSection.push(
    buildWineMenuSection({
      title: "Local House Wine",
      note: "By the glass.",
      items: allWineItems,
    })
  );

  const allSections = [...cocktailAndOtherSections, ...wineSections];

  return (
    <main>
      <PageSchema
        path="/menu/beverage"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: dict.beverage.heroTitle }]}
        mainEntityId={`${SITE_URL}/menu/beverage#menu`}
        locale={locale}
      />
      <script
        type="application/ld+json"
        // Data is built from the arrays above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/beverage-hero.jpg" alt="Mr Bob Bar and Grill beverage menu: cocktails, spirits, beer, and wine" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-light tracking-normal mb-2">{dict.beverage.heroTitle}</h1>
          <p className="text-sm text-gray-300">{dict.beverage.priceNote}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto border-t border-white/10 py-16 px-6">
        <div className="mb-10 flex justify-center">
          <LocalizedLink href="/menu/food" className="btn-outline u-press px-6 py-3 text-sm tracking-widest">
            {dict.beverage.viewFoodCta}
          </LocalizedLink>
        </div>

        <InteractiveMenu sections={allSections} expandAllLabel={common.expandAll} collapseAllLabel={common.collapseAll} />

        <p className="mt-10 text-center text-xs text-white/40">{dict.beverage.priceNote}</p>
      </div>

      <StickyReserveButton href="/reservation" label={common.stickyReserveLabel} />
    </main>
  );
}
