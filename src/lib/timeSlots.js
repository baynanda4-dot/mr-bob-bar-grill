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

// Today's date in the guest's own local calendar, not UTC — new
// Date().toISOString() converts to UTC first, which silently shifts the
// date near midnight depending on the guest's timezone (e.g. blocks
// booking "today" for guests ahead of UTC like WITA in the early morning,
// or allows picking an already-past date for guests behind UTC like US
// timezones in the evening). Used as the reservation date field's `min`.
export function todayLocalDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
