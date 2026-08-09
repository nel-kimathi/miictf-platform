import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { dashboardPathForRole, ROLE_DASHBOARD_PATHS } from "@/lib/roles";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function RoleDashboardPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!ROLE_DASHBOARD_PATHS.includes(`/${role}`)) {
    notFound();
  }

  const session = await getSession();
  if (!session || !session.user.emailVerified) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role;
  const ownPath = dashboardPathForRole(userRole);
  if (ownPath !== `/${role}`) {
    redirect(ownPath);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold capitalize text-primary">
          {role} Dashboard
        </h1>
        <SignOutButton />
      </div>
      <div className="mt-6 rounded-lg border bg-card p-6">
        <p className="font-medium">Welcome, {session.user.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {session.user.email}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Your {role} dashboard is a stub for now — profile, announcements and
          other features arrive in Phase 2.
        </p>
      </div>
    </main>
  );
}