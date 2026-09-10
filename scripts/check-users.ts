import { prisma } from "../lib/db";

async function main() {
  const users = await prisma.user.findMany({
    where: {
      email: {
        in: ["admin@test.local", "superadmin@test.local", "delegate@test.local", "sponsor@test.local"],
      },
    },
    select: { email: true, role: true, emailVerified: true },
  });
  console.log(JSON.stringify(users, null, 2));
  await prisma.$disconnect();
}

main();
