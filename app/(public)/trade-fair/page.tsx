import type { Metadata } from "next";
import { CmsPage } from "@/components/public/cms-page";

export const metadata: Metadata = { title: "Trade Fair" };

export default function TradeFairPage() {
  return <CmsPage slug="trade-fair" />;
}