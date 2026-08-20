export default function OurStory({ dict }) {
  return (
    <section className="max-w-3xl mx-auto text-center border-t border-white/10 py-24 px-6">
      <h2 className="text-4xl font-light tracking-normal mb-6">{dict.heading}</h2>
      <p className="text-white/70 leading-relaxed">{dict.body}</p>
    </section>
  );
}
