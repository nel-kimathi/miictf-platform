import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-bold">MIICCOF</p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Meru International Investment Conference &amp; Consumer Fair —
            connecting investors, government and business to opportunities in
            Meru.
          </p>
        </div>
        <div>
          <p className="font-heading font-semibold">Quick Links</p>
          <ul className="mt-2 space-y-1 text-sm text-primary-foreground/80">
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/conference-programme" className="hover:underline">Programme</Link></li>
            <li><Link href="/trade-fair" className="hover:underline">Consumer Fair</Link></li>
            <li><Link href="/register" className="hover:underline">Register</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold">Get In Touch</p>
          <ul className="mt-2 space-y-1 text-sm text-primary-foreground/80">
            <li>secretariat@example.com</li>
            <li>Meru, Kenya</li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold">Stay In The Loop</p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Join our mailing list to stay up to date with the latest news and updates.
          </p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-4 text-center text-xs text-primary-foreground/70">
        © {new Date().getFullYear()} MIICCOF. All rights reserved.
      </div>
    </footer>
  );
}