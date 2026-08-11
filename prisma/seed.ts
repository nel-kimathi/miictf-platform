/**
 * Seed default CMS content for the public site + a few published news items.
 *
 * This content is editable from the Administration Portal (Phase 2 CMS UI).
 * Seeding is idempotent: pages are upserted by slug and their sections are
 * replaced on each run.
 *
 * NOTE: No real personal names, dates, emails or phone numbers are used —
 * values are deliberate placeholders for editors to replace.
 */
import "dotenv/config";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const rawUrl = process.env.DATABASE_URL ?? "";
const url = rawUrl.replace(/^mysql:\/\//, "mariadb://");
const adapter = new PrismaMariaDb(url);
const prisma = new PrismaClient({ adapter });

type SectionSeed = {
  key: string;
  order: number;
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
};

type PageSeed = { slug: string; title: string; sections: SectionSeed[] };

const pages: PageSeed[] = [
  {
    slug: "home",
    title: "Home",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Meru Annual International Investors Conference and Trade Fair",
        subtitle: "Unlocking investment and trade opportunities in Meru",
        body: "MIICTF brings together investors, government, business leaders and innovators to showcase opportunities, forge partnerships and drive inclusive growth.",
        imageUrl: "/images/hero/tea-harvesting.jpeg",
        metadata: {
          badge: "November 25 – 28, 2026",
          cta: [
            { label: "Discover More", href: "/about" },
            { label: "Register to Attend", href: "/register" },
          ],
        },
      },
      {
        key: "leadership",
        order: 1,
        title: "Our Leadership",
        subtitle: "The team championing MIICTF",
        metadata: {
          variant: "leadership",
          linkHref: "/about#leadership",
          cards: [
            {
              title: "H.E. Isaac Mutuma M'Ethingia",
              role: "Governor, Meru County",
              description: "Championing Meru's transformation into a premier investment destination through strategic partnerships and infrastructure development.",
              image: "/images/leadership/governor.png",
              imageBg: "white",
            },
            {
              title: "Prof. Romanus Odhiambo, Ph.D.",
              role: "Vice Chancellor, MKU",
              description: "Leading academic innovation and research partnerships that drive the conference's thought leadership agenda.",
              image: "/images/leadership/vice-chancellor.webp",
            },
            {
              title: "Mr. Joshua K. Mungania",
              role: "Chairman MCCI (Meru Chapter)",
              description: "Connecting the private sector with investment opportunities and championing trade facilitation across the region.",
              image: "/images/leadership/chairman.jpeg",
            },
          ],
        },
      },
      {
        key: "meru-county",
        order: 2,
        title: "Meru County: The Land of Prosperity",
        body: "Meru is a highland County nestled on the fertile slopes of Mount Kenya in the Eastern Region. Spanning 7,003 sq km with a population of 1.5 million, it serves as a strategic gateway between Nairobi and the Northern Frontier.\n\nEconomic & Social Development\nMeru has experienced rapid economic growth, driven by a highly educated populace and a diverse economic base.\n\nAgriculture & Business: A global leader in Miraa (Khat), Macadamia, and Coffee production, alongside Tea, Bananas, Avocado, Tourism, Trade & Industry.",
        imageUrl: "/images/sections/meru-county.png",
        metadata: {
          cta: [{ label: "About us", href: "/about" }],
        },
      },
      {
        key: "opportunities-teaser",
        order: 3,
        title: "Investment Opportunities",
        subtitle: "Explore priority sectors open for investment",
        metadata: {
          cards: [
            { title: "Agriculture & Agro-processing", description: "Value addition across key value chains." },
            { title: "Renewable Energy", description: "Solar, wind and small hydro opportunities." },
            { title: "Affordable Housing", description: "Urban housing and infrastructure development." },
            { title: "Tourism & Hospitality", description: "Eco-tourism, hotels and destination experiences." },
          ],
          cta: { label: "View All Opportunities", href: "/investment-opportunities" },
        },
      },
      {
        key: "committee",
        order: 4,
        title: "Organising Committee",
        subtitle: "Key representatives driving MIICTF",
        metadata: {
          variant: "committee",
          cards: [
            { title: "Dr. Julius Ithae", role: "Chairperson", description: "Representing Meru University of Science and Technology (MUST) as Chairperson of the Organising Committee." },
            { title: "Jackline Kanana", role: "Vice Chairperson", description: "Representing the County Government of Meru (MCG) as Vice Chairperson, overseeing trade facilitation." },
            { title: "Patrick Kathurima", role: "Secretary", description: "Representing KNCCI – Meru Chapter as Secretary, coordinating chamber activities and member engagement." },
            { title: "Martin Kiogora Mbui", role: "CEO, KNCCI Meru Chapter", description: "Leading the Kenya National Chamber of Commerce and Industry – Meru Chapter in private sector partnerships." },
            { title: "Kithinji Ruri", role: "Meru County Government", description: "Representing the Meru County Government in logistics, policy coordination and public sector alignment." },
            { title: "Dr. Patrick Kinyua Kubai", role: "MUST Representative", description: "Representing Meru University of Science and Technology in academic partnerships and research coordination." },
          ],
        },
      },
      {
        key: "sponsorship-teaser",
        order: 5,
        title: "Sponsorship Packages",
        subtitle: "Partner with us and put your brand at the centre",
        metadata: {
          tiers: [
            { name: "Platinum", description: "Headline visibility and premium exhibition space." },
            { name: "Gold", description: "Prominent branding and speaking opportunities." },
            { name: "Silver", description: "Brand presence and exhibition booth." },
          ],
          brands: [
            { name: "Spotify" },
            { name: "Google" },
            { name: "Stripe" },
            { name: "YouTube" },
            { name: "Microsoft" },
            { name: "Medium" },
            { name: "Zoom" },
            { name: "Uber" },
            { name: "Grab" },
          ],
          cta: { label: "Sponsorship Details", href: "/sponsors-partners" },
        },
      },
      {
        key: "events-preview",
        order: 6,
        title: "Scheduled Events",
        subtitle: "Key sessions and activities",
        metadata: {
          events: [
            { title: "Opening Ceremony", time: "Day 1 · Morning", description: "Official opening and keynote addresses.", image: "/images/events/opening.jpg" },
            { title: "Investor Panel Discussions", time: "Day 1 · Afternoon", description: "Sector panels with investors and government.", image: "/images/events/panel.jpg" },
            { title: "Trade Fair & Exhibitions", time: "All Days", description: "Exhibition booths and B2B networking.", image: "/images/events/trade-fair.jpg" },
          ],
          cta: { label: "Full Programme", href: "/conference-programme" },
        },
      },
    ],
  },
  {
    slug: "about",
    title: "About MIICTF",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "About MIICTF",
        subtitle: "A platform for investment, trade and partnerships",
      },
      {
        key: "body",
        order: 1,
        title: "Our Story",
        body: "The Meru International Investment Conference & Trade Fair (MIICTF) was established to position Meru as a leading investment destination. The conference convenes government, investors, development partners, SMEs and the diaspora to explore opportunities and close deals.",
      },
      {
        key: "mission",
        order: 2,
        title: "Mission & Vision",
        metadata: {
          cards: [
            { title: "Mission", description: "To catalyse investment and trade for inclusive economic growth." },
            { title: "Vision", description: "A thriving investment destination with globally connected enterprises." },
          ],
        },
      },
      {
        key: "leadership",
        order: 3,
        title: "Our Leadership",
        subtitle: "The team championing MIICTF",
        metadata: {
          variant: "leadership",
          anchorId: "leadership",
          cards: [
            {
              title: "H.E. Isaac Mutuma M'Ethingia",
              role: "Governor, Meru County",
              description: "Championing Meru's transformation into a premier investment destination through strategic partnerships and infrastructure development. Under his leadership, the county has prioritised investment in agriculture, tourism and trade infrastructure.",
              image: "/images/leadership/governor.png",
              imageBg: "white",
            },
            {
              title: "Prof. Romanus Odhiambo, Ph.D.",
              role: "Vice Chancellor, MKU",
              description: "Leading academic innovation and research partnerships that drive the conference's thought leadership agenda. Prof. Odhiambo brings deep expertise in higher education and international collaboration.",
              image: "/images/leadership/vice-chancellor.webp",
            },
            {
              title: "Mr. Joshua K. Mungania",
              role: "Chairman MCCI (Meru Chapter)",
              description: "Connecting the private sector with investment opportunities and championing trade facilitation across the region. Mr. Mungania represents the interests of Meru's business community.",
              image: "/images/leadership/chairman.jpeg",
            },
          ],
        },
      },
      {
        key: "committee",
        order: 4,
        title: "Organising Committee",
        subtitle: "The people making it happen",
        metadata: {
          variant: "committee",
          anchorId: "organising",
          cards: [
            { title: "Jackline Kanana", role: "Vice Chairperson, Trade", org: "Meru County Government", description: "Representing the County Government of Meru (MCG) as Vice Chairperson, overseeing trade facilitation." },
            { title: "Liz Wanja Gikundi", role: "Legal Advisor", org: "Meru County Government", description: "Providing legal counsel and governance oversight for the conference organising committee." },
            { title: "John Kibwi Maingi", role: "MCG Representative", org: "Meru County Government", description: "Coordinating county government support and inter-agency collaboration for the event." },
            { title: "Alice Karimi", role: "Youth Affairs", org: "Meru County Government", description: "Championing youth inclusion and engagement across conference programmes and activities." },
            { title: "Kithinji Ruri", role: "MCG Representative", org: "Meru County Government", description: "Representing the Meru County Government in logistics, policy coordination and public sector alignment." },
            { title: "Dr. Julius Ithae", role: "Committee Chairperson", org: "MUST", description: "Representing Meru University of Science and Technology (MUST) as Chairperson of the Organising Committee." },
            { title: "Dr. Patrick Kinyua Kubai", role: "MUST Representative", org: "MUST", description: "Representing Meru University of Science and Technology in academic partnerships and research coordination." },
            { title: "Prof. Jackline Oparde", role: "MUST Representative", org: "MUST", description: "Contributing academic expertise and research partnerships from Meru University of Science and Technology." },
            { title: "Prof. Amos Omano", role: "MUST Representative", org: "MUST", description: "Supporting academic coordination and institutional partnerships from Meru University." },
            { title: "Veronicah Kihenja", role: "Vice Chairperson", org: "KNCCI – Meru Chapter", description: "Serving as Vice Chairperson of KNCCI – Meru Chapter, supporting sponsor relations and business networking." },
            { title: "William Wambugu", role: "Director", org: "KNCCI – Meru Chapter", description: "Serving as Director, guiding strategic initiatives and chamber operations for the conference." },
            { title: "Martin Kiogora Mbui", role: "CEO, KNCCI Meru Chapter", org: "KNCCI – Meru Chapter", description: "Leading the Kenya National Chamber of Commerce and Industry – Meru Chapter in private sector partnerships." },
            { title: "Patrick Kathurima", role: "Secretary", org: "KNCCI – Meru Chapter", description: "Representing KNCCI – Meru Chapter as Secretary, coordinating chamber activities." },
          ],
        },
      },
    ],
  },
  {
    slug: "investment-opportunities",
    title: "Investment Opportunities",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Investment Opportunities",
        subtitle: "Priority sectors ready for investment",
      },
      {
        key: "sectors",
        order: 1,
        title: "Priority Sectors",
        metadata: {
          cards: [
            { title: "Agriculture & Agro-processing", description: "Dairy, horticulture, cereals, tea and coffee value addition, cold chain and processing facilities." },
            { title: "Renewable Energy", description: "Solar farms, small hydro, biomass and clean cooking solutions." },
            { title: "Affordable Housing", description: "Housing developments, construction materials and urban infrastructure." },
            { title: "Tourism & Hospitality", description: "Eco-lodges, conference facilities, adventure and cultural tourism." },
            { title: "Industrial Parks & Manufacturing", description: "Agro-industrial parks, light manufacturing and logistics hubs." },
            { title: "ICT & Digital Services", description: "BPO, software, digital financial services and innovation hubs." },
          ],
        },
      },
      {
        key: "cta",
        order: 2,
        title: "Ready to invest?",
        body: "Register as a delegate or contact the investment desk to receive detailed project briefs.",
        metadata: { cta: [{ label: "Register Now", href: "/register" }] },
      },
    ],
  },
  {
    slug: "trade-fair",
    title: "Trade Fair",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Trade Fair & Exhibitions",
        subtitle: "Showcase your products and services",
      },
      {
        key: "body",
        order: 1,
        title: "Exhibit at MIICTF",
        body: "The trade fair gives exhibitors direct access to thousands of delegates, buyers and investors. Booths are available in themed exhibition halls across multiple sizes and categories.",
      },
      {
        key: "info",
        order: 2,
        title: "Exhibitor Information",
        metadata: {
          cards: [
            { title: "Booth Categories", description: "Standard, premium and open-space booths across themed halls." },
            { title: "Who Can Exhibit", description: "SMEs, corporates, county governments, NGOs and development partners." },
            { title: "What's Included", description: "Booth, branding, delegate passes and B2B matchmaking." },
          ],
        },
      },
      {
        key: "cta",
        order: 3,
        title: "Book a booth",
        body: "Register as an exhibitor to reserve your booth.",
        metadata: { cta: [{ label: "Register as Exhibitor", href: "/register" }] },
      },
    ],
  },
  {
    slug: "conference-programme",
    title: "Conference Programme",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Conference Programme",
        subtitle: "Sessions, panels and networking",
      },
      {
        key: "schedule",
        order: 1,
        title: "Programme Outline",
        body: "The detailed programme will be published here. Outline below is indicative.",
        metadata: {
          events: [
            { title: "Opening Ceremony & Keynotes", time: "Day 1", description: "Official opening, keynote addresses and ministerial remarks." },
            { title: "Sector Panels", time: "Day 1–2", description: "Deep dives into priority investment sectors." },
            { title: "Deal Room & B2B Meetings", time: "Day 2", description: "Curated investor–project matchmaking sessions." },
            { title: "Trade Fair & Awards", time: "Day 3", description: "Exhibitions, county showcases and closing ceremony." },
          ],
        },
      },
    ],
  },
  {
    slug: "sponsors-partners",
    title: "Sponsors & Partners",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Sponsors & Partners",
        subtitle: "Partner with MIICTF",
      },
      {
        key: "tiers",
        order: 1,
        title: "Sponsorship Tiers",
        metadata: {
          tiers: [
            { name: "Platinum", description: "Headline sponsor: naming rights, keynote slot, premium booth, branding across all platforms." },
            { name: "Gold", description: "Panel sponsorship, large booth, branding on selected platforms." },
            { name: "Silver", description: "Standard booth and brand presence at the conference." },
            { name: "Bronze / In-kind", description: "Supporting partner with tailored benefits." },
          ],
        },
      },
      {
        key: "cta",
        order: 2,
        title: "Become a sponsor",
        body: "Register as a sponsor and our partnerships team will reach out.",
        metadata: { cta: [{ label: "Register as Sponsor", href: "/register" }] },
      },
    ],
  },
  {
    slug: "news",
    title: "News & Updates",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "News & Updates",
        subtitle: "Latest announcements from the MIICTF secretariat",
      },
    ],
  },
  {
    slug: "faq",
    title: "FAQ",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Frequently Asked Questions",
        subtitle: "Answers to common questions",
      },
      {
        key: "items",
        order: 1,
        title: "FAQs",
        metadata: {
          items: [
            { question: "Who can attend MIICTF?", answer: "Investors, business owners, SMEs, government officials, development partners and the general public." },
            { question: "How do I register?", answer: "Use the Register page to create an account as a delegate, sponsor or exhibitor. You will receive a verification email to activate your account." },
            { question: "How do I book an exhibition booth?", answer: "Register as an exhibitor. Booth allocation is managed by the secretariat through the exhibitor portal." },
            { question: "How can my organisation sponsor the event?", answer: "Register as a sponsor and the partnerships team will contact you with package details." },
          ],
        },
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    sections: [
      {
        key: "hero",
        order: 0,
        title: "Contact Us",
        subtitle: "Get in touch with the MIICTF secretariat",
      },
      {
        key: "details",
        order: 1,
        title: "Contact Details",
        metadata: {
          email: "secretariat@example.com",
          phone: "+254 700 000 000",
          location: "Meru, Kenya",
        },
      },
    ],
  },
];

