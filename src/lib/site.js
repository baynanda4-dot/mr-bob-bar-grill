// Canonical URLs, the sitemap, and Open Graph tags all key off this.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mrbobbali.com";

export const SITE_NAME = "Mr Bob Bar and Grill";

// Google Ads conversion ID (confirmed 2026-08-20) — the base gtag.js loads
// site-wide from layout.js; the reservation/group-reservation thank-you
// pages fire the actual conversion event against this same ID once the
// conversion label (the "AW-.../xxxxxxxxxx" suffix from Google Ads' event
// snippet) is provided.
export const GOOGLE_ADS_CONVERSION_ID = "AW-18399902293";

// LOCATIONS[0] (the "main" outlet) is the ONLY one that takes reservations —
// ReservationForm, the confirmation emails, and StructuredData.js's JSON-LD
// Restaurant entity all key off LOCATIONS[0] specifically, by design, not by
// accident. LOCATIONS[1] (added 2026-08-16) is a second outlet in Benoa
// (Kec. Kuta Selatan, Kabupaten Badung — same greater Nusa Dua area, but a
// distinct addressLocality from the main outlet's) shown on the Contact page
// for contact purposes only — it deliberately has no
// `url`/`description`/`knowsAbout`/`image` (the SEO-facing fields), since it
// isn't meant to be its own bookable/indexed entity, just a second card on
// /contact.
export const LOCATIONS = [
  {
    id: "main",
    name: "Mr Bob Bar and Grill",
    description:
      "Mr Bob Bar and Grill is a Western bar and grill serving hand-cut steaks, pork ribs, and tomahawk chops alongside a curated wine selection, in a warm, black-and-gold dining room.",
    areaServed: { "@type": "Place", name: "Bali, Indonesia" },
    knowsAbout: ["Steakhouse", "Western grill", "Wine list", "Live music"],
    email: "mrbobtanjungbenoa@gmail.com",
    telephone: "+62 812-3805-2366",
    streetAddress: "Jl. Pratama No. 808",
    addressLocality: "Nusa Dua",
    addressRegion: "Bali",
    postalCode: "80361",
    latitude: -8.7747354,
    longitude: 115.2226125,
    sameAs: [
      "https://www.instagram.com/mrbobbarandgrill/",
      // Confirmed 2026-08-18: Claimed listing, 4.7/5 from 1,537 reviews —
      // location ID 11717118 verified consistent between this URL and the
      // official Tripadvisor widget embed the client shared (curl itself
      // gets a 403 from Tripadvisor's bot protection, expected, not a sign
      // the link is wrong).
      "https://www.tripadvisor.com/Restaurant_Review-g1465999-d11717118-Reviews-Mr_Bob_Bar_And_Grill_Tanjung_Benoa-Tanjung_Benoa_Nusa_Dua_Peninsula_Bali.html",
    ],
    facebook: "https://www.facebook.com/share/1DZndFn8kG/",
    hasMap: "https://www.google.com/maps/search/?api=1&query=-8.7747354,115.2226125",
    // Google's official "share this Business Profile" short link (confirmed
    // 2026-08-18) — lands on the Search knowledge panel for the exact same
    // listing (Knowledge Graph ID /g/11c55jtqmw, verified by redirect chain),
    // which shows the real 4.7/1,109 rating and offers "Write a review"
    // right there. Used as the homepage's "leave a review" CTA.
    googleReviewUrl: "https://share.google/IZKH8COZ5xjsl8w6r",
    // The Google-generated embed for the actual verified "Mr Bob Bar and
    // Grill Nusa Dua (Main Restaurant)" listing (has its own Place ID baked
    // in), not a generic lat/lng pin drop — richer card with the real name
    // and reviews inside the embed itself.
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.120467499355!2d115.2226125!3d-8.774735399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2430884abda37%3A0x516082ebcacd0f0a!2sMr%20Bob%20Bar%20and%20Grill%20Nusa%20Dua%20(%20Main%20Restaurant)!5e0!3m2!1sen!2sid!4v1786888257708!5m2!1sen!2sid",
    url: `${SITE_URL}/reservation`,
    image: `${SITE_URL}/images/shared/og-image.jpg`,
  },
  {
    id: "nusadua-second",
    name: "Mr Bob Bar and Grill Nusa Dua - Second Outlet",
    email: "mrbobnusadua@gmail.com",
    telephone: "+62 813-3896-3470",
    streetAddress: "Jl. Bypass Ngurah Rai",
    addressLocality: "Benoa",
    addressRegion: "Bali",
    postalCode: "80361",
    latitude: -8.7982918,
    longitude: 115.2238669,
    sameAs: ["https://www.instagram.com/mrbobnusadua/"],
    // mibextid= stripped — a Facebook share-tracking param, not part of the
    // permanent page URL (same reasoning as the main outlet's Instagram
    // igsh= cleanup above).
    facebook: "https://www.facebook.com/mrbobnusadua",
    hasMap: "https://www.google.com/maps/search/?api=1&query=-8.7982918,115.2238669",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.869897090829!2d115.22386689999999!3d-8.7982918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2433b2f1017e1%3A0x437e20818d90ae7e!2sMr.%20Bob%20Nusa%20Dua%20Bar%20and%20Grill!5e0!3m2!1sid!2sid!4v1786890201768!5m2!1sid!2sid",
  },
];

export const OPENING_HOURS = {
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  opens: "12:00",
  closes: "22:00",
};

// Shared LocalBusiness facts that don't vary — priceRange/paymentAccepted
// use schema.org's plain-text conventions (no fixed enum), so these strings
// are what Google's Rich Results Test expects.
export const BUSINESS_INFO = {
  priceRange: "$$$",
  currenciesAccepted: "IDR",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  areaServed: "Bali, Indonesia",
  servesCuisine: ["Western", "Steakhouse", "Grill"],
};
