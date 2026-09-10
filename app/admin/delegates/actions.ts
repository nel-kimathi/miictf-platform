"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { logAdminAction } from "@/lib/admin/system-log";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");
  const role = (session.user as { role?: string }).role;
  if (!ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
    throw new Error("Forbidden");
  }
  return session;
}

export async function getDelegates(query?: string) {
  await requireAdmin();

  const where: Record<string, unknown> = { role: "DELEGATE" };
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

export async function updateDelegateStatus(_prevState: unknown, formData: FormData) {
  const session = await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((e) => e.message).join(", ") };
  }

  const { id, registrationStatus } = parsed.data;

  try {
    await prisma.user.update({
      where: { id, role: "DELEGATE" },
      data: { registrationStatus },
    });
    await logAdminAction({
      userId: session.user.id,
      action: registrationStatus === "APPROVED" ? "APPROVE" : "REJECT",
      entityType: "DELEGATE",
      entityId: id,
      details: { registrationStatus },
    });
    revalidatePath("/admin/delegates");
    return { success: true };
  } catch {
    return { error: "Failed to update delegate" };
  }
}

export async function exportDelegatesCsv() {
  await requireAdmin();

  const delegates = await prisma.user.findMany({
    where: { role: "DELEGATE" },
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
  const rows = delegates.map((d) => [
    d.name,
    d.email,
    d.phone ?? "",
    d.organization ?? "",
    d.country ?? "",
    d.category,
    d.registrationStatus,
    d.createdAt.toISOString(),
  ]);

  const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

  return csv;
}
