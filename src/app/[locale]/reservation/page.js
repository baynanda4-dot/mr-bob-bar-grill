import dynamic from "next/dynamic";
import ReservationHero from "@/components/reservation/Hero";
import ReservationPhotoPanel from "@/components/reservation/PhotoPanel";
import PromoTicker from "@/components/PromoTicker";
import InstagramPreview from "@/components/home/InstagramPreview";
import FAQ from "@/components/FAQ";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/reservation/ReservationForm"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  const { title, description } = dict.reservation;
  return {
    title: { absolute: title },
    description,
    alternates: localeAlternates(locale, "/reservation"),
    openGraph: {
      type: "website",
      title,
      description,
      images: [{ url: "/images/reservation/hero.jpg", width: 1200, height: 630, alt: "Mr Bob Bar and Grill" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/reservation/hero.jpg"],
    },
  };
}

export default async function ReservationPage({ params }) {
  const { locale } = await params;
  const [metadata, content, common, faqs, forms] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content"),
    getDictionary(locale, "common"),
    getDictionary(locale, "faqs"),
    getDictionary(locale, "forms"),
  ]);
  const title = metadata.reservation.title;
  const description = metadata.reservation.description;
  const reservation = content.reservation;

  return (
    <main>
      <PageSchema
        path="/reservation"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: reservation.hero.title }]}
        mainEntityId={`${SITE_URL}/#main`}
        locale={locale}
      />
      <ReservationHero dict={reservation.hero} />
      <PromoTicker items={content.promoTicker} className="mx-auto mt-12 max-w-4xl px-6 md:mt-16" />
      <section className="px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto mb-3 h-px w-8 bg-mrbob-yellow/50" />
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-mrbob-yellow">{reservation.joinUs.eyebrow}</p>
          <h2 className="mb-3 text-3xl font-light tracking-normal md:text-4xl">{reservation.joinUs.heading}</h2>
          <p className="text-white/70">{reservation.joinUs.body}</p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 overflow-hidden border border-white/10 lg:grid-cols-2">
          <ReservationPhotoPanel dict={reservation.photoPanel} hoursRange={common.hoursRange} />
          <div className="bg-white/[0.02] p-8 sm:p-10">
            <ReservationForm dict={forms.reservation} common={forms.common} />
          </div>
        </div>
      </section>
      <InstagramPreview dict={content.home.instagram} />
      <FAQ faqs={faqs} heading={common.faqHeading} subheading={common.faqSubheading} />
    </main>
  );
}
