'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@royalumrahcabs.com');
  const [password, setPassword] = useState('RoyalUmrah2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Fallback for demo credentials if Supabase auth credentials are not yet synced
        if (email === 'admin@royalumrahcabs.com' && password === 'RoyalUmrah2026!') {
          localStorage.setItem('ruc_admin_authenticated', 'true');
          router.push('/admin');
          return;
        }
        setError(authError.message);
      } else if (data?.user) {
        localStorage.setItem('ruc_admin_authenticated', 'true');
        router.push('/admin');
      }
    } catch {
      // Offline/Demo fallback
      if (email === 'admin@royalumrahcabs.com' && password === 'RoyalUmrah2026!') {
        localStorage.setItem('ruc_admin_authenticated', 'true');
        router.push('/admin');
      } else {
        setError('Invalid credentials.');
      }
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
            Dispatch Portal
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Authorized Operations &amp; Chauffeur Control
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-start">
          <div>
            <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none"
              />
              <Mail className="w-4 h-4 text-[#6C7584] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 text-xs rounded-xl border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none"
              />
              <Lock className="w-4 h-4 text-[#6C7584] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#0D0F12] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#262B33] text-center">
          <p className="text-[11px] text-[#6C7584]">
            Preloaded Operator Account: <br />
            <code className="text-[#D9A031] font-mono">admin@royalumrahcabs.com</code>
          </p>
        </div>
      </div>
    </div>
  );
}
