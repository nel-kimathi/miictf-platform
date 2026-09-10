"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { logAdminAction } from "@/lib/admin/system-log";
import { revalidatePath } from "next/cache";

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

const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "MIICCOF",
  siteTagline: "Meru International Investment Conference & Consumer Fair",
  contactEmail: "secretariat@example.com",
  supportPhone: "",
  eventStartDate: "2026-12-03",
  eventEndDate: "2026-12-05",
  eventLocation: "Meru, Kenya",
  socialFacebook: "",
  socialTwitter: "",
  socialLinkedIn: "",
};

export async function getSettings() {
  const settings = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const setting of settings) {
    map[setting.key] = setting.value;
  }
  // Ensure all default keys exist
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    if (!(key in map)) map[key] = value;
  }
  return map;
}

export async function getPublicSettings() {
  return getSettings();
}

const updateSchema = z.record(z.string().min(1).max(200), z.string().max(2000));

export async function updateSettings(formData: FormData) {
  const session = await requireAdmin();

  const raw: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") raw[key] = value;
  }

  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join(", ") };
  }

  try {
    await prisma.$transaction(
      Object.entries(parsed.data).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        }),
      ),
    );
    await logAdminAction({
      userId: session.user.id,
      action: "UPDATE",
      entityType: "SYSTEM",
      details: { keys: Object.keys(parsed.data) },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Failed to update settings" };
  }
}
