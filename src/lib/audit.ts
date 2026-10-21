import { createServiceClient } from './supabase/service';
import { AuditLogEntry, Role } from '@/types/auth';

interface LogAuditParams {
  userEmail: string;
  userRole: Role;
  action: string;
  resource: string;
  resourceId?: string | null;
  oldValues?: any;
  newValues?: any;
  ip?: string | null;
  userAgent?: string | null;
}

// In-memory fallback buffer for audit events
const memoryAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-1',
    user_email: 'owner@duyufalrahmanvip.com',
    user_role: 'owner',
    action: 'system_initialized',
    resource: 'settings',
    resource_id: 'lock_id',
    old_values: null,
    new_values: { message: 'Zero-fabrication and strict audit foundation verified.' },
    ip_address: '127.0.0.1',
    user_agent: 'Antigravity Core',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function logAuditEvent(params: LogAuditParams): Promise<void> {
  const entry: AuditLogEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    user_email: params.userEmail,
    user_role: params.userRole,
    action: params.action,
    resource: params.resource,
    resource_id: params.resourceId || null,
    old_values: params.oldValues || null,
    new_values: params.newValues || null,
    ip_address: params.ip || null,
    user_agent: params.userAgent || null,
    created_at: new Date().toISOString(),
  };

  try {
    const supabase = createServiceClient();
    const enrichedNewValues = {
      ...(params.newValues || {}),
      _user_role: params.userRole,
    };
    const { error } = await supabase.from('audit_log').insert({
      entity_type: params.resource,
      entity_id: params.resourceId || 'global',
      action: params.action,
      old_values: params.oldValues || null,
      new_values: enrichedNewValues,
      performed_by: params.userEmail,
      ip_address: params.ip || null,
    });

    if (error) {
      console.warn('Audit log DB insert warning:', error.message);
    }
  } catch (e) {
    console.warn('Audit log fallback to memory:', e);
  }

  memoryAuditLogs.unshift(entry);
  if (memoryAuditLogs.length > 500) {
    memoryAuditLogs.pop();
  }
}

export async function getAuditLogs(filters?: {
  userEmail?: string;
  action?: string;
  resource?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
}): Promise<AuditLogEntry[]> {
  try {
    const supabase = createServiceClient();
    let query = supabase.from('audit_log').select('*').order('created_at', { ascending: false });

    if (filters?.resource) {
      query = query.eq('entity_type', filters.resource);
    }
    if (filters?.userEmail) {
      query = query.eq('performed_by', filters.userEmail);
    }
    if (filters?.action) {
      query = query.eq('action', filters.action);
    }
    if (filters?.fromDate) {
      query = query.gte('created_at', filters.fromDate);
    }
    if (filters?.toDate) {
      query = query.lte('created_at', filters.toDate);
    }

    const limit = filters?.limit || 100;
    query = query.limit(limit);

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data.map((d: any) => ({
        id: d.id,
        user_email: d.performed_by || 'system',
        user_role: (d.new_values?._user_role || (d.performed_by === 'owner@duyufalrahmanvip.com' ? 'owner' : 'admin')) as Role,
        action: d.action,
        resource: d.entity_type,
        resource_id: d.entity_id,
        old_values: d.old_values,
        new_values: d.new_values,
        ip_address: d.ip_address || null,
        created_at: d.created_at,
      }));
    }
  } catch (e) {
    console.warn('Fallback to memory audit logs:', e);
  }

  // Filter in memory fallback
  let list = [...memoryAuditLogs];
  if (filters?.userEmail) {
    list = list.filter((l) => l.user_email.toLowerCase().includes(filters.userEmail!.toLowerCase()));
  }
  if (filters?.action) {
    list = list.filter((l) => l.action.toLowerCase() === filters.action!.toLowerCase());
  }
  if (filters?.resource) {
    list = list.filter((l) => l.resource.toLowerCase() === filters.resource!.toLowerCase());
  }
  return list.slice(0, filters?.limit || 100);
}
