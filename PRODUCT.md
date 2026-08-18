# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: tourists and hotel/resort guests staying in the Nusa Dua area of Bali, dining out in the evening during their holiday, sometimes a casual dinner, sometimes drawn specifically by the live music nights. The complimentary Nusa Dua shuttle, the evening/live-music framing, and the "no fixed transport" pickup offer are all built around this audience specifically, not local/expat regulars.

## Product Purpose

Mr Bob Bar and Grill is an operating Western steakhouse and wine bar in Nusa Dua, Bali (confirmed already open and receiving guests, not a pre-launch site). The website exists to get Nusa Dua-area tourists/hotel guests to choose Mr Bob for dinner — primarily via the table reservation form, secondarily via group reservation enquiries. Success is a completed reservation/enquiry submission, with the guest arriving informed about the menu, the live music schedule, and how to get there (including the free shuttle).

## Positioning

Two confirmed, defensible differentiators (not just marketing copy):

1. **Best pork ribs in town** — Mr Bob's BBQ Ribs is a genuine signature dish, the tagline is a real claim the kitchen stands behind.
2. **Cheapest wine selection in Nusa Dua** — genuinely the most affordable wine list in the area, a real price-positioning fact.

Combined with hand-cut steaks/tomahawk off a real grill, live music three nights a week, and a complimentary shuttle for Nusa Dua-area hotel guests, the mechanism a neighboring restaurant can't easily copy-paste is the combination of genuinely cheap wine, a real live-music night, and free pickup, aimed at resort guests without their own transport.

## Operating Context

