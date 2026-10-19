import assert from 'node:assert';
import test from 'node:test';

// Direct unit test of phone normalization and exact matching security logic
function normalizePhoneNumber(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return '';

  let digits = rawPhone.replace(/\D/g, '');

  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  }

  // Handle Saudi local format: 05XXXXXXXX (10 digits) -> 9665XXXXXXXX
  if (digits.startsWith('05') && digits.length === 10) {
    digits = '966' + digits.slice(1);
  }

  // Handle Malaysian local mobile format: 01XXXXXXXX (10 or 11 digits) -> 601XXXXXXXX
  if (digits.startsWith('01') && (digits.length === 10 || digits.length === 11)) {
    digits = '60' + digits.slice(1);
  }

  return digits;
}

function verifyPhoneMatch(inputPhone, storedPhone) {
  const normInput = normalizePhoneNumber(inputPhone);
  const normStored = normalizePhoneNumber(storedPhone);

  if (!normInput || !normStored) return false;
  if (normInput.length < 8 || normStored.length < 8) return false;

  return normInput === normStored;
}

test('Phone normalization standardizes international formats', () => {
  assert.equal(normalizePhoneNumber('+966567588261'), '966567588261');
  assert.equal(normalizePhoneNumber('00966567588261'), '966567588261');
  assert.equal(normalizePhoneNumber('0567588261'), '966567588261');
  assert.equal(normalizePhoneNumber('+60 12 345 6789'), '60123456789');
});

test('Exact phone match succeeds across equivalent representations', () => {
  // Stored as +966..., provided as local 05...
  assert.equal(verifyPhoneMatch('+966567588261', '0567588261'), true);
  // Stored as local 05..., provided as +966...
  assert.equal(verifyPhoneMatch('0567588261', '+966567588261'), true);
  // Stored as 00966..., provided as 05...
  assert.equal(verifyPhoneMatch('00966567588261', '0567588261'), true);
  // Malaysian local to canonical
  assert.equal(verifyPhoneMatch('+60123456789', '012-345 6789'), true);
});

test('Trailing substring attacks are strictly rejected', () => {
  const victimPhone = '+966567588261';

  // Attacker provides only last 4 digits
  assert.equal(verifyPhoneMatch(victimPhone, '8261'), false);
  // Attacker provides only last 6 digits
  assert.equal(verifyPhoneMatch(victimPhone, '588261'), false);
  // Attacker provides partial without country code
  assert.equal(verifyPhoneMatch(victimPhone, '7588261'), false);
  // Reverse: Attacker stored shorter number, victim tries to match
  assert.equal(verifyPhoneMatch('588261', victimPhone), false);
});

test('Different country codes with identical local digits are strictly rejected', () => {
  // Saudi vs UAE
  assert.equal(verifyPhoneMatch('+966501234567', '+971501234567'), false);
  // Saudi vs UK
  assert.equal(verifyPhoneMatch('+966501234567', '+44501234567'), false);
  // Saudi vs Egypt (+20)
  assert.equal(verifyPhoneMatch('+966501234567', '+20501234567'), false);
});

test('Empty, invalid, and garbage inputs fail safely', () => {
  assert.equal(verifyPhoneMatch('', ''), false);
  assert.equal(verifyPhoneMatch(null, '+966567588261'), false);
  assert.equal(verifyPhoneMatch('+966567588261', undefined), false);
  assert.equal(verifyPhoneMatch('abc', 'def'), false);
  assert.equal(verifyPhoneMatch('123', '123'), false); // Too short (< 7 digits)
});
