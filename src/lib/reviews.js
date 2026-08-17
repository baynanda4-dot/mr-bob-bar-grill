// Real Tripadvisor reviews (provided by the client 2026-08-17), lightly
// copyedited for punctuation/run-on sentences only — no claims, names, or
// details changed. Single source of truth — read by both the visible
// Testimonials marquee (home/Testimonials.js) and the Review/aggregateRating
// JSON-LD (StructuredData.js), so the two can never drift apart. Every
// review here is a genuine 5-star Tripadvisor review actually shown on the
// page, which is what schema.org/Google require aggregateRating to be
// substantiated by — not a number invented for the meta tags.
export const REVIEWS = [
  {
    name: "Sam Long",
    meta: "Manalapan, New Jersey",
    title: "Good food",
    text: "Great restaurant very close to Conrad Hilton, with great food and service, and a very clean restaurant and facilities. Our waitress Dwi spoke great English, and the koi carp pond was very entertaining for the kids we saw at another table. They also have singers who played easy listening songs. An enjoyable evening out.",
    avatar: "/images/home/review-1.png",
    rating: 5,
  },
  {
    name: "Alison B",
    title: "Great staff, great choice, great food!",
    text: "A lovely experience from start to finish - warm welcome, attentive service, great menu, and well presented, delicious food - pork fillet and grilled king prawns. Being a hot evening, a female staff member kindly brought over an electric fan and gave us flowers to adorn our hair. We were served by Budi, who was very helpful and polite, and showed his delight when we said we came from near Manchester - he was a Manchester United fan. An evening to remember! Many thanks - we'll tell our friends!",
    avatar: "/images/home/review-2.png",
    rating: 5,
  },
  {
    name: "Shannon G",
    title: "Mr Bob's EXCELLENT",
    text: "My husband and I enjoyed delicious, moist, tender pork chop and ribs. Ria's service was EXCELLENT, providing complimentary appetizers, moist towels, and mosquito repellent. Very attentive and personable, with free shuttle service to and from.",
    avatar: "/images/home/review-3.png",
    rating: 5,
  },
  {
    name: "Jack F",
    meta: "Byford, Australia",
    title: "Best birthday dinner",
    text: "I always visit Mr Bob's every time we're in Bali. You can't beat the value for money and great hospitality.",
    avatar: "/images/home/review-4.png",
    rating: 5,
  },
  {
    name: "AnsieLondon",
    title: "Great experience",
    text: "Ate here twice during our stay in Bali. Delicious food, friendly staff (thank you Dwi), and a good price, plus pickup and drop-off.",
    avatar: "/images/home/review-5.png",
    rating: 5,
  },
];
