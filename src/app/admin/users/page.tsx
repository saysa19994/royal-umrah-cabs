'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Key,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Phone,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  Lock,
  Unlock,
  Trash2,
  Edit,
} from 'lucide-react';
import { UserProfile, Role } from '@/types/auth';

const AVAILABLE_ROLES: { role: Role; label: string; desc: string }[] = [
  { role: 'admin', label: 'Admin', desc: 'Operational manager with broad fleet, pricing, and dispatch access' },
  { role: 'operator', label: 'Operator (Dispatcher)', desc: 'Scoped exclusively to assigned WhatsApp leads and bookings' },
  { role: 'driver', label: 'Driver', desc: 'Can view only assigned passenger bookings and route details' },
  { role: 'content_editor', label: 'Content Editor', desc: 'Manages marketing guides, CMS content, and fleet descriptions' },
  { role: 'translator', label: 'Translator', desc: 'Reviews and refines multilingual dictionaries and localized pages' },
  { role: 'partner', label: 'Partner (Travel Agency)', desc: 'Accesses dedicated agency portal for referral bookings and commissions' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Invite Modal
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('operator');
  const [inviteScope, setInviteScope] = useState('966505316971');
  const [savingInvite, setSavingInvite] = useState(false);

  // Transfer Ownership Modal
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [targetEmail, setTargetEmail] = useState('');
  const [transferToken, setTransferToken] = useState('');
  const [transferInitiated, setTransferInitiated] = useState(false);
  const [processingTransfer, setProcessingTransfer] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err: any) {
      setError('Failed to fetch user list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingInvite(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName,
          email: inviteEmail,
          role: inviteRole,
          assigned_whatsapp_number: inviteRole === 'operator' ? inviteScope : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to invite user');

      setSuccess(`User ${inviteEmail} invited successfully as ${inviteRole}.`);
      setShowInviteModal(false);
      setInviteName('');
      setInviteEmail('');
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSavingInvite(false);
    }
  };

  const handleToggleSuspend = async (user: UserProfile) => {
    if (user.role === 'owner') {
      setError('Protection Error: The Owner cannot be suspended or locked out.');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          is_suspended: !user.is_suspended,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(`User status updated: ${user.name} is now ${!user.is_suspended ? 'Suspended' : 'Active'}.`);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRevokeUser = async (user: UserProfile) => {
    if (user.role === 'owner') {
      setError('Protection Error: The Owner cannot be deleted.');
      return;
    }

    if (!confirm(`Are you sure you want to revoke access for ${user.email}? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(`Access revoked for ${user.email}.`);
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInitiateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingTransfer(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/ownership/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_email: targetEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setTransferInitiated(true);
      setSuccess('Ownership transfer initiated. A confidential confirmation token has been sent to your verified owner email inbox. Check your email and enter the token below.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessingTransfer(false);
    }
  };

  const handleConfirmTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingTransfer(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/ownership/transfer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation_token: transferToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(data.message);
      setShowTransferModal(false);
      setTransferInitiated(false);
      setTransferToken('');
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProcessingTransfer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#14171C] border border-[#262B33] rounded-2xl p-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/10 border border-[#D9A031]/30 text-xs font-bold text-[#D9A031] uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Identity &amp; Role-Based Access Control</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#FAF9F6]">
            User &amp; Operator Management
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Manage authorized staff, configure operator WhatsApp scoping, and manage 2FA security.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-4 py-2.5 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs font-bold transition-colors flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Transfer Ownership</span>
          </button>

          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#D9A031] text-[#14171C] font-bold text-xs uppercase tracking-wider hover:bg-[#B8821F] hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#262B33] flex items-center justify-between">
          <span className="text-xs font-bold text-[#FAF9F6]">
            Active Team Members ({users.length})
          </span>
          <button
            onClick={fetchUsers}
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
                <th className="py-3 px-4 text-start font-semibold">User Details</th>
                <th className="py-3 px-4 text-start font-semibold">Assigned Role</th>
                <th className="py-3 px-4 text-start font-semibold">WhatsApp Scope</th>
                <th className="py-3 px-4 text-center font-semibold">2FA (TOTP)</th>
                <th className="py-3 px-4 text-center font-semibold">Status</th>
                <th className="py-3 px-4 text-end font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20252D]">
              {users.map((u) => {
                const isOwner = u.role === 'owner';
                return (
                  <tr key={u.id} className="hover:bg-[#1A1F26] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#FAF9F6] flex items-center gap-2">
                        <span>{u.name}</span>
                        {isOwner && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D9A031]/20 text-[#D9A031] border border-[#D9A031]/40">
                            ★ System Owner
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#A0A6B2] font-mono mt-0.5">{u.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                          u.role === 'owner'
                            ? 'bg-[#D9A031]/15 text-[#D9A031]'
                            : u.role === 'admin'
                            ? 'bg-blue-500/15 text-blue-400'
                            : u.role === 'operator'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-purple-500/15 text-purple-400'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {u.assigned_whatsapp_number ? (
                        <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px]">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          <span>+{u.assigned_whatsapp_number}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#6C7584]">Global (All Numbers)</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {u.totp_enabled ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#6C7584] bg-[#20252D] px-2 py-0.5 rounded-full">
                          <span>Disabled</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {u.is_suspended ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" />
                          <span>Suspended</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                          <Unlock className="w-3 h-3" />
                          <span>Active</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleSuspend(u)}
                          disabled={isOwner}
                          title={isOwner ? 'The Owner cannot be suspended' : 'Suspend / Activate'}
                          className="px-2.5 py-1 rounded-lg border border-[#2B323D] text-[11px] hover:border-[#D9A031]/50 disabled:opacity-30 disabled:cursor-not-allowed text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors"
                        >
                          {u.is_suspended ? 'Reactivate' : 'Suspend'}
                        </button>

                        <button
                          onClick={() => handleRevokeUser(u)}
                          disabled={isOwner}
                          title={isOwner ? 'The Owner cannot be deleted' : 'Revoke user'}
                          className="p-1.5 rounded-lg border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171C] border border-[#262B33] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-display font-bold text-lg text-[#FAF9F6] mb-1">
              Invite Team Member
            </h3>
            <p className="text-xs text-[#A0A6B2] mb-4">
              Create an authorized account and specify role and dispatch scope.
            </p>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-start">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Al-Ghamdi"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@royalumrahcabs.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Assign Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as Role)}
                  className="w-full h-10 px-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                >
                  {AVAILABLE_ROLES.map((r) => (
                    <option key={r.role} value={r.role}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {inviteRole === 'operator' && (
                <div>
                  <label className="block text-xs font-semibold text-[#D9A031] mb-1">
                    Scoped WhatsApp Number (Dispatch Channel)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="966505316971"
                    value={inviteScope}
                    onChange={(e) => setInviteScope(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl border border-[#D9A031]/50 bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none font-mono"
                  />
                  <p className="text-[11px] text-[#A0A6B2] mt-1 font-light">
                    The operator will exclusively see leads and bookings assigned to this number.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262B33]">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#A0A6B2] hover:text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingInvite}
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-[#14171C] font-bold text-xs uppercase tracking-wider hover:bg-[#B8821F] hover:text-white transition-all disabled:opacity-50"
                >
                  {savingInvite ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Ownership Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171C] border border-[#262B33] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400 mb-2">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h3 className="font-display font-bold text-lg text-[#FAF9F6]">
                Transfer Super-Admin Ownership
              </h3>
            </div>
            <p className="text-xs text-[#A0A6B2] leading-relaxed mb-4">
              This two-step confirmation transfers the immutable Owner role to a new verified email. The previous owner will be demoted to Admin. There must be at least one owner at all times.
            </p>

            {!transferInitiated ? (
              <form onSubmit={handleInitiateTransfer} className="space-y-4 text-start">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                    New Owner Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="newowner@royalumrahcabs.com"
                    value={targetEmail}
                    onChange={(e) => setTargetEmail(e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262B33]">
                  <button
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                    className="px-4 py-2 text-xs font-bold text-[#A0A6B2] hover:text-[#FAF9F6]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processingTransfer}
                    className="px-5 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all disabled:opacity-50"
                  >
                    {processingTransfer ? 'Initiating...' : 'Send Confirmation Email'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmTransfer} className="space-y-4 text-start">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <span className="text-xs font-bold block mb-1">Check Your Owner Email Inbox:</span>
                  <p className="text-xs text-amber-300 leading-relaxed">
                    A secure 64-character confirmation token was sent to your owner email address. Please copy the token from your email and paste it below to authorize this irreversible transfer.
                  </p>
                  <p className="text-[10px] mt-1.5 opacity-80">
                    The token is valid for 24 hours. Never share this token with anyone.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                    Enter Confirmation Token (from Email)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Paste 64-character token from email"
                    value={transferToken}
                    onChange={(e) => setTransferToken(e.target.value)}
                    className="w-full h-11 px-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#262B33]">
                  <button
                    type="button"
                    onClick={() => {
                      setTransferInitiated(false);
                      setShowTransferModal(false);
                    }}
                    className="px-4 py-2 text-xs font-bold text-[#A0A6B2] hover:text-[#FAF9F6]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processingTransfer || !transferToken}
                    className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-rose-500 transition-all disabled:opacity-50"
                  >
                    {processingTransfer ? 'Confirming...' : 'Finalize Ownership Transfer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
