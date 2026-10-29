import assert from 'node:assert';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Mirror of ReviewSubmissionSchema for standalone unit test verification
const ReviewSubmissionSchema = z
  .object({
    customer_name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(80, 'Name cannot exceed 80 characters'),
    rating: z
      .number()
      .int('Rating must be an integer')
      .min(1, 'Minimum rating is 1 star')
      .max(5, 'Maximum rating is 5 stars'),
    comment: z
      .string()
      .min(10, 'Review must be at least 10 characters')
      .max(1000, 'Review cannot exceed 1000 characters'),
    route: z.string().max(120).optional().nullable(),
    service_type: z.string().max(80).optional().nullable(),
    country: z.string().max(80).optional().nullable(),
    booking_reference: z.string().max(40).optional().nullable(),
    language: z.enum(['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr']).default('en'),
    turnstile_token: z.string().max(2048).optional(),
    'cf-turnstile-response': z.string().max(2048).optional(),
  })
  .strict();

function sanitizeReviewText(input) {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"]/g, (match) => {
      switch (match) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        default: return match;
      }
    })
    .trim();
}

test('Reviews System: Validation Schema rejects invalid inputs and oversized content', () => {
  // 1. Valid submission passes
  const valid = ReviewSubmissionSchema.safeParse({
    customer_name: 'Haji Ahmad',
    rating: 5,
    comment: 'Alhamdulillah, excellent punctual chauffeur and clean vehicle.',
    route: 'Jeddah Airport (KAIA) → Makkah Hotel',
    country: 'Malaysia',
    language: 'ms'
  });
  assert.strictEqual(valid.success, true, 'Valid submission must pass schema validation');

  // 2. Rating < 1 must be rejected
  const invalidRatingLow = ReviewSubmissionSchema.safeParse({
    customer_name: 'Test Pilgrim',
    rating: 0,
    comment: 'Valid comment with enough length.',
  });
  assert.strictEqual(invalidRatingLow.success, false, 'Rating 0 must fail');

  // 3. Rating > 5 must be rejected
  const invalidRatingHigh = ReviewSubmissionSchema.safeParse({
    customer_name: 'Test Pilgrim',
    rating: 6,
    comment: 'Valid comment with enough length.',
  });
  assert.strictEqual(invalidRatingHigh.success, false, 'Rating 6 must fail');

  // 4. Comment < 10 chars must be rejected
  const shortComment = ReviewSubmissionSchema.safeParse({
    customer_name: 'Test Pilgrim',
    rating: 5,
    comment: 'Too short',
  });
  assert.strictEqual(shortComment.success, false, 'Short comment must fail');

  // 5. Comment > 1000 chars must be rejected
  const oversizedComment = ReviewSubmissionSchema.safeParse({
    customer_name: 'Test Pilgrim',
    rating: 5,
    comment: 'A'.repeat(1001),
  });
  assert.strictEqual(oversizedComment.success, false, 'Oversized comment > 1000 chars must fail');

  // 6. Unknown fields rejected strictly
  const unknownFields = ReviewSubmissionSchema.safeParse({
    customer_name: 'Test Pilgrim',
    rating: 5,
    comment: 'Valid comment with enough length.',
    status: 'published', // Malicious attempt to self-publish
    is_approved: true
  });
  assert.strictEqual(unknownFields.success, false, 'Unknown fields like status/is_approved must be rejected by schema');
});

test('Reviews System: HTML and Script tags are sanitized', () => {
  const dirty = '<script>alert("hack")</script><b>Great trip</b>';
  const clean = sanitizeReviewText(dirty);

  assert.ok(!clean.includes('<script>'), 'Sanitized text must not contain script tags');
  assert.ok(!clean.includes('<b>'), 'Sanitized text must not contain HTML tags');
  assert.strictEqual(clean, 'alert(&quot;hack&quot;)Great trip');
});

test('Reviews System: RBAC matrix grants review moderation exclusively to owner and admin', () => {
  const rbacContent = fs.readFileSync(path.join(rootDir, 'src/lib/auth/rbac.ts'), 'utf8');

  assert.ok(rbacContent.includes("{ role: 'owner', resource: 'reviews'"), 'Owner must have reviews permission configured');
  assert.ok(rbacContent.includes("{ role: 'admin', resource: 'reviews'"), 'Admin must have reviews permission configured');
  assert.ok(rbacContent.includes("{ role: 'operator', resource: 'reviews', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false"), 'Operator must have read-only reviews permission without edit/delete/publish');
});

test('Reviews System: Database migration 004 enforces strict RLS policies', () => {
  const migrationPath = path.join(rootDir, 'supabase/migrations/004_reviews_system.sql');
  assert.strictEqual(fs.existsSync(migrationPath), true, '004_reviews_system.sql migration must exist');

  const sql = fs.readFileSync(migrationPath, 'utf8');
  assert.ok(sql.includes('ENABLE ROW LEVEL SECURITY'), 'Must enable RLS on reviews table');
  assert.ok(sql.includes('Public read published reviews'), 'Must define public read policy for published only');
  assert.ok(sql.includes("status = 'published' AND is_approved = TRUE"), 'Public policy must require status published and is_approved');
  assert.ok(sql.includes('Staff manage reviews'), 'Must define staff manage policy');
  assert.ok(sql.includes('Public submit pending reviews'), 'Must define insert policy restricted to pending');
});

test('Reviews System: All 10 dictionaries include localized reviews translations', () => {
  const locales = ['en', 'ar', 'ms', 'id', 'tr', 'ur', 'fr', 'es', 'de', 'hi'];

  for (const loc of locales) {
    const dictPath = path.join(rootDir, `src/i18n/dictionaries/${loc}.json`);
    assert.strictEqual(fs.existsSync(dictPath), true, `Dictionary must exist for ${loc}`);

    const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
    assert.ok(dict.reviews, `Dictionary for ${loc} must contain reviews object`);
    assert.ok(dict.reviews.heading, `Dictionary for ${loc} must contain reviews.heading`);
    assert.ok(dict.reviews.writeReviewBtn, `Dictionary for ${loc} must contain reviews.writeReviewBtn`);
    assert.ok(dict.reviews.nameLabel, `Dictionary for ${loc} must contain reviews.nameLabel`);
    assert.ok(dict.reviews.ratingLabel, `Dictionary for ${loc} must contain reviews.ratingLabel`);
    assert.ok(dict.reviews.commentLabel, `Dictionary for ${loc} must contain reviews.commentLabel`);
  }
});

test('Reviews System: Dedicated reviews page exists and preserves localized routing', () => {
  const reviewsPagePath = path.join(rootDir, 'src/app/[locale]/reviews/page.tsx');
  assert.strictEqual(fs.existsSync(reviewsPagePath), true, 'Dedicated reviews page must exist');

  const pageContent = fs.readFileSync(reviewsPagePath, 'utf8');
  assert.ok(pageContent.includes("getLocalizedAlternates(locale, '/reviews')"), 'Reviews page must configure localized alternates');
  assert.ok(pageContent.includes('ReviewsSection'), 'Reviews page must render ReviewsSection component');
});
