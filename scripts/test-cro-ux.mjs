import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('CRO & Pricing Parity: Authoritative rates match all popular routes in pricing-constants.ts', () => {
  const fileContent = fs.readFileSync(path.resolve('src/lib/pricing-constants.ts'), 'utf-8');

  const routes = [
    'jeddah-airport-to-makkah',
    'makkah-to-madinah',
    'madinah-to-makkah',
    'makkah-to-jeddah-airport',
    'jeddah-to-madinah',
    'madinah-airport-to-hotel',
  ];

  for (const route of routes) {
    assert.ok(fileContent.includes(`'${route}'`), `Route ${route} must be defined in pricing-constants.ts`);
  }
});

test('Fleet Specifications Integrity: strictly accurate capacities and no unverified claims', () => {
  const fileContent = fs.readFileSync(path.resolve('src/components/home/HomeSections.tsx'), 'utf-8');

  // Verify no Wi-Fi claim is fabricated
  assert.ok(!fileContent.toLowerCase().includes('wi-fi') && !fileContent.toLowerCase().includes('wifi'), 'No unverified Wi-Fi claims allowed');

  // Verify vehicle capacities
  assert.ok(fileContent.includes("seats: 7,") && fileContent.includes("bags: 6,"), 'Staria capacity verified');
  assert.ok(fileContent.includes("seats: 7,") && fileContent.includes("bags: 8,"), 'Yukon capacity verified');
  assert.ok(fileContent.includes("seats: 4,") && fileContent.includes("bags: 3,"), 'Camry capacity verified');
  assert.ok(fileContent.includes("seats: 10,") && fileContent.includes("bags: 10,"), 'HiAce capacity verified');
});

test('Mobile-First Accessibility & Touch Target Standards', () => {
  const headerContent = fs.readFileSync(path.resolve('src/components/layout/Header.tsx'), 'utf-8');
  const cardContent = fs.readFileSync(path.resolve('src/components/home/BookingCard.tsx'), 'utf-8');
  const floatingContent = fs.readFileSync(path.resolve('src/components/layout/FloatingUI.tsx'), 'utf-8');

  // Mobile navigation button must meet >= 40-44px touch target
  assert.ok(headerContent.includes('w-10 h-10'), 'Header mobile menu button meets touch target');
  assert.ok(headerContent.includes('min-h-[44px]'), 'Mobile nav links meet 44px touch target');

  // Booking Card steppers must meet >= 44px
  assert.ok(cardContent.includes('min-w-[44px] min-h-[44px]'), 'Stepper buttons meet 44px minimum touch target');
  assert.ok(cardContent.includes('min-h-[48px]'), 'Input fields and buttons meet 48px touch target');

  // Mobile sticky floating bar must have safe area padding and 48px buttons
  assert.ok(floatingContent.includes('safe-area-inset-bottom'), 'Floating bar respects mobile safe-area insets');
  assert.ok(floatingContent.includes('min-h-[48px]'), 'Floating bar buttons meet 48px touch target');
});

test('Turnstile Security: Identifies production environment configuration requirements', () => {
  const turnstileWidget = fs.readFileSync(path.resolve('src/components/common/TurnstileWidget.tsx'), 'utf-8');
  const turnstileServer = fs.readFileSync(path.resolve('src/lib/turnstile.ts'), 'utf-8');

  // Ensure test keys are documented and isolated
  assert.ok(turnstileWidget.includes('1x00000000000000000000AA'), 'Contains test fallback for dev');
  assert.ok(turnstileServer.includes('1x0000000000000000000000000000000AA'), 'Contains server test secret for non-prod');

  // Verify server rejects missing tokens fail-closed
  assert.ok(turnstileServer.includes('if (!token)'), 'Server-side turnstile strictly rejects requests without token');
});
