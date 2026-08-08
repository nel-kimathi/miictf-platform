import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // SMTP is stubbed for now — log the verification URL (dev only).
      // Swap for Hostinger SMTP transport in Phase 3 production setup.
      console.log(
        `[dev-stub-smtp] verification email for ${user.email}:\n${url}`
      );
    },
  },
});