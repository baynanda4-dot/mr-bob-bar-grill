import ShareHero from "@/components/share/Hero";
import ShareButtons from "@/components/share/ShareButtons";

// Reached via a QR code on the guest's bill (word-of-mouth prompt at
// checkout) and by direct link — not a marketing landing page, so it's
// deliberately kept out of search entirely rather than competing with the
// site's real content pages. No PageSchema/JSON-LD either, same reasoning
// as the thank-you pages.
const title = "Share Mr Bob Bar and Grill";
const description = "Share your Mr Bob Bar and Grill experience with friends and family.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/share" },
  robots: { index: false, follow: true },
};

export default function SharePage() {
  return (
    <main>
      <ShareHero />
      <ShareButtons />
    </main>
  );
}
