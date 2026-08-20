import ThankYou from "@/components/ThankYou";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.reservationThankYou.title,
    robots: { index: false, follow: true },
    alternates: localeAlternates(locale, "/reservation/thank-you"),
  };
}

export default async function ReservationThankYouPage({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content");
  const thankYou = content.thankYou;

  return (
    <ThankYou
      heading={thankYou.reservation.heading}
      body={thankYou.reservation.body}
      links={getThankYouLinks(thankYou.links).reservation}
      alsoLikeLabel={thankYou.alsoLikeLabel}
      trackConversion
    />
  );
}
