import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const metadata: Metadata = { title: "Investment Opportunities" };

export default function InvestmentOpportunitiesPage() {
  return <CmsPage slug="investment-opportunities" />;
}