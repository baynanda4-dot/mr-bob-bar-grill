import { SITE_URL } from "@/lib/site";
import { localePath } from "@/lib/i18n/alternates";

/**
 * Per-page WebPage + BreadcrumbList pair. isPartOf links back to the
 * WebSite node from StructuredData.js (rendered site-wide in layout.js),
 * and mainEntity (when passed) links to that page's own content node
 * (e.g. the Menu or Restaurant @id) so the graph reads as one connected
 * entity instead of isolated fragments per page. mainEntityId is passed
 * through as-is, deliberately never locale-prefixed — it references a
 * single canonical business entity (Organization/Restaurant/Menu, see
 * StructuredData.js) shared across all 4 locale variants, not one node
 * duplicated per language.
 *
 * `crumbs` is the breadcrumb trail from Home to the current page, e.g.
 * [{ name: "Home", path: "/" }, { name: "Food Menu" }] — the final entry
 * may omit `path` since it's the current page. `locale` comes from each
 * page's own `params.locale`.
 */
export default function PageSchema({ path, name, description, type = "WebPage", crumbs, mainEntityId, locale = "en" }) {
  const url = `${SITE_URL}${localePath(locale, path)}`;

  const webPage = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${localePath(locale, crumb.path || path)}`,
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [webPage, breadcrumbList],
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
