import { SITE_URL } from "@/lib/site";

/**
 * Per-page WebPage + BreadcrumbList pair. isPartOf links back to the
 * WebSite node from StructuredData.js (rendered site-wide in layout.js),
 * and mainEntity (when passed) links to that page's own content node
 * (e.g. the Menu or Restaurant @id) so the graph reads as one connected
 * entity instead of isolated fragments per page.
 *
 * `crumbs` is the breadcrumb trail from Home to the current page, e.g.
 * [{ name: "Home", path: "/" }, { name: "Food Menu" }] — the final entry
 * may omit `path` since it's the current page.
 */
export default function PageSchema({ path, name, description, type = "WebPage", crumbs, mainEntityId }) {
  const url = `${SITE_URL}${path}`;

  const webPage = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
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
      item: `${SITE_URL}${crumb.path || path}`,
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
