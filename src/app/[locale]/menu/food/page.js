import dynamic from "next/dynamic";
import LocalizedLink from "@/components/LocalizedLink";
import SmartImage from "@/components/SmartImage";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { FOOD_SECTIONS } from "@/lib/menuData";
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
    title: dict.menuFood.title,
    description: dict.menuFood.description,
    alternates: localeAlternates(locale, "/menu/food"),
  };
}

export default async function FoodMenuPage({ params }) {
  const { locale } = await params;
  const [metadata, dict, common] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "menu"),
    getDictionary(locale, "common"),
  ]);
  const title = metadata.menuFood.title;
  const description = metadata.menuFood.description;

  const sections = localizeMenuSections(FOOD_SECTIONS, dict.food.sections);

  const menuJsonLd = buildMenuJsonLd({
    url: `${SITE_URL}/menu/food`,
    name: "Mr Bob Bar and Grill Food Menu",
    description,
    sections,
  });

  return (
    <main>
      <PageSchema
        path="/menu/food"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: dict.food.heroTitle }]}
        mainEntityId={`${SITE_URL}/menu/food#menu`}
        locale={locale}
      />
      <script
        type="application/ld+json"
        // Data is built from the arrays above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/food-hero.jpg" alt="Mr Bob Bar and Grill food menu: steaks, ribs, and tomahawk chops" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-light tracking-normal mb-2">{dict.food.heroTitle}</h1>
          <p className="text-sm text-gray-300">{dict.food.priceNote}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto border-t border-white/10 py-16 px-6">
        <div className="mb-10 flex justify-center">
          <LocalizedLink href="/menu/beverage" className="btn-outline u-press px-6 py-3 text-sm tracking-widest">
            {dict.food.viewBeverageCta}
          </LocalizedLink>
        </div>

        <InteractiveMenu sections={sections} expandAllLabel={common.expandAll} collapseAllLabel={common.collapseAll} />

        <p className="mt-10 text-center text-xs text-white/40">{dict.food.priceNote}</p>
      </div>

      <StickyReserveButton href="/reservation" label={common.stickyReserveLabel} />
    </main>
  );
}
