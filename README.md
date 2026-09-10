# MIICCOF Digital Platform

Event management platform for the Meru International Investment Conference &
Consumer Fair: public marketing site + role-based back office. See `AGENTS.md`,
`BUILD_PLAN.md` and `PROGRESS.md` for the project brief and status.

## Tech stack

Next.js 15 (App Router, TypeScript) · Tailwind v4 + shadcn/ui (base-nova) ·
Prisma 7 → MySQL · Better Auth · Hostinger SMTP

## Local development

Prerequisites: Node.js 22+, MySQL 8 running locally.

```bash
# 1. Start MySQL (Windows dev helper — runs mysqld without a service/admin)
powershell -ExecutionPolicy Bypass -File scripts/start-mysql.ps1

# 2. Configure environment
cp .env.example .env   # then set DATABASE_URL, BETTER_AUTH_SECRET, SMTP_*

# 3. Install deps, run migrations, seed CMS content
npm install
npx prisma migrate dev
npx prisma db seed

# 4. Run
npm run dev
```

Public site: http://localhost:3000 — Register, verify email (logged to the
server console while SMTP is stubbed), log in, and you'll land on the
dashboard for your role (`/delegate`, `/sponsor`, `/exhibitor`, `/admin`).

Useful scripts: `npm run lint`, `npm run typecheck`, `npm run build`.

## Notes

- All public page content lives in the database (`page` / `section` tables),
  seeded by `prisma/seed.ts` and editable via the admin portal (Phase 2).
- Email: while `SMTP_HOST` is the placeholder value, outgoing mail
  (verification, contact form) is logged to the server console instead of
  being sent.
