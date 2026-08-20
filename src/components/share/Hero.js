import SmartImage from "@/components/SmartImage";

// Reuses a real photo from the gallery (public/images/gallery/dining-1.jpg)
// rather than a new upload — an evening dining scene, which reads as "worth
// sharing" better than a plain daytime shot.
export default function ShareHero({ dict }) {
  return (
    <section className="relative flex h-[50vh] flex-col items-center justify-center bg-mrbob-black px-6 text-center text-white">
      <SmartImage
        src="/images/gallery/dining-1.jpg"
        alt="Evening dining room at Mr Bob Bar and Grill"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 mx-auto max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-mrbob-yellow">{dict.eyebrow}</p>
        <h1 className="mb-4 text-5xl font-light tracking-normal">{dict.title}</h1>
        <p className="mx-auto max-w-xl text-sm text-gray-200">{dict.body}</p>
      </div>
    </section>
  );
}
