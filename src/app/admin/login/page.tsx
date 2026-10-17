'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2FA TOTP Step
  const [step, setStep] = useState<'credentials' | 'totp'>('credentials');
  const [totpCode, setTotpCode] = useState('');
  const [tempUserEmail, setTempUserEmail] = useState('');
  const [tempUserRole, setTempUserRole] = useState('');

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.require2fa) {
        setTempUserEmail(data.email);
        setTempUserRole(data.role);
        setStep('totp');
      } else if (data.success && data.user) {
        localStorage.setItem('ruc_admin_authenticated', 'true');
        localStorage.setItem('ruc_admin_user', JSON.stringify(data.user));
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleTotpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: tempUserEmail, code: totpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid 2FA code');
      }

      if (data.success && data.user) {
        localStorage.setItem('ruc_admin_authenticated', 'true');
        localStorage.setItem('ruc_admin_user', JSON.stringify(data.user));
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#14171C] border border-[#262B33] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#D9A031]/10 border border-[#D9A031]/40 flex items-center justify-center text-2xl mx-auto mb-4">
            🕋
          </div>
          <h1 className="font-display text-2xl font-bold text-[#FAF9F6]">
            Dispatch &amp; Operations Portal
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Authorized Personnel &amp; Chauffeur Control
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {step === 'credentials' ? (
          <form onSubmit={handleCredentialsSubmit} className="space-y-4 text-start">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Authorized Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@royalumrahcabs.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none transition-all placeholder:text-[#555E6D]"
                />
                <Mail className="w-4 h-4 text-[#6C7584] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none transition-all placeholder:text-[#555E6D]"
                />
                <Lock className="w-4 h-4 text-[#6C7584] absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 rounded-xl bg-[#D9A031] text-[#14171C] font-bold text-xs uppercase tracking-wider hover:bg-[#B8821F] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#D9A031]/10"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTotpSubmit} className="space-y-4 text-start">
            <div className="p-3 rounded-xl bg-[#20252D] border border-[#2B323D] mb-4 text-center">
              <span className="text-xs text-[#A0A6B2] block">Authenticating:</span>
              <span className="text-xs font-bold text-[#FAF9F6]">{tempUserEmail}</span>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#D9A031]/20 text-[#D9A031]">
                {tempUserRole}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Two-Factor Code (TOTP)
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={6}
                  autoFocus
                  placeholder="6-digit code"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full h-12 pl-10 pr-3 text-center tracking-[0.3em] font-mono text-base font-bold rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none transition-all"
                />
                <KeyRound className="w-4 h-4 text-[#D9A031] absolute left-3.5 top-4" />
              </div>
              <p className="text-[11px] text-[#A0A6B2] mt-1.5 font-light">
                Open Google Authenticator or your authenticator app to retrieve your code.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || totpCode.length !== 6}
              className="w-full h-11 mt-2 rounded-xl bg-[#D9A031] text-[#14171C] font-bold text-xs uppercase tracking-wider hover:bg-[#B8821F] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-[#D9A031]/10"
            >
              {loading ? (
                <span>Verifying Token...</span>
              ) : (
                <>
                  <span>Verify &amp; Enter Portal</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('credentials');
                setError(null);
              }}
              className="w-full text-center text-xs text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors pt-2"
            >
              Back to email login
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-[#262B33] text-center text-[11px] text-[#6C7584]">
          <p>Protected by Supabase Auth with Mandatory TOTP 2FA</p>
          <p className="mt-1 text-[10px]">Royal Umrah Cabs Operations • Saudi Arabia</p>
        </div>
      </div>
    </div>
  );
}
