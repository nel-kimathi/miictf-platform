"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const ADMIN_ROLES = ["ADMIN", "SUPER_ADMIN"] as const;

async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const role = (session.user as { role?: string }).role;
  if (!ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number])) {
    throw new Error("Forbidden");
  }
  return session;
}

const updateSchema = z.object({
  id: z.string(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "DELEGATE", "SPONSOR", "EXHIBITOR"]),
  registrationStatus: z.enum(["PENDING", "APPROVED", "REJECTED"]),
});

export async function getUsers(query?: string) {
  await requireAdmin();

  const where = query
    ? {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } },
          { organization: { contains: query } },
        ],
      }
    : {};

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
      role: true,
      category: true,
      registrationStatus: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateUser(formData: FormData) {
  const session = await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = updateSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { id, role, registrationStatus } = parsed.data;

  // Prevent admins from downgrading themselves accidentally
  if (id === session.user.id && role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return { error: "You cannot remove your own admin access" };
  }

  try {
    await prisma.user.update({
      where: { id },
      data: { role, registrationStatus },
    });
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Failed to update user" };
  }
}

export async function deleteUser(formData: FormData) {
  const session = await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) {
    return { error: "Invalid user ID" };
  }

  if (id === session.user.id) {
    return { error: "You cannot delete your own account" };
  }

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
    return { success: true };
  } catch {
    return { error: "Failed to delete user" };
  }
}
