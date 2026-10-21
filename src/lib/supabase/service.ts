import { createClient } from '@supabase/supabase-js';

export function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Use service role key if available and valid; otherwise fallback gracefully to anon key
  const effectiveKey = (serviceRoleKey && !serviceRoleKey.includes('placeholder') && !serviceRoleKey.includes('your-service-role'))
    ? serviceRoleKey
    : (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-service-key');

  return createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    effectiveKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
