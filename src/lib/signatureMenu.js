// Single source of truth for each menu's signature items — read by both the
// full menu pages (menu/food, menu/beverage) and the homepage's "On the
// Menu" preview (home/MenuHighlight.js), so the two can never drift apart.

export const FOOD_SIGNATURE = [
  { name: "Mr Bob's BBQ Ribs", desc: "Our finest well marinated 600 gr Baby Back Pork Ribs, slow charcoal grilled with honey and Mr Bob's sauce", price: "215K" },
  { name: "Beef Tomahawk", desc: "1000-1200 gr grilled Australian beef tomahawk served with three kinds of sauce (BBQ, mushroom and black pepper), mixed salad, sauteed vegetables and potato wedges. Suitable for 2 pax; takes around 60 minutes to prepare.", price: "950K" },
];

// Homepage-only curation, separate from FOOD_SIGNATURE above (which is also
// what the food menu page's own "Our Signature" section renders) — this
// pulls the pricier/standout dish from each grill category across the full
// food menu, so the homepage preview has real, existing dishes to show
// rather than duplicating the on-page section or inventing new ones.
// Trimmed to 6 (Surf and Turf/Salmon Steak/Lamb Steak/Rib Eye Steak removed
// 2026-08-16 per user feedback — the homepage panel was running too long
// once MenuHighlight.js stopped truncating with "Show More"); those four
// dishes are untouched on the full /menu/food page, just not featured here.
export const FOOD_HOMEPAGE_HIGHLIGHTS = [
  ...FOOD_SIGNATURE,
  { name: "Mixed Grill (for two)", desc: "Grilled 1 pc pork chop, 1/2 portion ribs, 1 pc sirloin steak, 2 pcs lamb medallion, 2 pcs chicken sausage and 2 pcs pork ham, served with mushroom sauce, black pepper sauce, BBQ sauce, mixed salad and potato wedges", price: "900K" },
  { name: "Seafood Basket (for two)", desc: "Grilled 1 pc lobster, 5 pcs king prawn, 2 pcs mahi-mahi steak, 1 pc squid, served with mixed salad, french fries or steamed rice, and 3 kinds of sauce. Includes 2 small Bintang beers.", price: "850K" },
  { name: "Pork Knuckle (for two)", desc: "1.1kg deep fried pork knuckle served with mashed potatoes, sauteed vegetables, bean sauce, and pork gravy", price: "800K" },
  { name: "Grill Lobster", desc: "350 gr grilled lobster served with mixed salad, mashed potatoes, mustard cream sauce, and lemon butter sauce", price: "450K" },
];

export const BEVERAGE_SIGNATURE = {
  note: "120K",
  items: [
    { name: "Bob's Bitter Sweet", desc: "White rum, campari, pineapple juice, passion syrup" },
    { name: "Bob's Negroni", desc: "Campari, cherry water, sweet vermouth" },
    { name: "Tropical Gin", desc: "Gin, strawberry, lime, mint leaf, sugar, topped with tonic water" },
    { name: "Flower Bloom", desc: "Gin, lime juice, cananga syrup, soda water" },
    { name: "Bloody Orange", desc: "Vodka, orange juice, fresh strawberry, lime juice, simple syrup" },
    { name: "Bob's Sangria", desc: "Spiced arak, red/white wine, tropical fruit" },
    { name: "Mango Basil Daiquiry", desc: "White rum, mango juice, triple sec, basil leaf, lime juice" },
    { name: "Watermelon Mexico", desc: "Tequila, orange liqueur, lime juice, watermelon, passion syrup" },
    { name: "Bob Penicillin", desc: "Whisky, fresh lemon juice, lemongrass honey syrup" },
    { name: "Nusa Dua Colada", desc: "White rum, pineapple liqueur, pineapple juice, mango juice, coconut cream, blue syrup" },
  ],
};
