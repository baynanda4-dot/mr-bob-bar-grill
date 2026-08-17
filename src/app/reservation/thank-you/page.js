import ThankYou from "@/components/ThankYou";
import { THANK_YOU_LINKS } from "@/lib/thankYouLinks";

export const metadata = {
  title: "Reservation Confirmed",
  robots: { index: false, follow: true },
};

export default function ReservationThankYouPage() {
  return (
    <ThankYou
      heading="Your Table Is Confirmed"
      body="Thank you for reserving a table with Mr Bob Bar and Grill. We're looking forward to welcoming you."
      links={THANK_YOU_LINKS.reservation}
    />
  );
}
