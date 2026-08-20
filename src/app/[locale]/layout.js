import { Inter, Oswald, Spectral } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GOOGLE_ADS_CONVERSION_ID, SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Condensed face for nav, buttons, and small uppercase labels (routed via
// the h3-h6 rule in globals.css) — kept for UI chrome, not for the large
// display headings, which now go through Spectral below for a lighter,
// more fine-dining voice.
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Body copy — paired with Oswald/Spectral so headings and paragraphs read
// as deliberate, distinct type styles instead of one face doing everything.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display face for h1/h2 (routed via globals.css) — a true light-weight
// serif (not one of the overused "AI default" faces like Playfair/Cormorant/
// Fraunces) for the big headline/section-title/pull-quote moments, giving
// the site an elegant, fine-dining voice while Oswald stays for UI chrome.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

// Tells Next.js (and opennextjs-cloudflare's build) exactly which locale
// segments exist, so all 4 are prerendered at build time instead of
// treated as fully dynamic.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  const { title, description } = dict.home;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: [
      "Mr Bob Bar and Grill",
      "restaurant Nusa Dua",
      "restaurant Tanjung Benoa",
      "best restaurant Nusa Dua",
      "steakhouse Bali",
      "tomahawk steak",
      "pork ribs Bali",
      "wine bar Nusa Dua",
      "Western restaurant Bali",
      "live music restaurant Bali",
    ],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: "/images/shared/og-image.jpg", width: 1200, height: 800, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/shared/og-image.jpg"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const common = await getDictionary(locale, "common");

  return (
    <html lang={locale} className="no-js" suppressHydrationWarning>
      <body className={`${oswald.variable} ${inter.variable} ${spectral.variable} font-sans bg-mrbob-black text-mrbob-white`}>
        {/* beforeInteractive runs before hydration, so reveal elements never
            flash their hidden state and never get stuck hidden without JS. */}
        <Script id="no-js" strategy="beforeInteractive">
          {`document.documentElement.classList.remove('no-js')`}
        </Script>
        {/* Google Ads base tag — loads after hydration (Next's recommended
            strategy for analytics/tag-manager scripts) so it never competes
            with the LCP hero image for bandwidth. Fires no conversion by
            itself; the actual "form submitted" event lives on the
            reservation/group-reservation thank-you pages, which only ever
            render after a real successful submission. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_CONVERSION_ID}');`}
        </Script>
        {/* StructuredData is deliberately still English-only regardless of
            `locale` — it's the site-wide JSON-LD business entity (address,
            hours, reviews), not visible page copy, and per the i18n plan
            this schema.org graph stays a single canonical node rather than
            being duplicated per language. Navbar/Footer are locale-aware
            via the `common` dict above. */}
        <StructuredData />
        <Navbar dict={common} />
        {children}
        <Footer dict={common} />
      </body>
    </html>
  );
}
