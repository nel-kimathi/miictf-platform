import { cache } from "react";
import { prisma } from "@/lib/db";

export const getPage = cache(async (slug: string) => {
  try {
    return await prisma.page.findUnique({
      where: { slug },
      include: { sections: { orderBy: { order: "asc" } } },
    });
  } catch {
    return null;
  }
});

export const getPublishedNews = cache(async () => {
  try {
    return await prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    return [];
  }
});

export const getNewsBySlug = cache(async (slug: string) => {
  try {
    return await prisma.news.findFirst({ where: { slug, status: "PUBLISHED" } });
  } catch {
    return null;
  }
});

export type PageWithSections = NonNullable<
  Awaited<ReturnType<typeof getPage>>
>;
export type PageSection = PageWithSections["sections"][number];