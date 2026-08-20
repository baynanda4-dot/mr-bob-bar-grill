import dynamic from "next/dynamic";
import Reveal from "./motion/Reveal";
import FAQStructuredData from "./FAQStructuredData";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("./Accordion"));

export default function FAQ({ faqs, heading, subheading }) {
  return (
    <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-20">
      <FAQStructuredData faqs={faqs} />
      <Reveal as="h2" className="mb-2 text-center text-3xl font-light tracking-normal">
        {heading}
      </Reveal>
      <Reveal as="p" delay={90} className="mb-10 text-center text-white/60">
        {subheading}
      </Reveal>

      <Reveal delay={150}>
        <Accordion items={faqs} />
      </Reveal>
    </section>
  );
}
