import { notFound } from "next/navigation";

const VALID_ROLES = ["delegate", "sponsor", "exhibitor", "administrator"];

export default async function RoleDashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!VALID_ROLES.includes(role)) {
    notFound();
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-heading font-bold capitalize">
        {role} Dashboard
      </h1>
      <p className="text-muted-foreground">
        Stub dashboard for {role}. Follows auth in Phase 1.
      </p>
    </main>
  );
}