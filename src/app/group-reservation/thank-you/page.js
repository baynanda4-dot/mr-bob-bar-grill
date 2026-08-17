import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

export const metadata = {
  title: "Request Received",
  robots: { index: false, follow: true },
};

export default function GroupReservationThankYouPage() {
  return (
    <ThankYou
      heading="Your Group Reservation Request Has Been Received"
      body="Thank you for your request. Our team will get back to you shortly to confirm availability."
      links={THANK_YOU_LINKS["group-reservation"]}
    />
  );
}