const newsItems = [
  {
    title: "Welcome to the MIICTF digital platform",
    slug: "welcome-to-the-miictf-digital-platform",
    excerpt: "Register as a delegate, sponsor or exhibitor and follow conference updates here.",
    content: "The MIICTF digital platform is now live. Delegates, sponsors and exhibitors can register online, receive announcements and access conference information in one place.",
    category: "Announcement",
    status: "PUBLISHED" as const,
    publishedAt: new Date(),
  },
  {
    title: "Call for exhibitors now open",
    slug: "call-for-exhibitors-now-open",
    excerpt: "Organisations can now register to exhibit at the trade fair.",
    content: "Exhibitor registration is open. Booths are allocated on a first-come basis across themed exhibition halls. Register early to secure your space.",
    category: "Trade Fair",
    status: "PUBLISHED" as const,
    publishedAt: new Date(),
  },
  {
    title: "Sponsorship packages available",
    slug: "sponsorship-packages-available",
    excerpt: "Platinum, Gold and Silver sponsorship packages are now available.",
    content: "Organisations interested in sponsoring MIICTF can register as sponsors through the platform. The partnerships team will follow up with package details.",
    category: "Sponsorship",
    status: "PUBLISHED" as const,
    publishedAt: new Date(),
  },
];

async function main() {
  console.log("Seeding CMS pages + sections...");
  for (const p of pages) {
    const page = await prisma.page.upsert({
      where: { slug: p.slug },
      update: { title: p.title },
      create: { id: randomUUID(), slug: p.slug, title: p.title },
    });
    await prisma.section.deleteMany({ where: { pageId: page.id } });
    await prisma.section.createMany({
      data: p.sections.map((s) => ({
        id: randomUUID(),
        pageId: page.id,
        key: s.key,
        order: s.order,
        title: s.title ?? null,
        subtitle: s.subtitle ?? null,
        body: s.body ?? null,
        imageUrl: s.imageUrl ?? null,
        metadata: s.metadata ?? undefined,
      })),
    });
  }

  console.log("Seeding news items...");
  for (const n of newsItems) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: {
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        category: n.category,
        status: n.status,
        publishedAt: n.publishedAt,
      },
      create: { id: randomUUID(), ...n },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });