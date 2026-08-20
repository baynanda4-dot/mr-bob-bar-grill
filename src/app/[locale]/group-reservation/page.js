import dynamic from "next/dynamic";
import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const EnquiryForm = dynamic(() => import("@/components/group-reservation/EnquiryForm"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.groupReservation.title,
    description: dict.groupReservation.description,
    alternates: localeAlternates(locale, "/group-reservation"),
  };
}

export default async function GroupReservationPage({ params }) {
  const { locale } = await params;
  const [metadata, content, forms] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content"),
    getDictionary(locale, "forms"),
  ]);
  const title = metadata.groupReservation.title;
  const description = metadata.groupReservation.description;
  const groupReservation = content.groupReservation;

  return (
    <main>
      <PageSchema
        path="/group-reservation"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: groupReservation.hero.title }]}
        locale={locale}
      />
      <GroupReservationHero dict={groupReservation.hero} />
      <Intro dict={groupReservation.intro} />
      <EnquiryForm dict={forms.groupReservation} common={forms.common} />
      <StickyReserveButton href="#enquiry" label={groupReservation.stickyReserveLabel} />
    </main>
  );
}
