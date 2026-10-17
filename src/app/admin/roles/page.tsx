'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Check, X, RefreshCw, AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import { Role, Resource, RolePermission } from '@/types/auth';

const ROLES: { id: Role; label: string }[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'operator', label: 'Operator (Dispatcher)' },
  { id: 'driver', label: 'Driver' },
  { id: 'content_editor', label: 'Content Editor' },
  { id: 'translator', label: 'Translator' },
  { id: 'partner', label: 'Partner (Travel Agency)' },
];

const RESOURCES: { id: Resource; label: string; desc: string }[] = [
  { id: 'bookings', label: 'Bookings', desc: 'Chauffeur booking records, dispatch, passenger details' },
  { id: 'leads', label: 'Leads & Inquiries', desc: 'Pre-WhatsApp price calculations and lead tracking' },
  { id: 'pricing', label: 'Pricing & Seasons', desc: 'Route rates, vehicle rates, and seasonal multipliers' },
  { id: 'fleet', label: 'Fleet Management', desc: 'Vehicles, seating, luggage capacity, and photos' },
  { id: 'whatsapp', label: 'WhatsApp Routing', desc: 'Active dispatch numbers and routing rules' },
  { id: 'settings', label: 'Site Settings', desc: 'Global contact details, free cancellation hours, currencies' },
  { id: 'users', label: 'User Management', desc: 'Invite, suspend, and scope team members' },
  { id: 'roles', label: 'Role Permissions', desc: 'Granular resource access matrix configuration' },
  { id: 'audit_log', label: 'Audit Log', desc: 'System activity history and CSV export' },
  { id: 'page_content', label: 'Page Content & CMS', desc: 'SEO titles, descriptions, and pilgrimage guides' },
];

export default function AdminRolesPage() {
  const [selectedRole, setSelectedRole] = useState<Role>('operator');
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/roles');
      const data = await res.json();
      if (data.permissions) {
        setPermissions(data.permissions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const getPerm = (role: Role, resource: Resource): RolePermission => {
    const found = permissions.find((p) => p.role === role && p.resource === resource);
    return (
      found || {
        role,
        resource,
        can_view: false,
        can_create: false,
        can_edit: false,
        can_delete: false,
        can_publish: false,
        can_export: false,
      }
    );
  };

  const handleToggle = async (
    role: Role,
    resource: Resource,
    action: 'can_view' | 'can_create' | 'can_edit' | 'can_delete' | 'can_publish' | 'can_export'
  ) => {
    const current = getPerm(role, resource);
    const updated = {
      ...current,
      [action]: !current[action],
    };

    setSavingKey(`${resource}-${action}`);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/roles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setPermissions((prev) => {
        const filtered = prev.filter((p) => !(p.role === role && p.resource === resource));
        return [...filtered, updated];
      });

      setSuccessMsg(`Updated ${action.replace('can_', '')} permission on ${resource} for role ${role}.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update permission');
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/10 border border-[#D9A031]/30 text-xs font-bold text-[#D9A031] uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#FAF9F6]">
            Granular Permission Matrix
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Configure resource privileges per role. Changes are stored in PostgreSQL and enforced on both client and API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#D9A031] flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Owner is Permanently Unrestricted</span>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Role Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#262B33] pb-3">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRole(r.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRole === r.id
                ? 'bg-[#D9A031] text-[#14171C] shadow-sm'
                : 'bg-[#14171C] text-[#A0A6B2] hover:text-[#FAF9F6] border border-[#262B33]'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Permission Table */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#262B33] flex items-center justify-between">
          <span className="text-xs font-bold text-[#FAF9F6]">
            Configuring Privileges for Role: <span className="text-[#D9A031] uppercase">{selectedRole}</span>
          </span>
          <button
            onClick={fetchPermissions}
            className="text-xs text-[#A0A6B2] hover:text-[#FAF9F6] flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-[#1A1E24] text-[#A0A6B2] border-b border-[#262B33]">
                <th className="py-3 px-4 text-start font-semibold">Resource</th>
                <th className="py-3 px-4 text-center font-semibold">View</th>
                <th className="py-3 px-4 text-center font-semibold">Create</th>
                <th className="py-3 px-4 text-center font-semibold">Edit</th>
                <th className="py-3 px-4 text-center font-semibold">Delete</th>
                <th className="py-3 px-4 text-center font-semibold">Publish</th>
                <th className="py-3 px-4 text-center font-semibold">Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20252D]">
              {RESOURCES.map((res) => {
                const perm = getPerm(selectedRole, res.id);
                const actions: Array<'can_view' | 'can_create' | 'can_edit' | 'can_delete' | 'can_publish' | 'can_export'> = [
                  'can_view',
                  'can_create',
                  'can_edit',
                  'can_delete',
                  'can_publish',
                  'can_export',
                ];

                return (
                  <tr key={res.id} className="hover:bg-[#1A1F26] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#FAF9F6]">{res.label}</div>
                      <div className="text-[11px] text-[#A0A6B2] font-light mt-0.5">{res.desc}</div>
                    </td>

                    {actions.map((act) => {
                      const enabled = perm[act];
                      const isSaving = savingKey === `${res.id}-${act}`;
                      return (
                        <td key={act} className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggle(selectedRole, res.id, act)}
                            disabled={isSaving}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                              enabled
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-[#20252D] text-[#6C7584] border border-[#2B323D] hover:text-[#A0A6B2]'
                            }`}
                          >
                            {isSaving ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : enabled ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <X className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