- **Two physical locations**, both confirmed real (`src/lib/site.js` `LOCATIONS`): the **Main Restaurant** at Jl. Pratama No. 808, Nusa Dua, Bali 80361 (the only one that takes reservations through this site — ReservationForm, confirmation emails, and the JSON-LD Restaurant entity all key off this one specifically), and a **second outlet** at Jl. Bypass Ngurah Rai, Benoa, Bali 80361 (contact-only on `/contact` — its own WhatsApp/Instagram/Facebook/Google Maps, no reservation form, no SEO entity of its own).
- Opening hours confirmed as 12:00-21:00 daily (main outlet; second outlet's hours not confirmed, so the Contact page card for it omits the Hours block rather than guessing).
- Live site: **mrbobbali.com**, deployed on Cloudflare Workers via `@opennextjs/cloudflare` (confirmed live 2026-08-17).
- Reservation/group-reservation/contact forms all submit through one `/api/submit-form` route: staff get a notification email (Resend, from `noreply@mrbobbali.com`, that domain is verified in the Resend account) and a Google Sheets log entry (Apps Script webhook, confirmed reachable and appending rows correctly as of 2026-08-16); guests get an automatic confirmation email. WhatsApp is the direct-contact channel guests are pointed to for anything the form can't handle.
- Live music, 7:00 PM onwards: Monday is "I Love Monday" ("Monday is fun day"), Wednesday is "Oldies Night" ("Taste the old music"), Saturday is "Country Night" ("Nostalgic country songs"). No live music Tuesday, Thursday, Friday, or Sunday.
- Complimentary shuttle offered for guests staying in the Nusa Dua area (minimum 2 adults per request).
- Real, confirmed accolade: **#1-rated restaurant in Tanjung Benoa, Nusa Dua on Tripadvisor** (client-confirmed 2026-08-17) — leads the site-wide meta title/description and the homepage Recognition section.

## Capabilities and Constraints

- Next.js 16 + Tailwind 4, deployed to Cloudflare via `@opennextjs/cloudflare` — not Vercel. This constrains image handling (`images.unoptimized: true`, no built-in image optimization API) and dev workflow (`wrangler dev`/`opennextjs-cloudflare preview` alongside `next dev`).
- Reservations only — no online payment or ordering, no live table-availability system. Every submitted table reservation is auto-confirmed guest-side; staff reconcile actual capacity manually.
- Menu content (food + beverage/wine) is real and confirmed, not placeholder — full item names, descriptions, and IDR prices already in `src/app/menu/food/page.js` and `src/app/menu/beverage/page.js`, rendered through an accordion (`InteractiveMenu.js`) with Expand All/Collapse All.
- Photography is now mostly real, not placeholder — see Evidence on Hand for the exact remaining gaps (as of 2026-08-18, only 3 image slots site-wide are still the generated shimmer/placeholder: `home/menu-food.jpg`, `home/menu-beverage.jpg`, and the review avatar `home/review-4.png`). **Never assume a `SmartImage`/`Image` slot is still placeholder without actually checking the file** — most of them aren't anymore, and this file has drifted out of sync with reality before (see the note at the bottom of this section).

## Brand Commitments

- Name: Mr Bob Bar and Grill. Tagline: "The Best Pork Ribs in Town" — a confirmed real claim, not empty copy.
- Voice: confident, proud of its signature dishes — set explicitly by the user for this project's copywriting.
- Domain: `mrbobbali.com` (confirmed 2026-08-16 — the site had briefly used a guessed `mrbobbarandgrill.com` placeholder, now corrected everywhere: `NEXT_PUBLIC_SITE_URL`, sitemap, structured data, email sender addresses).
- Palette: `mrbob-black` (#0A0A0A), `mrbob-yellow` (#D4A017), white — locked; not to change without an explicit request.
- Logo: one real asset, a round black badge with a white flame icon and "MR.BOB / BAR & GRILL" wordmark (~680×628px), supplied by the user. Consolidated (2026-08-16) to a single file used everywhere: `public/images/shared/logo.png` (also copied to `src/app/icon.png` for the favicon, Next.js's icon convention requires it inside `src/app/`, keep both in sync if the logo changes again). Square/circular only; no wide wordmark variant exists.
- Typography: Spectral (light serif) for h1/h2 headline moments, mixed case, not uppercase; Oswald stays for h3-h6 and other UI chrome (still uppercase, lighter weight than before). Deliberately avoids "AI-default" display serifs (Playfair Display, Cormorant, Fraunces) to read as fine-dining/elegant rather than generic. Don't revert to bold-uppercase-Oswald headings without the user asking.

## Evidence on Hand

**This section was stale for over a day (wrote 2026-08-16, most of it invalidated by real data added 2026-08-16 through 2026-08-17, never updated until 2026-08-18) — an external audit read the old version and reported the site as still full of placeholders when it mostly wasn't. Keep this current going forward; check the actual file/data before writing "unconfirmed" here.**

- **Real, confirmed:** full food and beverage/wine menu (IDR prices, item descriptions) — `src/app/menu/food/page.js`, `src/app/menu/beverage/page.js`. Logo asset (see Brand Commitments). Live domain `mrbobbali.com` on Cloudflare Workers. Both outlets' street address, phone/WhatsApp, email, Instagram, and Facebook (`src/lib/site.js` `LOCATIONS[0]` and `[1]`) — real, not guessed patterns. Google Maps embeds for both outlets, with real Place IDs. Opening hours 12:00-21:00 daily (main outlet). Live music lineup (see Operating Context). The `/api/submit-form` → Resend + Google Sheets pipeline is live and verified working end-to-end. **5 real Tripadvisor guest reviews** (`src/lib/reviews.js`, shared by `Testimonials.js` and `StructuredData.js`'s `aggregateRating`/`review` JSON-LD — not invented). **Real Tripadvisor Travelers' Choice Award years** (2018-2020, 2022-2025) and **Ctrip Gourmet List** (2018-2019) in `Recognition.js`/`StructuredData.js` — confirmed by the client, no longer placeholder. The **#1-in-Tanjung-Benoa/Nusa-Dua Tripadvisor ranking claim** (client-confirmed 2026-08-17). Photography: real across almost every slot — homepage hero (5 photos), About (hero + 3 features), Contact hero, Reservation (hero + card), Group Reservation hero, Wine Shop, Shuttle, Live Music card, Promotions card, Food Menu hero, OG share image (optimized to 1200×800 JPEG, 2026-08-17), all 6 Instagram preview tiles, and 4 of 5 review avatars.
- **Still genuinely placeholder (checked directly 2026-08-18, only these 3 remain site-wide):** `public/images/home/menu-food.jpg`, `public/images/home/menu-beverage.jpg` (both still the generated shimmer template), and `public/images/home/review-4.png` (a generic default-avatar icon, not Jack F's real photo). Also never uploaded at all: `public/images/menu/beverage-hero.jpg` (falls back to `SmartImage`'s shimmer, not visually broken, just not yet real). Second outlet's opening hours are not confirmed (Contact page correctly omits that block for it rather than guessing).

## Product Principles

1. Get Nusa Dua-area resort/hotel guests to book a table, primarily by making the free shuttle, the live music nights, and the wine value easy to find and act on.
2. Never present unconfirmed facts (address, hours, reviews, awards, photos) as real — placeholder-but-honest beats fabricated-but-wrong. This is already the codebase's convention (`SmartImage` fallback shimmer, explicit TODO comments) and should be preserved by any future work.
3. Menu content and prices are real and load-bearing, not filler — treat them as source of truth when building any new surface that touches the menu.
4. Keep the black/gold/white palette and the Spectral(headline)/Oswald(UI-chrome) typography split as the locked visual identity; new sections extend it rather than reinventing it.
5. Reservations flow through the single `/api/submit-form` pipeline (Resend + Google Sheets) — any new form type plugs into that existing pattern (`FORM_LABELS`, `THANK_YOU_LINKS`, etc.) rather than building a parallel one.
