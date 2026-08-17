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

- Single physical location in Nusa Dua, Bali (locality confirmed 2026-08-16; exact street address still unconfirmed/placeholder in `src/lib/site.js`).
- Opening hours confirmed as 12:00-21:00 daily.
- Reservation/group-reservation/contact forms all submit through one `/api/submit-form` route: staff get a notification email (Resend, from `noreply@mrbobbali.com`, that domain is verified in the Resend account) and a Google Sheets log entry (Apps Script webhook, confirmed reachable and appending rows correctly as of 2026-08-16); guests get an automatic confirmation email. WhatsApp is the direct-contact channel guests are pointed to for anything the form can't handle.
- Live music, 7:00 PM onwards: Monday is "I Love Monday" ("Monday is fun day"), Wednesday is "Oldies Night" ("Taste the old music"), Saturday is "Country Night" ("Nostalgic country songs"). No live music Tuesday, Thursday, Friday, or Sunday.
- Complimentary shuttle offered for guests staying in the Nusa Dua area (minimum 2 adults per request).

## Capabilities and Constraints

- Next.js 16 + Tailwind 4, deployed to Cloudflare via `@opennextjs/cloudflare` — not Vercel. This constrains image handling (`images.unoptimized: true`, no built-in image optimization API) and dev workflow (`wrangler dev`/`opennextjs-cloudflare preview` alongside `next dev`).
- Reservations only — no online payment or ordering, no live table-availability system. Every submitted table reservation is auto-confirmed guest-side; staff reconcile actual capacity manually.
- Menu content (food + beverage/wine) is real and confirmed, not placeholder — full item names, descriptions, and IDR prices already in `src/app/menu/food/page.js` and `src/app/menu/beverage/page.js`, rendered through an accordion (`InteractiveMenu.js`) with Expand All/Collapse All.
- Undecided / still placeholder — must not be treated as confirmed fact by future work: exact street address, exact phone/WhatsApp number, real Instagram/Facebook accounts, real guest reviews, and virtually all photography. See Evidence on Hand.

## Brand Commitments

- Name: Mr Bob Bar and Grill. Tagline: "The Best Pork Ribs in Town" — a confirmed real claim, not empty copy.
- Voice: confident, proud of its signature dishes — set explicitly by the user for this project's copywriting.
- Domain: `mrbobbali.com` (confirmed 2026-08-16 — the site had briefly used a guessed `mrbobbarandgrill.com` placeholder, now corrected everywhere: `NEXT_PUBLIC_SITE_URL`, sitemap, structured data, email sender addresses).
- Palette: `mrbob-black` (#0A0A0A), `mrbob-yellow` (#D4A017), white — locked; not to change without an explicit request.
- Logo: one real asset, a round black badge with a white flame icon and "MR.BOB / BAR & GRILL" wordmark (~680×628px), supplied by the user. Consolidated (2026-08-16) to a single file used everywhere: `public/images/shared/logo.png` (also copied to `src/app/icon.png` for the favicon, Next.js's icon convention requires it inside `src/app/`, keep both in sync if the logo changes again). Square/circular only; no wide wordmark variant exists.
- Typography: Spectral (light serif) for h1/h2 headline moments, mixed case, not uppercase; Oswald stays for h3-h6 and other UI chrome (still uppercase, lighter weight than before). Deliberately avoids "AI-default" display serifs (Playfair Display, Cormorant, Fraunces) to read as fine-dining/elegant rather than generic. Don't revert to bold-uppercase-Oswald headings without the user asking.

## Evidence on Hand

- Real, confirmed: full food and beverage/wine menu (IDR prices, item descriptions) — `src/app/menu/food/page.js`, `src/app/menu/beverage/page.js`. One real logo asset (see Brand Commitments). Domain `mrbobbali.com`. Contact/notification email `mrbobtanjungbenoa@gmail.com`. Location is in Nusa Dua (confirmed 2026-08-16; exact street address still not confirmed). Opening hours 12:00-21:00 daily. Live music lineup (see Operating Context). The `/api/submit-form` → Resend + Google Sheets pipeline is live and verified working end-to-end (real API key, real webhook, tested 2026-08-16).
- **Not confirmed — do not fabricate or present as real:** exact street address, exact phone/WhatsApp number, any photography (every hero/gallery/menu image is a `SmartImage` placeholder slot with no real file behind it yet), guest reviews/testimonials (`Testimonials.js` content is explicitly placeholder), Instagram/Facebook account links (the `@mrbobbali` handle shown as "coming soon" is a guessed pattern, not a confirmed real account), Google Maps listing/rating. The Tripadvisor Travelers' Choice Award and Ctrip Gourmet List Certificate referenced in `Recognition.js` and `StructuredData.js` were explicitly **not confirmed as real** when asked directly, treat as unconfirmed/placeholder until the user says otherwise.

## Product Principles

1. Get Nusa Dua-area resort/hotel guests to book a table, primarily by making the free shuttle, the live music nights, and the wine value easy to find and act on.
2. Never present unconfirmed facts (address, hours, reviews, awards, photos) as real — placeholder-but-honest beats fabricated-but-wrong. This is already the codebase's convention (`SmartImage` fallback shimmer, explicit TODO comments) and should be preserved by any future work.
3. Menu content and prices are real and load-bearing, not filler — treat them as source of truth when building any new surface that touches the menu.
4. Keep the black/gold/white palette and the Spectral(headline)/Oswald(UI-chrome) typography split as the locked visual identity; new sections extend it rather than reinventing it.
5. Reservations flow through the single `/api/submit-form` pipeline (Resend + Google Sheets) — any new form type plugs into that existing pattern (`FORM_LABELS`, `THANK_YOU_LINKS`, etc.) rather than building a parallel one.
