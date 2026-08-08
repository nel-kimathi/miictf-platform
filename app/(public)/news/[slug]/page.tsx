import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  return { title: item?.title ?? "News" };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/news" className="text-sm text-primary hover:underline">
        ← Back to News & Updates
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary">
        {item.title}
      </h1>
      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
        {item.category ? <Badge>{item.category}</Badge> : null}
        {item.publishedAt ? (
          <span>
            {item.publishedAt.toLocaleDateString("en-KE", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        ) : null}
      </div>
      <div className="prose mt-8 whitespace-pre-line leading-relaxed">
        {item.content}
      </div>
    </article>
  );
}