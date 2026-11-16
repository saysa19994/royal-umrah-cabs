import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

test('The route price has no hardcoded SAR 200 minimum', () => {
  const s = read('src/app/[locale]/routes/[slug]/page.tsx');
  assert.match(s, /Math\.min\(\.\.\.configuredFares\)/);
  assert.doesNotMatch(s, /Math\.min\([^)]*\b200\b/);
});
test('No legacy direct-owner-session bypass remains in admin auth', () => {
  for (const f of ['src/app/api/admin/auth/login/route.ts','src/app/admin/layout.tsx','src/lib/auth/server-auth.ts']) {
    const s = read(f);
    assert.doesNotMatch(s, /createOwnerSession\(/, `unexpected bypass in ${f}`);
    assert.doesNotMatch(s, /verifyOwnerSession\(/, `unexpected legacy cookie in ${f}`);
    assert.doesNotMatch(s, /OWNER_MASTER_PASSWORD/, `legacy master password in ${f}`);
  }
});
test('Password updates use the Supabase Auth API, not plaintext site settings', () => {
  const s = read('src/app/api/admin/account/password/route.ts');
  assert.match(s, /auth\.admin\.updateUserById/);
  assert.doesNotMatch(s, /telegram_chat_id/);
});
test('Long-form language fallbacks cannot publish ten-locale alternate links', () => {
  const s = read('src/lib/seo/localization-indexing.ts');
  assert.match(s,/NATIVE_EDITORIAL_LOCALES/);
  assert.match(s,/index: hasNativeEditorialContent\(locale\)/);
  const sitemap=read('src/app/sitemap.ts');
  assert.match(sitemap,/const nativeLongForm/);
  assert.match(sitemap,/isNativeEditorialPath/);
});
test('Riyadh airport is disabled for new bookings and public route landing', () => {
  assert.match(read('src/lib/pricing-server.ts'), /'riyadh-airport-transfer': false/);
  assert.match(read('src/app/[locale]/routes/[slug]/page.tsx'), /slug === 'riyadh-airport-transfer'/);
});
test('Theme CSS is imported globally and both modes have explicit tokens', () => {
  assert.match(read('src/app/layout.tsx'), /duyuf-premium-final\.css/);
  const css=read('src/styles/duyuf-premium-final.css');
  assert.match(css, /html\[data-theme="dark"\]/);
  assert.match(css, /\.duyuf-vehicle-detail/);
  assert.match(css, /\.duyuf-pricing-page/);
});


test('Country landing pages are indexed only after human editorial approval', () => {
  const country = read('src/app/[locale]/pilgrims/[country]/page.tsx');
  const sitemap = read('src/app/sitemap.ts');
  assert.match(country, /c\.status === 'published' && !c\.noindex/);
  assert.match(country, /locale === 'en' \|\| isMatchLocale/);
  assert.match(country, /robots: \{ index: canIndex, follow: true \}/);
  assert.match(sitemap, /c\.status === 'published' && !c\.noindex/);
  assert.match(sitemap, /locale === 'en' \|\| locale === c\.primaryLanguage/);
  assert.match(sitemap, /country\.primaryLanguage !== 'en'/);
});

test('Country copy never contradicts the approved cash-only SAR/USD policy', () => {
  const content = read('src/data/pilgrims.ts');
  assert.doesNotMatch(content, /cash \(SAR or USD\)s/);
  assert.doesNotMatch(content, /EUR or SAR/);
  assert.doesNotMatch(content, /Cards, cash \(SAR or USD\), and/);
});

test('Booking emails are concurrent, bounded and independent of saving the booking', () => {
  const email = read('src/lib/booking-email-service.ts');
  assert.match(email, /await Promise\.all\(/);
  assert.match(email, /AbortSignal\.timeout\(8000\)/);
  const booking = read('src/app/api/bookings/route.ts');
  assert.match(booking, /emailDispatch = await dispatchBookingEmails/);
  assert.match(booking, /Booking saved but one or more transactional emails/);
});

test('Chat payloads are limited during streaming and rejected if malformed', () => {
  const chat = read('src/app/api/chat/route.ts');
  assert.match(chat, /request\.body\?\.getReader\(\)/);
  assert.match(chat, /receivedBytes > 32_768/);
  assert.match(chat, /Malformed chat JSON/);
});


test('Production form verification rejects missing or test-only Turnstile credentials', () => {
  const turnstile = read('src/lib/turnstile.ts');
  const limiter = read('src/lib/rate-limit.ts');
  assert.match(turnstile, /TEST_SECRET_KEYS/);
  assert.match(turnstile, /TEST_SITE_KEYS/);
  assert.match(turnstile, /isProductionTurnstileConfigured\(\)/);
  assert.match(limiter, /!isProductionTurnstileConfigured\(\)/);
  assert.match(limiter, /status: 503/);
});

test('Draft booking validates actual calendar dates before server pricing', () => {
  const draft = read('src/app/api/bookings/draft/route.ts');
  assert.match(draft, /date\.toISOString\(\)\.slice\(0, 10\) === value/);
});


test('Checkout never uses a pretend verification token or hides the security widget', () => {
  const engine = read('src/components/booking/BookingEngine.tsx');
  const widget = read('src/components/common/TurnstileWidget.tsx');
  assert.match(engine, /useState<string>\(''\)/);
  assert.doesNotMatch(engine, /verified_client/);
  assert.match(engine, /disabled=\{isSubmitting \|\| !turnstileToken\}/);
  assert.match(engine, /onExpire=\{handleTurnstileInvalidated\}/);
  assert.match(engine, /turnstileWidgetRef\.current\?\.reset\(\)/);
  assert.match(widget, /isDeployed \? '' : DEV_TEST_SITE_KEY/);
  assert.doesNotMatch(widget, /pointer-events-none fixed -top-\[9999px\]/);
  assert.match(widget, /role="alert"/);
});


test('Preview URLs cannot compete with the official website in search', () => {
  const middleware = read('src/middleware.ts');
  assert.match(middleware, /VERCEL_ENV === 'preview'/);
  assert.match(middleware, /X-Robots-Tag', 'noindex, nofollow'/);
});

test('Turnstile survives input changes without remounting or hidden challenges', () => {
  const widget = read('src/components/common/TurnstileWidget.tsx');
  assert.match(widget, /callbacksRef\.current = \{ onSuccess, onVerify, onExpire, onError \}/);
  assert.match(widget, /\[siteKey, locale, theme\]/);
  assert.match(widget, /turnstile-container flex w-full/);
  assert.match(widget, /Turnstile script timeout/);
});

test('Booking recovery always explains failed draft restoration in all supported languages', () => {
  const page = read('src/app/[locale]/booking/page.tsx');
  assert.match(page, /draftRestoreFailed/);
  assert.match(page, /role="status"/);
  for (const lang of ['ar','en','ms','id','ur','fr','es','de','tr','hi']) {
    assert.match(page, new RegExp('\\b' + lang + ': '));
  }
});


test('Original full-width cinema video has separate route-booking search and original light design', () => {
  const css=read('src/components/home/PrivateJourneyHomepage.module.css');
  const home=read('src/components/home/PrivateJourneyHomepage.tsx');
  assert.match(css,/\.heroVideo\{position:absolute;inset:0/);
  assert.match(css,/\.bookingPanel\{transform:translateY\(-94px\)/);
  assert.match(css,/--cream:#faf9f6/);
  assert.match(css,/\.pricingTable\{border-collapse:collapse/);
  assert.match(home,/poster="\/assets\/homepage-v2\/hero-poster\.jpg"/);
  assert.match(home,/hero-mobile\.webm/);
  assert.match(home,/AUTHORITATIVE_TRANSFER_RATES/);
});

test('Editorial booking styling is responsive and keeps the actual booking engine', () => {
  const page = read('src/app/[locale]/booking/page.tsx');
  const css = read('src/app/[locale]/booking/booking-editorial.css');
  const wizard = read('src/components/booking/BookingWizard.tsx');
  const engine = read('src/components/booking/BookingEngine.tsx');
  assert.match(page, /import '\.\/booking-editorial\.css'/);
  assert.match(page, /<BookingWizard/);
  assert.match(page, /duyuf-booking-intro/);
  assert.match(wizard, /duyuf-booking-stepper/);
  assert.match(engine, /duyuf-booking-summary/);
  assert.match(engine, /data-selected=\{isSelected/);
  assert.doesNotMatch(engine, /\}\) \|\| 200;/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /duyuf-booking-vehicle-card/);
});
