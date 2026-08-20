"use client";

import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { onScrollFrame } from "./motion/ticker";
import ScrollProgress from "./motion/ScrollProgress";
import LocalizedLink from "./LocalizedLink";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ dict }) {
  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/menu/food", label: dict.nav.menu },
    { href: "/about", label: dict.nav.about },
    { href: "/contact", label: dict.nav.contact },
  ];

  const drawerLinks = [
    ...links,
    { href: "/menu/beverage", label: dict.nav.beverageMenu },
    { href: "/group-reservation", label: dict.nav.groupReservation },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const lastToggle = useRef(0);
  const pathname = usePathname();
  const { locale } = useParams();
  // Strips the locale segment so link.href ("/menu/food") compares against
  // the un-prefixed page path, same as before locale routing existed.
  const unlocalizedPathname = pathname.startsWith(`/${locale}`)
    ? pathname.slice(`/${locale}`.length) || "/"
    : pathname;

  // Belt-and-suspenders for mobile browsers where the synthetic click after
  // a tap has been unreliable: onTouchEnd fires the same toggle directly,
  // guarded so a genuine click right behind it (the usual touchend -> click
  // sequence) doesn't flip it back off.
  const toggleMenu = () => {
    const now = Date.now();
    if (now - lastToggle.current < 500) return;
    lastToggle.current = now;
    setOpen((value) => !value);
  };

  useEffect(() => {
    lastY.current = window.scrollY;

    return onScrollFrame(({ y }) => {
      setScrolled(y > 12);

      // Only react to a deliberate move, so a trackpad twitch never flickers
      // the bar in and out.
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 220);
        lastY.current = y;
      }
    });
  }, []);

  // A drawer that stays open across a navigation feels broken.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-[transform,background-color,box-shadow,backdrop-filter] duration-500 ease-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-mrbob-black/85 backdrop-blur-md shadow-[0_1px_24px_-8px_rgb(0_0_0/0.6)] border-b border-white/5"
            : "bg-mrbob-black shadow-none"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 md:px-10 transition-[padding] duration-500 ease-expo ${
            scrolled ? "py-1" : "py-2"
          }`}
        >
          <LocalizedLink href="/" className="u-press shrink-0 py-2">
            <Image
              src="/images/shared/logo.png"
              alt="Mr Bob Bar and Grill"
              width={680}
              height={628}
              priority
              className="h-14 w-14 md:h-16 md:w-16"
            />
          </LocalizedLink>

          <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
            {links.map((link) => (
              <li key={link.href}>
                <LocalizedLink
                  href={link.href}
                  className={`u-link transition-colors duration-500 ease-expo hover:text-mrbob-yellow ${
                    unlocalizedPathname === link.href ? "text-mrbob-yellow" : ""
                  }`}
                >
                  {link.label}
                </LocalizedLink>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <LocalizedLink
              href="/reservation"
              className="btn-primary u-press hidden sm:inline-flex px-6 py-2.5 text-sm tracking-wide"
            >
              {dict.nav.reserveTable}
            </LocalizedLink>

            <button
              type="button"
              onClick={toggleMenu}
              onTouchEnd={toggleMenu}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden relative h-10 w-10 -mr-2 grid touch-manipulation place-items-center"
            >
              <span className="relative block h-4 w-6">
                {[0, 1, 2].map((line) => (
                  <span
                    key={line}
                    className="absolute left-0 h-px w-full bg-white transition-all duration-500 ease-expo"
                    style={{
                      top: open ? "50%" : `${line * 50}%`,
                      opacity: open && line === 1 ? 0 : 1,
                      transform: open
                        ? `rotate(${line === 0 ? 45 : line === 2 ? -45 : 0}deg)`
                        : "none",
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>

        <ScrollProgress />
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-[opacity,visibility] duration-500 ease-expo ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-mrbob-black/60 backdrop-blur-sm"
        />

        <div
          data-native-scroll
          className={`absolute inset-y-0 right-0 w-[82%] max-w-sm overflow-y-auto bg-mrbob-black px-8 pt-28 pb-12 shadow-2xl transition-transform duration-[600ms] ease-expo ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <LocalizedLink
            href="/reservation"
            className="btn-primary u-press mb-8 block px-6 py-4 text-center text-sm tracking-widest"
            style={{
              transitionDelay: open ? "120ms" : "0ms",
              opacity: open ? 1 : 0,
            }}
          >
            {dict.stickyReserveLabel}
          </LocalizedLink>

          <ul className="space-y-1">
            {drawerLinks.map((link, index) => (
              <li
                key={link.href}
                className="transition-all duration-[600ms] ease-expo"
                style={{
                  transitionDelay: open ? `${120 + (index + 1) * 45}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateX(24px)",
                }}
              >
                <LocalizedLink
                  href={link.href}
                  className={`block border-b border-white/10 py-4 text-xl font-semibold uppercase tracking-wide text-white transition-colors duration-[400ms] ease-expo hover:text-mrbob-yellow ${
                    unlocalizedPathname === link.href ? "text-mrbob-yellow" : ""
                  }`}
                >
                  {link.label}
                </LocalizedLink>
              </li>
            ))}
          </ul>

          <LanguageSwitcher className="mt-6 justify-center gap-4 border-t border-white/10 pt-6 text-sm" />
        </div>
      </div>
    </>
  );
}
