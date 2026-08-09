import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/roles";
import { SignOutButton } from "@/components/auth/sign-out-button";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];

export default async function AdminPage() {
  const session = await getSession();
  if (!session || !session.user.emailVerified) {
    redirect("/login");
  }
  const userRole = (session.user as { role?: string }).role ?? "DELEGATE";
  if (!ADMIN_ROLES.includes(userRole)) {
    redirect(dashboardPathForRole(userRole));
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-primary">
          Administration Portal
        </h1>
        <SignOutButton />
      </div>
      <div className="mt-6 rounded-lg border bg-card p-6">
        <p className="font-medium">Welcome, {session.user.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Role: {userRole === "SUPER_ADMIN" ? "Super Administrator" : "Administrator"}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Admin modules (dashboard, user management, delegates, sponsors,
          exhibitors, booths, news, reports, settings, logs) arrive in Phase 2.
        </p>
      </div>
    </main>
  );
}