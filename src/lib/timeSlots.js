// Hour-only slots spanning the restaurant's opening hours (12:00-22:00, see
// src/lib/site.js OPENING_HOURS), stopping an hour before close (9 PM) so
// the kitchen isn't seating a fresh table right at closing time. No
// minutes, reservations are taken on the hour.
export const OPENING_HOUR_SLOTS = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];
