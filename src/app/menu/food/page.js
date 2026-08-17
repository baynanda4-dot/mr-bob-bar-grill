import dynamic from "next/dynamic";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";
import { buildMenuJsonLd } from "@/lib/menuSchema";
import { FOOD_SIGNATURE } from "@/lib/signatureMenu";
import { SITE_URL } from "@/lib/site";

// Below the fold — its expand/collapse JS ships in its own chunk instead of
// the initial bundle. Still server-rendered (no ssr:false), so there's no
// content/SEO regression, just a smaller initial JS payload.
const InteractiveMenu = dynamic(() => import("@/components/menu/InteractiveMenu"));

const title = "Food Menu";
const description =
  "Mr Bob Bar and Grill's food menu: appetizers, soups, our signature BBQ ribs and beef tomahawk, Indonesian favorites, grilled poultry, seafood, beef, lamb and pork, burgers, pizza, pasta, a kids menu, and desserts.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/menu/food" },
};

const appetizer = [
  { name: "Vegetables Spring Roll", desc: "Fried roll filled with mixed vegetables, served with sweet & sour sauce", price: "55K" },
  { name: "Tomato Bruschetta", desc: "Baguette, tomato, basil, onion, olive oil, fetta cheese & balsamic vinegar", price: "65K" },
  { name: "Garlic Bread", desc: "Baguette, toasted with garlic butter", price: "65K" },
  { name: "Garden Salad", desc: "Mixed lettuce, onion, cucumber and carrot with balsamic vinaigrette", price: "75K" },
  { name: "Caesar Salad", desc: "Baby romain lettuce, crispy bacon, garlic bread and caesar dressing", price: "95K" },
  { name: "Thai Beef Salad", desc: "Served with mixed salad and thai dressing", price: "95K" },
  { name: "Smoked Salmon Salad", desc: "Served with mini mesclun and chili lime dressing", price: "95K" },
];

const soups = [
  { name: "Cream Corn Soup", desc: "Thick soup with sweet corn and garlic bread", price: "65K" },
  { name: "Chicken Vegetable Soup", desc: "Clear soup with diced chicken, carrot, onion, and green bean", price: "55K" },
  { name: "Seafood Cream Soup", desc: "Mixed seafood, cream, served with garlic bread", price: "75K" },
  { name: "Tom Yum Soup", desc: "Spicy prawn, fish, squid, and slice mushroom", price: "75K" },
  { name: "Chicken Noodle Soup", desc: "Sliced chicken leg, vegetables, chicken stock, egg noodle", price: "55K" },
];

const signature = FOOD_SIGNATURE;

const sideDish = [
  { name: "Steamed Rice", price: "20K" },
  { name: "Pineapple Rice", price: "30K" },
  { name: "Corn Rice", price: "30K" },
  { name: "Mixed Salad", price: "30K" },
  { name: "Potatoes Wedges", price: "30K" },
  { name: "Mashed Potatoes", price: "30K" },
  { name: "French Fries", price: "30K" },
  { name: "Sauteed Vegetables", price: "30K" },
];

const indonesian = [
  { name: "Beef Rendang", desc: "Dices of beef stewed in Indonesian style served with steamed rice", price: "145K" },
  { name: "Seafood Curry", desc: "Prawn, fish and squid, mixed vegetables braised with curry sauce", price: "140K" },
  { name: "Chicken Curry", desc: "Sliced chicken breast and mixed vegetables braised with curry sauce", price: "110K" },
  { name: "Ayam Betutu", desc: "Braised half baby chicken served with sayur urab and steamed rice", price: "110K" },
  { name: "Bebek Goreng", desc: "Crispy half fried duck served with vegetables curry and steamed rice", price: "120K" },
  { name: "Nasi Goreng Seafood", desc: "Fried rice, prawn, fish, squid, prawn satay and crackers", price: "130K" },
  { name: "Nasi Goreng Ayam / Mie Goreng Ayam", desc: "Fried rice or noodle with egg, chicken satay and crackers", price: "100K" },
  { name: "Nasi Goreng Iga Bakar", desc: "Fried rice with egg, pork ribs and crackers", price: "140K" },
  { name: "Nasi Goreng Crispy Pork Belly", desc: "Fried rice with egg and pork belly", price: "140K" },
  { name: "Beef Paela", desc: "Grilled sirloin steak and prawn on yellow rice", price: "190K" },
  { name: "Cap Cay Ayam / Cap Cay Seafood", desc: "Stir fry chicken or seafood and vegetables Chinese style, served with steamed rice", price: "100K / 130K" },
];

