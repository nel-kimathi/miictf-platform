import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return <CmsPage slug="faq" />;
}