"use client";

import { useEffect } from "react";
import { GOOGLE_ADS_CONVERSION_ID, GOOGLE_ADS_CONVERSION_LABEL } from "@/lib/site";

// Fires the Google Ads "Mengirim formulir lead" conversion event once, on
// mount. Only ever rendered from a thank-you page (see ThankYou.js's
// trackConversion prop) — those pages only render after a real successful
// form submission, so this can't over-count from someone just viewing the
// form and not submitting it.
export default function GoogleAdsConversion() {
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
      value: 1.0,
      currency: "IDR",
    });
  }, []);

  return null;
}
