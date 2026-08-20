// Merges a static, English-authored menu section array (name/desc/price,
// as written in app/[locale]/menu/food|beverage/page.js) with a locale
// dictionary's translated sections (dictionaries/*/menu.json) — price and
// any other structural fields stay from the static source (never
// translated, see the i18n plan), only title/note/name/desc are swapped
// for the locale's text. Sections and items must be in the exact same
// order/count across every locale (verified at dictionary-authoring time),
// since the merge is positional.
export function localizeMenuSections(staticSections, dictSections) {
  return staticSections.map((section, i) => {
    const dictSection = dictSections[i];
    return {
      ...section,
      title: dictSection.title,
      note: dictSection.note,
      items: section.items.map((item, j) => ({
        ...item,
        name: dictSection.items[j].name,
        desc: dictSection.items[j].desc,
      })),
    };
  });
}

// For a hand-picked, cross-section list (e.g. the homepage's curated
// highlights, which pull items from several different menu sections rather
// than one contiguous section) — looks up each item's localized name/desc
// by matching its English name against every section of the already-merged
// (English + translated) full menu. Dish names are unique across the whole
// menu, so this is a safe lookup without a second hand-maintained
// translation list. `englishItems` are the original English {name, desc,
// price} objects (used as the lookup key); `localizedFullSections` is the
// output of localizeMenuSections() for that same menu.
export function localizeByEnglishName(englishItems, localizedFullSections, englishFullSections) {
  const map = new Map();
  englishFullSections.forEach((section, i) => {
    section.items.forEach((item, j) => {
      map.set(item.name, localizedFullSections[i].items[j]);
    });
  });

  return englishItems.map((item) => {
    const match = map.get(item.name);
    return match ? { ...item, name: match.name, desc: match.desc } : item;
  });
}
