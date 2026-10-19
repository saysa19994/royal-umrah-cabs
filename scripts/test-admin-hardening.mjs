import test from 'node:test';
import assert from 'node:assert';
import crypto from 'crypto';

test('CSV Formula Injection Sanitization', () => {
  function sanitizeCsvCell(value) {
    if (value === null || value === undefined) return '""';
    let str = typeof value === 'object' ? JSON.stringify(value) : String(value);
    // Neutralize CSV formula injection (=, +, -, @, \t, \r)
    if (/^[=+\-@\t\r]/.test(str)) {
      str = `'${str}`;
    }
    return `"${str.replace(/"/g, '""')}"`;
  }

  // Formula injection attempts
  assert.strictEqual(sanitizeCsvCell('=cmd|/c calc'), `"'=cmd|/c calc"`);
  assert.strictEqual(sanitizeCsvCell('+12345'), ` "'+12345"`.trim());
  assert.strictEqual(sanitizeCsvCell('-50+20'), ` "'-50+20"`.trim());
  assert.strictEqual(sanitizeCsvCell('@SUM(A1:A10)'), `"'@SUM(A1:A10)"`);
  assert.strictEqual(sanitizeCsvCell('\tmalicious'), `"'	malicious"`);

  // Safe normal inputs
  assert.strictEqual(sanitizeCsvCell('Ahmed Al-Ghamdi'), `"Ahmed Al-Ghamdi"`);
  assert.strictEqual(sanitizeCsvCell('admin@royalumrahcabs.com'), `"admin@royalumrahcabs.com"`);
});

test('Ownership Transfer Token Hashing with SHA-256', () => {
  const rawToken = crypto.randomBytes(32).toString('hex').toUpperCase();
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  // Verify hash properties
  assert.strictEqual(tokenHash.length, 64, 'SHA-256 hash must be 64 hex characters');
  assert.notStrictEqual(tokenHash, rawToken, 'Hashed token must never match plaintext token');

  // Verify incoming raw token produces the identical hash
  const incomingHash = crypto.createHash('sha256').update(rawToken.trim().toUpperCase()).digest('hex');
  assert.strictEqual(incomingHash, tokenHash, 'Verification hash matches stored hash');
});

test('Operator Scope Isolation: operators can only query their assigned WhatsApp number', () => {
  const bookings = [
    { id: '1', reference: 'RUC-AAA', whatsapp_number: '966567588261' },
    { id: '2', reference: 'RUC-BBB', whatsapp_number: '966505316971' },
    { id: '3', reference: 'RUC-CCC', whatsapp_number: '966505316971' },
    { id: '4', reference: 'RUC-DDD', whatsapp_number: '966567588261' },
  ];

  function filterBookingsForUser(user, items) {
    if (user.role === 'owner' || user.role === 'admin') {
      return items;
    }
    if (user.role === 'operator') {
      if (!user.assigned_whatsapp_number) return [];
      return items.filter((b) => b.whatsapp_number === user.assigned_whatsapp_number);
    }
    return [];
  }

  const operatorUser = { role: 'operator', assigned_whatsapp_number: '966505316971' };
  const scoped = filterBookingsForUser(operatorUser, bookings);

  assert.strictEqual(scoped.length, 2);
  assert.ok(scoped.every((b) => b.whatsapp_number === '966505316971'));

  const adminUser = { role: 'admin' };
  const adminView = filterBookingsForUser(adminUser, bookings);
  assert.strictEqual(adminView.length, 4, 'Admin sees all bookings across all numbers');
});
