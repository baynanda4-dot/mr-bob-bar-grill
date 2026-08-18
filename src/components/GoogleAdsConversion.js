"use client";

import { useEffect } from "react";

// Fires the Google Ads "Mengirim formulir lead" conversion event once, on
// mount. Only ever rendered from a thank-you page (see ThankYou.js's
// trackConversion prop) — those pages only render after a real successful
// form submission, so this can't over-count from someone just viewing the
// form and not submitting it.
export default function GoogleAdsConversion() {
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "ads_conversion_Mengirim_formulir_lead_1", {});
  }, []);

  return null;
}
