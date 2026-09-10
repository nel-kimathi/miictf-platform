import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS \`site_setting\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`key\` VARCHAR(191) NOT NULL,
    \`value\` TEXT NOT NULL,
    \`updatedAt\` DATETIME(3) NOT NULL,
    UNIQUE INDEX \`site_setting_key_key\`(\`key\`),
    PRIMARY KEY (\`id\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
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
    return NextResponse.json({ success: true, message: "site_setting table created" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Migration failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
