import { getHalls } from "./hall-actions";
import { getBooths, getAvailableExhibitors } from "./booth-actions";
import { HallList } from "./hall-components";
import { BoothManager } from "./booth-components";

export default async function BoothsPage() {
  const [halls, booths, exhibitors] = await Promise.all([
    getHalls(),
      getBooths().then((list) =>
      list.map((b) => ({
        ...b,
        price: b.price ? b.price.toString() : null,
      })),
    ),
    getAvailableExhibitors(),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">Booth Management</h1>
        <p className="mt-1 text-muted-foreground">
          Manage exhibition halls, booths and exhibitor allocations.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="mb-3 font-heading text-xl font-semibold">Exhibition Halls</h2>
        <HallList halls={halls} />
      </section>

      <section>
        <h2 className="mb-3 font-heading text-xl font-semibold">Booths</h2>
        <BoothManager halls={halls} booths={booths} exhibitors={exhibitors} />
      </section>
    </div>
  );
}
