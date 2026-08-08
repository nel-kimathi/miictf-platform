import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/content";
import { SectionRenderer } from "@/components/public/sections";
import { ContactForm } from "@/components/public/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const page = await getPage("contact");
  if (!page) notFound();

  const hero = page.sections.filter((s) => s.key === "hero");
  const details = page.sections.filter((s) => s.key !== "hero");

  return (
    <>
      {hero.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-primary">Send a message</h2>
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