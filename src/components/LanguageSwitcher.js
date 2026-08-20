"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { LOCALES, LOCALE_COOKIE } from "@/lib/i18n/config";

const LOCALE_LABELS = { en: "EN", id: "ID", de: "DE", zh: "中文" };

// Manual override for the auto-detected locale — writes the same cookie
// middleware.js reads, so once a visitor picks a language here, the
// middleware never re-detects it away on a later visit (see the comment
// in middleware.js).
export default function LanguageSwitcher({ className = "" }) {
  const { locale } = useParams();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(nextLocale) {
    if (nextLocale === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const rest = pathname.startsWith(`/${locale}`) ? pathname.slice(`/${locale}`.length) : "";
    router.push(`/${nextLocale}${rest}`);
  }

  return (
    <div className={`flex items-center gap-1 text-xs tracking-wide ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`u-press px-1.5 py-1 uppercase transition-colors duration-500 ease-expo hover:text-mrbob-yellow ${
            l === locale ? "text-mrbob-yellow" : "text-white/50"
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
