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

const title = "Mr Bob Bar and Grill | #1 Restaurant in Tanjung Benoa, Nusa Dua";
const description =
  "Mr Bob Bar and Grill, the #1-rated restaurant in Tanjung Benoa, Nusa Dua on Tripadvisor. Hand-cut steaks, pork ribs, and tomahawk chops, a curated wine list, and live music every Monday, Wednesday, and Saturday in Nusa Dua, Bali.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
};

export default function Home() {
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
      />
      <Hero />
      <PromoTicker className="mx-auto mt-12 max-w-5xl px-6 md:mt-16" />
      <WhatsOn />
      <Welcome />
      <MenuHighlight />
      <WineShop />
      <Shuttle />
      <Recognition />
      <InstagramPreview />
      <Testimonials />
      <FAQ />
      <StickyReserveButton />
    </main>
  );
}
