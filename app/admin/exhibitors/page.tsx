import { getExhibitors } from "./actions";
import { ExhibitorSearch, ExhibitorTable } from "./exhibitor-components";

export default async function ExhibitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const exhibitors = await getExhibitors(q);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Exhibitor Management</h1>
        <p className="mt-1 text-muted-foreground">
          View, approve and export exhibitor registrations.
        </p>
      </div>

      <ExhibitorSearch initialQuery={q} />

      <div className="mt-4">
        <ExhibitorTable exhibitors={exhibitors} />
      </div>
    </div>
  );
}
