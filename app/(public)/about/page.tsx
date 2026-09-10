import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "About MIICCOF" };

export default function AboutPage() {
  return <CmsPage slug="about" />;
}