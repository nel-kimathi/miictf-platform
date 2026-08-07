# BUILD_PLAN.md — MIICTF Digital Platform

Work top to bottom. Check off `[x]` as items complete and commit after each checked group.

## Phase 0 — Scaffolding (do first, one session)

- [ ] Initialize Next.js 15 (App Router, TypeScript, Tailwind) in the repo
- [ ] Add shadcn/ui, set up base theme tokens matching the Figma reference colors
- [ ] Set up Prisma with MySQL provider, `.env.example` with `DATABASE_URL` placeholder
- [ ] Define initial Prisma schema: User (with role enum), Session, VerificationToken
- [ ] Set up Better Auth with email/password + email verification flow (stub SMTP for now)
- [ ] Set up folder structure: `/app/(public)`, `/app/(dashboard)/[role]`, `/app/admin`,
      `/lib`, `/components`, `/prisma`
- [ ] Basic CI: lint + type-check on push (GitHub Actions)
- [ ] Initial commit + push

## Phase 1 — Public Site + Registration

### Public pages (CMS-backed, not hardcoded)
- [ ] Content model: generic `Page` + `Section` tables so admin can edit page content
- [ ] Home (hero, leadership cards, investment teaser, sponsorship teaser, events preview) —
      match Figma structure
- [ ] About MIICTF
- [ ] Investment Opportunities
- [ ] Trade Fair
- [ ] Conference Programme
- [ ] Sponsors and Partners
- [ ] News & Updates (list/detail — reads from News module once it exists in Phase 2)
- [ ] FAQ
- [ ] Contact (with working contact form → email via Hostinger SMTP)

### Registration & auth
- [ ] Register page: Full Name, Email, Phone, Organization, Country, Category, Password
- [ ] Email verification flow (send + confirm)
- [ ] Login page
- [ ] Role-based redirect after login (delegate/sponsor/exhibitor/admin land on
      different dashboards, even if those dashboards are minimal stubs for now)
- [ ] Password hashing confirmed end-to-end, session management working

**Milestone check:** public site browsable, a user can register, verify email, log in,
and land on a role-appropriate (even if bare) dashboard.

## Phase 2 — Admin Portal, Modules, Reports

### Admin core
- [ ] Admin layout + navigation (Dashboard, User Mgmt, Delegate, Sponsor, Exhibitor,
      Booth, News, Reports, Settings, System Logs)
- [ ] Dashboard: summary cards + charts (totals, pending/approved registrations,
      latest registrations, recent announcements)
- [ ] User Management: list/search/edit/deactivate users, assign roles
- [ ] System Logs: audit log of admin actions (who did what, when)

### Delegate module
- [ ] Admin: approve/reject/edit/search/export delegates
- [ ] Delegate dashboard: view/edit own profile (permitted fields only), announcements

### Sponsor module
- [ ] Sponsor profile fields: category, company info, brand assets, status, contacts,
      website link
- [ ] Admin CRUD for sponsors; sponsor-facing dashboard shows own info only

### Exhibitor + Booth modules
- [ ] Exhibitor profile: company, industry, products, contact, registration status
- [ ] Booth data model: Hall → Booth (number, size, category, status)
- [ ] Admin: create halls/booths, assign exhibitor ↔ booth
- [ ] Exhibitor dashboard: view own allocated booth
- [ ] (Design only, no UI yet) confirm schema supports a future visual booth map

### News module
- [ ] Admin CRUD, scheduled publishing, cover image upload, categories
- [ ] Public News & Updates page reflects published articles automatically

### Reports
- [ ] Delegates, Sponsors, Exhibitors, Booth Allocation, Countries Represented,
      Registration Statistics
- [ ] Export to PDF, Excel, CSV for each

### Security hardening pass
- [ ] Confirm CSRF protection on all state-changing routes
- [ ] Confirm input validation (server-side, not just client) on every form
- [ ] Confirm RBAC checks on every API route/server action, not just UI hiding
- [ ] Review session expiry/config
- [ ] HTTPS confirmed in Hostinger deployment config

## Phase 3 — Deployment & Handover

- [ ] Production build tested locally
- [ ] Deploy to Hostinger Business Node.js hosting, connect domain + SSL
- [ ] Set production env vars (DB, SMTP, auth secrets) on Hostinger
- [ ] Smoke test all five roles end-to-end in production
- [ ] Write a short admin user guide (how to edit pages, approve delegates, allocate
      booths, publish news, run reports)

## Future-proofing notes (don't build now, but don't design against these)

- Multiple events (e.g. a future "Meru Women Business Summit") reusing this platform
- Payment integration for sponsors/exhibitors to pay directly through the site
- Visual booth map on top of the existing booth data model
