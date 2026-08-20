import { cache } from "react";

// Server-only by convention (not enforced via the "server-only" package,
// which isn't a project dependency) — only ever call this from Server
// Components or Route Handlers, never from a "use client" file. Split by
// domain rather than one big per-locale file so a page that only needs
// e.g. "forms" doesn't pull the 186-item menu dictionary into its render.
const loaders = {
  common: (l) => import(`@/dictionaries/${l}/common.json`).then((m) => m.default),
  metadata: (l) => import(`@/dictionaries/${l}/metadata.json`).then((m) => m.default),
  menu: (l) => import(`@/dictionaries/${l}/menu.json`).then((m) => m.default),
  forms: (l) => import(`@/dictionaries/${l}/forms.json`).then((m) => m.default),
  email: (l) => import(`@/dictionaries/${l}/email.json`).then((m) => m.default),
  faqs: (l) => import(`@/dictionaries/${l}/faqs.json`).then((m) => m.default),
  content: (l) => import(`@/dictionaries/${l}/content.json`).then((m) => m.default),
};

// React's cache() request-memoizes this, so calling getDictionary("en",
// "common") from both the layout and a page in the same request only
// actually loads the JSON once.
export const getDictionary = cache(async (locale, domain) => {
  const loader = loaders[domain];
  if (!loader) throw new Error(`Unknown dictionary domain: "${domain}"`);
  return loader(locale);
});
