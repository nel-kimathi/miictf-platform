import { getSponsors } from "./actions";
import { SponsorSearch, SponsorTable } from "./sponsor-components";

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const sponsors = await getSponsors(q);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Sponsor Management</h1>
        <p className="mt-1 text-muted-foreground">
          View, approve and export sponsor registrations.
        </p>
      </div>

      <SponsorSearch initialQuery={q} />

      <div className="mt-4">
        <SponsorTable sponsors={sponsors} />
      </div>
    </div>
  );
}
