import Link from "next/link";
import type { PageSection } from "@/lib/content";
import { Button } from "@/components/ui/button";
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
  return (
    <section className="bg-primary px-4 py-20 text-center text-primary-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {section.title}
        </h1>
        {section.subtitle ? (
          <p className="mt-3 text-lg text-accent">{section.subtitle}</p>
        ) : null}
        {section.body ? (
          <p className="mt-4 text-primary-foreground/85">{section.body}</p>
        ) : null}
        <div className="mt-6 flex justify-center [&_a]:bg-accent [&_a]:text-accent-foreground">
          <CtaLinks cta={m.cta} />
        </div>
      </div>
    </section>
  );
}

function RichSection({ section }: { section: PageSection }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      {section.title ? (
        <h2 className="font-heading text-2xl font-bold text-primary">{section.title}</h2>
      ) : null}
      {section.body ? (
        <p className="mt-3 whitespace-pre-line leading-relaxed text-muted-foreground">
          {section.body}
        </p>
      ) : null}
    </section>
  );
}

function CardGrid({ section }: { section: PageSection }) {
  const m = meta(section);
  const cards: { title: string; role?: string; description?: string }[] =
    m.cards ?? [];
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {section.title ? (
        <h2 className="font-heading text-center font-heading text-2xl font-bold text-primary">
          {section.title}
        </h2>
      ) : null}
      {section.subtitle ? (
        <p className="mt-2 text-center text-muted-foreground">
          {section.subtitle}
        </p>
      ) : null}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}

function TierCards({ section }: { section: PageSection }) {
  const m = meta(section);
  const tiers: { name: string; description?: string }[] = m.tiers ?? [];
  return (
    <section className="bg-secondary/60 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {section.title ? (
          <h2 className="font-heading text-center font-heading text-2xl font-bold text-primary">
            {section.title}
          </h2>
        ) : null}
        {section.subtitle ? (
          <p className="mt-2 text-center text-muted-foreground">
            {section.subtitle}
          </p>
        ) : null}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="flex justify-center">
          <CtaLinks cta={m.cta ? [m.cta] : undefined} />
        </div>
      </div>
    </section>
  );
}

function EventList({ section }: { section: PageSection }) {
  const m = meta(section);
  const events: { title: string; time?: string; description?: string }[] =
    m.events ?? [];
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      {section.title ? (
        <h2 className="font-heading text-center font-heading text-2xl font-bold text-primary">
          {section.title}
        </h2>
      ) : null}
      {section.subtitle ? (
        <p className="mt-2 text-center text-muted-foreground">
          {section.subtitle}
        </p>
      ) : null}
      {section.body ? (
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {section.body}
        </p>
      ) : null}
      <div className="mt-8 space-y-4">
        {events.map((event, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-baseline justify-between gap-4">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              {event.time ? (
                <span className="shrink-0 text-sm font-medium text-accent-foreground/80">
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
      <div className="flex justify-center">
        <CtaLinks cta={m.cta ? [m.cta] : undefined} />
      </div>
    </section>
  );
}

function FaqList({ section }: { section: PageSection }) {
  const m = meta(section);
  const items: { question: string; answer: string }[] = m.items ?? [];
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      {section.title ? (
        <h2 className="font-heading text-center font-heading text-2xl font-bold text-primary">
          {section.title}
        </h2>
      ) : null}
      <Accordion className="mt-8">
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
    <section className="bg-accent/40 px-4 py-12 text-center">
      <div className="mx-auto max-w-2xl">
        {section.title ? (
          <h2 className="font-heading text-2xl font-bold text-primary">{section.title}</h2>
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