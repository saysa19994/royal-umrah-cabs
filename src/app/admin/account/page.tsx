'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  Mail,
  Smartphone,
  LogOut,
  History,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Lock,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

interface OwnerProfile {
  id: string;
  auth_user_id: string;
  email: string;
  name: string;
  role: string;
  totp_enabled: boolean;
  created_at: string;
  updated_at?: string;
}

interface SecurityLog {
  id: string;
  action: string;
  resource: string;
  ip_address: string;
  created_at: string;
}

export default function OwnerAccountPage() {
  const [profile, setProfile] = useState<OwnerProfile | null>(null);
  const [mfaInfo, setMfaInfo] = useState<{ totp_enabled: boolean; factors_count: number; verified_factors: number } | null>(null);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [loading, setLoading] = useState(true);

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdTotpCode, setPwdTotpCode] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  // Email state
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailTotpCode, setEmailTotpCode] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Sessions state
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/account');
      const data = await res.json();
      if (res.ok && data.success) {
        setProfile(data.profile);
        setMfaInfo(data.mfa);
        setSecurityLogs(data.security_logs || []);
      } else {
        console.error('Failed to load account data:', data.error);
      }
    } catch (err) {
      console.error('Account data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (newPassword !== confirmPassword) {
      setPwdError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPwdError('New password must be at least 8 characters long');
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch('/api/admin/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          totpCode: pwdTotpCode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setPwdSuccess(data.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPwdTotpCode('');
      fetchAccountData();
    } catch (err: any) {
      setPwdError(err.message || 'Error changing password');
    } finally {
      setPwdLoading(false);
    }
  };

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);

    setEmailLoading(true);
    try {
      const res = await fetch('/api/admin/account/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newEmail: newEmail.trim(),
          currentPassword: emailPassword,
          totpCode: emailTotpCode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update email');
      }

      setEmailSuccess(data.message || 'Email updated successfully');
      setNewEmail('');
      setEmailPassword('');
      setEmailTotpCode('');
      fetchAccountData();
    } catch (err: any) {
      setEmailError(err.message || 'Error changing email');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleRevokeSessions = async () => {
    if (!confirm('Are you sure you want to sign out all other devices? Your current session will remain active.')) {
      return;
    }

    setSessionLoading(true);
    setSessionError(null);
    setSessionSuccess(null);

    try {
      const res = await fetch('/api/admin/account/sessions', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to revoke other sessions');
      }
      setSessionSuccess(data.message || 'All other active sessions have been revoked.');
      fetchAccountData();
    } catch (err: any) {
      setSessionError(err.message || 'Error revoking sessions');
    } finally {
      setSessionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#6C7584]">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D9A031]" />
        <span>Loading owner security credentials...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-start max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#262B33]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D9A031]/20 text-[#D9A031] border border-[#D9A031]/30">
              Root Authority
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AAL2 MFA Protected
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            Owner Account &amp; Credential Control
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1">
            Root access management for Duyuf Alrahman VIP. Credential modifications require current password and 6-digit TOTP challenge verification.
          </p>
        </div>
        <button
          onClick={fetchAccountData}
          className="px-4 py-2 rounded-xl bg-[#14171C] border border-[#262B33] hover:border-[#D9A031]/40 text-[#FAF9F6] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Grid: Profile & MFA Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2 bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <UserCheck className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Owner Profile Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#6C7584] block font-mono text-[10px] uppercase">Full Name</span>
              <span className="text-[#FAF9F6] font-semibold text-sm">{profile?.name || 'Administrator'}</span>
            </div>
            <div>
              <span className="text-[#6C7584] block font-mono text-[10px] uppercase">Primary Email Address</span>
              <span className="text-[#FAF9F6] font-semibold text-sm font-mono">{profile?.email}</span>
            </div>
            <div>
              <span className="text-[#6C7584] block font-mono text-[10px] uppercase">Access Level</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold bg-[#D9A031]/20 text-[#D9A031] mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                {profile?.role?.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-[#6C7584] block font-mono text-[10px] uppercase">Account Created</span>
              <span className="text-[#A0A6B2] font-mono text-[11px]">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* MFA Status Card */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <h2 className="font-display font-bold text-base text-[#FAF9F6]">
                Two-Factor MFA (AAL2)
              </h2>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A0A6B2]">Enforcement Level:</span>
                <span className="font-bold text-emerald-400 font-mono">AAL2 Strict</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A0A6B2]">Active TOTP Factors:</span>
                <span className="font-bold text-[#FAF9F6] font-mono">{mfaInfo?.verified_factors ?? 1} Verified</span>
              </div>
              <p className="text-[11px] text-[#6C7584] mt-3 leading-relaxed">
                Supabase TOTP is enforced at every login and credential change. If device access is lost, use the emergency recovery protocol in README.md.
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-[#262B33] text-[11px] text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>MFA Protected</span>
          </div>
        </div>
      </div>

      {/* Grid: Password Change & Email Change */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CHANGE PASSWORD */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Key className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Change Owner Password
            </h2>
          </div>

          {pwdSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{pwdSuccess}</span>
            </div>
          )}

          {pwdError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{pwdError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Two-Factor TOTP Authenticator Code (6 Digits)
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={pwdTotpCode}
                onChange={(e) => setPwdTotpCode(e.target.value)}
                placeholder="000000"
                className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono tracking-widest text-center"
              />
            </div>

            <button
              type="submit"
              disabled={pwdLoading}
              className="w-full py-2.5 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {pwdLoading ? 'Verifying & Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* CHANGE EMAIL */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Mail className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Change Owner Email Address
            </h2>
          </div>

          {emailSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{emailSuccess}</span>
            </div>
          )}

          {emailError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{emailError}</span>
            </div>
          )}

          <form onSubmit={handleEmailChange} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                New Email Address
              </label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="owner@duyufalrahmanvip.com"
                className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Current Password Confirmation
              </label>
              <input
                type="password"
                required
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Two-Factor TOTP Authenticator Code (6 Digits)
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={emailTotpCode}
                onChange={(e) => setEmailTotpCode(e.target.value)}
                placeholder="000000"
                className="w-full h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono tracking-widest text-center"
              />
            </div>

            <button
              type="submit"
              disabled={emailLoading}
              className="w-full py-2.5 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {emailLoading ? 'Verifying & Updating...' : 'Update Owner Email'}
            </button>
          </form>
        </div>
      </div>

      {/* SESSION MANAGEMENT & AUDIT TRAIL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Session Card */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <LogOut className="w-4 h-4 text-rose-400" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Session Control
            </h2>
          </div>

          <p className="text-xs text-[#A0A6B2] leading-relaxed">
            Revoke all other active session tokens and device cookies across any remote browser or mobile device.
          </p>

          {sessionSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{sessionSuccess}</span>
            </div>
          )}

          {sessionError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{sessionError}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleRevokeSessions}
            disabled={sessionLoading}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider transition-all"
          >
            {sessionLoading ? 'Revoking Sessions...' : 'Sign Out Other Devices'}
          </button>
        </div>

        {/* Security Audit Log */}
        <div className="md:col-span-2 bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <History className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Recent Owner Security Log
            </h2>
          </div>

          {securityLogs.length === 0 ? (
            <p className="text-xs text-[#6C7584] py-4 text-center">No recent security events logged.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#262B33] text-[#6C7584] text-[10px] uppercase font-mono">
                    <th className="pb-2">Action</th>
                    <th className="pb-2">Resource</th>
                    <th className="pb-2">IP Address</th>
                    <th className="pb-2 text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262B33]/50">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#1A1F26]">
                      <td className="py-2.5 font-mono text-[#D9A031]">{log.action}</td>
                      <td className="py-2.5 text-[#A0A6B2]">{log.resource}</td>
                      <td className="py-2.5 font-mono text-[#6C7584]">{log.ip_address || 'Internal'}</td>
                      <td className="py-2.5 text-right font-mono text-[#6C7584]">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
