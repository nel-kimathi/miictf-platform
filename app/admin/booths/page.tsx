import { getHalls } from "./hall-actions";
import { HallList } from "./hall-components";

export default async function BoothsPage() {
  const halls = await getHalls();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Booth Management</h1>
        <p className="mt-1 text-muted-foreground">
          Manage exhibition halls and booth allocations.
        </p>
      </div>

      <HallList halls={halls} />
    </div>
  );
}
