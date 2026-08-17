import dynamic from "next/dynamic";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd, buildWineMenuSection } from "@/lib/menuSchema";
import { BEVERAGE_SIGNATURE } from "@/lib/signatureMenu";
import { SITE_URL } from "@/lib/site";

// Below the fold — its expand/collapse JS ships in its own chunk instead of
// the initial bundle. Still server-rendered (no ssr:false), so there's no
// content/SEO regression, just a smaller initial JS payload.
const InteractiveMenu = dynamic(() => import("@/components/menu/InteractiveMenu"));

const title = "Beverage Menu";
const description =
  "Mr Bob Bar and Grill's beverage menu: classic and signature cocktails, spirits by the shot, mocktails, beer, soft drinks, coffee & tea, juices, and our local house wine list.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/menu/beverage" },
};

const classicCocktail = [
  { name: "Margarita", desc: "Tequila, orange liqueur, fresh lime" },
  { name: "Mojito's", desc: "Rum, fresh lime, sprig of mint leaf" },
  { name: "Daiquiry's", desc: "Rum, orange liqueur, fresh lime" },
  { name: "Espresso Martini", desc: "Vodka, coffee liqueur, espresso" },
  { name: "Lychee Martini", desc: "Vodka, lychee liqueur, lychee fruit" },
  { name: "Caipirinha & Caipiroska", desc: "Rum/vodka, fresh lime, sweetener" },
  { name: "Long Island Ice Tea", desc: "Vodka, rum, gin, tequila, triple sec, lime, topped with Coke" },
  { name: "Pinacolada", desc: "Light rum, pineapple, coconut milk, coconut liqueur" },
  { name: "Old Fashioned", desc: "Bourbon whiskey, simple syrup, angostura bitter" },
  { name: "Negroni", desc: "Gin, campari, sweet vermouth" },
  { name: "Lemon Drop", desc: "Vodka, lemon juice, orange liqueur" },
  { name: "Dry or Sweet Martini", desc: "Dry gin, dry or sweet vermouth" },
  { name: "Whiskey Sour", desc: "Whiskey, lime juice, sugar" },
  { name: "Japanese Slipper", desc: "Vodka, lime juice, triple sec, melon liqueur" },
  { name: "Pink/White/Blue Lady", desc: "Gin, orange liqueur, lime juice, grenadine or blue curacao" },
  { name: "Tequila Sunrise", desc: "Tequila, orange juice, grenadine" },
  { name: "White or Black Russian", desc: "Vodka, coffee liqueur, cream" },
  { name: "Cosmopolitan", desc: "Vodka, triple sec, cranberry juice, lime juice" },
  { name: "Long Beach", desc: "Vodka, orange juice, cranberry juice" },
];

const bobsCocktails = BEVERAGE_SIGNATURE.items;

const spiritsByShot = [
  { name: "Gin", desc: "Bombay Sapphire", price: "100K" },
  { name: "Vodka", desc: "Absolut", price: "100K" },
  { name: "Rum", desc: "Bacardi, Captain Morgan", price: "100K" },
  { name: "Tequila", desc: "Jose Cuervo", price: "100K" },
  { name: "Scotch Whiskey", desc: "Red Label, Black Label", price: "100K" },
  { name: "American Whiskey", desc: "Jack Daniel, Jim Beam", price: "100K" },
  { name: "Irish Whiskey", desc: "John Jameson", price: "100K" },
];

const bobsRefreshing = [
  { name: "Shirley Temple", desc: "Cherry water, grenadine, lime juice, topped with sprite", price: "70K" },
  { name: "Hera's Crown", desc: "Orange juice, grenadine, lemon juice, topped with sprite", price: "70K" },
  { name: "Mint Sensation", desc: "Lychee, pineapple, mint leaf", price: "70K" },
  { name: "Mango Frappe", desc: "Mango puree/juice, orange juice, lime juice, tonic water", price: "70K" },
  { name: "Berry Sunshine", desc: "Strawberry, pineapple juice, orange juice, simple syrup", price: "70K" },
  { name: "Lychee Basilia", desc: "Lychee fruit, basil leaf, sweet sour, sprite", price: "70K" },
  { name: "Tiki Berry", desc: "Fresh strawberry, pineapple juice, passion syrup, coconut cream and lemon juice", price: "70K" },
  { name: "Lemon Lime Bitter", desc: "Lime juice, lemon juice, simple syrup, angostura bitter, soda water", price: "65K" },
  { name: "Lemon Up (Pink/Blue/Natural)", desc: "Fresh lemon juice, lemonade, simple syrup, grenadine/blue syrup", price: "60K" },
  { name: "Queenchers (Strawberry/Mango)", desc: "Lemon juice, mango/strawberry puree, lemonade, simple syrup", price: "60K" },
];

const beers = [
  { name: "Bintang", desc: "Large / Small", price: "70K / 50K" },
  { name: "Bintang Radler", price: "50K" },
  { name: "Crystal Bintang", price: "55K" },
  { name: "Heineken", desc: "Large / Small", price: "75K / 55K" },
  { name: "Balihai", desc: "Large / Small", price: "75K / 55K" },
  { name: "Singaraja", price: "35K" },
  { name: "Prost Pilsner / Lager", price: "40K" },
  { name: "Albens Apple Cider", price: "60K" },
  { name: "Tower Bintang", price: "200K" },
  { name: "Tower Balihai", price: "215K" },
  { name: "Tower Heineken", price: "215K" },
];

