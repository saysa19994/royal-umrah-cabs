/**
 * Phone Number Normalization and Security Verification Utility
 *
 * Requirements:
 * 1. Strictly normalizes international and local phone numbers to digit-only E.164 format.
 * 2. Replaces partial/suffix comparisons (endsWith) with strict full-number equivalence.
 * 3. Handles Saudi local numbers (05XXXXXXXX -> 9665XXXXXXXX).
 * 4. Rejects invalid, truncated, or short numbers (< 8 digits).
 */

export function normalizePhoneNumber(rawPhone: string): string {
  if (!rawPhone || typeof rawPhone !== 'string') return '';

  // Strip all non-digit characters
  let digits = rawPhone.replace(/\D/g, '');

  // Strip leading international double zero (e.g. 00966 -> 966)
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

/**
 * Compares two phone numbers for exact identity under normalization.
 * NEVER allows partial trailing digit matches.
 */
export function verifyPhoneMatch(inputPhone: string, storedPhone: string): boolean {
  const normInput = normalizePhoneNumber(inputPhone);
  const normStored = normalizePhoneNumber(storedPhone);

  if (!normInput || !normStored) return false;
  if (normInput.length < 8 || normStored.length < 8) return false;

  return normInput === normStored;
}
