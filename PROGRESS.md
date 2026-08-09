# PROGRESS.md — MIICTF Digital Platform

> Update this at the end of every session. Newest entry on top. Keep entries short —
> this is a handoff note to your next session, not a full changelog (git log has that).

---

## Session log

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
