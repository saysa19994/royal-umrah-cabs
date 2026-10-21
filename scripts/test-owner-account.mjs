import test from 'node:test';
import assert from 'node:assert';
import { z } from 'zod';

// 1. Password Schema Test
const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  totpCode: z.string().optional().default(''),
});

// 2. Email Schema Test
const ChangeEmailSchema = z.object({
  newEmail: z.string().trim().email('Invalid new email address').max(200),
  currentPassword: z.string().min(1, 'Current password is required'),
  totpCode: z.string().trim().regex(/^\d{6}$/, 'TOTP code must be 6 digits'),
});

// 3. Settings Schema Test with All 9 Feature Flags + Dual WhatsApp
const SettingsUpdateSchema = z.object({
  phone: z.string().max(50).optional(),
  email: z.string().email().max(100).optional(),
  whatsapp_number: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  whatsapp_number_secondary: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  riyadh_enabled: z.boolean().optional(),
  address_cities: z.array(z.string().max(50)).optional(),
  google_reviews_link: z.string().url().max(255).optional().or(z.literal('')),
  google_reviews_rating: z.number().min(0).max(5).optional(),
  google_reviews_count: z.number().int().min(0).optional(),
  free_cancellation_hours: z.number().int().min(0).max(168).optional(),
  // Feature Flags
  flight_tracking_enabled: z.boolean().optional(),
  complimentary_water: z.boolean().optional(),
  zamzam_water: z.boolean().optional(),
  complimentary_child_seat: z.boolean().optional(),
  malay_speaking_chauffeur: z.boolean().optional(),
  free_miqat_stop: z.boolean().optional(),
  online_card_payment_enabled: z.boolean().optional(),
  bank_transfer_payment_enabled: z.boolean().optional(),
  coaster_enabled: z.boolean().optional(),
  airport_waiting_minutes: z.number().int().min(15).max(180).optional(),
  promo_banner_enabled: z.boolean().optional(),
  promo_banner_text: z.string().max(255).optional(),
});

test('Owner Account Security: Role Authorization Guard', () => {
  function verifyAccountAccess(role) {
    const allowedRoles = ['owner'];
    if (!role) return { status: 401, error: 'Unauthorized' };
    if (!allowedRoles.includes(role)) return { status: 403, error: 'Forbidden: Owner role required' };
    return { status: 200, success: true };
  }

  // Owner is allowed
  assert.strictEqual(verifyAccountAccess('owner').status, 200);

  // Admin is blocked
  assert.strictEqual(verifyAccountAccess('admin').status, 403);
  assert.strictEqual(verifyAccountAccess('admin').error, 'Forbidden: Owner role required');

  // Operator is blocked
  assert.strictEqual(verifyAccountAccess('operator').status, 403);

  // Anonymous is rejected
  assert.strictEqual(verifyAccountAccess(null).status, 401);
});

test('Owner Password Change: Strict Validation and Password Rules', () => {
  // Valid payload
  const valid = ChangePasswordSchema.safeParse({
    currentPassword: 'ExistingStrongPassword123!',
    newPassword: 'NewExecutivePassword2026@#',
    totpCode: '482910',
  });
  assert.strictEqual(valid.success, true);

  // Short password (< 6 chars)
  const shortPwd = ChangePasswordSchema.safeParse({
    currentPassword: 'ExistingStrongPassword123!',
    newPassword: 'short',
    totpCode: '482910',
  });
  assert.strictEqual(shortPwd.success, false);

  // Empty current password
  const emptyCurrent = ChangePasswordSchema.safeParse({
    currentPassword: '',
    newPassword: 'NewExecutivePassword2026@#',
  });
  assert.strictEqual(emptyCurrent.success, false);
});

test('Owner Email Change: Strict Validation and Differentiation', () => {
  const valid = ChangeEmailSchema.safeParse({
    newEmail: 'newowner@duyufalrahmanvip.com',
    currentPassword: 'ExistingStrongPassword123!',
    totpCode: '839201',
  });
  assert.strictEqual(valid.success, true);

  // Invalid email
  const badEmail = ChangeEmailSchema.safeParse({
    newEmail: 'not-an-email',
    currentPassword: 'ExistingStrongPassword123!',
    totpCode: '839201',
  });
  assert.strictEqual(badEmail.success, false);

  // Missing TOTP
  const noTotp = ChangeEmailSchema.safeParse({
    newEmail: 'newowner@duyufalrahmanvip.com',
    currentPassword: 'ExistingStrongPassword123!',
    totpCode: '',
  });
  assert.strictEqual(noTotp.success, false);
});

test('Database Trigger Logic: Owner Protection against Demotion or Suspension', () => {
  function checkOwnerProtection(oldRecord, newRecord, callingAuthUid) {
    if (oldRecord.role === 'owner') {
      if (callingAuthUid !== null && callingAuthUid !== oldRecord.auth_user_id) {
        throw new Error('Forbidden: Only the owner can modify owner account credentials or profile.');
      }
      if (newRecord.role !== 'owner') {
        throw new Error('Forbidden: Owner role cannot be demoted. Use official ownership transfer process.');
      }
      if (newRecord.is_suspended === true) {
        throw new Error('Forbidden: The platform owner cannot be suspended.');
      }
    }
    return true;
  }

  const owner = { auth_user_id: 'user-owner-123', role: 'owner', is_suspended: false };

  // 1. Another user attempting to modify owner profile
  assert.throws(
    () => checkOwnerProtection(owner, { ...owner, name: 'Hacked' }, 'user-attacker-456'),
    /Only the owner can modify owner account/
  );

  // 2. Attempting to demote owner to admin
  assert.throws(
    () => checkOwnerProtection(owner, { ...owner, role: 'admin' }, 'user-owner-123'),
    /Owner role cannot be demoted/
  );

  // 3. Attempting to suspend owner
  assert.throws(
    () => checkOwnerProtection(owner, { ...owner, is_suspended: true }, 'user-owner-123'),
    /The platform owner cannot be suspended/
  );

  // 4. Valid update by owner
  const valid = checkOwnerProtection(owner, { ...owner, name: 'Duyuf Alrahman Executive' }, 'user-owner-123');
  assert.strictEqual(valid, true);
});

test('Settings Update: Dynamic Feature Flags and Dual WhatsApp Validation', () => {
  const payload = {
    whatsapp_number: '966567588261',
    whatsapp_number_secondary: '966505316971',
    phone: '+966 50 531 6971',
    email: 'info@duyufalrahmanvip.com',
    airport_waiting_minutes: 60,
    flight_tracking_enabled: false,
    complimentary_water: true,
    zamzam_water: false,
    complimentary_child_seat: true,
    malay_speaking_chauffeur: false,
    free_miqat_stop: true,
    online_card_payment_enabled: false,
    bank_transfer_payment_enabled: false,
    coaster_enabled: false,
    riyadh_enabled: false,
    promo_banner_enabled: true,
    promo_banner_text: 'Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival',
  };

  const parsed = SettingsUpdateSchema.safeParse(payload);
  assert.strictEqual(parsed.success, true);
  if (parsed.success) {
    assert.strictEqual(parsed.data.airport_waiting_minutes, 60);
    assert.strictEqual(parsed.data.whatsapp_number, '966567588261');
    assert.strictEqual(parsed.data.whatsapp_number_secondary, '966505316971');
    assert.strictEqual(parsed.data.free_miqat_stop, true);
    assert.strictEqual(parsed.data.complimentary_child_seat, true);
  }
});
