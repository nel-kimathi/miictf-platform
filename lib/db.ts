import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/lib/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawUrl = process.env.DATABASE_URL ?? "";
const url = rawUrl
  .replace(/^mysql:\/\//, "mariadb://")
  + (rawUrl.includes("?") ? "&allowPublicKeyRetrieval=true" : "?allowPublicKeyRetrieval=true");
const adapter = new PrismaMariaDb(url);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}