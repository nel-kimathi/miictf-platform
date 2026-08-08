import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage, getPublishedNews } from "@/lib/content";
import { SectionRenderer } from "@/components/public/sections";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "News & Updates" };

export default async function NewsPage() {
  const [page, news] = await Promise.all([getPage("news"), getPublishedNews()]);
  if (!page) notFound();

  return (
    <>
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
      <section className="mx-auto max-w-5xl px-4 py-12">
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No news published yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    {item.category ? <Badge>{item.category}</Badge> : null}
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.publishedAt ? (
                      <CardDescription>
                        {item.publishedAt.toLocaleDateString("en-KE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    ) : null}
                  </CardHeader>
                  {item.excerpt ? (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {item.excerpt}
                      </p>
                    </CardContent>
                  ) : null}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}