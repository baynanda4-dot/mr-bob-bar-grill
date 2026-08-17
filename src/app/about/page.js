import AboutHero from "@/components/about/Hero";
import OurStory from "@/components/about/OurStory";
import FeatureRows from "@/components/about/FeatureRows";
import QuoteBlock from "@/components/about/QuoteBlock";
import ClosingCTA from "@/components/about/ClosingCTA";
import PageSchema from "@/components/PageSchema";

const title = "About Us";
const description =
  "The story behind Mr Bob Bar and Grill, a Western steakhouse and wine bar built around hand-cut steaks, pork ribs, tomahawk chops, and live music.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <PageSchema
        path="/about"
        name={title}
        description={description}
        type="AboutPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "About Us" }]}
      />
      <AboutHero />
      <OurStory />
      <FeatureRows />
      <QuoteBlock />
      <ClosingCTA />
    </main>
  );
}
