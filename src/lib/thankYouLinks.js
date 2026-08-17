// Single source of truth for the "next step" links shown after a successful
// form submission — read by both the thank-you pages (components/ThankYou.js)
// and the guest confirmation email (app/api/submit-form/route.js), so the two
// surfaces never drift apart.
//
// Curated per form type rather than one generic list — "Reserve a Table"
// never appears on the reservation thank-you page itself since no page
// links to itself.
export const THANK_YOU_LINKS = {
  reservation: [
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/menu-food.jpg" },
    { label: "View Beverage Menu", path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
    { label: "Contact Us", path: "/contact", image: "/images/contact/hero.jpg" },
  ],
  "group-reservation": [
    { label: "Reserve a Table", path: "/reservation", image: "/images/reservation/hero.jpg" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/menu-food.jpg" },
    { label: "View Beverage Menu", path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
    { label: "Contact Us", path: "/contact", image: "/images/contact/hero.jpg" },
  ],
  contact: [
    { label: "Reserve a Table", path: "/reservation", image: "/images/reservation/hero.jpg" },
    { label: "View Food Menu", path: "/menu/food", image: "/images/home/menu-food.jpg" },
    { label: "View Beverage Menu", path: "/menu/beverage", image: "/images/home/menu-beverage.jpg" },
  ],
};
