import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.groupReservationThankYou.title,
    robots: { index: false, follow: true },
    alternates: localeAlternates(locale, "/group-reservation/thank-you"),
  };
}

export default async function GroupReservationThankYouPage({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content");
  const thankYou = content.thankYou;

  return (
    <ThankYou
      heading={thankYou.groupReservation.heading}
      body={thankYou.groupReservation.body}
      links={getThankYouLinks(thankYou.links)["group-reservation"]}
      alsoLikeLabel={thankYou.alsoLikeLabel}
      trackConversion
    />
  );
}
