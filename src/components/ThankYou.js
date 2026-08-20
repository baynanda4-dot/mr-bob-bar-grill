import Image from "next/image";
import LocalizedLink from "@/components/LocalizedLink";
import GoogleAdsConversion from "@/components/GoogleAdsConversion";

/**
 * Shared confirmation-page shell for every successful form submission (see
 * src/lib/thankYouLinks.js for the per-form "next step" links + images, and
 * each app/**\/thank-you/page.js for how this is wired up). Deliberately
 * plain otherwise — no PageSchema/JSON-LD, no gallery, no marketing copy —
 * this is a transient per-guest confirmation, not a page meant to be found
 * or lingered on. Home navigation is already covered by the Navbar logo, so
 * there's no separate "back to homepage" link here.
 *
 * trackConversion fires the Google Ads lead-form conversion event — passed
 * only by the reservation and group-reservation thank-you pages (real
 * booking intent), not contact's (a generic enquiry, not what the ad
 * campaign is optimizing for).
 */
export default function ThankYou({ heading, body, links = [], alsoLikeLabel, trackConversion = false }) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      {trackConversion && <GoogleAdsConversion />}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 sm:h-24 sm:w-24">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-10 w-10 sm:h-12 sm:w-12"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="mb-4 text-4xl font-light tracking-normal">{heading}</h1>
      <p className="max-w-md text-white/60">{body}</p>

      {links.length > 0 && (
        <div className="mt-12 w-full max-w-xl">
          <p className="mb-4 text-xs font-semibold tracking-widest text-mrbob-yellow uppercase">{alsoLikeLabel}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {links.map((link) => (
              <LocalizedLink
                key={link.path}
                href={link.path}
                className="card-glass group u-lift flex h-24 items-center gap-4 overflow-hidden p-3 text-left transition hover:border-mrbob-yellow"
              >
                <div className="relative h-full w-20 shrink-0 overflow-hidden">
                  <Image src={link.image} alt={link.label} fill sizes="80px" className="u-zoom object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  {link.badge && (
                    <span className="w-fit bg-mrbob-yellow px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mrbob-black">
                      {link.badge}
                    </span>
                  )}
                  <span className="truncate text-sm font-semibold text-white transition-colors duration-500 ease-expo group-hover:text-mrbob-yellow">
                    {link.label}
                  </span>
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
