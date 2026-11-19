'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VipBrandMark } from '@/components/admin/VipBrandMark';
import { Shield, Lock, Mail, ArrowRight, KeyRound, CheckCircle2, AlertTriangle, QrCode, Eye, EyeOff, CarFront, CalendarDays, UsersRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth Steps: 'credentials' | 'totp' | 'enroll'
  const [step, setStep] = useState<'credentials' | 'totp' | 'enroll'>('credentials');
  const [totpCode, setTotpCode] = useState('');
  const [tempUserEmail, setTempUserEmail] = useState('');
  const [tempUserRole, setTempUserRole] = useState('');

  // Forced First-Time TOTP Enrollment
  const [enrollFactorId, setEnrollFactorId] = useState('');
  const [enrollSecret, setEnrollSecret] = useState('');
  const [enrollQr, setEnrollQr] = useState('');

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

        if (data.isEnrolled === false) {
          // Trigger first-time enrollment
          const enrollRes = await fetch('/api/admin/auth/setup-2fa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          const enrollData = await enrollRes.json();
          if (!enrollRes.ok) {
            throw new Error(enrollData.error || 'Failed to initiate 2FA setup');
          }
          setEnrollFactorId(enrollData.factorId);
          setEnrollSecret(enrollData.secret);
          setEnrollQr(typeof enrollData.qrImageUrl === 'string' && enrollData.qrImageUrl.startsWith('data:image/svg+xml;base64,') ? enrollData.qrImageUrl : '');
          setStep('enroll');
        } else {
          setStep('totp');
        }
      } else if (data.success && data.user) {
        router.push('/admin');
        router.refresh();
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
        body: JSON.stringify({ code: totpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid 2FA code');
      }

      if (data.success && data.user) {
        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth/setup-2fa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ factorId: enrollFactorId, code: totpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to confirm 2FA setup');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Setup verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vip-login">
      <div className="vip-login-photo" aria-hidden="true">
        <div className="vip-login-brand">
          <div className="mb-14 flex items-center gap-4 md:mb-20">
            <VipBrandMark size={70} />
            <div className="border-l border-[#d6b071]/60 pl-4">
              <p className="vip-brand-serif text-[clamp(21px,2vw,32px)] font-bold leading-tight">Duyuf Al Rahman VIP</p>
              <p className="mt-1 text-[11px] font-bold tracking-[.26em] text-[#dfbc7e]">CHAUFFEUR SERVICES</p>
            </div>
          </div>

          <p className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.19em] text-[#e7c38c]">
            <span className="h-[2px] w-11 bg-[#d9b277]"/> SECURE OPERATIONS
          </p>
          <h1>Dispatch &amp;<br/>Operations Portal</h1>
          <p className="mt-7 text-lg font-semibold italic text-[#f4e7d1]">Chauffeur and Operations Control</p>
          <p className="vip-login-brand-description mt-5 max-w-xl text-[15px] leading-7 text-[#d9e3e8]">
            A dedicated command center for reservations, chauffeur dispatch, fleet schedules and private hospitality services.
          </p>

          <div className="vip-login-feature-row mt-10 flex max-w-2xl flex-wrap gap-5 border-t border-white/20 pt-6">
            <div className="vip-login-feature"><CarFront size={27}/><span>Dispatch &amp; Fleet<br/>Management</span></div>
            <div className="vip-login-feature"><CalendarDays size={27}/><span>Schedules &amp;<br/>Operations</span></div>
            <div className="vip-login-feature"><UsersRound size={27}/><span>VIP Chauffeur<br/>Services</span></div>
          </div>
        </div>
      </div>

      <div className="vip-login-right">
        <div className="vip-login-card">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-[94px] w-[94px] items-center justify-center rounded-[24px] border border-[#ddbb78]/60 bg-gradient-to-br from-[#075f5c] to-[#042e35] shadow-lg shadow-[#045353]/10">
              <VipBrandMark size={60} />
            </div>
            <h2 className="vip-brand-serif text-[clamp(26px,2.2vw,39px)] font-bold leading-tight text-[#102b38]">
              {step === 'credentials' ? 'Sign In to Admin Portal' : step === 'totp' ? 'Verify Your Identity' : 'Secure Your Account'}
            </h2>
            <p className="mt-2 text-sm text-[#657481]">
              {step === 'credentials' ? 'Dispatch & Operations Control' : step === 'totp' ? 'Two-factor authentication' : 'Mandatory authenticator setup'}
            </p>
            <div className="mx-auto mt-5 flex max-w-[260px] items-center gap-2 text-[#c19554]">
              <span className="h-px flex-1 bg-[#d6b481]"/><span className="h-2.5 w-2.5 rotate-45 bg-[#c79b56]"/><span className="h-px flex-1 bg-[#d6b481]"/>
            </div>
          </div>

          {error && (
            <div role="alert" className="mb-5 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/><span>{error}</span>
            </div>
          )}

          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-5">
              <label className="block">
                <span className="vip-login-label"><Mail className="h-4 w-4"/> Authorized Email</span>
                <input type="email" autoComplete="username" required autoFocus placeholder="name@duyufalrahmanvip.com"
                  className="vip-login-field" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <label className="block">
                <span className="vip-login-label"><Lock className="h-4 w-4"/> Password</span>
                <span className="relative block">
                  <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
                    placeholder="Enter your password" className="vip-login-field pr-12"
                    value={password} onChange={e => setPassword(e.target.value)}/>
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#647681] hover:text-[#004e57]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                  </button>
                </span>
              </label>
              <p className="text-xs text-[#607681]">Access is limited to authorized operations personnel.</p>
              <button type="submit" disabled={loading} className="vip-login-submit">
                {loading ? 'Authenticating…' : 'SIGN IN'}{!loading && <ArrowRight className="h-5 w-5"/>}
              </button>
            </form>
          )}

          {step === 'totp' && (
            <form onSubmit={handleTotpSubmit} className="space-y-5">
              <p className="rounded-xl bg-[#e6efed] px-4 py-3 text-sm text-[#244c50]">
                Authenticator verification for <strong>{tempUserEmail}</strong>.
              </p>
              <label className="block">
                <span className="vip-login-label"><KeyRound className="h-4 w-4"/> Six-digit authenticator code</span>
                <input type="text" inputMode="numeric" autoComplete="one-time-code" autoFocus required
                  maxLength={6} value={totpCode} onChange={e => setTotpCode(e.target.value.replace(/\D/g,''))}
                  placeholder="000000" className="vip-login-field text-center font-mono text-xl tracking-[.35em]"/>
              </label>
              <p className="text-xs text-[#657481]">Enter the current code from your authenticator app.</p>
              <button type="submit" disabled={loading || totpCode.length !== 6} className="vip-login-submit">
                {loading ? 'Verifying…' : 'VERIFY & ENTER'}<CheckCircle2 className="h-5 w-5"/>
              </button>
              <button type="button" onClick={() => { setStep('credentials'); setError(null); setTotpCode(''); }}
                className="w-full rounded-lg py-2 text-sm font-semibold text-[#256267] hover:underline">Back to email login</button>
            </form>
          )}

          {step === 'enroll' && (
            <form onSubmit={handleEnrollSubmit} className="space-y-5">
              <div className="rounded-xl border border-[#cfe3df] bg-[#e9f0ed] p-4 text-sm">
                <p className="mb-2 flex items-center gap-2 font-bold text-[#145e5d]"><QrCode className="h-4 w-4"/> Mandatory 2FA setup</p>
                <p className="text-xs leading-6 text-[#61717a]">Add this security key to your authenticator app, then enter its current six-digit code. Do not share the key.</p>
                {enrollQr && <img src={enrollQr} alt="Scan with your authenticator app"
                  width={160} height={160} className="mx-auto my-3 rounded-lg bg-white p-2" />}
                <code className="mt-3 block select-all break-all rounded-lg bg-white px-3 py-2 text-center font-mono text-xs text-[#1c504f]">{enrollSecret}</code>
              </div>
              <label className="block">
                <span className="vip-login-label"><KeyRound className="h-4 w-4"/> Confirmation code</span>
                <input type="text" inputMode="numeric" maxLength={6} autoComplete="one-time-code"
                  required autoFocus value={totpCode} onChange={e => setTotpCode(e.target.value.replace(/\D/g,''))}
                  placeholder="000000" className="vip-login-field text-center font-mono text-xl tracking-[.35em]"/>
              </label>
              <button type="submit" disabled={loading || totpCode.length !== 6} className="vip-login-submit">
                {loading ? 'Activating…' : 'ACTIVATE 2FA'}<CheckCircle2 className="h-5 w-5"/>
              </button>
              <button type="button" onClick={() => { setStep('credentials'); setError(null); setTotpCode(''); }}
                className="w-full rounded-lg py-2 text-sm text-[#256267] hover:underline">Back to login</button>
            </form>
          )}

          <div className="vip-login-trust mt-8">
            <Shield className="h-7 w-7 shrink-0 text-[#0f6464]"/>
            <div>
              <p className="text-sm font-bold">Secured by Supabase Auth & 2FA</p>
              <p className="mt-1 text-xs text-[#61727d]">Protected staff accounts and verified access.</p>
            </div>
          </div>
          <div className="mt-7 border-t border-[#d9d2c6] pt-5 text-center text-xs text-[#64717b]">
            Duyuf Al Rahman VIP Operations • Saudi Arabia
          </div>
        </div>
      </div>
    </div>
  );
}
