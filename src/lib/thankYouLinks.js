// Single source of truth for the "next step" links shown after a successful
// form submission — read by both the thank-you pages (components/ThankYou.js)
// and the guest confirmation email (app/api/submit-form/route.js), so the two
// surfaces never drift apart.
//
// Curated per form type rather than one generic list — "Reserve a Table"
// never appears on the reservation thank-you page itself since no page
// links to itself. `labels` is the locale dictionary's `content.json`
// `thankYou.links` slice — path/image never change per locale, only the
// label text.
export function getThankYouLinks(labels) {
  return {
    reservation: [
      { label: labels.viewFoodMenu, path: "/menu/food", image: "/images/home/menu-food.jpg" },
      { label: labels.viewBeverageMenu, path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
      { label: labels.contactUs, path: "/contact", image: "/images/contact/hero.jpg" },
    ],
    "group-reservation": [
      { label: labels.reserveTable, path: "/reservation", image: "/images/reservation/hero.jpg" },
      { label: labels.viewFoodMenu, path: "/menu/food", image: "/images/home/menu-food.jpg" },
      { label: labels.viewBeverageMenu, path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
      { label: labels.contactUs, path: "/contact", image: "/images/contact/hero.jpg" },
    ],
    contact: [
      { label: labels.reserveTable, path: "/reservation", image: "/images/reservation/hero.jpg" },
      { label: labels.viewFoodMenu, path: "/menu/food", image: "/images/home/menu-food.jpg" },
      { label: labels.viewBeverageMenu, path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
    ],
  };
}
