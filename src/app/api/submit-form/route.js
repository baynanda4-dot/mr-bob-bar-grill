import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { LOCATIONS, SITE_URL } from "@/lib/site";
import { getThankYouLinks } from "@/lib/thankYouLinks";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";

// Lazy-instantiated (not at module scope) — the Resend constructor throws
// synchronously on a missing/empty key, which would otherwise crash Next's
// build-time route data collection whenever RESEND_API_KEY isn't set yet
// (e.g. this placeholder scaffold before real credentials are added).
let resendClient = null;
function getResendClient() {
  if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
  return resendClient;
}

// Single location — every form type notifies the same inbox.
const NOTIFICATION_EMAIL = process.env.EMAIL_MRBOB;

// Every form sends `fields.locale` (the visitor's URL locale, read via
// useParams() in each form component — see ReservationForm.js etc.). It
// flows into `submitToGoogleSheets` automatically since that call spreads
// `...fields` into its payload, so staff can see which language a guest
// booked in. The guest confirmation email (sendGuestConfirmationEmail
// below) reads dictionaries/*/email.json for this same locale, defaulting
// to English for a missing/invalid value since this is a public,
// unauthenticated endpoint. The staff notification email (buildEmailHtml)
// stays English-only on purpose — it's an internal tool, not guest-facing.
function resolveLocale(value) {
  return LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

// Maps a form's `formType` (hyphenated, matches THANK_YOU_LINKS/Sheets
// column naming) to its key in dictionaries/*/email.json (camelCase, a
// valid JS identifier).
const EMAIL_DICT_KEYS = {
  reservation: "reservation",
  "group-reservation": "groupReservation",
  contact: "contact",
};

const FORM_LABELS = {
  reservation: "Table Reservation",
  "group-reservation": "Group Reservation Enquiry",
  contact: "Contact Us",
};

// Forms with a date/time/guests reservation shape vs. a plain enquiry (contact).
const RESERVATION_FORM_TYPES = new Set(["reservation", "group-reservation"]);

// Plain table reservations are auto-confirmed on submit — seating isn't
// capacity-constrained the way a large group is, so there's no reason to
// make the guest wait on a human reply. Group reservations still say
// "received", not "confirmed": staff need to check date/capacity first.
const TABLE_RESERVATION_TYPES = new Set(["reservation"]);

// Only the main table reservation offers the Nusa Dua pickup checkbox —
// group bookings/contact enquiries don't.
const PICKUP_ELIGIBLE_TYPES = new Set(["reservation"]);

// Single source of truth for "this booking needs pickup" — computed once
// from the raw fields and reused everywhere (table row filtering, the
// warning banner, and logging) so there's no way for the two to disagree.
function needsPickup(fields) {
  return Boolean(fields.hotelName) || Boolean(fields.roomNumber);
}

// Staff sometimes hit "Reply" on this notification instead of messaging the
// guest directly, which silently goes nowhere (this inbox isn't monitored)
// and the guest never hears back.
const NO_REPLY_BANNER_HTML =
  '<p style="margin:0 0 16px;padding:12px 14px;background:#fdecea;border-left:4px solid #0A0A0A;color:#3a1f1f;font-size:14px;font-weight:700;">⚠️ Do not reply to this email.<br />Replying will NOT reach the guest.<br />To contact the guest, use their email or WhatsApp number below.</p>';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmailHtml(formType, fields) {
  const label = FORM_LABELS[formType] || formType;
  const hasPickup = needsPickup(fields);
  const isPickupEligible = PICKUP_ELIGIBLE_TYPES.has(formType);

  const rows = [
    ["Name", [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ")],
    ["Email", fields.email],
    ["WhatsApp", fields.whatsapp],
    ["Date", fields.date],
    ["Time", fields.time],
    ["Adults", fields.adults || fields.guests],
    ["Children", fields.children],
    ["Hotel Name", fields.hotelName],
    ["Room Number", fields.roomNumber],
    ["Message", fields.message],
  ].filter(([, value]) => value);

  const rowsHtml = rows
    .map(
      ([rowLabel, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#0A0A0A;white-space:nowrap;">${rowLabel}</td><td style="padding:6px 12px;color:#333;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  // Hotel Name / Room Number are easy to miss as a "this guest needs
  // pickup" signal if you're just skimming the table, so it's spelled out
  // above the table too — shown either way (needed or not) for every
  // pickup-eligible submission, so staff never have to wonder whether "no
  // warning" means "no pickup" or "the note didn't render".
  const pickupNoteHtml = !isPickupEligible
    ? ""
    : hasPickup
      ? `<p style="margin:0 0 16px;padding:12px 14px;background:#fff4e5;border-left:3px solid #D4A017;color:#7a4a00;font-size:14px;font-weight:700;">⚠ GUEST NEEDS PICKUP: see Hotel Name / Room Number below.</p>`
      : `<p style="margin:0 0 16px;padding:12px 14px;background:#f0f7f0;border-left:3px solid #4a8f4a;color:#2f5c2f;font-size:14px;font-weight:700;">✓ No pickup needed for this booking.</p>`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0A0A0A;margin-bottom:16px;">New ${label} Submission</h2>
      ${pickupNoteHtml}
      ${NO_REPLY_BANNER_HTML}
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;">${rowsHtml}</table>
      <p style="color:#999;font-size:12px;margin-top:24px;">Sent automatically from the Mr Bob Bar and Grill website.</p>
    </div>
  `;
}

// Fills `{token}` placeholders in an email.json template string — used for
// the handful of strings that need a runtime value spliced in (locationName,
// guestName, a pre-built WhatsApp <a> tag). Callers escape any user-facing
// HTML-unsafe value (guestName, locationName) before passing it in here.
function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));
}

// Small "what to do next" block appended to the guest confirmation email —
// the email counterpart of the thank-you page's "You May Also Like" links
// (both read from getThankYouLinks, so the two surfaces never disagree on
// what's suggested for a given formType, and both localize the same way).
function buildSuggestedLinksHtml(formType, emailDict) {
  const links = getThankYouLinks(emailDict.common.suggestedLinks)[formType];
  if (!links || !links.length) return "";

  const itemsHtml = links
    .map(
      (link) =>
        `<a href="${SITE_URL}${link.path}" style="display:inline-block;min-width:140px;margin:0 8px 8px 0;padding:12px 18px;border:1px solid #2a2519;border-radius:6px;background:#141210;color:#D4A017;font-size:12px;font-weight:700;letter-spacing:0.4px;text-decoration:none;text-align:center;">${escapeHtml(link.label)}</a>`
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td>
          <p style="margin:0 0 12px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#D4A017;">${escapeHtml(emailDict.common.planningVisit)}</p>
          ${itemsHtml}
        </td>
      </tr>
    </table>
  `;
}

// `emailDict` is dictionaries/*/email.json for the guest's own locale (see
// resolveLocale/sendGuestConfirmationEmail) — every guest-facing string in
// this email comes from there, nothing is hardcoded English here anymore.
function buildGuestConfirmationHtml(formType, fields, emailDict) {
  const location = LOCATIONS[0];
  const locationName = location.name;
  const common = emailDict.common;
  const guestName =
    [fields.title, fields.firstName, fields.lastName].filter(Boolean).join(" ") || "Guest";
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  const whatsappHref = `https://wa.me/${location.telephone.replace(/\D/g, "")}`;
  const logoUrl = `${SITE_URL}/images/shared/logo.png`;

  const summaryRows = isReservation
    ? [
        [common.dateLabel, fields.date],
        [common.timeLabel, fields.time],
        [common.adultsLabel, fields.adults || fields.guests],
        [common.childrenLabel, fields.children],
        [common.hotelNameLabel, fields.hotelName],
        [common.roomNumberLabel, fields.roomNumber],
      ].filter(([, value]) => value)
    : [];

  const summaryHtml = summaryRows.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:28px 0;">
        ${summaryRows
          .map(
            ([rowLabel, value]) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #e5decb;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#D4A017;white-space:nowrap;vertical-align:top;">${rowLabel}</td>
                <td style="padding:12px 0;border-bottom:1px solid #e5decb;font-size:15px;color:#1a1a1a;text-align:right;">${escapeHtml(value)}</td>
              </tr>`
          )
          .join("")}
      </table>
    `
    : "";

  const booking = emailDict[EMAIL_DICT_KEYS[formType]];
  const eyebrow = booking.eyebrow;
  const headline = booking.headline;
  const intro = interpolate(booking.intro, { locationName: escapeHtml(locationName) });

  const whatsappLink = `<a href="${whatsappHref}" style="color:#D4A017;text-decoration:none;">${escapeHtml(common.whatsapp)}</a>`;
  const closing = interpolate(booking.closing, { whatsappLink });

  const suggestedLinksHtml = buildSuggestedLinksHtml(formType, emailDict);

  const notes = isReservation
    ? [
        TABLE_RESERVATION_TYPES.has(formType) ? emailDict.reservation.noShowNote : null,
        PICKUP_ELIGIBLE_TYPES.has(formType) ? emailDict.reservation.pickupNote : null,
      ].filter(Boolean)
    : [];
  const notesHtml = notes.length
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;background:#faf7ee;border-left:3px solid #D4A017;">
        <tr>
          <td style="padding:14px 18px;">
            ${notes
              .map(
                (n, i) =>
                  `<p style="margin:${i === 0 ? "0" : "8px 0 0"};font-size:13px;line-height:1.6;color:#6b6355;">${escapeHtml(n)}</p>`
              )
              .join("")}
          </td>
        </tr>
      </table>
    `
    : "";

  const contactHtml = `
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#D4A017;">${escapeHtml(common.visitUs)}</p>
    <p style="margin:0;font-size:13px;line-height:1.7;color:#6b6355;">
      <strong style="color:#1a1a1a;">${escapeHtml(locationName)}</strong><br />
      ${escapeHtml(location.streetAddress)}, ${escapeHtml(location.addressLocality)}<br />
      ${escapeHtml(common.whatsapp)}: <a href="${whatsappHref}" style="color:#D4A017;text-decoration:none;">${escapeHtml(location.telephone)}</a>
    </p>
  `;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td align="center" style="padding:48px 16px;">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e5decb;border-top:3px solid #D4A017;">
            <tr>
              <td style="padding:44px 40px 0;text-align:center;">
                <img src="${logoUrl}" width="120" alt="Mr Bob Bar and Grill" style="display:block;margin:0 auto 24px;width:120px;max-width:120px;" />
                <p style="margin:0 0 14px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#D4A017;">${escapeHtml(eyebrow)}</p>
                <h1 style="margin:0 0 28px;font-size:25px;font-weight:700;color:#0A0A0A;line-height:1.35;">${escapeHtml(headline)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 40px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.75;color:#1a1a1a;">${interpolate(common.dearGuest, { guestName: escapeHtml(guestName) })}</p>
                <p style="margin:0;font-size:15px;line-height:1.75;color:#1a1a1a;">${intro}</p>

                ${summaryHtml}

                ${suggestedLinksHtml}

                ${notesHtml}

                ${
                  fields.message
                    ? `<p style="margin:24px 0 0;font-size:14px;line-height:1.75;color:#1a1a1a;"><em>${escapeHtml(common.yourNote)}</em> &ldquo;${escapeHtml(fields.message)}&rdquo;</p>`
                    : ""
                }

                <p style="margin:24px 0 0;font-size:15px;line-height:1.75;color:#1a1a1a;">${closing}</p>

                <p style="margin:32px 0 0;font-size:15px;line-height:1.75;color:#1a1a1a;">${escapeHtml(common.signOff)}<br /><strong>${escapeHtml(common.teamName)}</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 40px 40px;">
                <hr style="border:none;border-top:1px solid #e5decb;margin:0 0 24px;" />
                ${contactHtml}
                <p style="margin:24px 0 0;font-size:11px;color:#a39c8c;">${escapeHtml(common.automatedNotice)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

async function submitToGoogleSheets(payload) {
  const url = process.env.GOOGLE_SHEETS_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_URL is not configured.");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  });

  if (!res.ok) {
    throw new Error(`Google Sheets responded with ${res.status}`);
  }
}

async function sendNotificationEmail({ formType, fields }) {
  if (!NOTIFICATION_EMAIL) throw new Error("No destination email configured.");

  const label = FORM_LABELS[formType] || formType;
  const hasPickup = PICKUP_ELIGIBLE_TYPES.has(formType) && needsPickup(fields);

  // Logged unconditionally (not just on pickup) so a log search for
  // "pickup check" always shows exactly what the server computed for any
  // given submission — the fastest way to confirm or rule out a mismatch
  // if a guest ever reports the warning banner missing.
  console.log("[submit-form] pickup check", {
    formType,
    hasHotelName: Boolean(fields.hotelName),
    hasRoomNumber: Boolean(fields.roomNumber),
    willShowPickupNote: hasPickup,
  });

  // Also flagged in the subject line, not just the email body — visible in
  // the inbox list without even opening the email.
  const subject = hasPickup
    ? `🚗 PICKUP NEEDED: New ${label} Submission | Mr Bob Bar and Grill`
    : `New ${label} Submission | Mr Bob Bar and Grill`;

  const { error } = await getResendClient().emails.send({
    from: "Mr Bob Bar and Grill Website <noreply@mrbobbali.com>",
    to: NOTIFICATION_EMAIL,
    subject,
    html: buildEmailHtml(formType, fields),
  });

  if (error) throw new Error(error.message || "Resend failed to send the email.");
}

// Confirmation email to the guest themselves — kept fully independent from
// the restaurant notification above (Promise.allSettled in POST) so a
// failure here never blocks the restaurant from getting the booking.
// Renders in the guest's own locale (fields.locale, defaulting to English —
// see resolveLocale).
async function sendGuestConfirmationEmail({ formType, fields }) {
  if (!fields.email) throw new Error("No guest email address provided.");

  const locale = resolveLocale(fields.locale);
  const emailDict = await getDictionary(locale, "email");
  const locationName = LOCATIONS[0].name;
  const isReservation = RESERVATION_FORM_TYPES.has(formType);
  const subject = interpolate(
    TABLE_RESERVATION_TYPES.has(formType)
      ? emailDict.common.subjectReservationConfirmed
      : isReservation
        ? emailDict.common.subjectBookingReceived
        : emailDict.common.subjectMessageReceived,
    { locationName }
  );

  const { error } = await getResendClient().emails.send({
    from: "Mr Bob Bar and Grill <noreply@mrbobbali.com>",
    to: fields.email,
    subject,
    html: buildGuestConfirmationHtml(formType, fields, emailDict),
  });

  if (error) throw new Error(error.message || "Resend failed to send the guest confirmation.");
}

// Logs the failure (with a label) but re-throws, so this can wrap a promise
// passed into Promise.any() without masking which branch actually failed.
function withLogging(promise, label) {
  return promise.catch((err) => {
    console.error(`${label} failed:`, err);
    throw err;
  });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { formType, branch, ...fields } = body ?? {};

  if (!formType || !FORM_LABELS[formType]) {
    return NextResponse.json({ ok: false, error: "Missing or unknown formType." }, { status: 400 });
  }

  // Guest confirmation is best-effort only and never affects whether the
  // request is considered successful, so it doesn't need to hold up the
  // response. `after()` runs it once the response is already on its way
  // back to the browser.
  after(() =>
    sendGuestConfirmationEmail({ formType, fields }).catch((err) =>
      console.error("Guest confirmation email failed:", err)
    )
  );

  // Sheets and the restaurant notification email both count as "the booking
  // got through" — whichever succeeds FIRST is enough to tell the guest so,
  // instead of always waiting for both. This matters because Google Apps
  // Script (Sheets) can take several seconds and used to dominate the whole
  // request; Resend's email API is typically much faster. Only if BOTH fail
  // do we tell the guest something went wrong. Sheets keeps running via
  // after() even once the notification email alone has settled it.
  const sheetsPromise = withLogging(
    submitToGoogleSheets({ formType, ...fields }),
    "Google Sheets submission"
  );
  const emailPromise = withLogging(
    sendNotificationEmail({ formType, fields }),
    "Resend notification email"
  );
  after(() => Promise.allSettled([sheetsPromise, emailPromise]));

  try {
    await Promise.any([sheetsPromise, emailPromise]);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't process your request right now. Please try again or contact us directly.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
