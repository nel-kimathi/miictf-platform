import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/mail";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "mysql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Verify your MIICCOF account",
        html: `<p>Hello ${user.name},</p>
<p>Thank you for registering for the Meru International Investment Conference &amp; Trade Fair.</p>
<p>Please verify your email address by clicking the link below:</p>
<p><a href="${url}">Verify my email</a></p>
<p>If you did not create this account, you can ignore this email.</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      phone: { type: "string", required: false },
      organization: { type: "string", required: false },
      country: { type: "string", required: false },
      // The participant type the person registered as. Maps to role below.
      category: { type: "string", required: false, defaultValue: "DELEGATE" },
      // Exposed on the session for redirects/guards, but never settable by
      // the client (input: false) — role is assigned server-side only.
      role: { type: "string", required: false, input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Keep role server-controlled: derive it from the registration category
        // after the account is created. Role is never accepted from the client.
        after: async (user) => {
          const category = (user as { category?: string }).category;
          const role =
            category === "SPONSOR" || category === "EXHIBITOR"
              ? category
              : "DELEGATE";
          await prisma.user.update({ where: { id: user.id }, data: { role } });
        },
      },
    },
  },
});