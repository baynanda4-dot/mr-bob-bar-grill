import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/Hero";
import GetInTouch from "@/components/contact/GetInTouch";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const MessageForm = dynamic(() => import("@/components/contact/MessageForm"));

const title = "Contact Us";
const description =
  "Get in touch with Mr Bob Bar and Grill for reservations, enquiries, and directions.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageSchema
        path="/contact"
        name={title}
        description={description}
        type="ContactPage"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact Us" }]}
        mainEntityId={`${SITE_URL}/#organization`}
      />
      <ContactHero />
      <GetInTouch />
      <MessageForm />
    </main>
  );
}
