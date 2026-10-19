import test from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';

const ALLOWED_STAFF_ROLES = [
  'operator',
  'driver',
  'content_editor',
  'translator',
  'partner',
  'admin',
];

const CreateUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(200),
  role: z.enum(ALLOWED_STAFF_ROLES, {
    errorMap: () => ({ message: 'Invalid role. Role must be operator, driver, content_editor, translator, partner, or admin' }),
  }),
  assigned_whatsapp_number: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'Assigned WhatsApp number must contain 8 to 15 digits only')
    .nullable()
    .optional(),
});

const UpdateUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  role: z.enum(ALLOWED_STAFF_ROLES, {
    errorMap: () => ({ message: 'Invalid role. Role must be operator, driver, content_editor, translator, partner, or admin' }),
  }).optional(),
  assigned_whatsapp_number: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'Assigned WhatsApp number must contain 8 to 15 digits only')
    .nullable()
    .optional(),
  is_suspended: z.boolean().optional(),
});

function simulateCreateUser(currentUser, payload) {
  // 1. Direct block on owner creation
  if (payload.role === 'owner') {
    return { status: 400, error: 'Direct creation of owner is forbidden' };
  }

  // 2. Zod parse
  const parsed = CreateUserSchema.safeParse(payload);
  if (!parsed.success) {
    return { status: 400, error: parsed.error.errors[0]?.message };
  }

  // 3. Admin appointing admin rule
  if (parsed.data.role === 'admin' && currentUser.role !== 'owner') {
    return { status: 403, error: 'Forbidden: Only the owner can appoint admin roles.' };
  }

  return { status: 200, success: true, user: parsed.data };
}

function simulateUpdateUser(currentUser, targetUser, payload) {
  // 1. Direct block on owner update
  if (payload.role === 'owner') {
    return { status: 400, error: 'Direct role update to owner is forbidden' };
  }

  // 2. Zod parse
  const parsed = UpdateUserSchema.safeParse(payload);
  if (!parsed.success) {
    return { status: 400, error: parsed.error.errors[0]?.message };
  }

  // 3. Target owner protection
  if (targetUser.role === 'owner') {
    if (parsed.data.is_suspended === true) {
      return { status: 403, error: 'Violation: The Owner cannot be suspended or locked out.' };
    }
    if (parsed.data.role && parsed.data.role !== 'owner') {
      return { status: 403, error: 'Violation: The Owner cannot be demoted.' };
    }
  }

  // 4. Admin promotion / modification rule
  if (currentUser.role !== 'owner' && (targetUser.role === 'admin' || parsed.data.role === 'admin')) {
    return { status: 403, error: 'Forbidden: Only the owner can modify administrator accounts.' };
  }

  return { status: 200, success: true, updated: parsed.data };
}

test('Privilege Escalation Prevention: admin cannot create an owner', () => {
  const adminUser = { email: 'admin@royalumrahcabs.com', role: 'admin' };
  const res = simulateCreateUser(adminUser, {
    name: 'New Owner',
    email: 'newowner@test.com',
    role: 'owner',
  });
  assert.equal(res.status, 400);
});

test('Privilege Escalation Prevention: admin cannot create another admin', () => {
  const adminUser = { email: 'admin@royalumrahcabs.com', role: 'admin' };
  const res = simulateCreateUser(adminUser, {
    name: 'Secondary Admin',
    email: 'admin2@test.com',
    role: 'admin',
  });
  assert.equal(res.status, 403);
});

test('Privilege Escalation Prevention: owner CAN create an admin', () => {
  const ownerUser = { email: 'owner@royalumrahcabs.com', role: 'owner' };
  const res = simulateCreateUser(ownerUser, {
    name: 'Authorized Admin',
    email: 'authorized_admin@test.com',
    role: 'admin',
    assigned_whatsapp_number: '966567588261',
  });
  assert.equal(res.status, 200);
  assert.equal(res.user.role, 'admin');
});

test('Privilege Escalation Prevention: admin cannot promote operator to owner or admin', () => {
  const adminUser = { email: 'admin@royalumrahcabs.com', role: 'admin' };
  const targetOperator = { id: 'usr-123', email: 'op@test.com', role: 'operator' };

  // Attempt promote to owner
  const resOwner = simulateUpdateUser(adminUser, targetOperator, {
    id: 'usr-123',
    role: 'owner',
  });
  assert.equal(resOwner.status, 400);

  // Attempt promote to admin
  const resAdmin = simulateUpdateUser(adminUser, targetOperator, {
    id: 'usr-123',
    role: 'admin',
  });
  assert.equal(resAdmin.status, 403);
});

test('Input Validation: invalid role string is rejected with 400', () => {
  const ownerUser = { email: 'owner@royalumrahcabs.com', role: 'owner' };
  const res = simulateCreateUser(ownerUser, {
    name: 'Hacker',
    email: 'hacker@test.com',
    role: 'super_admin_bypass',
  });
  assert.equal(res.status, 400);
});

test('Input Validation: invalid assigned_whatsapp_number is rejected with 400', () => {
  const ownerUser = { email: 'owner@royalumrahcabs.com', role: 'owner' };
  const resShort = simulateCreateUser(ownerUser, {
    name: 'Driver 1',
    email: 'driver1@test.com',
    role: 'driver',
    assigned_whatsapp_number: '123', // too short (< 8 digits)
  });
  assert.equal(resShort.status, 400);

  const resAlpha = simulateCreateUser(ownerUser, {
    name: 'Driver 2',
    email: 'driver2@test.com',
    role: 'driver',
    assigned_whatsapp_number: '966567588abc', // non-digits
  });
  assert.equal(resAlpha.status, 400);
});
