import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Consumer Fair" };

export default function TradeFairPage() {
  return <CmsPage slug="trade-fair" />;
}