# Duyuf VIP — Production recovery findings (2026-11-19)
**Status: proposed fix only — zero production database writes and no deployment**
 
## Verified incident A: administrative sign-in 500
Supabase Auth logs show:
\`Scan error on column "confirmation_token": converting NULL to string is unsupported\`.
Read-only SQL confirmed one \`auth.users\` row and a NULL \`confirmation_token\` on that row. Other nullable auth token fields were seen, but the logged failure specifically names \`confirmation_token\`.

**Official remediation:** [Supabase troubleshooting guide](https://supabase.com/docs/guides/troubleshooting/scan-error-on-column-confirmation_token-converting-null-to-string-is-unsupported-during-auth-login-a0c686).

### Required approval and backup before doing anything
1. Record a fresh verified recovery backup / PITR checkpoint and confirm account ownership.
2. With the owner's explicit approval, execute only the single Supabase-documented SQL statement in the authenticated Supabase SQL Editor, NOT as a GitHub migration on an unrelated database:
   \`\`\`sql
   UPDATE auth.users SET confirmation_token = '' WHERE confirmation_token IS NULL;
   \`\`\`
3. Read-only verify: \`SELECT count(*) FROM auth.users WHERE confirmation_token IS NULL;\`
4. The owner signs in with their existing credentials and existing MFA; confirm no new 500 errors.
5. Do NOT update password hashes, verified dates, sessions or other auth columns, and never disclose user identifiers or tokens.

## Verified incident B: PostgreSQL 42703 on customer reviews
Production \`public.reviews\` has columns: id, customer_name, country, rating, comment, route, language, is_approved, google_review_id, created_at.
The public reader previously issued a \`status\` and \`service_type\` query guaranteed to fail, then retried with the legacy schema. The write endpoint similarly tried an incompatible extended insert before falling back. This release fixes both routes in source, using \`is_approved\` as the publication gate.

**Scope caveat:** Booking reference, service type and verified-booking flags are NOT stored by this legacy schema; no claims of booking verification are rendered. A future DB migration needs a separate data-model/security design and staging tests. The public review form should not promise verified-booking persistence until then.

## Verified incident C: Vercel resource use
- Vercel project deployment history on 2026-11-19 shows excessive Preview churn, including canceled builds.
- Captured dashboard readings: ISR Writes 232K/200K; Deployment Storage 10.8 GB/10 GB.
- Repository public/ contains about 141.5 MiB source assets. Local content hashing identified 81 duplicate groups with 44.9 MiB redundant copies in the SOURCE TREE; do not equate source bytes with billed storage.
- Vercel resource billing per project/route was NOT available, so precise ISR route attribution and billed deployment storage savings are unknown.
- Never delete deployed assets without finding all code, DB and SEO URLs referencing them.
- Never remove current Production or rollback candidates while troubleshooting.
- Stop per-commit deployments during large admin redesign; prefer one reviewed CI/build gate and one Preview after integration.

## Rollout criteria
- Run lint/typecheck/test/Next build in an isolated environment.
- Deploy a single Preview; inspect real GET requests and owner-only API security.
- Verify Supabase Auth separately using the official remediation above (not part of this PR).
- Require separate staging write-path tests for bookings, cash and driver assignments.
- Promote only a known-good production build; preserve the cash-after-journey policy and all 10 locale SEO metadata.
