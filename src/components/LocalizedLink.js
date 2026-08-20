"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

// Drop-in replacement for next/link's <Link> — prefixes a root-relative
// internal href ("/reservation") with the current locale segment
// ("/en/reservation") so navigation never drops a visitor out of their
// language. Same-page hash anchors ("#welcome") and anything that isn't a
// root-relative path (external URLs, mailto:, tel:, wa.me) are passed
// through untouched.
export default function LocalizedLink({ href, ...props }) {
  const { locale } = useParams();

  const localizedHref =
    typeof href === "string" && href.startsWith("/")
      ? `/${locale}${href === "/" ? "" : href}`
      : href;

  return <Link href={localizedHref} {...props} />;
}
