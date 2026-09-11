import { getPage } from "@/lib/content";
import { getSponsorshipSettings } from "@/app/admin/settings/actions";
import { SectionRenderer } from "@/components/public/sections";
import { SponsorshipSection } from "@/components/public/sponsorship-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const page = await getPage("home");
  const sponsorshipSettings = await getSponsorshipSettings();

  return (
    <>
      {page?.sections.map((section) => {
        if (section.key === "sponsorship-teaser") {
          const cta = (section.metadata as { cta?: { label: string; href: string } } | null)?.cta;
          return (
            <SponsorshipSection
              key={section.id}
              title={section.title ?? "Sponsorship Packages"}
              intro={section.subtitle ?? sponsorshipSettings.sponsorsIntro}
              sponsorshipTiers={sponsorshipSettings.sponsorshipTiers}
              whyPartnerPoints={[]}
              showWhyPartner={false}
              cta={cta}
            />
          );
        }
        return <SectionRenderer key={section.id} section={section} />;
      })}
    </>
  );
}
