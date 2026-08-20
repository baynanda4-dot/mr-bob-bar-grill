// Hand-rolled Accept-Language matcher — deliberately dependency-free (no
// next-intl, no @formatjs/intl-localematcher). This file is imported by
// src/middleware.js, which must stay in Next's Edge Runtime sandbox on this
// stack (see the comment at the top of middleware.js for why); keeping this
// to plain string parsing avoids adding dependency surface to that one file.
//
// Parses a header like "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7" into
// [{ tag: "de-DE", q: 1 }, { tag: "de", q: 0.9 }, ...] sorted by weight,
// then matches each tag's primary subtag ("de-DE" -> "de") against the
// supported locales in priority order.
export function matchLocale(acceptLanguageHeader, locales, defaultLocale) {
  if (!acceptLanguageHeader) return defaultLocale;

  const parsed = acceptLanguageHeader
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((entry) => entry.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parsed) {
    const primarySubtag = tag.split("-")[0];
    if (locales.includes(primarySubtag)) return primarySubtag;
  }

  return defaultLocale;
}
