import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { getSponsorshipSettings } from "@/app/admin/settings/actions";
import { SectionRenderer } from "@/components/public/sections";
import { SponsorshipSection } from "@/components/public/sponsorship-section";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Sponsors & Partners" };

export default async function SponsorsPartnersPage() {
  const page = await getPage("sponsors-partners");
  const settings = await getSponsorshipSettings();

  const heroSection = page?.sections.find((s) => s.key === "hero");
  const ctaSection = page?.sections.find((s) => s.key === "cta");

  return (
    <>
      {heroSection ? <SectionRenderer section={heroSection} /> : null}
      <SponsorshipSection
        title="Sponsorship Packages"
        intro={settings.sponsorsIntro}
        sponsorshipTiers={settings.sponsorshipTiers}
        whyPartnerPoints={settings.whyPartnerPoints}
        showWhyPartner
      />
      {ctaSection ? <SectionRenderer section={ctaSection} /> : null}
    </>
  );
}
