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
  { role: 'owner', resource: 'faqs', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'cms', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'owner', resource: 'media', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },

  // ADMIN: High-level operations
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
  { role: 'admin', resource: 'faqs', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: true },
  { role: 'admin', resource: 'cms', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: true, can_export: true },
  { role: 'admin', resource: 'media', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: true, can_export: true },

  // OPERATOR (Dispatcher): Scoped exclusively to assigned leads and bookings + WhatsApp Routing view
  { role: 'operator', resource: 'bookings', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'leads', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'pricing', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'fleet', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'whatsapp', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'settings', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'users', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'roles', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'audit_log', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'page_content', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'reviews', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'faqs', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'cms', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'operator', resource: 'media', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

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
  { role: 'driver', resource: 'reviews', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'faqs', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'cms', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },
  { role: 'driver', resource: 'media', can_view: false, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

  // CONTENT EDITOR: Marketing, CMS & Media
  { role: 'content_editor', resource: 'page_content', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: false },
  { role: 'content_editor', resource: 'cms', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: false },
  { role: 'content_editor', resource: 'faqs', can_view: true, can_create: true, can_edit: true, can_delete: false, can_publish: true, can_export: false },
  { role: 'content_editor', resource: 'media', can_view: true, can_create: true, can_edit: true, can_delete: true, can_publish: true, can_export: false },
  { role: 'content_editor', resource: 'fleet', can_view: true, can_create: false, can_edit: false, can_delete: false, can_publish: false, can_export: false },

  // TRANSLATOR: Multilingual Content
  { role: 'translator', resource: 'page_content', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'translator', resource: 'cms', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },
  { role: 'translator', resource: 'faqs', can_view: true, can_create: false, can_edit: true, can_delete: false, can_publish: false, can_export: false },

  // PARTNER: Referral Bookings
  { role: 'partner', resource: 'bookings', can_view: true, can_create: true, can_edit: false, can_delete: false, can_publish: false, can_export: false },
];

let memoryPermissions = [...DEFAULT_PERMISSIONS_MATRIX];

export async function getRolePermissions(): Promise<RolePermission[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.from('role_permissions').select('*');
    if (!error && data && data.length > 0) {
      // Merge DB records with defaults so missing resources still resolve safely
      const merged = [...DEFAULT_PERMISSIONS_MATRIX];
      data.forEach((dbRule) => {
        const idx = merged.findIndex((m) => m.role === dbRule.role && m.resource === dbRule.resource);
        if (idx !== -1) {
          merged[idx] = dbRule as RolePermission;
        } else {
          merged.push(dbRule as RolePermission);
        }
      });
      return merged;
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
