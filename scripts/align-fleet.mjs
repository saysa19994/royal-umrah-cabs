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

// Use service role key if available from .env or fallback
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY && !env.SUPABASE_SERVICE_ROLE_KEY.includes('your-service-role')
  ? env.SUPABASE_SERVICE_ROLE_KEY
  : env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, serviceKey);

const FLEET_ALIGNMENT = [
  {
    id: 'camry',
    name: 'Toyota Camry VIP',
    category: 'Sedan VIP',
    seats: 4,
    bags: 3,
    photos: {
      exterior: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
      interior: '/assets/images/vehicles/toyota-camry/interior.webp',
      gallery: [
        '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
        '/assets/images/vehicles/toyota-camry/interior.webp',
        '/assets/images/vehicles/toyota-camry/side_profile.jpg',
        '/assets/images/vehicles/toyota-camry/interior_dashboard.jpg',
        '/assets/images/vehicles/toyota-camry/interior_seats.jpg'
      ]
    }
  },
  {
    id: 'staria',
    name: 'Hyundai Staria VIP',
    category: 'VIP MPV',
    seats: 7,
    bags: 6,
    photos: {
      exterior: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
      interior: '/assets/images/vehicles/hyundai-staria/interior.webp',
      gallery: [
        '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
        '/assets/images/vehicles/hyundai-staria/interior.webp',
        '/assets/images/vehicles/hyundai-staria/side_profile.jpg',
        '/assets/images/vehicles/hyundai-staria/interior_dashboard.jpg',
        '/assets/images/vehicles/hyundai-staria/interior_seats.jpg'
      ]
    }
  },
  {
    id: 'yukon',
    name: 'GMC Yukon XL VIP',
    category: 'Luxury SUV',
    seats: 7,
    bags: 8,
    photos: {
      exterior: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
      interior: '/assets/images/vehicles/gmc-yukon-xl/interior.webp',
      gallery: [
        '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
        '/assets/images/vehicles/gmc-yukon-xl/interior.webp',
        '/assets/images/vehicles/gmc-yukon-xl/side_profile.jpg',
        '/assets/images/vehicles/gmc-yukon-xl/interior_dashboard.jpg',
        '/assets/images/vehicles/gmc-yukon-xl/interior_seats.jpg'
      ]
    }
  },
  {
    id: 'hiace',
    name: 'Toyota HiAce VIP',
    category: 'Minibus VIP',
    seats: 10,
    bags: 10,
    photos: {
      exterior: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
      interior: '/assets/images/vehicles/toyota-hiace/interior.webp',
      gallery: [
        '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
        '/assets/images/vehicles/toyota-hiace/interior.webp',
        '/assets/images/vehicles/toyota-hiace/side_profile.jpg',
        '/assets/images/vehicles/toyota-hiace/interior_dashboard.jpg',
        '/assets/images/vehicles/toyota-hiace/interior_seats.jpg'
      ]
    }
  },
  {
    id: 'coaster',
    name: 'Toyota Coaster VIP',
    category: 'Group Coach VIP',
    seats: 21,
    bags: 20,
    photos: {
      exterior: '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
      interior: '/assets/images/vehicles/toyota-coaster/interior.webp',
      gallery: [
        '/assets/images/vehicles/toyota-coaster/exterior-studio.webp',
        '/assets/images/vehicles/toyota-coaster/interior.webp',
        '/assets/images/vehicles/toyota-coaster/side_profile.jpg',
        '/assets/images/vehicles/toyota-coaster/interior_dashboard.jpg',
        '/assets/images/vehicles/toyota-coaster/interior_seats.jpg'
      ]
    }
  }
];

async function alignFleet() {
  console.log('--- STARTING FLEET INTEGRITY ALIGNMENT ---');
  for (const v of FLEET_ALIGNMENT) {
    const { data, error } = await client
      .from('vehicles')
      .update({
        name: v.name,
        category: v.category,
        seats: v.seats,
        bags: v.bags,
        photos: v.photos,
        updated_at: new Date().toISOString()
      })
      .eq('id', v.id)
      .select('*');

    if (error) {
      console.error(`Failed to update vehicle ${v.id}:`, error);
    } else {
      console.log(`✓ Updated [${v.id}] -> Seats: ${v.seats}, Bags: ${v.bags}, Photos: ${v.photos.exterior}`);
    }
  }
}

alignFleet();
