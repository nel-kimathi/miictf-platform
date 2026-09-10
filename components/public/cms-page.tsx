import { getPage } from "@/lib/content";
import { SectionRenderer } from "@/components/public/sections";

/**
 * Renders a CMS-backed page: every section is editable from the
 * Administration Portal — no hardcoded page content.
 */
export async function CmsPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary">MIICTF Platform</h1>
        <p className="mt-4 text-muted-foreground">
          Content is being configured. Please check back soon.
        </p>
      </section>
    );
  }
  return (
    <>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}