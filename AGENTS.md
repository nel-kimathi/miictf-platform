# AGENTS.md — MIICTF Digital Platform

> This file is the permanent project brief. Read this AND `BUILD_PLAN.md` AND `PROGRESS.md`
> in full before doing any work, every single session. You have no memory between sessions —
> these three files ARE your memory. Never skip reading them.

## What this project is

An event management / conference platform for the **Meru International Investment
Conference & Trade Fair (MIICTF)**. It has a public marketing website plus a role-based
back office. It is designed to be reused for future events (e.g. a later "Meru Women
Business Summit") without rebuilding the core system — so avoid hardcoding anything
that is specific to the 2026 MIICTF event where a general solution is realistic.

## Tech stack (do not deviate without asking)

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **ORM / DB:** Prisma ORM → **MySQL** (chosen specifically so the whole stack — app,
  database, email, domain, SSL — runs on a single Hostinger Business Node.js hosting
  plan, with nothing split out to an external DB provider)
- **Auth:** Better Auth (fallback: Auth.js/NextAuth if Better Auth hits a blocker)
- **Email:** Hostinger SMTP (for verification emails, notifications)
- **Hosting:** Hostinger Business Hosting (Node.js)
- **Version control:** GitHub — repo is `github.com/nel-kimathi/miictf-platform` (private)

## Roles & permissions

| Role | Access |
|---|---|
| Super Administrator | Full system access, including system-level settings |
| Administrator | Full CRUD access across the system |
| Delegate | Own profile only |
| Sponsor | Sponsor information only |
| Exhibitor | Exhibitor information + own booth allocation only |

Enforce this with proper Role-Based Access Control (RBAC) at the API/middleware layer,
never just hidden UI — every route/action must check role server-side.

## Public website pages

Home, About MIICTF, Investment Opportunities, Trade Fair, Conference Programme,
Sponsors and Partners, News & Updates, FAQ, Contact, Register, Login.

**Critical constraint: no hardcoded content.** Every page's text/images must be editable
from the Administration Portal (CMS-style content model in the DB), because non-technical
staff will maintain this after handover.

**Visual reference:** the landing page Figma export supplied earlier is the style
reference for the public site — hero banner, leadership cards, investment opportunity
grid, sponsorship tier cards, scheduled events section, footer with newsletter signup.
Match its structure and tone; you don't need pixel-perfect cloning.

## Registration & auth

Fields: Full Name, Email, Phone, Organization, Country, Category, Password.
- Email verification required before login
- Passwords hashed (never stored plain/reversible)
- One unique account per user
- After login → redirect to dashboard based on assigned role

## Admin Portal modules

Dashboard, User Management, Delegate Management, Sponsor Management, Exhibitor
Management, Booth Management, News Management, Reports, Settings, System Logs.
Full CRUD throughout for Administrators/Super Administrators.

**Dashboard** shows: Total Delegates, Total Sponsors, Total Exhibitors, Available
Booths, Allocated Booths, Pending Registrations, Approved Registrations, Latest
Registrations, Recent Announcements — with charts + summary cards.

**Delegate module:** approve/reject/edit/search/export. Delegates can view/update
their own profile, receive announcements, download conference info.

**Sponsor module:** category, company info, brand assets, status, contact persons,
website links.

**Exhibitor module:** company profile, industry, products, contact info, booth
allocation, registration status.

**Booth management:** Exhibition Halls → Booth Numbers → Booth Sizes → Booth
Categories, each booth has status (Available / Reserved / Allocated / Occupied).
Design the data model so a visual booth map can be added later without a schema
rewrite (store hall/booth as structured records, not free text).

**News management:** create/edit/delete, scheduled publishing, cover images,
categories. Public site must reflect changes automatically on publish (no manual
rebuild step visible to the admin).

**Reports:** delegates, sponsors, exhibitors, booth allocation, countries
represented, registration statistics — each exportable to PDF, Excel, and CSV.

## Security requirements (non-negotiable)

HTTPS everywhere, password hashing (bcrypt/argon2 via Better Auth), RBAC enforced
server-side, input validation on every form, CSRF protection, SQL injection
prevention (Prisma parameterizes this by default — don't bypass with raw SQL unless
necessary), secure session management, audit logs for admin actions.

## Working conventions for OpenCode

1. At the start of every session: read this file, `BUILD_PLAN.md`, and `PROGRESS.md`.
2. Work only on the next unchecked item(s) in `BUILD_PLAN.md` unless told otherwise.
3. Commit to git after every meaningful chunk of work, with a clear message.
4. At the end of every session, update `PROGRESS.md`: what was done, any decisions
   made or deviations from this spec, and what the next session should pick up.
5. Never invent scope beyond what's in this file and `BUILD_PLAN.md` — flag questions
   instead of guessing on anything ambiguous (e.g. exact report layouts, category lists).
6. Keep environment secrets in `.env` (never commit) — document required variable
   names in `.env.example`.
