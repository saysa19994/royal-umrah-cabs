import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const file = (name) => new URL(`../${name}`, import.meta.url);
const read = (name) => readFileSync(file(name), 'utf8');

function loadTypeScript(name, imports = {}) {
  const { outputText } = ts.transpileModule(read(name), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  const exports = {};
  runInNewContext(outputText, {
    exports,
    require(specifier) {
      assert.ok(Object.hasOwn(imports, specifier), `Unexpected import ${specifier} from ${name}`);
      return imports[specifier];
    },
  });
  return exports;
}

const homepage = read('src/components/fusion/SignatureFusionHomepage.tsx');
const css = read('src/components/fusion/SignatureFusionHomepage.module.css');
const app = read('src/app/[locale]/page.tsx');
const cabin = read('src/components/royal/RoyalCabinChapter.tsx');
const editorial = read('src/components/fusion/RoyalImmersionEditorial.tsx');
const reviews = read('src/app/api/reviews/route.ts');
const layout = read('src/app/[locale]/layout.tsx');
const { LOCALES, LOCALE_CONFIG } = loadTypeScript('src/i18n/config.ts');

test('Royal Immersion uses the original hero film, mobile encode and poster', () => {
  for (const asset of ['hero.mp4', 'hero-mobile.mp4', 'hero-poster.jpg']) {
    const name = `/assets/homepage-v2/${asset}`;
    assert.ok(homepage.includes(name), `Unused hero media ${name}`);
    assert.ok(statSync(file('public' + name)).size > 0, `Empty hero media ${name}`);
  }
  assert.match(homepage, /poster=\{POSTER\}/);
  assert.match(homepage, /muted\s+loop\s+playsInline/);
  assert.match(homepage, /requestedMotion\.current\s*\?\?\s*!reduced\.matches/);
  assert.match(homepage, /document\.hidden/);
  assert.doesNotMatch(homepage, /stock\.mp4|fake-360|\.glb/);
});

test('Route options use valid localized pickup and destination labels and authoritative fares', () => {
  const pricing = loadTypeScript('src/lib/pricing-constants.ts');
  const { ROYAL_HOME_ROUTES, getRoyalHomeRoute } = loadTypeScript(
    'src/components/fusion/royal-home-routes.ts',
    { '@/lib/pricing-constants': pricing },
  );
  const ids = ROYAL_HOME_ROUTES.map((route) => route.id);

  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes('jeddah-airport-to-madinah'));
  assert.ok(!ids.includes('riyadh-airport-transfer'));

  for (const route of ROYAL_HOME_ROUTES) {
    const fares = pricing.AUTHORITATIVE_TRANSFER_RATES[route.id];
    assert.ok(fares && Object.values(fares).some((fare) => Number.isFinite(fare) && fare > 0), route.id);

    for (const locale of LOCALES) {
      const localized = getRoyalHomeRoute(route, locale);
      assert.equal(localized.id, route.id);
      assert.ok(localized.pickup?.trim(), `${locale}/${route.id} is missing its pickup label`);
      assert.ok(localized.destination?.trim(), `${locale}/${route.id} is missing its destination label`);
      assert.notEqual(localized.pickup, localized.destination);
      const arrow = LOCALE_CONFIG[locale].dir === 'rtl' ? '←' : '→';
      assert.equal(localized.name, `${localized.pickup} ${arrow} ${localized.destination}`);
      assert.ok(statSync(file('public' + localized.image)).size > 0, localized.image);
    }
  }
});

test('The pickup and destination selector hands the eligible trip to localized booking', () => {
  assert.match(homepage, /ROYAL_HOME_ROUTES/);
  assert.match(homepage, /regions\[item\.region\]/);
  assert.match(homepage, /availableDestinations/);
  assert.match(homepage, /dict\.booking_card\.pickupLabel/);
  assert.match(homepage, /dict\.booking_card\.dropoffLabel/);
  assert.match(homepage, /rates\[route\]/);
  assert.match(homepage, /eligible\s*\?\s*`\/\$\{locale\}\/booking\?\$\{new URLSearchParams/);
  assert.match(homepage, /route, vehicle: car\.bookingParam, passengers: String\(guests\), type: 'transfer'/);
  assert.match(homepage, /date: travelDate/);
  assert.match(homepage, /time: travelTime/);
  assert.match(homepage, /router\.push\(href\)/);
});

test('The five approved fleet vehicles supply genuine images and vehicle capacities', () => {
  const { APPROVED_5_FLEET } = loadTypeScript('src/data/approved-fleet-homepage.ts');
  assert.deepEqual(Array.from(APPROVED_5_FLEET, ({ id }) => id).sort(), [
    'gmc-yukon-xl', 'hyundai-staria', 'toyota-camry', 'toyota-coaster', 'toyota-hiace',
  ]);
  for (const vehicle of APPROVED_5_FLEET) {
    for (const image of [vehicle.exteriorImage, vehicle.interiorImage]) {
      assert.ok(statSync(file('public' + image)).size > 0, image);
    }
  }

  assert.match(homepage, /APPROVED_5_FLEET/);
  assert.match(homepage, /inside\s*\?\s*car\.interiorImage\s*:\s*car\.exteriorImage/);
  assert.match(homepage, /car\.passengers/);
  assert.match(homepage, /car\.luggage/);
  assert.match(cabin, /APPROVED_5_FLEET\.find\(vehicle => vehicle\.id === 'hyundai-staria'\)/);
  assert.match(cabin, /src=\{cabinVehicle\.interiorImage\}/);
  assert.doesNotMatch(homepage, /mercedes-maybach.*bookingParam/);
});

test('Editorial chapters and genuine reviews are in the active homepage composition', () => {
  assert.match(homepage, /<RoyalBookingSteps/);
  assert.match(homepage, /<RoyalServiceChapters/);
  assert.match(homepage, /<RoyalGuestConfidence/);
  assert.match(homepage, /<RoyalCabinChapter/);
  assert.match(editorial, /fetch\('\/api\/reviews\?limit=6/);
  assert.match(editorial, /review\.comment/);
  assert.match(editorial, /copy\.experience/);
});

test('Responsive film and booking styles cover mobile and reduced motion', () => {
  for (const width of [390, 640, 900]) {
    assert.match(css, new RegExp(`@media\\s*\\(max-width:\\s*${width}px\\)`));
  }
  assert.match(css, /destinationField/);
  assert.match(css, /prefers-reduced-motion/);
});

test('All ten locales receive Royal Immersion through their existing homepage URLs', () => {
  const { royalHomepageArabic, royalHomepageEnglish } = loadTypeScript('src/i18n/royal-homepage-copy.ts');
  const { royalHomepageEast } = loadTypeScript('src/i18n/royal-homepage-copy-east.ts');
  const { royalHomepageWest } = loadTypeScript('src/i18n/royal-homepage-copy-west.ts');
  const copy = { ar: royalHomepageArabic, en: royalHomepageEnglish, ...royalHomepageEast, ...royalHomepageWest };
  const englishKeys = Object.keys(royalHomepageEnglish).sort();

  assert.deepEqual(Object.keys(copy).sort(), Array.from(LOCALES).sort());
  for (const [locale, columns] of Object.entries(copy)) {
    assert.deepEqual(Object.keys(columns).sort(), englishKeys, locale);
    assert.ok(Object.values(columns).every((value) => typeof value === 'string' && value.trim()), locale);
  }
  assert.equal(new Set(Object.values(copy).map(({ heroLine1 }) => heroLine1)).size, LOCALES.length);

  assert.match(app, /<SignatureFusionHomepage\s+locale=\{locale\}\s+rates=\{rates\}\s+routeStatus=\{routeStatus\}\s+dict=\{dict\}/);
  assert.doesNotMatch(app, /JourneyArchitectHomepage|locale\s*===/);
  assert.match(homepage, /COPY\[locale\]/);
  assert.match(homepage, /dir=\{dir\} lang=\{locale\}/);
});

test('Localized metadata and existing booking architecture remain', () => {
  assert.match(layout, /getLocalizedAlternates/);
  assert.match(app, /HomepageFaqJsonLd/);
  assert.match(app, /getDbPricesCached/);
  const booking = read('src/app/[locale]/booking/page.tsx');
  assert.match(booking, /BookingWizard/);
  assert.match(booking, /initialRates/);
});

test('Review API must not claim success after database insertion failure', () => {
  assert.doesNotMatch(reviews, /Seamless fallback: Acknowledge submission/);
  assert.match(reviews, /The review could not be saved/);
  assert.match(reviews, /Could not verify that the review was saved/);
});

test('Preview never requests indexing and production retains its SEO rules', () => {
  assert.match(layout, /VERCEL_ENV === 'preview'/);
  assert.match(layout, /index: false, follow: false/);
  assert.match(layout, /index: true/);
});

test('ScrollTrigger choreography respects reduced motion and cleans up its active scenes', () => {
  const motion = read('src/components/royal/RoyalMotion.tsx');
  assert.match(motion, /import\('gsap'\)/);
  assert.match(motion, /import\('gsap\/ScrollTrigger'\)/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /clipPath/);
  assert.match(motion, /strokeDashoffset/);
  assert.match(motion, /scrub:/);
  // Unpinned photographs avoid scrolling jumps and irregular full-page image sizes.
  assert.doesNotMatch(motion, /pin:\s*true/);
  assert.match(motion, /media\.revert\(\)/);
  assert.match(motion, /context\.revert\(\)/);
  assert.match(homepage, /<RoyalMotion\s*\/>/);
});
