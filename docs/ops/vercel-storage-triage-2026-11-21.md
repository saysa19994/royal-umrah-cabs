# Vercel Hobby storage audit — 2026-11-21

Production: `dpl_E7ECwA9QHLGaG3NJos8muKJB9xSv` / `e032961ec6595a18f9f129825f8c2645233da0f5`. Team: `sayed6`.
Owner screenshot: Deployment Storage 14.72 / 10 GB, ISR Writes 229K / 200K.
Inventory: 69 branches, 20 open PRs, 15 production-merged branch candidates, 24 unmerged branches and 30 protected by active PRs or important references.

**This is a read-only branch audit: no source, Vercel deployment, branch, media or database record was deleted.**

## Branch heads already included in currently deployed production commit (no open PR dependencies)
These exact head commits have `behind_by=0` when compared with the official production commit. Their names are potential Vercel deployment retention blockers. Retire only after checking Preview aliases and QA links.

| Branch | SHA | Git ancestry verified |
| --- | --- | --- |
| `feat/admin-db-wiring-and-10-languages` | `b97d520fc7114a5ca66dfd237dae9a371d9b9003` | included in production |
| `feat/booking-page-pay-driver-redesign` | `d95f89b9aa431892156445af2a91d56b2a7c102c` | included in production |
| `feat/competitive-redesign-engineering` | `3ac1d050fb6433fc57e2273119fa03f9584b85c2` | included in production |
| `feat/isr-quota-optimization` | `10a5e5890911fd726d0c44bde63fd659e52654d8` | included in production |
| `feat/kiswah-inspired-booking-cro` | `3ac1d050fb6433fc57e2273119fa03f9584b85c2` | included in production |
| `feat/luxury-command-center-v2` | `09c119977c8f7063317a4148e437a5b68d478490` | included in production |
| `feat/master-engineering-hardening` | `0aed004ac4f0b9460e8399402aae822fe293764b` | included in production |
| `feat/master-execution-duyuf-vip` | `85f2af7a413035aeb87a9bbb7f096410337f0561` | included in production |
| `feat/royal-luxury-transformation` | `ee1ccde131353204f6d6f362ad8f067770878387` | included in production |
| `feature/competitive-redesign-master` | `3ac1d050fb6433fc57e2273119fa03f9584b85c2` | included in production |
| `feature/luxury-digital-experience` | `33dd69b15bbc41ccd18f0ccb90cb10f2bb70fd63` | included in production |
| `feature/phase-04a-pricing-ux-fix` | `34f939ba2b7a36c883e28cb67c82ddffc47056d5` | included in production |
| `feature/premium-redesign-cro` | `fee0648144bcb7d1de4bb3ac1e3c19162564eaa9` | included in production |
| `feature/ultimate-redesign-engineering` | `145170cfca3968ec87378b9b6e7a07eb9be5503d` | included in production |
| `ui-redesign` | `59dda9b12f2c69b1bc4fb81de3bc01b31bb526a7` | included in production |

