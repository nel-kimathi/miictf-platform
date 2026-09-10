import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS \`system_log\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`userId\` VARCHAR(191) NULL,
    \`action\` VARCHAR(191) NOT NULL,
    \`entityType\` VARCHAR(191) NOT NULL,
    \`entityId\` VARCHAR(191) NULL,
    \`details\` JSON NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  `CREATE INDEX IF NOT EXISTS \`system_log_createdAt_idx\` ON \`system_log\`(\`createdAt\`)`,
  `CREATE INDEX IF NOT EXISTS \`system_log_entityType_entityId_idx\` ON \`system_log\`(\`entityType\`, \`entityId\`)`,
  `ALTER TABLE \`system_log\` ADD CONSTRAINT \`system_log_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
];

export async function GET() {
  const session = await getSession();
  const role = (session?.user as { role?: string })?.role;

  if (!session?.user || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    for (const statement of STATEMENTS) {
      await prisma.$executeRawUnsafe(statement);
    }
    return NextResponse.json({ success: true, message: "system_log table created" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Migration failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
