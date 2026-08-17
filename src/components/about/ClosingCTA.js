import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto border-t border-white/10">
      <h2 className="text-3xl font-light tracking-normal mb-4">Pull Up a Seat</h2>
      <p className="text-white/70 mb-8">
        Come taste what's on the grill and see why guests keep coming back
        for our live music nights.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/reservation" className="btn-primary u-press px-8 py-3 text-sm tracking-widest">Reserve Table</Link>
        <Link href="/contact" className="btn-outline u-press px-8 py-3 text-sm tracking-widest">Contact Us</Link>
      </div>
    </section>
  );
}
