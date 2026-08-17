import SmartImage from "@/components/SmartImage";

export default function GroupReservationHero() {
  return (
    <section className="relative h-[40vh] bg-mrbob-black flex flex-col items-center justify-center text-center text-white px-6">
      <SmartImage src="/images/group-reservation/hero.jpg" alt="Group reservations at Mr Bob Bar and Grill" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-5xl font-light tracking-normal mb-2">Group Reservation</h1>
        <p className="text-sm text-gray-300">Bringing a bigger party? Let us set the table.</p>
      </div>
    </section>
  );
}
