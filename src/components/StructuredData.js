import { BUSINESS_INFO, LOCATIONS, OPENING_HOURS, SITE_NAME, SITE_URL } from "@/lib/site";
import { REVIEWS } from "@/lib/reviews";

/**
 * Site-wide @graph, rendered on every page via layout.js: Organization (the
 * brand), WebSite (so per-page WebPage nodes in PageSchema.js have an
 * isPartOf target), and the single Restaurant location. Read by search
 * engines and AI answer engines (Google, ChatGPT/Gemini browsing) to ground
 * facts like address, hours, and cuisine instead of guessing from page text.
 *
 * No sitelinks-search WebSite.potentialAction: the site has no on-site
 * search, and Google explicitly says not to add SearchAction markup for a
 * search box that doesn't exist.
 */
export default function StructuredData() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const location = LOCATIONS[0];

  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/shared/logo.png`,
    },
    // Only identity links we can confirm belong to Mr Bob go here — no
    // guessed social URLs. TODO: fill in once real accounts exist.
    sameAs: location.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        telephone: location.telephone,
        email: location.email,
        areaServed: "ID",
        availableLanguage: ["en", "id"],
        url: location.url,
      },
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Official website of Mr Bob Bar and Grill, a Western steakhouse and wine bar with live music every Monday, Wednesday, and Saturday.",
    publisher: { "@id": organizationId },
    inLanguage: "en",
  };

  const restaurant = {
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#${location.id}`,
    name: location.name,
    description: location.description,
    url: location.url,
    telephone: location.telephone,
    email: location.email,
    image: { "@type": "ImageObject", url: location.image },
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    servesCuisine: BUSINESS_INFO.servesCuisine,
    areaServed: location.areaServed || BUSINESS_INFO.areaServed,
    acceptsReservations: "True",
    ...(location.hasMap ? { hasMap: location.hasMap } : {}),
    // References the actual Menu entity defined on /menu/food (see
    // app/menu/food/page.js) instead of a bare URL, so the two stay one
    // connected graph.
    hasMenu: { "@id": `${SITE_URL}/menu/food#menu` },
    parentOrganization: { "@id": organizationId },
    isPartOf: { "@id": websiteId },
    ...(location.knowsAbout ? { knowsAbout: location.knowsAbout } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.dayOfWeek,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
    // Mirrored on the homepage's Recognition section (components/home/Recognition.js).
    // The #1 ranking claim (confirmed by the client 2026-08-17) leads the
    // list since it's the strongest local-trust signal.
    award: [
      "#1 Restaurant in Tanjung Benoa, Nusa Dua on Tripadvisor",
      "Ctrip Gourmet List 2018",
      "Ctrip Gourmet List 2019",
      "Tripadvisor Travelers' Choice Award 2018",
      "Tripadvisor Travelers' Choice Award 2019",
      "Tripadvisor Travelers' Choice Award 2020",
      "Tripadvisor Travelers' Choice Award 2022",
      "Tripadvisor Travelers' Choice Award 2023",
      "Tripadvisor Travelers' Choice Award 2024",
      "Tripadvisor Travelers' Choice Award 2025",
    ],
    // Built from REVIEWS (src/lib/reviews.js) — the exact 5 real Tripadvisor
    // reviews shown on the homepage's Testimonials marquee, not an invented
    // figure. Google requires aggregateRating to be substantiated by
    // genuine reviews the page actually displays; this is that.
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1),
      reviewCount: REVIEWS.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      name: r.title,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: { "@type": "Organization", name: "Tripadvisor" },
    })),
    sameAs: location.sameAs,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [organization, website, restaurant],
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (src/lib/site.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
