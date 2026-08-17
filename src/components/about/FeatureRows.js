import Image from "next/image";

const rows = [
  {
    title: "Hand-Cut, Fire-Grilled",
    desc: "Every steak, rack of ribs, and tomahawk chop is hand-cut and grilled over real fire. No shortcuts, no compromises on the char that makes a steakhouse worth the trip.",
    imageLeft: true,
    image: "/images/about/feature-1.jpg",
  },
  {
    title: "A Bar Built to Match",
    desc: "From our house wine by the glass to signature cocktails and a full spirits list, the bar is built to stand up to the grill.",
    imageLeft: false,
    image: "/images/about/feature-2.jpg",
  },
  {
    title: "A Room That Comes Alive",
    desc: "Every Monday, Wednesday, and Saturday, live music turns dinner into a night out. Whether you're here for a quiet meal or the full evening, the room is built for both.",
    imageLeft: true,
    image: "/images/about/feature-3.jpg",
  },
];

export default function FeatureRows() {
  return (
    <section className="max-w-5xl mx-auto border-t border-white/10 py-10 px-6 space-y-16">
      {rows.map((row, index) => {
        const media = (
          <div className="relative w-full md:w-1/2 h-64 overflow-hidden border border-white/10">
            <Image
              src={row.image}
              alt={row.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        );

        return (
          <div key={index} className="flex flex-col md:flex-row items-center gap-10">
            {row.imageLeft && media}
            <div className="w-full md:w-1/2 border-l-4 border-mrbob-yellow pl-6">
              <h3 className="text-2xl font-light uppercase tracking-wide mb-4">{row.title}</h3>
              <p className="text-white/70">{row.desc}</p>
            </div>
            {!row.imageLeft && media}
          </div>
        );
      })}
    </section>
  );
}
