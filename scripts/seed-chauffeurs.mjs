import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync('D:/royal-umrah-cabs/.env.local', 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const ROSTER = [
  {
    name: 'Captain Ahmad Al-Harbi',
    phone: '+966567588261',
    vehicle_plate: 'KSA 7777 VIP',
    vehicle_model: 'GMC Yukon XL VIP',
    spoken_languages: ['Arabic', 'English'],
    is_active: true
  },
  {
    name: 'Captain Tariq Al-Otaibi',
    phone: '+966505316971',
    vehicle_plate: 'KSA 3030 VIP',
    vehicle_model: 'Hyundai Staria VIP',
    spoken_languages: ['Arabic', 'English', 'Urdu'],
    is_active: true
  },
  {
    name: 'Captain Faisal Al-Ghamdi',
    phone: '+966567588261',
    vehicle_plate: 'KSA 1010 VIP',
    vehicle_model: 'Toyota Camry VIP',
    spoken_languages: ['Arabic', 'English'],
    is_active: true
  },
  {
    name: 'Captain Mahmoud Al-Sayed',
    phone: '+966505316971',
    vehicle_plate: 'KSA 5050 VIP',
    vehicle_model: 'Toyota HiAce VIP',
    spoken_languages: ['Arabic', 'English', 'Malay'],
    is_active: true
  },
  {
    name: 'Captain Ibrahim Hawsawi',
    phone: '+966567588261',
    vehicle_plate: 'KSA 9090 VIP',
    vehicle_model: 'Toyota Coaster VIP',
    spoken_languages: ['Arabic', 'English'],
    is_active: true
  }
];

async function main() {
  // Wipe test rows and upsert roster
  await supabase.from('drivers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { data, error } = await supabase.from('drivers').insert(ROSTER).select('*');
  if (error) {
    console.error('Error seeding roster:', error);
  } else {
    console.log(`✓ Successfully seeded ${data.length} VIP chauffeurs into public.drivers`);
  }
}

main().catch(console.error);
