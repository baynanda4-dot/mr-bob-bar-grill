import dynamic from "next/dynamic";
import Reveal from "./motion/Reveal";
import FAQStructuredData from "./FAQStructuredData";
import { faqs } from "@/lib/faqs";

// Below the fold on every page that uses it — its open/close JS ships in
// its own chunk instead of the initial bundle.
const Accordion = dynamic(() => import("./Accordion"));

export default function FAQ() {
  return (
    <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-20">
      <FAQStructuredData />
      <Reveal as="h2" className="mb-2 text-center text-3xl font-light tracking-normal">
        Plan Your Visit
      </Reveal>
      <Reveal as="p" delay={90} className="mb-10 text-center text-white/60">
        Everything You Need to Know
      </Reveal>

      <Reveal delay={150}>
        <Accordion items={faqs} />
      </Reveal>
    </section>
  );
}
