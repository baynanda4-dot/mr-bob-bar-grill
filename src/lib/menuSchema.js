// Builds schema.org Menu/MenuSection/MenuItem JSON-LD directly from the
// same {name, desc, price} arrays each menu page already renders from —
// single source of truth, so the structured data can never drift from what
// guests actually see on the page.

function parsePriceToIDR(raw) {
  if (!raw) return null;
  // Allows thousands separators ("1,100K") — without stripping commas first,
  // \d+ stops at the comma and silently matches only the trailing "100K".
  const match = String(raw).match(/(\d[\d,]*(?:\.\d+)?)\s*K/i);
  if (!match) return null;
  return String(Math.round(parseFloat(match[1].replace(/,/g, "")) * 1000));
}

const PERSON_WORDS = { one: 1, two: 2, three: 3, four: 4 };

// Set-menu prices like "IDR 550K (for two persons)" are a package price,
// not a per-person one — surfacing that as a bare Offer.price would let an
// AI/answer engine quote it as if it were per person. When this pattern is
// present, buildMenuItem attaches it as priceSpecification.referenceQuantity
// instead, so the price is only ever exposed already scoped to "for N".
function parsePersonReferenceQuantity(raw) {
  const match = String(raw).match(/for\s+(one|two|three|four|\d+)\s+persons?/i);
  if (!match) return null;
  const token = match[1].toLowerCase();
  const value = PERSON_WORDS[token] ?? Number(token);
  return Number.isFinite(value) ? { "@type": "QuantitativeValue", value, unitText: "person" } : null;
}

export function buildMenuItem({ name, desc, price }) {
  const amount = parsePriceToIDR(price);
  const referenceQuantity = amount ? parsePersonReferenceQuantity(price) : null;

  const offers = amount
    ? referenceQuantity
      ? {
          "@type": "Offer",
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: amount,
            priceCurrency: "IDR",
            referenceQuantity,
          },
        }
      : { "@type": "Offer", price: amount, priceCurrency: "IDR" }
    : null;

  return {
    "@type": "MenuItem",
    name,
    ...(desc ? { description: desc } : {}),
    ...(offers ? { offers } : {}),
  };
}

// Wine items price by pour size (glass and/or bottle) rather than a single
// figure, so each gets its own named Offer instead of the flat
// {name, desc, price} shape buildMenuItem expects — collapsing them to one
// price would silently drop whichever pour size didn't win.
export function buildWineMenuItem({ name, glass, bottle }) {
  const offers = [];
  const glassAmount = parsePriceToIDR(glass);
  const bottleAmount = parsePriceToIDR(bottle);
  if (glassAmount) offers.push({ "@type": "Offer", name: "Glass", price: glassAmount, priceCurrency: "IDR" });
  if (bottleAmount) offers.push({ "@type": "Offer", name: "Bottle", price: bottleAmount, priceCurrency: "IDR" });

  return {
    "@type": "MenuItem",
    name,
    ...(offers.length ? { offers } : {}),
  };
}

export function buildMenuSection({ title, note, items }) {
  return {
    "@type": "MenuSection",
    name: title,
    ...(note ? { description: note } : {}),
    hasMenuItem: items.map((item) => buildMenuItem(item)),
  };
}

export function buildWineMenuSection({ title, note, items }) {
  return {
    "@type": "MenuSection",
    name: title,
    ...(note ? { description: note } : {}),
    hasMenuItem: items.map((item) => buildWineMenuItem(item)),
  };
}

export function buildMenuJsonLd({ url, name, description, sections, offers }) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `${url}#menu`,
    name,
    ...(description ? { description } : {}),
    url,
    ...(offers ? { offers } : {}),
    hasMenuSection: sections.map((section) => buildMenuSection(section)),
  };
}