## Other non-PR branches — preserve (work not verified in production)
- `feat/bronze-circular-fleet-preview` (`389c06108088c17762df0d522af9dec6ef6cae22`)
- `feat/homepage-cro-no-reviews-preview` (`823ec1ff72d96b50ff19342fb72788176bff5700`)
- `feature/admin-cinematic-reference-live-20261119` (`b901ce54f2268c739df97879e50e7351aeb88314`)
- `feature/booking-luxury-visual-real-flow-20261119` (`b2287e394a1e4f191ac7be7b925d964abf6de45b`)
- `feature/curated-interactive-journey-20261120` (`5130207e8e752fca45fed31be90f56f6d71b0d97`)
- `feature/duyuf-all15-functional-design-v1-20261117` (`3e0df12e8b031b18af35157def00da38a7c8af82`)
- `feature/duyuf-distinct-page-architectures-20261117` (`5c5bb442fd6c83d369cd7721c7f9faa501634607`)
- `feature/duyuf-editorial-homepage-v3-20261117` (`bdf80f0f06dc18feeb4ea1a2370382d3029b55e8`)
- `feature/duyuf-mobile-story-services-20261117` (`496824e7f208d0e565c72887c02900ef2734b243`)
- `feature/duyuf-owner-html-story-and-route-20261117` (`75bcbcc99b2ec84512116b0fb929d8b3466d732f`)
- `feature/duyuf-photo-localization-audit-20261117` (`34f0d9df43b493ca57be99b2db85f940463f1579`)
- `feature/duyuf-prototype-integration-booking-ziyarat-20261117` (`5e12ad5e3ebca9147c3836404c55ea61ca148684`)
- `feature/duyuf-signature-journey-v4-20261117` (`3cff05e96f219d78c25c671f8af07eb4a724b6b9`)
- `feature/duyuf-sitewide-reference-adaptation-20261117` (`96b4f862af4cc3ee9ecef75b71d7079ef86d3b26`)
- `feature/duyuf-visual-reset-screenshot-audit-20261117` (`bfe4d4cb6b93c37cd7e8b37b2829167e4576c51b`)
- `feature/kiswah-grade-booking-ops-20261119` (`43379e99e98f8a4e03ee8b02665e6ad07dcefdc0`)
- `feature/royal-immersion-experience` (`93bfc04e546726eeab90ac0af94e1a10409d7dbc`)
- `feature/royal-immersion-qa-preview-20261118` (`4c1d2e4ff9438db5bdb17c6adb9e20dc65f4a9ec`)
- `feature/signature-3-concepts-preview-20261117` (`63ec92eac885011eefefd485650965a23427709b`)
- `feature/signature-three-vercel-concepts-20261117` (`26a6a3aa856b1571e59c2815f87063f1a8dc01d9`)
- `feature/41-inspired-ideas-production` (`9c2c708056866cff96ce10db885b772849dbb60b`)
- `fix/fleet-mobile-true-responsive-20261119` (`8a2611eb62069f7f5080506e35ba16089022fc0f`)
- `fix/mobile-fare-small-labels-20261119` (`efc3fdd46d7cbe7a9855ae527e07baf41eafd3a6`)
- `fix/sitewide-mobile-type-rhythm-20261119` (`7ab26f0616c01bdc0559edd0a3f397091e23ad06`)

## Open PRs — preserve head/base dependencies
- #29: `fix/vercel-hobby-resource-guard-20261121` → `release/stability-from-live-20261120`
- #28: `feature/duyuf-story-fan-visual-20261121` → `feature/duyuf-route-media-cms-20261121`
- #27: `release/selvar-ui-live-safe-20261121` → `release/selvar-ui-production-baseline-20261121`
- #26: `seo-geo-aeo-recovery-20261121` → `release/stability-from-live-20261120`
- #25: `feature/duyuf-route-media-cms-20261121` → `feature/duyuf-route-photo-atlas-20261120`
- #24: `design/selvar-inspired-operations-20261121` → `fix/site-controls-preview-ready-20261119`
- #23: `fix/admin-settings-readback-preview-lock-20261121` → `release/mfa-onboarding-from-live-20261120`
- #22: `feature/duyuf-route-photo-atlas-20261120` → `integration/duyuf-41-live-safe-20261120-a`
- #21: `integration/duyuf-41-live-safe-20261120-a` → `release/stability-from-live-20261120`
- #20: `release/mfa-onboarding-from-live-20261120` → `release/stability-from-live-20261120`
- #19: `release/stability-from-live-20261120` → `release/live-baseline-20261120`
- #18: `hotfix/prod-faq-reviews-schema-20261120` → `main`
- #17: `feature/41-reference-adaptation-20261120` → `main`
- #16: `hotfix/admin-chat-auth-live-20261120` → `main`
- #14: `fix/site-controls-preview-ready-20261119` → `feat/live-site-controls-20261119`
- #13: `fix/supabase-reviews-auth-audit-20261119` → `release/admin-ops-integration-20261119`
- #4: `feature/homepage-day-night-reference-20261119` → `feature/duyuf-editorial-journey-polish-20261118`
- #3: `feature/duyuf-editorial-journey-polish-20261118` → `feature/avant-garde-width-refinement-20261118`
- #2: `feature/royal-immersion-preview-20261118` → `feature/signature-fusion-preview-20261117`
- #1: `feature/duyuf-private-journey-review-20261116` → `feature/duyuf-vip-final-integration`

