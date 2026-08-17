import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

export const metadata = {
  title: "Message Received",
  robots: { index: false, follow: true },
};

export default function ContactThankYouPage() {
  return (
    <ThankYou
      heading="Thank You for Writing to Us"
      body="Your message has reached us. A member of our team will respond to you personally very soon."
      links={THANK_YOU_LINKS.contact}
    />
  );
}
