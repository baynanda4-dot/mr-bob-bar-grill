// Single source of truth for supported locales — imported by the
// middleware, the [locale] layout's generateStaticParams, the API route's
// guest-email locale validation, and sitemap.js, so none of them can drift
// out of sync with each other.
export const LOCALES = ["en", "id", "de", "zh"];
export const DEFAULT_LOCALE = "en";

// Only ever written by the manual LanguageSwitcher (explicit override) —
// middleware.js deliberately never writes this itself, only reads it, so a
// guest who never manually picked a language gets fresh Accept-Language
// detection on every bare-root visit (their phone's language setting is
// followed live), while a guest who DID pick manually has that choice
// remembered and respected on later visits.
export const LOCALE_COOKIE = "NEXT_LOCALE";
