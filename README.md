# Royal Umrah Cabs | Production Architecture & Administration Guide

> Enterprise Chauffeur Transport & VIP Pilgrimage Operations System (Jeddah, Makkah, Madinah, and Riyadh optional).
> Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth, RLS), deployed on Vercel.

---

## 🌟 Architecture & Capabilities

1. **Enterprise Full-Stack Architecture:**
   - **Framework:** Next.js 14 App Router with Server-Side Rendering (SSR) & Static Site Generation (SSG).
   - **Database:** Supabase PostgreSQL with strict Row Level Security (RLS) policies.
   - **Strict Localization (i18n):** 9 fully independent locales (`/en`, `/ar`, `/ms`, `/fr`, `/es`, `/id`, `/hi`, `/de`, `/ur`) with 100% dictionary key parity (`check-i18n.js`).
   - **Auto Locale Routing:** Root redirect (`/`) issues HTTP 301 based on visitor's `Accept-Language` header.
   - **Honesty & Trust:** Zero invented licenses (no fake Nusuk/TGA badges), verified fleet capacities, real approved Google reviews.

2. **Fleet Specifications (Single Source of Truth):**
   - **Toyota Camry Executive:** 4 Passengers, 3 Luggage Bags.
   - **Hyundai Staria VIP:** 7 Passengers, 6 Luggage Bags.
   - **GMC Yukon XL VIP:** 7 Passengers, 8 Luggage Bags.
   - **Toyota HiAce VIP:** 10 Passengers, 10 Luggage Bags.
   - **Toyota Coaster VIP Bus:** 21 Passengers, 20 Luggage Bags.

---

## 🔐 Ownership, RBAC & Security (Phase 2)

### Roles Hierarchy
- **Owner (Super Admin):** Unrestricted access to all data, financial multipliers, role permissions, user invitations, and dangerous operations. The owner can never be deleted, suspended, or demoted by any other user.
- **Admin:** Operational manager with full booking, fleet, and pricing controls. Cannot delete the owner or alter role permissions.
- **Operator (Dispatcher):** Strictly scoped dispatcher. When an operator logs in, they see **ONLY** the leads and bookings routed to their assigned WhatsApp channel (e.g. secondary dispatch on `966505316971`).
- **Driver:** Can only view assigned passenger routes and contact cards.
- **Content Editor:** Marketing guides and vehicle copy.
- **Translator:** Multilingual reviews and dictionary refinements.
- **Partner (Travel Agency):** Agency referral portal with dedicated booking submissions.

### Two-Factor Authentication (2FA / TOTP)
- Mandatory RFC 6238 TOTP authentication for all Owner and Admin accounts.
- Integrated with standard authenticator applications (Google Authenticator, Microsoft Authenticator, 1Password, Authy).
- Login rate-limiting and 15-minute brute-force lockout after 5 consecutive failed attempts.

---

## 🚨 Emergency Owner Recovery Procedure

If the Owner is locked out, loses their 2FA device, or needs to regain emergency access, execute the following verified procedure directly in the **Supabase Dashboard SQL Editor**:

### 1. Reset Owner Password & Verify Account
```sql
-- Direct update via Supabase Auth admin schema
UPDATE auth.users
SET encrypted_password = crypt('YourNewStrongPassword2026!', gen_salt('bf')),
    email_confirmed_at = now(),
    updated_at = now()
WHERE email = 'owner@royalumrahcabs.com';
```

### 2. Disable or Reset 2FA (TOTP) Secret
If you lost access to your authenticator app:
```sql
UPDATE public.user_profiles
SET totp_enabled = FALSE,
    totp_secret = NULL,
    is_suspended = FALSE,
    updated_at = now()
WHERE email = 'owner@royalumrahcabs.com';
```
*After executing this query, log in immediately at `/admin/login` using your password, then visit `/admin/users` to re-enroll a fresh 2FA secret.*

### 3. Ensure Owner Role is Active
Ensure your profile has the immutable `owner` role assigned:
```sql
UPDATE public.user_profiles
SET role = 'owner',
    is_suspended = FALSE
WHERE email = 'owner@royalumrahcabs.com';
```

### 4. Emergency Database Audit Check
Verify the latest actions and security events:
```sql
SELECT performed_by, entity_type, action, created_at
FROM public.audit_log
ORDER BY created_at DESC
LIMIT 20;
```

---

## 🛠️ Development & Deployment

### Local Development
```bash
# Install dependencies
npm install

# Validate i18n dictionary integrity
npm run check-i18n

# Start development server
npm run dev
```

### Production Build & Verification
```bash
# Build production bundle with static page generation
npm run build

# Deploy to Vercel Production
npx vercel --prod --yes
```

---
*Royal Umrah Cabs • Kingdom of Saudi Arabia • All Rights Reserved.*
