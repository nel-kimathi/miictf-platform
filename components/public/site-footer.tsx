import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">MIICTF</p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Meru International Investment Conference &amp; Trade Fair —
            connecting investors, government and business.
          </p>
        </div>
        <div>
          <p className="font-heading font-semibold">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm text-primary-foreground/80">
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/conference-programme" className="hover:underline">Programme</Link></li>
            <li><Link href="/trade-fair" className="hover:underline">Trade Fair</Link></li>
            <li><Link href="/register" className="hover:underline">Register</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold">Newsletter</p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Get conference updates in your inbox.
          </p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-4 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} MIICTF. All rights reserved.
      </div>
    </footer>
  );
}