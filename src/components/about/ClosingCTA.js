import LocalizedLink from "@/components/LocalizedLink";

export default function ClosingCTA({ dict }) {
  return (
    <section className="py-24 px-6 text-center max-w-2xl mx-auto border-t border-white/10">
      <h2 className="text-3xl font-light tracking-normal mb-4">{dict.heading}</h2>
      <p className="text-white/70 mb-8">{dict.body}</p>
      <div className="flex gap-4 justify-center">
        <LocalizedLink href="/reservation" className="btn-primary u-press px-8 py-3 text-sm tracking-widest">{dict.reserveCta}</LocalizedLink>
        <LocalizedLink href="/contact" className="btn-outline u-press px-8 py-3 text-sm tracking-widest">{dict.contactCta}</LocalizedLink>
      </div>
    </section>
  );
}
