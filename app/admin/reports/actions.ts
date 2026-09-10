"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");
  const role = (session.user as { role?: string }).role;
  if (!ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
    throw new Error("Forbidden");
  }
}

export async function getReportData() {
  await requireAdmin();

  const [users, roleCounts, statusCounts, countryCounts, categoryCounts] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organization: true,
        country: true,
        category: true,
        registrationStatus: true,
        createdAt: true,
      },
    }),
    prisma.user.groupBy({
      by: ["role"],
      _count: { role: true },
    }),
    prisma.user.groupBy({
      by: ["registrationStatus"],
      _count: { registrationStatus: true },
    }),
    prisma.user.groupBy({
      by: ["country"],
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
    }),
    prisma.user.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
    }),
  ]);

  return {
    users,
    roleCounts,
    statusCounts,
    countryCounts,
    categoryCounts,
  };
}

function toCsv(rows: string[][]) {
  return rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export async function exportReportCsv(name: "users" | "countries" | "categories") {
  await requireAdmin();

  if (name === "users") {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        name: true,
        email: true,
        role: true,
        organization: true,
        country: true,
        category: true,
        registrationStatus: true,
        createdAt: true,
      },
    });
    return toCsv([
      ["Name", "Email", "Role", "Organization", "Country", "Category", "Status", "Registered"],
      ...users.map((u) => [
        u.name,
        u.email,
        u.role,
        u.organization ?? "",
        u.country ?? "",
        u.category,
        u.registrationStatus,
        u.createdAt.toISOString(),
      ]),
    ]);
  }

  if (name === "countries") {
    const countries = await prisma.user.groupBy({
      by: ["country"],
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
    });
    return toCsv([
      ["Country", "Count"],
      ...countries.map((c) => [c.country || "Unspecified", String(c._count.country)]),
    ]);
  }

  const categories = await prisma.user.groupBy({
    by: ["category"],
    _count: { category: true },
    orderBy: { _count: { category: "desc" } },
  });
  return toCsv([
    ["Category", "Count"],
    ...categories.map((c) => [c.category, String(c._count.category)]),
  ]);
}