const grillPoultry = [
  { name: "Grill Chicken Leg Boneless", desc: "200 gr grilled chicken leg boneless, honey chili sauce, served with sambal matah and steamed rice", price: "100K" },
  { name: "Grill Baby Chicken", desc: "Half grilled baby chicken with Balinese spice, served with steamed rice, sambal matah and sayur urab", price: "110K" },
  { name: "Chicken Satay", desc: "8 pcs grilled chicken satay, served with peanut sauce and steamed rice", price: "110K" },
  { name: "Chicken Steak", desc: "Grilled 200 gr chicken breast served with mashed potatoes, sauteed vegetables and mushroom cream sauce", price: "110K" },
  { name: "Chicken Cordon Bleu", desc: "Chicken breast stuffed with ham and cheese, served with mashed potatoes, sauteed vegetables and mushroom cream sauce", price: "110K" },
];

const grillSeafood = [
  { name: "Grill Lobster", desc: "350 gr grilled lobster served with mixed salad, mashed potatoes, mustard cream sauce, and lemon butter sauce", price: "450K" },
  { name: "Grill Prawn", desc: "5 pcs selected grilled king prawn, served with lemon butter, honey chili sauce, mixed salad and mashed potatoes", price: "170K" },
  { name: "Grill Snapper", desc: "350 gr grilled whole baby white snapper served with sambal matah and steamed rice", price: "140K" },
  { name: "Salmon Steak", desc: "200 gr pan seared salmon steak served with mixed vegetables, mashed potatoes, honey chili and lemon butter sauce", price: "210K" },
  { name: "Grill Mahi-Mahi Fillet", desc: "200 gr grilled mahi-mahi fish served with mixed salad, lemon butter, honey chili sauce, and mashed potatoes", price: "140K" },
  { name: "Seafood Basket (for two)", desc: "Grilled 1 pc lobster, 5 pcs king prawn, 2 pcs mahi-mahi steak, 1 pc squid, served with mixed salad, french fries or steamed rice, and 3 kinds of sauce (lemon butter, sambal matah, honey chili). Includes 2 small Bintang beers.", price: "850K" },
];

const grillMeat = [
  { name: "Tenderloin Steak", desc: "200 gr grilled beef tenderloin served with black pepper and mushroom sauce, sauteed vegetables and french fries", price: "195K" },
  { name: "Sirloin Steak", desc: "200 gr grilled beef sirloin served with mushroom sauce, black pepper sauce, sauteed vegetables and french fries", price: "175K" },
  { name: "Rib Eye Steak", desc: "200 gr grilled beef rib eye served with mushroom sauce, black pepper sauce, sauteed vegetables and french fries", price: "185K" },
  { name: "Grilled Beef Kebab", desc: "Grilled diced beef with red pepper, green pepper, and onion on skewer, served with mushroom, black pepper sauce and potato wedges", price: "195K" },
  { name: "Lamb Steak", desc: "200 gr grilled lamb served with mushroom sauce, black pepper sauce, sauteed vegetables and french fries", price: "205K" },
  { name: "Lamb Satay", desc: "10 pcs lamb satay served with steamed rice and peanut sauce", price: "170K" },
  { name: "Surf and Turf", desc: "Grilled 200 gr tenderloin steak topped with prawn, served with mini mesclun, potato wedges, mushroom sauce and BBQ sauce", price: "220K" },
];

