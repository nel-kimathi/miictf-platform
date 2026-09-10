# PROGRESS.md — MIICCOF Digital Platform

> Update this at the end of every session. Newest entry on top. Keep entries short —
> this is a handoff note to your next session, not a full changelog (git log has that).

---

## Session log

### 2026-09-10
**Done:**
- Replaced MAIICTF acronym with MIICCOF across the public site
- Updated all hardcoded references in components, layouts, metadata, auth emails, contact form, login/register pages
- Updated TiDB Cloud database: replaced MAIICTF in page titles, section titles/subtitles/body/metadata, and news articles
- Updated seed file and project docs (AGENTS.md, BUILD_PLAN.md, PROGRESS.md, README.md) for consistency

**Decisions / deviations from AGENTS.md or BUILD_PLAN.md (if any):**
- Site acronym changed from MAIICTF to MIICCOF (Meru International Investment Conference and Consumer Fair) per user request

**Blocked on / open questions for Nelson:**
- None

**Next session should start with:**
- Run `scripts/start-mysql.ps1` to start local MySQL, then `npm run dev`
- Check `BUILD_PLAN.md` for next unchecked items — Phase 2 admin portal modules
- Live site: https://miictf-platform.vercel.app
- TiDB Cloud DB credentials: stored in Vercel env vars (DATABASE_URL)
- Dev server log at `C:\Users\HUDINI\AppData\Local\Temp\opencode\next-dev.log`

---

### 2026-09-09
**Done:**
- Deployed to Vercel (production): https://miictf-platform.vercel.app
- Set up TiDB Cloud serverless MySQL for production database
- Exported local MySQL data and imported into TiDB Cloud (9 pages, 29 sections, 3 news)
- Fixed Prisma adapter SSL config for TiDB Cloud connections (`lib/db.ts` — parse URL, pass `PoolConfig` with SSL)
- Added `dynamic = "force-dynamic"` to all CMS-backed pages (prevents build-time DB queries)
- Added graceful error handling in `lib/content.ts` (try/catch returns null/empty instead of crashing)
- Added fallback UI in `CmsPage`, news, and contact pages when DB is unavailable
- Changed fonts: Inter → Source Sans 3 (body), Fraunces → Manrope (headings/buttons/nav)
- Compressed 9 oversized images (opening-ceremony.jpg: 13.8MB → 0.1MB, total savings ~95%)
- Added lazy loading + async decoding to `ImgWithFallback` component

**Decisions / deviations from AGENTS.md or BUILD_PLAN.md (if any):**
- TiDB Cloud (free tier) used for production MySQL instead of Hostinger remote DB
- Database URL uses SSL (`rejectUnauthorized: true`) with `PrismaMariaDb` adapter via PoolConfig
- Fonts changed from Figma-reference Fraunces/Inter to Manrope/Source Sans 3 per user request

**Blocked on / open questions for Nelson:**
- None

**Next session should start with:**
- Run `scripts/start-mysql.ps1` to start local MySQL, then `npm run dev`
- Check `BUILD_PLAN.md` for next unchecked items — Phase 2 admin portal modules
- TiDB Cloud DB credentials: stored in Vercel env vars (DATABASE_URL)
- Dev server log at `C:\Users\HUDINI\AppData\Local\Temp\opencode\next-dev.log`

---

### 2026-08-19
**Done:**
- Phase 2 started: confirmed all 5 roles exist correctly in Prisma schema + Better Auth config (no changes needed)
- Simplified `/admin` page to minimal "Admin access confirmed" + role display
- Added server-side route protection via `app/admin/layout.tsx` — only ADMIN and SUPER_ADMIN can access `/admin/*`, others redirected to their role dashboard
- Seeded admin test users: `admin@test.local` (ADMIN), `superadmin@test.local` (SUPER_ADMIN) — password: `Password123!`
- Reset `delegate@test.local` back to DELEGATE role (was accidentally overwritten)
- Installed shadcn sidebar component (base-nova style, uses `render` prop not `asChild`)
- Created admin portal shell: sidebar navigation with 10 modules (Dashboard, Users, Delegates, Sponsors, Exhibitors, Booths, News, Reports, Settings, System Logs)
- Created stub pages for all admin sub-routes
- Updated admin dashboard page with summary card placeholders

**Decisions / deviations from AGENTS.md or BUILD_PLAN.md (if any):**
- Used shadcn sidebar component with `render` prop pattern (base-nova style difference from Radix `asChild`)
- Admin layout uses client shell (`AdminShell`) wrapping server auth guard — idiomatic Next.js App Router pattern

**Blocked on / open questions for Nelson:**
- None

**Next session should start with:**
- Run `scripts/start-mysql.ps1` to start local MySQL, then `npm run dev`
- Check `BUILD_PLAN.md` for next unchecked items — Dashboard data wiring, User Management, System Logs
- Test users: delegate@test.local, sponsor@test.local, admin@test.local, superadmin@test.local (all verified, password: Password123!)
- `npx prisma generate` needed after any schema.prisma change
- Dev server log at `C:\Users\HUDINI\AppData\Local\Temp\opencode\next-dev.log`

---

### 2026-08-08
**Done:**
- Completed Phase 0: Next.js 15 scaffold, Tailwind v4 + shadcn/ui base-nova, Prisma 7 + MySQL schema, Better Auth, folder structure, CI, local MySQL setup, initial migration + seed
- Completed Phase 1: CMS content model (Page/Section/News), seed data (9 pages, 26 sections, 3 news), all public pages, auth forms (register/login), role-based dashboard guards, RBAC redirect, E2E verification
- Auth E2E tested and confirmed: register → email verification → login → role-based dashboard redirect → password hashed (salted scrypt, 161 chars) → session cookie works across requests
- RBAC guard verified: sponsor session gets 307 on /delegate and /admin, 200 on /sponsor
- Unverified login correctly rejected with 403 EMAIL_NOT_VERIFIED
- Newsletter + contact form server actions wired (DB-ready, standard useActionState pattern)
- README updated with local dev setup instructions
- CI green (latest: commit `9e4de5c`)

**Decisions / deviations from AGENTS.md or BUILD_PLAN.md (if any):**
- NewsletterSubscriber table added (Figma footer has newsletter signup) — justified by "match Figma structure" requirement
- News model + news list/detail pages built in Phase 1 rather than waiting for Phase 2 — the model exists and public site reads from it, avoids a gap
- role mapping handled via `databaseHooks.user.create.after` (direct prisma.update) because additionalFields.input:false prevents setting role from client
- No auto-session on signup (token: null) — dashboard guards require emailVerified
- Green/gold theme (`oklch(0.4 0.11 158)` primary) is placeholder until exact Figma hex values are available
- Prisma 7 requires explicit `npx prisma generate` after schema changes (migrate dev doesn't always auto-regenerate)

**Blocked on / open questions for Nelson:**
- None

**Next session should start with:**
- Run `scripts/start-mysql.ps1` to start local MySQL, then `npm run dev`
- Check `BUILD_PLAN.md` for next unchecked items — likely Phase 2 (admin portal modules)
- All test users in DB: delegate@test.local, sponsor@test.local (both verified, password: Password123!)
- `npx prisma generate` needed after any schema.prisma change
- Dev server log at `C:\Users\HUDINI\AppData\Local\Temp\opencode\next-dev.log`

---

*(No sessions logged yet — first session should scaffold Phase 0 and add the first entry here.)*
