"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "./img-with-fallback";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const reveal = scrolled
    ? "translate-y-0 opacity-100"
    : "pointer-events-none -translate-y-2 opacity-0";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-primary/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-2xl bg-white px-3 py-2 shadow-sm"
        >
          <ImgWithFallback
            src="/images/logos/miictf-logo.png"
            alt="MIICTF logo"
            className="h-10 w-auto"
            fallback={
              <span className="font-heading text-xl font-bold tracking-tight text-primary">
                MIICTF
              </span>
            }
          />
        </Link>
        <nav
          className={`flex flex-1 flex-wrap items-center gap-x-1 gap-y-1 transition-all duration-300 ${reveal}`}
        >
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[20px] px-3 py-1.5 text-base font-bold tracking-wide transition-colors ${
                  isActive
                    ? "bg-white text-primary"
                    : "text-white hover:bg-white hover:text-primary active:bg-white active:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${reveal}`}
        >
          <Button
            variant="ghost"
            size="sm"
            className="rounded-[20px] px-4 text-base font-bold tracking-wide text-white hover:bg-white hover:text-primary"
            render={<Link href="/login" />}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="rounded-[20px] px-4 text-base font-bold tracking-wide"
            render={<Link href="/register" />}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
