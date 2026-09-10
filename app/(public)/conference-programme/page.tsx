import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Conference Programme" };

export default function ConferenceProgrammePage() {
  return <CmsPage slug="conference-programme" />;
}