import dynamic from "next/dynamic";
import ReservationHero from "@/components/reservation/Hero";
import ReservationPhotoPanel from "@/components/reservation/PhotoPanel";
import PromoTicker from "@/components/PromoTicker";
import InstagramPreview from "@/components/home/InstagramPreview";
import FAQ from "@/components/FAQ";
import PageSchema from "@/components/PageSchema";
import { SITE_URL } from "@/lib/site";

// Below the fold — its form-state/validation JS ships in its own chunk
// instead of the initial bundle. Still server-rendered (no ssr:false), so
// there's no content/SEO regression, just a smaller initial JS payload.
const ReservationForm = dynamic(() => import("@/components/reservation/ReservationForm"));

const title = "Reserve a Table | Mr Bob Bar and Grill";
const description =
  "Reserve a table at Mr Bob Bar and Grill: hand-cut steaks, pork ribs, tomahawk chops, and live music every Monday, Wednesday, and Saturday.";

export const metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/reservation" },
  openGraph: {
    type: "website",
    title,
    description,
    images: [{ url: "/images/reservation/hero.jpg", width: 1200, height: 630, alt: "Mr Bob Bar and Grill" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/reservation/hero.jpg"],
  },
};

export default function ReservationPage() {
  return (
    <main>
      <PageSchema
        path="/reservation"
        name={title}
        description={description}
        crumbs={[{ name: "Home", path: "/" }, { name: "Reservation" }]}
        mainEntityId={`${SITE_URL}/#main`}
      />
      <ReservationHero />
      <PromoTicker className="mx-auto mt-12 max-w-4xl px-6 md:mt-16" />
      <section className="px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto mb-3 h-px w-8 bg-mrbob-yellow/50" />
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-mrbob-yellow">Reservations</p>
          <h2 className="mb-3 text-3xl font-light tracking-normal md:text-4xl">Join Us</h2>
          <p className="text-white/70">
            Complete the form below and our team will confirm your reservation as soon as possible.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 overflow-hidden border border-white/10 lg:grid-cols-2">
          <ReservationPhotoPanel />
          <div className="bg-white/[0.02] p-8 sm:p-10">
            <ReservationForm />
          </div>
        </div>
      </section>
      <InstagramPreview />
      <FAQ />
    </main>
  );
}
