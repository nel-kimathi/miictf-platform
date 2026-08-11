import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const metadata: Metadata = { title: "About MAIICTF" };

export default function AboutPage() {
  return <CmsPage slug="about" />;
}