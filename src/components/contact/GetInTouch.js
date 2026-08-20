import LocalizedLink from "@/components/LocalizedLink";
import { LOCATIONS, OPENING_HOURS } from "@/lib/site";

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.4l.6-3H13v-1.2c0-.5.3-.8.9-.8z" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

// Only LOCATIONS[0] (the main outlet) takes reservations through the site —
// its card gets the "Main Restaurant" badge and Hours. Every other location
// (currently just LOCATIONS[1], the Benoa second outlet) is shown for
// contact purposes only: no badge implying it's bookable, no Hours (not
// confirmed for that outlet). Neither card carries a reserve button — the
// one reservation flow the site actually supports gets a single large CTA
// below both cards instead (see GetInTouch below), not one repeated per card.
function OutletCard({ location, isMain, dict, hoursRange }) {
  const whatsappDigits = location.telephone.replace(/\D/g, "");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  const instagramHref = location.sameAs?.find((url) => url.includes("instagram.com"));
  // Coordinates default to (0, 0) — a placeholder, not the real address —
  // until confirmed, so a live embed only renders once they're real. Shown
  // as a reserved, honest placeholder in the meantime instead of a
  // misleading map of the Gulf of Guinea.
  const hasRealCoordinates = Boolean(location.latitude) && Boolean(location.longitude);
  // Second outlet's street address isn't confirmed yet — filtered out
  // instead of rendering a stray leading comma.
  const addressLine = [location.streetAddress, location.addressLocality, location.addressRegion]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="border border-white/10 p-8">
      <p className="mb-6 text-xs uppercase tracking-[0.3em] text-mrbob-yellow">
        {isMain ? dict.mainBadge : dict.secondBadge}
      </p>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-1">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mrbob-yellow">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              {dict.addressLabel}
            </p>
            <p className="text-sm text-white/70">{addressLine}</p>
          </div>

          {isMain && (
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mrbob-yellow">
                <ClockIcon className="h-4 w-4 shrink-0" />
                {dict.hoursLabel}
              </p>
              <p className="text-sm text-white/70">
                {hoursRange}: {OPENING_HOURS.opens} &ndash; {OPENING_HOURS.closes}
              </p>
            </div>
          )}

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-mrbob-yellow">{dict.contactLabel}</p>
            <div className="space-y-2 text-sm text-white/70">
              <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-mrbob-yellow">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                <span className="u-link">{location.telephone}</span>
              </a>
              <a href={`mailto:${location.email}`} className="flex items-center gap-2 hover:text-mrbob-yellow">
                <span className="u-link">{location.email}</span>
              </a>
              {instagramHref ? (
                <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-mrbob-yellow">
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  <span className="u-link">{dict.instagramLabel}</span>
                </a>
              ) : (
                // TODO: swap for the real profile link once the account is
                // live — shown as a reserved, non-clickable placeholder in
                // the meantime rather than hidden or linked to a guessed URL.
                <span className="flex items-center gap-2 text-white/30">
                  <InstagramIcon className="h-4 w-4 shrink-0" />
                  <span>{dict.instagramComingSoon}</span>
                </span>
              )}
              {location.facebook ? (
                <a href={location.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-mrbob-yellow">
                  <FacebookIcon className="h-4 w-4 shrink-0" />
                  <span className="u-link">{dict.facebookLabel}</span>
                </a>
              ) : (
                <span className="flex items-center gap-2 text-white/30">
                  <FacebookIcon className="h-4 w-4 shrink-0" />
                  <span>{dict.facebookComingSoon}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden border border-white/10">
          {hasRealCoordinates ? (
            <iframe
              title={`${location.name} location`}
              src={location.mapEmbedUrl || `https://www.google.com/maps?q=${location.latitude},${location.longitude}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="u-media flex h-64 w-full items-center justify-center px-6 text-center text-sm text-white/40">
              {dict.mapPlaceholder}
            </div>
          )}
          <div className="p-4">
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-sm text-mrbob-yellow">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              <span className="u-link">{dict.openInMaps}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetInTouch({ dict, hoursRange }) {
  return (
    <section className="border-t border-white/10 py-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-light tracking-normal text-center mb-6">{dict.heading}</h2>
      <p className="text-center text-white/70 max-w-2xl mx-auto mb-14">{dict.body}</p>

      <div className="space-y-10">
        {LOCATIONS.map((location, index) => (
          <OutletCard key={location.id} location={location} isMain={index === 0} dict={dict} hoursRange={hoursRange} />
        ))}
      </div>

      {/* One reservation flow, one CTA — the Main Restaurant is the only
          outlet bookable through this site, so this isn't repeated per
          card, just called out once, prominently, below both. */}
      <div className="mt-14 flex justify-center">
        <LocalizedLink
          href="/reservation"
          className="btn-primary u-press inline-flex px-12 py-5 text-base tracking-widest"
        >
          {dict.reserveCta}
        </LocalizedLink>
      </div>
    </section>
  );
}
