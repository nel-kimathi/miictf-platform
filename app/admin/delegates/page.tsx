import { getDelegates } from "./actions";
import { DelegateSearch, DelegateTable } from "./delegate-components";

export default async function DelegatesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const delegates = await getDelegates(q);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Delegate Management</h1>
        <p className="mt-1 text-muted-foreground">
          Approve, reject, search and export delegate registrations.
        </p>
      </div>

      <DelegateSearch initialQuery={q} />

      <div className="mt-4">
        <DelegateTable delegates={delegates} />
      </div>
    </div>
  );
}
