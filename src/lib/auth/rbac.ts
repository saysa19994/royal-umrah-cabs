import { Role, Resource, Action, RolePermission, UserProfile } from '@/types/auth';
import { createServiceClient } from '../supabase/service';

export const DEFAULT_PERMISSIONS_MATRIX: RolePermission[] = [
  // OWNER: Unrestricted Super-Admin Access
  { role: 'owner', resource: 'bookings', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'leads', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'pricing', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'fleet', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'whatsapp', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'settings', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'users', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'roles', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'audit_log', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'page_content', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'reviews', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },

  // ADMIN: High-level operations, cannot delete owner or edit role permissions
  { role: 'admin', resource: 'bookings', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: false, can_export: true },
  { role: 'admin', resource: 'leads', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: false, can_export: true },
  { role: 'admin', resource: 'pricing', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'fleet', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'whatsapp', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'settings', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'users', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'roles', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'admin', resource: 'audit_log', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: true },
  { role: 'admin', resource: 'page_content', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: true, can_export: true },
  { role: 'admin', resource: 'reviews', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },

  // OPERATOR (Dispatcher): Scoped exclusively to assigned leads and bookings
  { role: 'operator', resource: 'bookings', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'leads', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'pricing', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'fleet', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'whatsapp', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'settings', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'users', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'roles', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'audit_log', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'page_content', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'reviews', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

  // DRIVER: View assigned bookings only
  { role: 'driver', resource: 'bookings', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'leads', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'pricing', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'fleet', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'whatsapp', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'settings', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'users', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'roles', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'audit_log', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'page_content', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

  // CONTENT EDITOR: Marketing & CMS
  { role: 'content_editor', resource: 'page_content', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: false },
  { role: 'content_editor', resource: 'fleet', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

  // TRANSLATOR: Multilingual Content
  { role: 'translator', resource: 'page_content', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },

  // PARTNER: Referral Bookings
  { role: 'partner', resource: 'bookings', can_view: true, can_create: true, can_edit: false, can_delete: false, can_publish: false, can_export: false },
];

let memoryPermissions = [...DEFAULT_PERMISSIONS_MATRIX];

export async function getRolePermissions(): Promise<RolePermission[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('role_permissions').select('*');
    if (!error && data && data.length > 0) {
      return data as RolePermission[];
    }
  } catch (e) {
    console.warn('Using memory permissions fallback:', e);
  }
  return memoryPermissions;
}

export async function hasPermission(role: Role, resource: Resource, action: Action): Promise<boolean> {
  if (role === 'owner') return true; // Owner has unrestricted access to everything

  const permissions = await getRolePermissions();
  const rule = permissions.find((p) => p.role === role && p.resource === resource);
  if (!rule) return false;

  switch (action) {
    case 'view':
      return rule.can_view;
    case 'create':
      return rule.can_create;
    case 'edit':
      return rule.can_edit;
    case 'delete':
      return rule.can_delete;
    case 'publish':
      return rule.can_publish;
    case 'export':
      return rule.can_export;
    default:
      return false;
  }
}

export function canModifyUser(callerRole: Role, targetRole: Role): boolean {
  if (callerRole === 'owner') return true;
  if (targetRole === 'owner') return false; // Non-owner can NEVER modify owner
  if (callerRole === 'admin') {
    return targetRole !== 'admin';
  }
  return false;
}

export function getScopeFilter(profile: UserProfile): { whatsapp_number?: string } | null {
  if (profile.role === 'owner' || profile.role === 'admin') {
    return null; // Unrestricted access
  }
  if (profile.role === 'operator' && profile.assigned_whatsapp_number) {
    return { whatsapp_number: profile.assigned_whatsapp_number };
  }
  return null;
}
