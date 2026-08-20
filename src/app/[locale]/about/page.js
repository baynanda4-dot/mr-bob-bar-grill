import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";
import PageSchema from "@/components/PageSchema";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.about.title,
    description: dict.about.description,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const [metadata, content] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content"),
  ]);
  const title = metadata.about.title;
  const description = metadata.about.description;
  const about = content.about;

  return (
    <main>
      <PageSchema
        path="/about"
        name={title}
        description={description}
        type="AboutPage"
        crumbs={[{ name: "Home", path: "/" }, { name: about.hero.title }]}
        locale={locale}
      />
      <AboutHero dict={about.hero} />
      <OurStory dict={about.ourStory} />
      <FeatureRows dict={about.featureRows} />
      <QuoteBlock dict={about.quoteBlock} />
      <ClosingCTA dict={about.closingCta} />
    </main>
  );
}
