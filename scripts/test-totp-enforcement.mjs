import test from 'node:test';
import assert from 'node:assert';

test('Forced TOTP Enrollment Logic: Owner and Admin must enroll 2FA before portal access', () => {
  function evaluateAccessRequirements(userProfile, aalLevel, nextAalLevel, options = {}) {
    const isOwnerOrAdmin = userProfile.role === 'owner' || userProfile.role === 'admin';
    const requiresMfa = isOwnerOrAdmin || userProfile.totp_enabled;

    if (!requiresMfa) {
      return { allowed: true };
    }

    // Owner/Admin without enrolled factor
    if (isOwnerOrAdmin && nextAalLevel !== 'aal2' && !userProfile.totp_enabled) {
      if (!options.allowEnrollmentFlow) {
        return {
          allowed: false,
          status: 403,
          code: 'MFA_ENROLLMENT_REQUIRED',
          require2faEnrollment: true,
        };
      }
      return { allowed: true, inEnrollmentFlow: true };
    }

    // Enrolled but not yet verified in current session
    if (aalLevel !== 'aal2') {
      return {
        allowed: false,
        status: 403,
        code: 'MFA_VERIFICATION_REQUIRED',
        require2fa: true,
      };
    }

    return { allowed: true };
  }

  // Case 1: First-time Owner login (not enrolled yet) accessing protected API
  const newOwner = { role: 'owner', email: 'owner@royalumrahcabs.com', totp_enabled: false };
  const blockedOwner = evaluateAccessRequirements(newOwner, 'aal1', 'aal1');
  assert.strictEqual(blockedOwner.allowed, false);
  assert.strictEqual(blockedOwner.code, 'MFA_ENROLLMENT_REQUIRED');
  assert.strictEqual(blockedOwner.status, 403);

  // Case 2: First-time Owner accessing setup-2fa enrollment flow
  const allowedEnrollment = evaluateAccessRequirements(newOwner, 'aal1', 'aal1', { allowEnrollmentFlow: true });
  assert.strictEqual(allowedEnrollment.allowed, true);
  assert.strictEqual(allowedEnrollment.inEnrollmentFlow, true);

  // Case 3: Owner enrolled in TOTP but visiting in new session with only AAL1
  const enrolledOwner = { role: 'owner', email: 'owner@royalumrahcabs.com', totp_enabled: true };
  const needsVerification = evaluateAccessRequirements(enrolledOwner, 'aal1', 'aal2');
  assert.strictEqual(needsVerification.allowed, false);
  assert.strictEqual(needsVerification.code, 'MFA_VERIFICATION_REQUIRED');

  // Case 4: Owner with verified AAL2 session
  const verifiedOwner = evaluateAccessRequirements(enrolledOwner, 'aal2', 'aal2');
  assert.strictEqual(verifiedOwner.allowed, true);

  // Case 5: Operator without TOTP enabled (normal single-factor session allowed)
  const operator = { role: 'operator', email: 'dispatch@royalumrahcabs.com', totp_enabled: false };
  const allowedOperator = evaluateAccessRequirements(operator, 'aal1', 'aal1');
  assert.strictEqual(allowedOperator.allowed, true);
});
