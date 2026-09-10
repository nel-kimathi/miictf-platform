import type { Metadata } from "next";
import Link from "next/link";
import { getNewsBySlug } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

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
  if (!item) {
    return (
      <article className="mx-auto max-w-3xl px-4 pb-12 pt-28">
        <Link href="/news" className="text-sm text-primary hover:underline">
          ← Back to News &amp; Updates
        </Link>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-primary">
          Article Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          This article may have been removed or is not yet available.
        </p>
      </article>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 pb-12 pt-28">
      <Link href="/news" className="text-sm text-primary hover:underline">
        ← Back to News & Updates
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-primary">
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