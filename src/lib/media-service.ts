import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { MediaItem, FleetImageRecord } from '@/types/content';
import { logAuditEvent } from '@/lib/audit';

// Initial default fleet images for fallback
const INITIAL_FLEET_IMAGES: FleetImageRecord[] = [
  {
    id: 'img-camry-ext',
    vehicle_id: 'camry',
    image_type: 'exterior',
    url: '/assets/images/camry_exterior.jpg',
    alt_translations: {
      en: 'Toyota Camry Executive Sedan Exterior - Duyuf Alrahman VIP',
      ar: 'المظهر الخارجي لسيارة تويوتا كامري التنفيذية - ضيوف الرحمن VIP',
    },
    display_order: 1,
    is_active: true,
  },
  {
    id: 'img-staria-ext',
    vehicle_id: 'staria',
    image_type: 'exterior',
    url: '/assets/images/staria_exterior.jpg',
    alt_translations: {
      en: 'Hyundai Staria VIP Luxury Minivan Exterior - Duyuf Alrahman VIP',
      ar: 'المظهر الخارجي لهيونداي ستاريا VIP العائلية الفاخرة - ضيوف الرحمن VIP',
    },
    display_order: 1,
    is_active: true,
  },
  {
    id: 'img-staria-int',
    vehicle_id: 'staria',
    image_type: 'interior',
    url: '/assets/images/staria_interior.jpg',
    alt_translations: {
      en: 'Hyundai Staria VIP Captain Seat Interior - Duyuf Alrahman VIP',
      ar: 'المقصورة الداخلية ومقاعد كابتن فاخرة لهيونداي ستاريا VIP - ضيوف الرحمن VIP',
    },
    display_order: 2,
    is_active: true,
  },
  {
    id: 'img-yukon-ext',
    vehicle_id: 'yukon',
    image_type: 'exterior',
    url: '/assets/images/yukon_exterior.jpg',
    alt_translations: {
      en: 'GMC Yukon XL VIP Luxury SUV Exterior - Duyuf Alrahman VIP',
      ar: 'المظهر الخارجي لجي إم سي يوكون XL الفاخرة - ضيوف الرحمن VIP',
    },
    display_order: 1,
    is_active: true,
  },
  {
    id: 'img-hiace-ext',
    vehicle_id: 'hiace',
    image_type: 'exterior',
    url: '/assets/images/hiace_exterior.jpg',
    alt_translations: {
      en: 'Toyota HiAce VIP Minibus Exterior - Duyuf Alrahman VIP',
      ar: 'المظهر الخارجي لحافلة تويوتا هايس VIP الصغيرة - ضيوف الرحمن VIP',
    },
    display_order: 1,
    is_active: true,
  },
  {
    id: 'img-coaster-ext',
    vehicle_id: 'coaster',
    image_type: 'exterior',
    url: '/assets/images/coaster_exterior.jpg',
    alt_translations: {
      en: 'Toyota Coaster Executive Coach Exterior - Duyuf Alrahman VIP',
      ar: 'المظهر الخارجي لحافلة تويوتا كوستر التنفيذية للمجموعات - ضيوف الرحمن VIP',
    },
    display_order: 1,
    is_active: true,
  },
];

let memoryFleetImages: FleetImageRecord[] = [...INITIAL_FLEET_IMAGES];
let memoryMediaItems: MediaItem[] = [];

/**
 * Public helper to get active fleet images ordered for carousels
 */
export const getFleetImagesCached = unstable_cache(
  async (vehicleId?: string): Promise<FleetImageRecord[]> => {
    try {
      const supabase = createServiceClient();
      let query = supabase
        .from('fleet_images')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (vehicleId) {
        query = query.eq('vehicle_id', vehicleId);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as FleetImageRecord[];
      }
    } catch (err) {
      console.warn('Notice querying fleet_images from Supabase:', err);
    }

    if (vehicleId) {
      return memoryFleetImages.filter((img) => img.vehicle_id === vehicleId && img.is_active);
    }
    return memoryFleetImages.filter((img) => img.is_active);
  },
  ['site_fleet_images'],
  { tags: ['site_media', 'site_fleet'], revalidate: 300 }
);

/**
 * Admin: Get all media library items
 */
export async function getAllMediaItemsAdmin(category?: string): Promise<MediaItem[]> {
  try {
    const supabase = createServiceClient();
    let query = supabase.from('media_library').select('*').order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (!error && data) {
      return data as MediaItem[];
    }
  } catch (err) {
    console.warn('Notice querying media_library from Supabase:', err);
  }

  if (category && category !== 'all') {
    return memoryMediaItems.filter((m) => m.category === category);
  }
  return memoryMediaItems;
}

/**
 * Admin: Save or update media library item
 */
export async function upsertMediaItemAdmin(
  item: MediaItem,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; item?: MediaItem; error?: string }> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('media_library')
      .upsert({
        id: item.id,
        file_url: item.file_url,
        file_name: item.file_name,
        file_size: item.file_size || null,
        mime_type: item.mime_type || 'image/webp',
        category: item.category,
        target_id: item.target_id || null,
        alt_translations: item.alt_translations || {},
        display_order: item.display_order || 0,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      console.warn('Notice upserting media_library in Supabase:', error.message);
      return { success: false, error: `Database persistence unavailable: ${error.message}` };
    }
  } catch (err) {
    console.warn('Exception upserting media_library:', err);
    return { success: false, error: 'Database persistence unavailable: media_library table is not configured' };
  }

  const idx = memoryMediaItems.findIndex((m) => m.id === item.id);
  if (idx !== -1) memoryMediaItems[idx] = item;
  else memoryMediaItems.unshift(item);

  await logAuditEvent({
    userEmail,
    userRole,
    action: 'media_item_saved',
    resource: 'media',
    resourceId: item.id,
    newValues: item,
    ip,
  });

  revalidateTag('site_media');
  revalidatePath('/[locale]/fleet', 'page');

  return { success: true, item };
}
