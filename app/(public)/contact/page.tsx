import type { Metadata } from "next";
import { getPage } from "@/lib/content";
import { SectionRenderer } from "@/components/public/sections";
import { ContactForm } from "@/components/public/contact-form";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact" };

const fallback = (
  <section className="mx-auto max-w-5xl px-4 py-24 text-center">
    <h1 className="font-heading text-3xl font-bold text-primary">Contact Us</h1>
    <p className="mt-4 text-muted-foreground">Content is being configured. Please check back soon.</p>
  </section>
);

export default async function ContactPage() {
  const page = await getPage("contact");
  if (!page) return fallback;

  const hero = page.sections.filter((s) => s.key === "hero");
  const details = page.sections.filter((s) => s.key !== "hero");

  return (
    <>
      {hero.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-2">
        <div>
          <h2 className="font-heading text-xl font-semibold text-primary">Send a message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
        <div>
          {details.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </div>
      </section>
    </>
  );
}