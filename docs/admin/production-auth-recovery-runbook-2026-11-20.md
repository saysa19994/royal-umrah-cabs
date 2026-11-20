# Production Auth recovery — controlled change, NOT automatically executed

**Service:** Duyuf Al Rahman VIP / Supabase project `skyhpzdeapmttgmvcoeh`  
**Prepared:** 2026-11-20  
**Status:** Pending verified, restorable production backup and owner approval.  
**Do not execute as part of Preview or CI.**

## Confirmed diagnosis

- In the latest read-only investigation, six `auth_logs` showed HTTP 500 / `unexpected_failure` with the same cause:
  `error finding user: sql: Scan error on column index 3, name "confirmation_token": converting NULL to string is unsupported`.
- A read-only query found one `auth.users` row and one NULL `confirmation_token`.
- Supabase's official troubleshooting guide describes the exact error and states that replacing NULL `confirmation_token` with an empty string fixes it:
  https://supabase.com/docs/guides/troubleshooting/scan-error-on-column-confirmation_token-converting-null-to-string-is-unsupported-during-auth-login-a0c686
- Additional NULL values in `recovery_token` and `email_change_token_new` were observed. **Do not change them merely because they are NULL**; they are not established as the source of this error.

## Prerequisites: all mandatory

1. Establish a restorable backup/snapshot of the existing production Auth database; check the owner's Supabase project plan and backup coverage. Confirm how to restore, and store any backup in a restricted owner-controlled location.
2. Record the maintenance window, recovery method and verified owner authorization to change production authentication records.
3. Inspect recent Auth errors and reconfirm the one-row NULL anomaly before applying any write.
4. Do not dump user accounts, tokens, passwords, session cookies or service-role secrets to logs, GitHub, tickets or this document.

## Read-only preflight query

Run in Supabase SQL Editor under an authorized administrator account:

```sql
SELECT
  COUNT(*)::integer AS total_auth_users,
  COUNT(*) FILTER (WHERE confirmation_token IS NULL)::integer AS affected_users
FROM auth.users;
```

Expected from the last audit: `total_auth_users=1, affected_users=1`. Stop if the counts differ; review the affected identities privately before proceeding.

## Controlled one-time repair (ONLY after prerequisites and approval)

```sql
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $$
DECLARE affected integer;
BEGIN
  SELECT COUNT(*) INTO affected
    FROM auth.users WHERE confirmation_token IS NULL;
  IF affected <> 1 THEN
    RAISE EXCEPTION 'Precondition failed: expected exactly one affected Auth account, got %', affected;
  END IF;
END $$;

-- Vendor-recommended field and replacement, limited to the confirmed bad rows.
UPDATE auth.users
SET confirmation_token = ''
WHERE confirmation_token IS NULL;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM auth.users WHERE confirmation_token IS NULL) THEN
    RAISE EXCEPTION 'Auth repair incomplete, transaction will be rolled back';
  END IF;
END $$;
COMMIT;
```

This is a database write to the live Auth system and **has not been executed by this workstream**. Do not use this script for unrelated login failures.

## Post-repair acceptance checks

- Re-run the read-only NULL count: `affected_users=0`.
- Using the real owner's credentials, attempt a fresh login from an incognito browser; never collect or store those credentials in code or chat.
- Verify MFA AAL2 enforcement and that suspended/operator users cannot access owner/admin routes.
- Confirm Supabase Auth logs no longer show the `confirmation_token` scan error after legitimate sign-in.
- Check the administrator can GET CMS pages; do not perform live edits as a test until isolated staging E2E passes.
- Confirm booking, fare display, original hero film, media and customer data remain unchanged.

## Contingency

If unexpected Auth issues appear, pause further writes and follow the verified backup/restoration procedure. Do **not** attempt to roll back by forcing token fields to NULL, which could recreate the documented outage.

## Separate unresolved security work

The Supabase advisor warns of publicly callable `SECURITY DEFINER` helpers and disabled leaked-password protection. `public.is_staff()` and `public.is_staff_role(text[])` are used in existing RLS rules; do not blindly revoke authenticated EXECUTE. Prepare and test a compatible policy/function migration in isolated staging, then run the security advisor again.

Related: `docs/admin/release-gates-admin-cms-2026-11-20.md`.
