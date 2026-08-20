import { SITE_URL } from "@/lib/site";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/alternates";

// Thank-you pages and /share are excluded — transient per-guest
// confirmations and a QR-code-only word-of-mouth page, none meant to be
// indexed or found via search (same reasoning as their own robots.noindex).
const routes = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.7 },
  { path: "/menu/food", priority: 0.8 },
  { path: "/menu/beverage", priority: 0.7 },
  { path: "/reservation", priority: 0.9 },
  { path: "/group-reservation", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();

  // One entry per route x locale, each carrying the full set of hreflang
  // alternates (including x-default) so Google can offer visitors the
  // right language variant directly from search results.
  return routes.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified,
      changeFrequency: "monthly",
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path)}`])),
          "x-default": `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`,
        },
      },
    }))
  );
}
