import Link from "next/link";
import type { PageSection } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ImgWithFallback } from "@/components/public/img-with-fallback";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* eslint-disable @typescript-eslint/no-explicit-any */
function meta(section: PageSection): Record<string, any> {
  return (section.metadata as Record<string, any>) ?? {};
}

function CtaLinks({ cta }: { cta?: { label: string; href: string }[] }) {
  if (!cta?.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {cta.map((c) => (
        <Button key={c.href + c.label} render={<Link href={c.href} />}>
          {c.label}
        </Button>
      ))}
    </div>
  );
}

function Hero({ section }: { section: PageSection }) {
  const m = meta(section);
  const hasImage = !!section.imageUrl;
  return (
    <section
      className={`relative px-4 py-24 text-center text-primary-foreground sm:py-32 ${
        hasImage ? "bg-cover bg-center" : "bg-primary"
      }`}
      style={hasImage ? { backgroundImage: `url(${section.imageUrl})` } : undefined}
    >
      {hasImage && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative mx-auto max-w-3xl">
        {m.badge ? (
          <span className="mb-4 inline-block rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            {m.badge}
          </span>
        ) : null}
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {section.title}
        </h1>
        {section.subtitle ? (
          <p className="mt-4 text-lg text-accent sm:text-xl">{section.subtitle}</p>
        ) : null}
        {section.body ? (
          <p className="mt-4 text-primary-foreground/85">{section.body}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {m.cta?.map((c: { label: string; href: string }, i: number) => (
            <Button
              key={c.href + c.label}
              variant={i === 0 ? "default" : "outline"}
              className={
                i === 0
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : "border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              }
              render={<Link href={c.href} />}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}

function RichSection({ section }: { section: PageSection }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {section.title ? (
        <h2 className="font-heading text-2xl font-bold text-primary">{section.title}</h2>
      ) : null}
      {section.body ? (
        <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
          {section.body}
        </p>
      ) : null}
    </section>
  );
}

function MeruCounty({ section }: { section: PageSection }) {
  const m = meta(section);
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <div>
          {section.title ? (
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              {section.title}
            </h2>
          ) : null}
          {section.body ? (
            <div className="mt-6 space-y-4 whitespace-pre-line leading-relaxed text-muted-foreground">
              {section.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : null}
          <div className="mt-6">
            <CtaLinks cta={m.cta} />
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {section.imageUrl ? (
            <ImgWithFallback
              src={section.imageUrl}
              alt={section.title ?? "Meru County"}
              className="w-full rounded-xl object-cover shadow-lg"
              fallback={
                <div className="flex h-72 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/50 text-muted-foreground">
                  Image placeholder
                </div>
              }
            />
          ) : (
            <div className="flex h-72 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/50 text-muted-foreground">
              Image placeholder
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CardGrid({ section }: { section: PageSection }) {
  const m = meta(section);
  const cards: {
    title: string;
    role?: string;
    description?: string;
    image?: string;
    imageBg?: string;
  }[] = m.cards ?? [];
  const variant = m.variant as string | undefined;

  if (variant === "leadership") {
    return (
      <section className="bg-secondary/60 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          {section.title ? (
            <h2 className="font-heading text-center text-3xl font-bold text-primary sm:text-4xl">
              {section.title}
            </h2>
          ) : null}
          {section.subtitle ? (
            <p className="mt-2 text-center text-muted-foreground">
              {section.subtitle}
            </p>
          ) : null}
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl bg-primary p-6 text-center text-primary-foreground"
              >
                {card.image ? (
                  <ImgWithFallback
                    src={card.image}
                    alt={card.title}
                    className={`mb-4 h-40 w-40 rounded-full object-cover object-top ring-4 sm:h-44 sm:w-44 ${
                      card.imageBg === "white"
                        ? "bg-white ring-white/70"
                        : "ring-primary-foreground/20"
                    }`}
                    fallback={
                      <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-primary-foreground/20 text-4xl font-bold text-primary-foreground sm:h-44 sm:w-44">
                        {card.title.charAt(0)}
                      </div>
                    }
                  />
                ) : (
                  <div className="mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-primary-foreground/20 text-4xl font-bold text-primary-foreground sm:h-44 sm:w-44">
                    {card.title.charAt(0)}
                  </div>
                )}
                <h3 className="font-heading text-lg font-semibold">{card.title}</h3>
                {card.role ? (
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    {card.role}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <CtaLinks cta={m.cta ? [m.cta] : undefined} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {section.title ? (
          <h2 className="font-heading text-center text-3xl font-bold text-primary sm:text-4xl">
            {section.title}
          </h2>
        ) : null}
        {section.subtitle ? (
          <p className="mt-2 text-center text-muted-foreground">
            {section.subtitle}
          </p>
        ) : null}
        <div
          className={`mt-10 grid gap-6 sm:grid-cols-2 ${
            cards.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {cards.map((card, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                {card.role ? (
                  <CardDescription>{card.role}</CardDescription>
                ) : null}
              </CardHeader>
              {card.description ? (
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <CtaLinks cta={m.cta ? [m.cta] : undefined} />
        </div>
      </div>
    </section>
  );
}

function TierCards({ section }: { section: PageSection }) {
  const m = meta(section);
  const tiers: { name: string; description?: string }[] = m.tiers ?? [];
  const brands: { name: string }[] = m.brands ?? [];
  return (
    <section className="bg-secondary/60 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {section.title ? (
          <h2 className="font-heading text-center text-3xl font-bold text-primary sm:text-4xl">
            {section.title}
          </h2>
        ) : null}
        {section.subtitle ? (
          <p className="mt-2 text-center text-muted-foreground">
            {section.subtitle}
          </p>
        ) : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <Card key={i} className="border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
              </CardHeader>
              {tier.description ? (
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
        {brands.length > 0 ? (
          <div className="mt-16 text-center">
            <p className="font-heading text-2xl font-bold text-primary">
              Join these brands
            </p>
            <p className="mt-2 text-muted-foreground">
              We&apos;ve had the pleasure of working with some outstanding past sponsors.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {brands.map((b, i) => (
                <span key={i} className="text-lg font-semibold text-muted-foreground/70">
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-10 flex justify-center">
          <CtaLinks cta={m.cta ? [m.cta] : undefined} />
        </div>
      </div>
    </section>
  );
}

function EventList({ section }: { section: PageSection }) {
  const m = meta(section);
  const events: {
    title: string;
    time?: string;
    description?: string;
    image?: string;
  }[] = m.events ?? [];

  const year = 2026;
  const month = 10; // November (0-indexed)
  const monthName = new Date(year, month).toLocaleString("en-US", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventDays = [25, 26, 27, 28];

  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {section.title ? (
          <h2 className="font-heading text-center text-3xl font-bold text-primary sm:text-4xl">
            {section.title}
          </h2>
        ) : null}
        {section.subtitle ? (
          <p className="mt-2 text-center text-muted-foreground">
            {section.subtitle}
          </p>
        ) : null}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Event cards */}
          <div className="space-y-4">
            {events.map((event, i) => (
              <Card key={i} className="overflow-hidden">
                {event.image ? (
                  <ImgWithFallback
                    src={event.image}
                    alt={event.title}
                    className="h-40 w-full object-cover"
                    fallback={null}
                  />
                ) : null}
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {event.time ? (
                    <span className="text-sm font-medium text-accent-foreground/80">
                      {event.time}
                    </span>
                  ) : null}
                </CardHeader>
                {event.description ? (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </CardContent>
                ) : null}
              </Card>
            ))}
          </div>
          {/* Calendar */}
          <div className="flex justify-center self-start lg:sticky lg:top-24">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-lg">
                    {monthName} {year}
                  </CardTitle>
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
                  {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                    <span key={d} className="py-1">{d}</span>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {blanks.map((b) => (
                    <span key={`b${b}`} />
                  ))}
                  {days.map((d) => (
                    <span
                      key={d}
                      className={`flex h-9 w-full items-center justify-center rounded-full ${
                        eventDays.includes(d)
                          ? "bg-primary font-semibold text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <CtaLinks cta={m.cta ? [m.cta] : undefined} />
        </div>
      </div>
    </section>
  );
}

function FaqList({ section }: { section: PageSection }) {
  const m = meta(section);
  const items: { question: string; answer: string }[] = m.items ?? [];
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {section.title ? (
        <h2 className="font-heading text-center text-3xl font-bold text-primary sm:text-4xl">
          {section.title}
        </h2>
      ) : null}
      <Accordion className="mt-10">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function CtaBand({ section }: { section: PageSection }) {
  const m = meta(section);
  return (
    <section className="bg-accent/40 px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        {section.title ? (
          <h2 className="font-heading text-3xl font-bold text-primary">{section.title}</h2>
        ) : null}
        {section.body ? (
          <p className="mt-2 text-muted-foreground">{section.body}</p>
        ) : null}
        <div className="flex justify-center">
          <CtaLinks cta={m.cta} />
        </div>
      </div>
    </section>
  );
}

function ContactDetails({ section }: { section: PageSection }) {
  const m = meta(section);
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{section.title ?? "Contact Details"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        {m.email ? (
          <p>
            Email:{" "}
            <a className="text-primary hover:underline" href={`mailto:${m.email}`}>
              {m.email}
            </a>
          </p>
        ) : null}
        {m.phone ? <p>Phone: {m.phone}</p> : null}
        {m.location ? <p>Location: {m.location}</p> : null}
      </CardContent>
    </Card>
  );
}

const RENDERERS: Record<
  string,
  (props: { section: PageSection }) => React.ReactNode
> = {
  hero: Hero,
  intro: RichSection,
  body: RichSection,
  "meru-county": MeruCounty,
  leadership: CardGrid,
  mission: CardGrid,
  "opportunities-teaser": CardGrid,
  sectors: CardGrid,
  info: CardGrid,
  "sponsorship-teaser": TierCards,
  tiers: TierCards,
  "events-preview": EventList,
  schedule: EventList,
  items: FaqList,
  cta: CtaBand,
  details: ContactDetails,
};

export function SectionRenderer({ section }: { section: PageSection }) {
  const Renderer = RENDERERS[section.key] ?? RichSection;
  return <Renderer section={section} />;
}