import SmartImage from "@/components/SmartImage";
import { LOCATIONS, OPENING_HOURS } from "@/lib/site";

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
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

// Left half of the reservation card — a full-bleed photo with the quote and
// quick-facts overlaid at the bottom, instead of a separate glass sidebar.
export default function ReservationPhotoPanel({ dict, hoursRange }) {
  const location = LOCATIONS[0];
  const whatsappHref = `https://wa.me/${location.telephone.replace(/\D/g, "")}`;

  return (
    <div className="relative h-64 sm:h-80 lg:h-full">
      <SmartImage
        src="/images/reservation/card.jpg"
        alt="Mr Bob Bar and Grill dining room"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="font-serif mb-5 border-l-4 border-mrbob-yellow pl-4 text-lg italic font-light leading-relaxed text-white/90">
          &ldquo;{dict.quote}&rdquo;
        </p>

        <div className="space-y-2 text-sm text-white/80">
          <p className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 shrink-0 text-mrbob-yellow" />
            {hoursRange}: {OPENING_HOURS.opens}&ndash;{OPENING_HOURS.closes}
          </p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-mrbob-yellow">
            <PhoneIcon className="h-4 w-4 shrink-0 text-mrbob-yellow" />
            <span className="u-link">WhatsApp: {location.telephone}</span>
          </a>
          <p className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 shrink-0 text-mrbob-yellow" />
            {location.streetAddress}, {location.addressLocality}
          </p>
        </div>
      </div>
    </div>
  );
}
