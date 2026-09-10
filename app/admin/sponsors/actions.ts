"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
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

export async function getSponsors(query?: string) {
  await requireAdmin();

  const where: Record<string, unknown> = { role: "SPONSOR" };
  if (query) {
    where.OR = [
      { name: { contains: query } },
      { email: { contains: query } },
      { organization: { contains: query } },
      { country: { contains: query } },
    ];
  }

  return prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      organization: true,
      country: true,
      category: true,
      registrationStatus: true,
      emailVerified: true,
      createdAt: true,
    },
  });
}

const updateSchema = z.object({
  id: z.string(),
  registrationStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export async function updateSponsorStatus(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((e) => e.message).join(", ") };
  }

  const { id, registrationStatus } = parsed.data;

  try {
    await prisma.user.update({
      where: { id, role: "SPONSOR" },
      data: { registrationStatus },
    });
    revalidatePath("/admin/sponsors");
    return { success: true };
  } catch {
    return { error: "Failed to update sponsor" };
  }
}

export async function exportSponsorsCsv() {
  await requireAdmin();

  const sponsors = await prisma.user.findMany({
    where: { role: "SPONSOR" },
    orderBy: { createdAt: "desc" },
    select: {
      name: true,
      email: true,
      phone: true,
      organization: true,
      country: true,
      category: true,
      registrationStatus: true,
      createdAt: true,
    },
  });

  const headers = ["Name", "Email", "Phone", "Organization", "Country", "Category", "Status", "Registered"];
  const rows = sponsors.map((s) => [
    s.name,
    s.email,
    s.phone ?? "",
    s.organization ?? "",
    s.country ?? "",
    s.category,
    s.registrationStatus,
    s.createdAt.toISOString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  return csv;
}
