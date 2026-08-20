import Image from "next/image";

// Image path/side never change per locale — merged with the dict's
// translated title/desc by index.
const ROW_LAYOUT = [
  { imageLeft: true, image: "/images/about/feature-1.jpg" },
  { imageLeft: false, image: "/images/about/feature-2.jpg" },
  { imageLeft: true, image: "/images/about/feature-3.jpg" },
];

export default function FeatureRows({ dict }) {
  const rows = dict.map((row, i) => ({ ...row, ...ROW_LAYOUT[i] }));

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
