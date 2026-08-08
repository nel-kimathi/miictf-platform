import { notFound } from "next/navigation";
import { getPage } from "@/lib/content";
import { SectionRenderer } from "@/components/public/sections";

/**
 * Renders a CMS-backed page: every section is editable from the
 * Administration Portal — no hardcoded page content.
 */
export async function CmsPage({ slug }: { slug: string }) {
  const page = await getPage(slug);
  if (!page) notFound();
  return (
    <>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </>
  );
}