const softDrinks = [
  { name: "Coke", price: "20K" },
  { name: "Coke Zero", price: "20K" },
  { name: "Sprite", price: "20K" },
  { name: "Fanta", price: "20K" },
  { name: "Tonic Water", price: "20K" },
  { name: "Soda Water", price: "20K" },
  { name: "Ginger Ale", price: "20K" },
  { name: "Natural Water", price: "25K" },
  { name: "Sparkling Water", price: "35K" },
];

const milkshakes = [
  { name: "Vanilla", price: "55K" },
  { name: "Chocolate", price: "55K" },
  { name: "Banana", price: "55K" },
  { name: "Mango", price: "55K" },
  { name: "Strawberry", price: "55K" },
];

const teaCoffee = [
  { name: "Balinese Coffee", price: "25K" },
  { name: "Regular Tea", price: "35K" },
  { name: "Lychee Tea", price: "35K" },
  { name: "Passion Tea", price: "35K" },
  { name: "Lemon Grass Tea", price: "35K" },
  { name: "Mint Ginger Tea", price: "35K" },
];

const juices = [
  { name: "Watermelon", price: "50K" },
  { name: "Pineapple", price: "50K" },
  { name: "Mango", price: "50K" },
  { name: "Orange", price: "50K" },
  { name: "Mix Juice", price: "50K" },
  { name: "Papaya", price: "50K" },
  { name: "Lemon", price: "50K" },
  { name: "Banana", price: "50K" },
  { name: "Lime", price: "50K" },
  { name: "Fresh Coconut", price: "50K" },
];

const localWhiteWine = [
  { name: "Two Island Sauvignon Blanc", glass: "85K" },
  { name: "Two Island Pinot Grigio", glass: "85K" },
  { name: "Two Island Chardonnay", glass: "85K" },
  { name: "Two Island Riesling", glass: "85K" },
];

const localRedWine = [
  { name: "Two Island Cabernet Merlot", glass: "85K" },
  { name: "Two Island Shiraz", glass: "85K" },
  { name: "Two Island Pinot Noir", glass: "85K" },
];

const localRoseWine = [{ name: "Two Island Rose", glass: "85K" }];

const wineItems = [...localWhiteWine, ...localRedWine, ...localRoseWine];

const sections = [
  { title: "Classic Cocktail", note: "Premium Spirit 135K / Local Spirit 100K", items: classicCocktail },
  { title: "Bob's Cocktails (Signature)", note: "120K", items: bobsCocktails },
  { title: "Spirits by Shot", note: "45ml", items: spiritsByShot },
  { title: "Bob's Refreshing", items: bobsRefreshing },
  { title: "Beer's", items: beers },
  { title: "Soft Drinks & Water", items: softDrinks },
  { title: "Milkshake & Smoothies", items: milkshakes },
  { title: "Coffee & Tea's", items: teaCoffee },
  { title: "Juices", items: juices },
];

const menuJsonLd = buildMenuJsonLd({
  url: `${SITE_URL}/menu/beverage`,
  name: "Mr Bob Bar and Grill Beverage Menu",
  description,
  sections,
});

// Wine is priced by glass only (no bottle here), so it goes through
// buildWineMenuSection (named Offers per pour size) instead of the
// sections array above, which assumes one flat price per item.
menuJsonLd.hasMenuSection.push(
  buildWineMenuSection({
    title: "Local House Wine",
    note: "By the glass.",
    items: wineItems,
  })
);

// UI-only sections (not JSON-LD, which handles wine separately above) — the
// same wine items reshaped to the flat {name, price} row InteractiveMenu
// expects, split by color the way the page already grouped them.
const wineSections = [
  { title: "White Wine", note: "By the glass (85K)", items: localWhiteWine.map((w) => ({ name: w.name, price: w.glass })) },
  { title: "Red Wine", note: "By the glass (85K)", items: localRedWine.map((w) => ({ name: w.name, price: w.glass })) },
  { title: "Rosé Wine", note: "By the glass (85K)", items: localRoseWine.map((w) => ({ name: w.name, price: w.glass })) },
];
const allSections = [...sections, ...wineSections];

export default function BeverageMenuPage() {
  return (
    <main>
      <PageSchema
        path="/menu/beverage"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Beverage Menu" }]}
        mainEntityId={`${SITE_URL}/menu/beverage#menu`}
      />
      <script
        type="application/ld+json"
        // Data is built from the arrays above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/beverage-hero.jpg" alt="Mr Bob Bar and Grill beverage menu: cocktails, spirits, beer, and wine" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-light tracking-normal mb-2">Beverage Menu</h1>
          <p className="text-sm text-gray-300">Prices are quoted in &lsquo;000&rsquo; IDR and subject to 11% government tax.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto border-t border-white/10 py-16 px-6">
        <div className="mb-10 flex justify-center">
          <Link href="/menu/food" className="btn-outline u-press px-6 py-3 text-sm tracking-widest">
            VIEW FOOD MENU
          </Link>
        </div>

        <InteractiveMenu sections={allSections} />

        <p className="mt-10 text-center text-xs text-white/40">
          Prices are quoted in &lsquo;000&rsquo; IDR and subject to 11% government tax.
        </p>
      </div>

      <StickyReserveButton href="/reservation" label="RESERVE TABLE" />
    </main>
  );
}
