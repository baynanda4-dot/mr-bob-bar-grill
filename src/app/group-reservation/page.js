import dynamic from "next/dynamic";
import GroupReservationHero from "@/components/group-reservation/Hero";
import Intro from "@/components/group-reservation/Intro";
import StickyReserveButton from "@/components/StickyReserveButton";
import PageSchema from "@/components/PageSchema";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const EnquiryForm = dynamic(() => import("@/components/group-reservation/EnquiryForm"));

const title = "Group Reservation";
const description =
  "Dining with a larger group at Mr Bob Bar and Grill? Request your group reservation and our team will confirm availability and package options.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/group-reservation" },
};

export default function GroupReservationPage() {
  return (
    <main>
      <PageSchema
        path="/group-reservation"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Group Reservation" }]}
      />
      <GroupReservationHero />
      <Intro />
      <EnquiryForm />
      <StickyReserveButton href="#enquiry" label="GROUP RESERVATION" />
    </main>
  );
}
