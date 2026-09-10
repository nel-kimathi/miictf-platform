"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

const SETUP_SECRET = "setup-miictf-2026";

export async function setupAdminAccount(formData: FormData) {
  const secret = formData.get("secret");
  if (secret !== SETUP_SECRET) {
    return { error: "Invalid setup secret" };
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
  });

  if (existingAdmin) {
    return { error: "An admin account already exists. This setup is disabled." };
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: "Super Administrator",
        email: "superadmin@test.local",
        password: "Password123!",
      },
    });

    await prisma.user.update({
      where: { id: result.user.id },
      data: { role: "SUPER_ADMIN", emailVerified: true, registrationStatus: "APPROVED" },
    });

    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Setup failed";
    return { error: message };
  }
}

export async function setupTestAccounts(formData: FormData) {
  const secret = formData.get("secret");
  if (secret !== SETUP_SECRET) {
    return { error: "Invalid setup secret" };
  }

  const accounts = [
    { name: "Administrator", email: "admin@test.local", role: "ADMIN" },
    { name: "Delegate", email: "delegate@test.local", role: "DELEGATE" },
    { name: "Sponsor", email: "sponsor@test.local", role: "SPONSOR" },
  ];

  const results: string[] = [];

  for (const account of accounts) {
    try {
      const existing = await prisma.user.findUnique({ where: { email: account.email } });
      if (existing) {
        results.push(`${account.email}: already exists`);
        continue;
      }

      const created = await auth.api.signUpEmail({
        body: {
          name: account.name,
          email: account.email,
          password: "Password123!",
        },
      });

      await prisma.user.update({
        where: { id: created.user.id },
        data: { role: account.role as "ADMIN" | "DELEGATE" | "SPONSOR", emailVerified: true, registrationStatus: "APPROVED" },
      });

      results.push(`${account.email}: created`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed";
      results.push(`${account.email}: ${message}`);
    }
  }

  return { success: true, results };
}
