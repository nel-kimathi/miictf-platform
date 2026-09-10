"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/mail";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export type FormState = { ok: boolean; message: string };

const emailSchema = z.email();

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = emailSchema.safeParse(
    String(formData.get("email") ?? "").trim().toLowerCase()
  );
  if (!parsed.success) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  try {
    await prisma.newsletterSubscriber.create({
      data: { id: randomUUID(), email: parsed.data },
    });
    return { ok: true, message: "Thanks for subscribing!" };
  } catch {
    // Unique constraint: already subscribed.
    return { ok: true, message: "You're already subscribed." };
  }
}

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  // Honeypot — must be empty. Bots tend to fill every field.
  company: z.string().max(0).optional().or(z.literal("")),
});

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the form — all fields are required.",
    };
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO ?? process.env.SMTP_FROM ?? "";
  try {
    await sendMail({
      to,
      subject: `[MIICCOF contact] ${subject}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(
        message
      ).replace(/\n/g, "<br/>")}</p>`,
    });
    return { ok: true, message: "Message sent. We'll get back to you soon." };
  } catch {
    return {
      ok: false,
      message: "Could not send your message right now. Please try again.",
    };
  }
}