## Vercel deployment-level findings (read-only verified)

All 15 production-merged branch names above returned **zero Vercel deployment records** when queried individually. Therefore, retiring those branches is **not a verified immediate way** to recover the current 4.72 GB storage excess.

The following six **older Preview deployments** have **no current aliases** (verified via `list_deployment_aliases`), are **not production**, and are **not rollback candidates**. Their branch source is still in GitHub. They are lowest-risk deployment cleanup candidates if the direct immutable Preview URL is not used by QA:

| Deployment | Branch | State | Risk note |
| --- | --- | --- | --- |
| `dpl_3z2vKTuQ6yqwzcADbFcwn5qMU4tp` | `feature/41-reference-adaptation-20261120` | CANCELED | no aliases; superseded |
| `dpl_3RP2MfzFJjdziSLCwJhiA2APfmiK` | `feature/41-reference-adaptation-20261120` | CANCELED | no aliases; superseded |
| `dpl_993UeKRWLrV1myUmB4TMWdoVGPFz` | `feature/41-reference-adaptation-20261120` | READY | no aliases; newer Preview exists |
| `dpl_Z3P71Zv5WxiiaHMm8GAJ2RrKZmFk` | `release/mfa-onboarding-from-live-20261120` | READY | no aliases; newer Preview exists |
| `dpl_XY8ixx1Uc6WESWCwRAN78wgovMjT` | `release/mfa-onboarding-from-live-20261120` | READY | no aliases; newer Preview exists |
| `dpl_Fdyo1hdp71fxkZxEa3GqSS9FE56g` | `release/stability-from-live-20261120` | READY | no aliases; same source commit as current Production |

**Do not delete** `dpl_E7ECwA9QHLGaG3NJos8muKJB9xSv` (live Production), `dpl_Crq29nKp4y3tXoPxocL5gS5TWifQ` (former Production rollback), or any other active/aliased/rollback deployment. Non-aliased READY Previews still have immutable generated URLs and may be bookmarked, so inspect their use before removing.

Connected Vercel toolset does not expose a deployment deletion or retention-edit action. No cleanup action was performed remotely; the exact six IDs are recorded so the user can manage them in the official dashboard without guessing.
## Clean up safely
1. Do not touch production deployment, live aliases, source assets, sitemap, booking, Supabase or important rollback candidates.
2. Verify Vercel Preview aliases for production-merged candidates. Remove only unused branch refs with working deletion capability. This connector does not offer Git branch or Vercel deployment deletion, so do not simulate deletion with force-update.
3. Review Vercel deployment retention policy for completed Preview/Error/Canceled items. The active-branch and aliased exceptions can protect old deployments.
4. Reduce new preview churn; develop on fewer active branches and don't deploy every draft change.
5. Test PR #29 (24h CMS and media cache with on-demand tags) on Preview before merging. PR #26 contains SEO fixes and should be released independently or with explicit QA.
6. Check Vercel monthly usage after cleanup; ISR usage already accrued will not disappear through a code change.
7. Hobby is for noncommercial personal use under Vercel's published fair-use terms; this commercial site should plan compliant paid hosting. Do not silently change billing.

Sources: https://vercel.com/changelog/hobby-projects-now-retain-fewer-deployments-to-free-up-storage ; https://vercel.com/docs/deployment-retention ; https://vercel.com/docs/limits/fair-use-guidelines