const grillPork = [
  { name: "Pork Knuckle (for two)", desc: "1.1kg deep fried pork knuckle served with mashed potatoes, sauteed vegetables, bean sauce, and pork gravy", price: "800K" },
  { name: "Grill Pork Chop", desc: "350 gr grilled pork chop served with BBQ sauce, black pepper sauce, sauteed vegetables and french fries", price: "220K" },
  { name: "Grill Pork Steak", desc: "200 gr grilled pork steak served with BBQ sauce, black pepper sauce, sauteed vegetables and french fries", price: "150K" },
  { name: "Pork Satay", desc: "10 pcs grilled pork satay with steamed rice and peanut sauce", price: "120K" },
  { name: "Grill Pork Belly Satay", desc: "4 pcs grilled pork belly satay served with steamed rice and hot sweet chili sauce", price: "150K" },
  { name: "Crispy Pork Belly", desc: "Served with sweet chili soya sauce, black bean sauce and steamed rice", price: "170K" },
  { name: "Mixed Grill (for two)", desc: "Grilled 1 pc pork chop, 1/2 portion ribs, 1 pc sirloin steak, 2 pcs lamb medallion, 2 pcs chicken sausage and 2 pcs pork ham, served with mushroom sauce, black pepper sauce, BBQ sauce, mixed salad and potato wedges", price: "900K" },
];

const burgerSandwich = [
  { name: "Black Devil", desc: "100 gr Texas beef patty, bacon, homemade chili sauce, egg, cheddar cheese, lettuce, tomato, served with french fries", price: "110K" },
  { name: "White Angel", desc: "100 gr imported wagyu patty, bacon, egg, cheddar cheese, lettuce, tomato, Bob's burger sauce, served with french fries", price: "110K" },
  { name: "Chicken Sandwich", desc: "Toast, chicken, cheese, tomato, lettuce, served with french fries", price: "90K" },
  { name: "Chicken Ciabatta", desc: "Ciabatta bread, chicken, cheese, tomato, lettuce, served with french fries", price: "100K" },
  { name: "Club Sandwich", desc: "Toast, tomato, bacon, egg, cheese, lettuce, served with french fries", price: "100K" },
  { name: "Smoked Salmon Sandwich", desc: "Toast, smoked salmon, lettuce, tomato and cheese, served with french fries", price: "100K" },
];

const pizzaPasta = [
  { name: "Margarita Pizza", desc: "Tomato concasse and mozzarella cheese", price: "95K" },
  { name: "Pizza Sambal Matah", desc: "Tomato concasse, shredded chicken and mozzarella cheese", price: "110K" },
  { name: "Pizza Ayam Betutu", desc: "Tomato concasse, shredded chicken, betutu spice and mozzarella cheese", price: "110K" },
  { name: "Hawaiian Pizza", desc: "Tomato concasse, diced chicken, diced pineapple and mozzarella cheese", price: "110K" },
  { name: "Meat Lover Pizza", desc: "Tomato concasse, beef chorizo, ham, salami, and mozzarella cheese", price: "140K" },
  { name: "BBQ Chicken Pizza", desc: "Tomato concasse, BBQ chicken, mixed bell pepper, onion and mozzarella cheese", price: "130K" },
  { name: "Spaghetti Marinara", desc: "Mixed seafood, tomato concasse, basil, parmesan cheese", price: "140K" },
  { name: "Spaghetti Bolognaise", desc: "Minced beef, tomato concasse, basil, parmesan cheese", price: "140K" },
  { name: "Spaghetti Carbonara", desc: "Bacon, cream, parsley, parmesan cheese", price: "140K" },
  { name: "Fettuccine Alfredo", desc: "Spaghetti with mushroom, ham, cream sauce and parmesan cheese", price: "140K" },
  { name: "Spaghetti Napolitana", desc: "Spaghetti with tomato sauce and parmesan cheese", price: "90K" },
  { name: "Spaghetti Aglio Olio", desc: "Sauteed spaghetti with olive oil, sliced garlic, hot chili, parmesan cheese", price: "90K" },
  { name: "Spaghetti Aglio Olio with Grilled Prawn", desc: "Sauteed spaghetti with olive oil, sliced garlic, hot chili, 3 pcs grilled prawn and parmesan cheese", price: "130K" },
];

