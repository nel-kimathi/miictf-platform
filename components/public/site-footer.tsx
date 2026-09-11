import Link from "next/link";
import Image from "next/image";
import { getPublicSettings } from "@/app/admin/settings/actions";
import { NewsletterForm } from "./newsletter-form";

export async function SiteFooter() {
  const settings = await getPublicSettings();

  return (
    <footer className="mt-16 border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow ring-1 ring-black/5 sm:h-16 sm:w-16 sm:p-2">
            <Image
              src="/images/logos/logo-no-bg.png"
              alt={`${settings.siteName} logo`}
              width={120}
              height={120}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-3 text-sm text-primary-foreground/80">
            {settings.siteTagline}
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
            <li>{settings.contactEmail || "—"}</li>
            <li>{settings.eventLocation || "—"}</li>
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
        © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
      </div>
    </footer>
  );
}