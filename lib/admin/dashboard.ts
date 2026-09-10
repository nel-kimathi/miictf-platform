import { cache } from "react";
import { prisma } from "@/lib/db";

export type DashboardStats = {
  totalDelegates: number;
  totalSponsors: number;
  totalExhibitors: number;
  pendingRegistrations: number;
  approvedRegistrations: number;
  rejectedRegistrations: number;
  totalNews: number;
  publishedNews: number;
  latestRegistrations: {
    id: string;
    name: string;
    email: string;
    role: string;
    registrationStatus: string;
    createdAt: Date;
  }[];
  recentNews: {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
  }[];
};

export const getDashboardStats = cache(async (): Promise<DashboardStats> => {
  const [
    totalDelegates,
    totalSponsors,
    totalExhibitors,
    pendingRegistrations,
    approvedRegistrations,
    rejectedRegistrations,
    totalNews,
    publishedNews,
    latestRegistrations,
    recentNews,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "DELEGATE" } }),
    prisma.user.count({ where: { role: "SPONSOR" } }),
    prisma.user.count({ where: { role: "EXHIBITOR" } }),
    prisma.user.count({ where: { registrationStatus: "PENDING" } }),
    prisma.user.count({ where: { registrationStatus: "APPROVED" } }),
    prisma.user.count({ where: { registrationStatus: "REJECTED" } }),
    prisma.news.count(),
    prisma.news.count({ where: { status: "PUBLISHED" } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        registrationStatus: true,
        createdAt: true,
      },
    }),
    prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalDelegates,
    totalSponsors,
    totalExhibitors,
    pendingRegistrations,
    approvedRegistrations,
    rejectedRegistrations,
    totalNews,
    publishedNews,
    latestRegistrations,
    recentNews,
  };
});
