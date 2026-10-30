import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('D:/royal-umrah-cabs/.env.vercel.tmp', 'utf8');
const parsed = {};
for (const line of env.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    parsed[key] = val;
  }
}

const supabase = createClient(parsed.NEXT_PUBLIC_SUPABASE_URL, parsed.SUPABASE_SERVICE_ROLE_KEY);

async function testUpdate() {
  // 1. Insert test review
  const { data: inserted, error: insErr } = await supabase.from('reviews').insert({
    customer_name: 'Test Pilgrim',
    rating: 5,
    comment: 'Alhamdulillah wonderful service',
    route: 'Jeddah Airport (KAIA) -> Makkah Hotel',
    is_approved: false
  }).select('*').single();

  console.log('Inserted review ID:', inserted?.id, 'is_approved:', inserted?.is_approved);

  // 2. Test update is_approved = true
  const { data: updated, error: updErr } = await supabase.from('reviews')
    .update({ is_approved: true })
    .eq('id', inserted.id)
    .select('*')
    .single();

  console.log('Updated is_approved result:', updated?.is_approved, 'error:', updErr);

  // 3. Clean up
  await supabase.from('reviews').delete().eq('id', inserted.id);
  console.log('Cleaned up test review');
}

testUpdate();
