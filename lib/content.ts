import { cache } from "react";
import { prisma } from "@/lib/db";

export const getPage = cache((slug: string) =>
  prisma.page.findUnique({
    where: { slug },
    include: { sections: { orderBy: { order: "asc" } } },
  })
);

export const getPublishedNews = cache(() =>
  prisma.news.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  })
);

export const getNewsBySlug = cache((slug: string) =>
  prisma.news.findFirst({ where: { slug, status: "PUBLISHED" } })
);

export type PageWithSections = NonNullable<
  Awaited<ReturnType<typeof getPage>>
>;
export type PageSection = PageWithSections["sections"][number];