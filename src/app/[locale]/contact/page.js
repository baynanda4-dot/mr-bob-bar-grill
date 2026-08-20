import dynamic from "next/dynamic";
import ContactHero from "@/components/contact/Hero";
import GetInTouch from "@/components/contact/GetInTouch";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";
import { localeAlternates } from "@/lib/i18n/alternates";
import { getDictionary } from "@/lib/i18n/getDictionary";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const MessageForm = dynamic(() => import("@/components/contact/MessageForm"));

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "metadata");
  return {
    title: dict.contact.title,
    description: dict.contact.description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const [metadata, content, common, forms] = await Promise.all([
    getDictionary(locale, "metadata"),
    getDictionary(locale, "content"),
    getDictionary(locale, "common"),
    getDictionary(locale, "forms"),
  ]);
  const title = metadata.contact.title;
  const description = metadata.contact.description;
  const contact = content.contact;

  return (
    <main>
      <PageSchema
        path="/contact"
        name={title}
        description={description}
        type="ContactPage"
        crumbs={[{ name: "Home", path: "/" }, { name: contact.hero.title }]}
        mainEntityId={`${SITE_URL}/#organization`}
        locale={locale}
      />
      <ContactHero dict={contact.hero} />
      <GetInTouch dict={contact.getInTouch} hoursRange={common.hoursRange} />
      <MessageForm dict={forms.contact} common={forms.common} />
    </main>
  );
}
