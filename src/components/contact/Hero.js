import SmartImage from "@/components/SmartImage";

export default function ContactHero({ dict }) {
  return (
    <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/contact/hero.jpg" alt="Contact Mr Bob Bar and Grill" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-5xl font-light tracking-normal mb-2">{dict.title}</h1>
        <p className="text-sm text-gray-300">{dict.subtitle}</p>
      </div>
    </section>
  );
}
