export type Role =
  | 'owner'
  | 'admin'
  | 'operator'
  | 'driver'
  | 'content_editor'
  | 'translator'
  | 'partner';

export type Resource =
  | 'bookings'
  | 'leads'
  | 'pricing'
  | 'fleet'
  | 'whatsapp'
  | 'settings'
  | 'users'
  | 'roles'
  | 'audit_log'
  | 'page_content'
  | 'reviews'
  | 'faqs'
  | 'cms'
  | 'media';

export type Action = 'view' | 'create' | 'edit' | 'delete' | 'publish' | 'export';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: Role;
  assigned_whatsapp_number?: string | null;
  is_suspended: boolean;
  totp_enabled: boolean;
  last_login_at?: string | null;
  created_at: string;
}

export interface RolePermission {
  role: Role;
  resource: Resource;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_publish: boolean;
  can_export: boolean;
}

export interface AuditLogEntry {
  id: string;
  user_email: string;
  user_role: Role;
  action: string;
  resource: string;
  resource_id?: string | null;
  old_values?: any;
  new_values?: any;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

export interface SessionData {
  user: UserProfile;
  expiresAt: number;
}
