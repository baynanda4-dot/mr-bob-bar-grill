import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE } from "@/lib/i18n/config";
import { matchLocale } from "@/lib/i18n/match-locale";

// IMPORTANT — filename is deliberately "middleware.js", NOT "proxy.js"
// (Next 16's renamed convention), and `runtime = "edge"` below is
// deliberate, not a leftover default:
//
// Next.js 16's `proxy.js` can no longer opt into the Edge runtime (any
// `export const runtime` in a proxy.js file throws a build error), which
// forces it onto the Node.js runtime. @opennextjs/cloudflare's build step
// currently hard-fails (process.exit(1)) the moment it detects Node-runtime
// middleware — "Node.js middleware is not currently supported." Keeping the
// deprecated "middleware.js" filename with an explicit edge runtime routes
// Next's build down the classic edge-middleware path instead, which
// OpenNext's Cloudflare adapter does support today.
//
// Revisit once OpenNext ships Node.js middleware support (tracked upstream:
// opennextjs/opennextjs-cloudflare#962) — at that point this can become
// proxy.js and drop the runtime export.
export const runtime = "experimental-edge";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && LOCALES.includes(cookieLocale)
      ? cookieLocale
      : matchLocale(request.headers.get("accept-language"), LOCALES, DEFAULT_LOCALE);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // Deliberately never writes the cookie itself here, even on the redirect
  // that came from Accept-Language — only a manual pick via
  // LanguageSwitcher.js writes NEXT_LOCALE. That means a guest who never
  // touched the switcher gets fresh Accept-Language detection on every
  // bare-root visit (so a phone-language change is picked up next time
  // they land on the site), while a guest who DID manually pick a language
  // has that choice remembered and respected here via cookieLocale above.
  const response = NextResponse.redirect(url);

  // This redirect's target depends on the Accept-Language/Cookie request
  // headers, so it must never be cached and served to a different visitor
  // (or to the same visitor after their language changes) by the browser,
  // Cloudflare's edge, or any intermediate proxy. Vary declares which
  // headers the response depends on; no-store forbids caching it at all —
  // belt-and-suspenders, since a stale cached redirect is exactly the kind
  // of "works in one browser, not another" bug that's hard to reproduce.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|images|favicon.ico|icon.png|sitemap.xml|robots.txt|manifest.webmanifest).*)",
  ],
};
