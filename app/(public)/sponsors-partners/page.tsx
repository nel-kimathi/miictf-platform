import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const metadata: Metadata = { title: "Sponsors & Partners" };

export default function SponsorsPartnersPage() {
  return <CmsPage slug="sponsors-partners" />;
}