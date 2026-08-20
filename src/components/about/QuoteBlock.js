export default function QuoteBlock({ dict }) {
  return (
    <section className="bg-mrbob-black text-white py-24 px-6">
      <div className="max-w-2xl mx-auto text-center font-serif">
        <p className="text-5xl text-mrbob-yellow mb-4">&ldquo;</p>
        <p className="mb-4 text-2xl italic font-light">{dict.line1}</p>
        <p className="text-gray-300 mb-4 text-xl italic font-light">{dict.line2}</p>
        <p className="text-gray-300 mb-4 text-xl italic font-light">{dict.line3}</p>
        <p className="font-sans text-sm font-semibold not-italic uppercase tracking-widest text-mrbob-yellow">{dict.signature}</p>
      </div>
    </section>
  );
}
