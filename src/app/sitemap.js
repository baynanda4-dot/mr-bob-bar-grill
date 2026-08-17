import { SITE_URL } from "@/lib/site";

// Thank-you pages are excluded — transient per-guest confirmations, not
// content meant to be indexed or found via search.
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

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
