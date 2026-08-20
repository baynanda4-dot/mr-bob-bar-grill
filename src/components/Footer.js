import Image from "next/image";
import LocalizedLink from "./LocalizedLink";
import LanguageSwitcher from "./LanguageSwitcher";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import { LOCATIONS, OPENING_HOURS } from "@/lib/site";

export default function Footer({ dict }) {
  const location = LOCATIONS[0];

  const columns = [
    {
      heading: dict.footer.exploreHeading,
      links: [
        { href: "/", label: dict.footer.home },
        { href: "/about", label: dict.footer.about },
        { href: "/menu/food", label: dict.footer.foodMenu },
        { href: "/menu/beverage", label: dict.footer.beverageMenu },
      ],
    },
    {
      heading: dict.footer.visitHeading,
      links: [
        { href: "/reservation", label: dict.footer.reserveTable },
        { href: "/group-reservation", label: dict.footer.groupReservation },
        { href: "/contact", label: dict.footer.contact },
      ],
    },
  ];

  return (
    <footer className="bg-mrbob-black px-6 py-16 text-white">
      <Stagger
        step={110}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3"
      >
        <div>
          <Image
            src="/images/shared/logo.png"
            alt="Mr Bob Bar and Grill"
            width={680}
            height={628}
            className="mb-4 h-20 w-auto"
          />
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            {dict.footer.tagline}
          </p>
          <LocalizedLink
            href="/contact"
            className="btn-outline u-press inline-flex px-6 py-2.5 text-sm tracking-widest"
          >
            {dict.footer.contactUs}
          </LocalizedLink>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="mb-3 font-semibold">{column.heading}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {column.links.map((link) => (
                <li key={link.href}>
                  <LocalizedLink
                    href={link.href}
                    className="u-link transition-colors duration-500 ease-expo hover:text-mrbob-yellow"
                  >
                    {link.label}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Stagger>

      <Reveal
        delay={200}
        className="mx-auto mt-10 flex max-w-5xl flex-col gap-3 border-t border-white/15 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; 2026 {location.name}. {dict.footer.rightsReserved}</p>
        <p>
          {dict.hoursRange}: {OPENING_HOURS.opens} &ndash; {OPENING_HOURS.closes}
        </p>
        <LanguageSwitcher />
      </Reveal>
    </footer>
  );
}
