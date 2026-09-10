import { getSession } from "@/lib/session";

const SUMMARY_CARDS = [
  { label: "Total Delegates", value: "—", href: "/admin/delegates" },
  { label: "Total Sponsors", value: "—", href: "/admin/sponsors" },
  { label: "Total Exhibitors", value: "—", href: "/admin/exhibitors" },
  { label: "Available Booths", value: "—", href: "/admin/booths" },
  { label: "Pending Registrations", value: "—", href: "/admin/users" },
  { label: "Approved Registrations", value: "—", href: "/admin/users" },
];

export default async function AdminPage() {
  const session = await getSession();
  const userName = session?.user?.name ?? "Admin";
  const userRole = (session?.user as { role?: string }).role ?? "ADMIN";

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back, {userName}. Role: {userRole}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUMMARY_CARDS.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent/5"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-card p-6">
        <h2 className="font-heading text-xl font-semibold">Recent Activity</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Activity feeds, charts and announcements will appear here once the
          data modules are wired up.
        </p>
      </div>
    </div>
  );
}
