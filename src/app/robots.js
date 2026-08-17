import { SITE_URL } from "@/lib/site";

// No disallowed paths — every route here is public marketing content, and
// leaving AI crawlers (GPTBot, Google-Extended, PerplexityBot, ClaudeBot, …)
// unblocked is what lets answer engines cite this site accurately.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
