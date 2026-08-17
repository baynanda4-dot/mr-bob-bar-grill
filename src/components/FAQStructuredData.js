import { faqs } from "@/lib/faqs";

/**
 * FAQPage markup for the homepage's "Plan Your Visit" accordion (see
 * FAQ.js, which renders the same `faqs` array visibly directly above this).
 * Gives Google and AI answer engines (AI Overviews, ChatGPT/Gemini/
 * Perplexity browsing) a clean, structured Q&A to cite directly.
 */
export default function FAQStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Data is our own static config (src/lib/faqs.js), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