const bobsJunior = [
  { name: "Fish & Chips", desc: "Served with tartar sauce & thousand island sauce", price: "80K" },
  { name: "Calamari Ring", desc: "Served with tartar sauce & thousand island sauce", price: "80K" },
  { name: "Spaghetti Napolitana", desc: "Spaghetti with tomato sauce and parmesan cheese", price: "70K" },
  { name: "Spaghetti Aglio Olio", desc: "Sauteed spaghetti with olive oil and chopped garlic", price: "70K" },
  { name: "Mac & Cheese", desc: "Mixed macaroni and cheese in cream sauce, topped with grated parmesan cheese and sliced ham", price: "95K" },
  { name: "Chicken Nugget", desc: "3 pcs chicken nugget and french fries", price: "70K" },
  { name: "Nasi Goreng Sausage", desc: "Fried rice served with grilled sausage and prawn crackers", price: "80K" },
  { name: "Mini Burger", desc: "White bun, beef patty, egg, cheese, lettuce, served with french fries", price: "80K" },
];

const dessert = [
  { name: "Banana Split", desc: "3 scoops of ice cream and sliced banana", price: "75K" },
  { name: "Apple Pie", desc: "Australian style apple pie served with vanilla ice cream", price: "75K" },
  { name: "Tiramisu", price: "75K" },
  { name: "Chocolate Cake", desc: "Served with chocolate sauce", price: "75K" },
  { name: "Ice Cream Selection", desc: "3 scoops of vanilla, strawberry, or chocolate flavor", price: "60K" },
  { name: "Slice Tropical Fresh Fruit", desc: "Sliced watermelon, papaya, and pineapple", price: "60K" },
  { name: "Chocolate Brownies", desc: "Served with 1 scoop vanilla ice cream", price: "75K" },
];

const sections = [
  { title: "Appetizer", items: appetizer },
  { title: "Soups", items: soups },
  { title: "Our Signature", items: signature },
  { title: "Side Dish", items: sideDish },
  { title: "Indonesian", items: indonesian },
  { title: "Grill Corner: Poultry", items: grillPoultry },
  { title: "Grill Corner: Seafood", items: grillSeafood },
  { title: "Grill Corner: Meat (Beef & Lamb)", items: grillMeat },
  { title: "Grill Corner: Meat (Pork)", items: grillPork },
  { title: "Burger & Sandwich", items: burgerSandwich },
  { title: "Pizza & Pasta", items: pizzaPasta },
  { title: "Bob's Junior", note: "Kids menu", items: bobsJunior },
  { title: "Dessert", items: dessert },
];

const menuJsonLd = buildMenuJsonLd({
  url: `${SITE_URL}/menu/food`,
  name: "Mr Bob Bar and Grill Food Menu",
  description,
  sections,
});

export default function FoodMenuPage() {
  return (
    <main>
      <PageSchema
        path="/menu/food"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Food Menu" }]}
        mainEntityId={`${SITE_URL}/menu/food#menu`}
      />
      <script
        type="application/ld+json"
        // Data is built from the arrays above, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
        <SmartImage src="/images/menu/food-hero.jpg" alt="Mr Bob Bar and Grill food menu: steaks, ribs, and tomahawk chops" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl font-light tracking-normal mb-2">Food Menu</h1>
          <p className="text-sm text-gray-300">Prices are quoted in &lsquo;000&rsquo; IDR and subject to 11% government tax.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto border-t border-white/10 py-16 px-6">
        <div className="mb-10 flex justify-center">
          <Link href="/menu/beverage" className="btn-outline u-press px-6 py-3 text-sm tracking-widest">
            VIEW WINE &amp; BAR MENU
          </Link>
        </div>

        <InteractiveMenu sections={sections} />

        <p className="mt-10 text-center text-xs text-white/40">
          Prices are quoted in &lsquo;000&rsquo; IDR and subject to 11% government tax.
        </p>
      </div>

      <StickyReserveButton href="/reservation" label="RESERVE TABLE" />
    </main>
  );
}
