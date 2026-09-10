/**
 * Create admin + super admin test users for local dev.
 * Run: npx tsx scripts/seed-admins.ts
 */
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { hashPassword } from "better-auth/crypto";

const rawUrl = process.env.DATABASE_URL ?? "";
const url = rawUrl.replace(/^mysql:\/\//, "mariadb://");
const adapter = new PrismaMariaDb(url);
const prisma = new PrismaClient({ adapter });

const PASSWORD = "Password123!";

const users = [
  { email: "admin@test.local", name: "Test Admin", role: "ADMIN" as const },
  { email: "superadmin@test.local", name: "Test Super Admin", role: "SUPER_ADMIN" as const },
];

async function main() {
  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) {
      console.log(`${u.email} already exists — skipping`);
      continue;
    }

    const hashedPassword = await hashPassword(PASSWORD);
    const userId = randomUUID();
    const accountId = randomUUID();
    const sessionId = randomUUID();

    await prisma.user.create({
      data: {
        id: userId,
        name: u.name,
        email: u.email,
        emailVerified: true,
        role: u.role,
        category: "DELEGATE",
        registrationStatus: "APPROVED",
        sessions: {
          create: {
            id: sessionId,
            token: randomUUID(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
        accounts: {
          create: {
            id: accountId,
            accountId: u.email,
            providerId: "credential",
            password: hashedPassword,
          },
        },
      },
    });
    console.log(`Created ${u.email} (${u.role})`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
