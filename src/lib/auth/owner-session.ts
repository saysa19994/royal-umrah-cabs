/** @deprecated Direct owner sessions were retired because they bypassed required MFA.
 * All owner authentication must use Supabase Auth + AAL2 verified by requireRole.
 */
export const OWNER_EMAIL = (process.env.OWNER_EMAIL || '').trim().toLowerCase();
export function createOwnerSessionToken(): never { throw new Error('Direct owner sessions are disabled. Use Supabase MFA.'); }
export function verifyOwnerSessionToken(_token?: string | null): boolean { return false; }
