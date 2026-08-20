import Hero from "@/components/home/Hero";
import PromoTicker from "@/components/PromoTicker";
import WhatsOn from "@/components/home/WhatsOn";
import Welcome from "@/components/home/Welcome";
import MenuHighlight from "@/components/home/MenuHighlight";
import WineShop from "@/components/home/WineShop";
import Shuttle from "@/components/home/Shuttle";
import Recognition from "@/components/home/Recognition";
import InstagramPreview from "@/components/home/InstagramPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/FAQ";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { FOOD_SECTIONS, BEVERAGE_SECTIONS } from "@/lib/menuData";
import { localizeMenuSections, localizeByEnglishName } from "@/lib/menuLocalization";
import { FOOD_HOMEPAGE_HIGHLIGHTS, BEVERAGE_SIGNATURE } from "@/lib/signatureMenu";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: { absolute: dict.home.title },
    description: dict.home.description,
    alternates: localeAlternates(locale, "/"),
  };
}

export default async function Home({ params }) {
  const { locale } = await params;
  const [metadata, content, common, faqs, menu] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content"),
    getDictionary(locale, "common"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "menu"),
  ]);
  const title = metadata.home.title;
  const description = metadata.home.description;
  const home = content.home;

  // Homepage highlights pull hand-picked items from across several menu
  // sections (not one contiguous section), so they're localized by English
  // name against the full translated menu rather than by position.
  const localizedFood = localizeMenuSections(FOOD_SECTIONS, menu.food.sections);
  const localizedBeverage = localizeMenuSections(BEVERAGE_SECTIONS, menu.beverage.sections);
  const foodHighlights = localizeByEnglishName(FOOD_HOMEPAGE_HIGHLIGHTS, localizedFood, FOOD_SECTIONS);
  const beverageHighlights = localizeByEnglishName(BEVERAGE_SIGNATURE.items, localizedBeverage, BEVERAGE_SECTIONS);

  return (
    <main>
      {/* No previous page in the crumb trail — this IS home. mainEntityId
          points at the Restaurant node (StructuredData.js) rather than a
          per-page entity like other pages use, since the homepage's "main
          entity" is the business itself, not a menu or a form. */}
      <PageSchema
        path="/"
        name={title}
        description={description}
        crumbs={[{ name: "Home" }]}
        mainEntityId={`${SITE_URL}/#main`}
        locale={locale}
      />
      <Hero dict={home.hero} />
      <PromoTicker items={content.promoTicker} className="mx-auto mt-12 max-w-5xl px-6 md:mt-16" />
      <WhatsOn dict={home.whatsOn} />
      <Welcome dict={home.welcome} />
      <MenuHighlight dict={home.menuHighlight} foodItems={foodHighlights} beverageItems={beverageHighlights} />
      <WineShop dict={home.wineShop} />
      <Shuttle dict={home.shuttle} />
      <Recognition dict={home.recognition} />
      <InstagramPreview dict={home.instagram} />
      <Testimonials dict={home.testimonials} />
      <FAQ faqs={faqs} heading={common.faqHeading} subheading={common.faqSubheading} />
      <StickyReserveButton label={common.stickyReserveLabel} />
    </main>
  );
}
