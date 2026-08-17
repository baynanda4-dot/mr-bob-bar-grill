import Image from "next/image";
import Link from "next/link";
import Reveal from "./motion/Reveal";
import Stagger from "./motion/Stagger";
import { LOCATIONS, OPENING_HOURS } from "@/lib/site";

const columns = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/menu/food", label: "Food Menu" },
      { href: "/menu/beverage", label: "Beverage Menu" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { href: "/reservation", label: "Reserve a Table" },
      { href: "/group-reservation", label: "Group Reservation" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  const location = LOCATIONS[0];

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
            Hand-cut steaks, pork ribs, and tomahawk chops, paired with a
            curated wine list and live music every Monday, Wednesday, and
            Saturday.
          </p>
          <Link
            href="/contact"
            className="btn-outline u-press inline-flex px-6 py-2.5 text-sm tracking-widest"
          >
            CONTACT US
          </Link>
        </div>

        {columns.map((column) => (
          <div key={column.heading}>
            <h4 className="mb-3 font-semibold">{column.heading}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="u-link transition-colors duration-500 ease-expo hover:text-mrbob-yellow"
                  >
                    {link.label}
                  </Link>
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
        <p>&copy; 2026 {location.name}. All rights reserved.</p>
        <p>
          {OPENING_HOURS.dayOfWeek[0]} &ndash; {OPENING_HOURS.dayOfWeek[6]}: {OPENING_HOURS.opens} &ndash; {OPENING_HOURS.closes}
        </p>
      </Reveal>
    </footer>
  );
}
