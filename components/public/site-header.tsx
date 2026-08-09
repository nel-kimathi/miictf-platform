import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Investment Opportunities", href: "/investment-opportunities" },
  { label: "Trade Fair", href: "/trade-fair" },
  { label: "Programme", href: "/conference-programme" },
  { label: "Sponsors & Partners", href: "/sponsors-partners" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-primary">
          MIICTF
        </Link>
        <nav className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" render={<Link href="/login" />}>
            Login
          </Button>
          <Button size="sm" render={<Link href="/register" />}>
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}