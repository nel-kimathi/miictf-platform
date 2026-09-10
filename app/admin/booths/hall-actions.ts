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

// --- Exhibition Halls ---

const hallSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500).optional(),
  order: z.coerce.number().int().min(0).default(0),
});

export async function getHalls() {
  await requireAdmin();
  return prisma.exhibitionHall.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { booths: true } } },
  });
}

export async function saveHall(_prevState: unknown, formData: FormData) {
  await requireAdmin();

  const raw = Object.fromEntries(formData);
  const parsed = hallSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  const { id, name, description, order } = parsed.data;

  try {
    if (id) {
      await prisma.exhibitionHall.update({
        where: { id },
        data: { name, description, order },
      });
    } else {
      await prisma.exhibitionHall.create({
        data: { name, description, order },
      });
    }
    revalidatePath("/admin/booths");
    return { success: true };
  } catch {
    return { error: "Failed to save hall. Name may already exist." };
  }
}

export async function deleteHall(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return { error: "Invalid hall ID" };

  try {
    await prisma.exhibitionHall.delete({ where: { id } });
    revalidatePath("/admin/booths");
    return { success: true };
  } catch {
    return { error: "Failed to delete hall" };
  }
}
