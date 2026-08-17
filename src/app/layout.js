import { Inter, Oswald, Spectral } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

// Leads with the Tripadvisor ranking claim (confirmed by the client
// 2026-08-17: #1 in Tanjung Benoa/Nusa Dua) since that's the single
// strongest local-trust signal a search snippet can carry — paired with
// both area names guests actually search by, Tanjung Benoa (the formal
// locality) and Nusa Dua (the resort area guests know it by).
const title = `${SITE_NAME} | #1 Restaurant in Tanjung Benoa, Nusa Dua`;
const description =
  "Mr Bob Bar and Grill, the #1-rated restaurant in Tanjung Benoa, Nusa Dua on Tripadvisor. Hand-cut steaks, pork ribs, and tomahawk chops, a curated wine list, and live music every Monday, Wednesday, and Saturday in Nusa Dua, Bali.";

export const metadata = {
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
    images: [{ url: "/images/shared/og-image.jpg", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/shared/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body className={`${oswald.variable} ${inter.variable} ${spectral.variable} font-sans bg-mrbob-black text-mrbob-white`}>
        {/* beforeInteractive runs before hydration, so reveal elements never
            flash their hidden state and never get stuck hidden without JS. */}
        <Script id="no-js" strategy="beforeInteractive">
          {`document.documentElement.classList.remove('no-js')`}
        </Script>
        <StructuredData />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
