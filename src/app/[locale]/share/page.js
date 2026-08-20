import ShareHero from "@/components/share/Hero";
import ShareButtons from "@/components/share/ShareButtons";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Reached via a QR code on the guest's bill (word-of-mouth prompt at
// checkout) and by direct link — not a marketing landing page, so it's
// deliberately kept out of search entirely rather than competing with the
// site's real content pages. No PageSchema/JSON-LD either, same reasoning
// as the thank-you pages.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.share.title,
    description: dict.share.description,
    alternates: localeAlternates(locale, "/share"),
    robots: { index: false, follow: true },
  };
}

export default async function SharePage({ params }) {
  const { locale } = await params;
  const content = await getDictionary(locale, "content");

  return (
    <main>
      <ShareHero dict={content.share.hero} />
      <ShareButtons dict={{ ...content.share.buttons, shareMessage: content.share.shareMessage }} />
    </main>
  );
}
