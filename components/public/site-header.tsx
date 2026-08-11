"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "./img-with-fallback";

const NAV_BEFORE = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

const TRADE_CHILDREN = [
  { label: "Investment Opportunities", href: "/investment-opportunities" },
  { label: "Trade Fair", href: "/trade-fair" },
];

const NAV_AFTER = [
  { label: "Programme", href: "/conference-programme" },
  { label: "Sponsors & Partners", href: "/sponsors-partners" },
  { label: "News", href: "/news" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-[20px] px-3 py-1.5 text-sm font-bold tracking-wide transition-colors ${
        isActive
          ? "bg-white text-primary"
          : "text-white hover:bg-white hover:text-primary active:bg-white active:text-primary"
      }`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setTradeOpen(false), [pathname]);

  const solid = scrolled || pathname !== "/";
  const tradeActive = TRADE_CHILDREN.some((c) => c.href === pathname);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        solid ? "bg-primary/95 shadow-md backdrop-blur" : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 ${
          solid ? "px-6 py-2" : "px-6 py-3"
        }`}
      >
        {/* Logo — shrinks on scroll */}
        <Link
          href="/"
          className="inline-flex shrink-0 items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-all duration-300"
        >
          <ImgWithFallback
            src="/images/logos/miictf-logo.png"
            alt="MIICTF logo"
            className={`w-auto transition-all duration-300 ${
              solid ? "h-10 px-3 py-2 sm:h-12" : "h-14 px-4 py-2 sm:h-16"
            }`}
            fallback={
              <span
                className={`font-heading font-bold tracking-tight text-primary transition-all duration-300 ${
                  solid ? "text-lg px-3 py-2" : "text-2xl px-4 py-2"
                }`}
              >
                MIICTF
              </span>
            }
          />
        </Link>

        {/* Nav — fills the middle, items spread evenly */}
        <nav className="flex flex-1 items-center justify-center gap-x-4 px-4">
          {NAV_BEFORE.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}

          {/* Trade & Investment dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTradeOpen(true)}
            onMouseLeave={() => setTradeOpen(false)}
          >
            <button
              type="button"
              onClick={() => setTradeOpen((o) => !o)}
              aria-expanded={tradeOpen}
              className={`flex items-center gap-1 whitespace-nowrap rounded-[20px] px-3 py-1.5 text-sm font-bold tracking-wide transition-colors ${
                tradeActive
                  ? "bg-white text-primary"
                  : "text-white hover:bg-white hover:text-primary"
              }`}
            >
              Trade &amp; Investment
              <ChevronDown
                className={`h-4 w-4 transition-transform ${tradeOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${
                tradeOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
            >
              <div className="min-w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
                {TRADE_CHILDREN.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block rounded-lg px-4 py-2 text-sm font-bold tracking-wide transition-colors ${
                      pathname === child.href
                        ? "bg-secondary text-primary"
                        : "text-foreground hover:bg-secondary hover:text-primary"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_AFTER.map((item) => (
            <NavLink key={item.href} {...item} pathname={pathname} />
          ))}
        </nav>

        {/* Auth — pinned right */}
        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-[20px] border-white px-4 py-1.5 text-sm font-bold tracking-wide text-white hover:bg-white hover:text-primary"
            render={<Link href="/login" />}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="whitespace-nowrap rounded-[20px] px-4 py-1.5 text-sm font-bold tracking-wide"
            render={<Link href="/register" />}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
