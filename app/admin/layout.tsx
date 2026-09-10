import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { dashboardPathForRole } from "@/lib/roles";
import { AdminShell } from "@/components/admin/admin-shell";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !session.user.emailVerified) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string }).role ?? "DELEGATE";

  if (!ADMIN_ROLES.includes(userRole)) {
    redirect(dashboardPathForRole(userRole));
  }

  return <AdminShell>{children}</AdminShell>;
}
