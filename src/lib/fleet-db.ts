import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { Locale } from '@/i18n/config';
import {
  FleetShowcaseVehicle,
  FLEET_SHOWCASE_VEHICLES,
} from '@/data/fleet-showcase-data';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://skyhpzdeapmttgmvcoeh.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Loads published fleet vehicles directly from Supabase,
 * with graceful fallback to predefined high-fidelity showcase catalog.
 */
export const getDbVehiclesCached = unstable_cache(
  async (): Promise<FleetShowcaseVehicle[]> => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        // Map database records to FleetShowcaseVehicle interface
        const vehicles: FleetShowcaseVehicle[] = data.map((v) => {
          // Look up matching fallback vehicle if available for detailed multilingual descriptions
          const fallback = FLEET_SHOWCASE_VEHICLES.find((fv) => fv.id === v.id || fv.bookingVehicleId === v.id);

          const photos = v.photos || {};
          const extPhoto = photos.exterior || '/assets/images/vehicles/toyota-camry/exterior-studio.webp';
          const intPhoto = photos.interior || '/assets/images/vehicles/toyota-camry/interior.webp';

          // Extract gallery
          const rawGallery: string[] = Array.isArray(photos.gallery) && photos.gallery.length > 0
            ? photos.gallery
            : [extPhoto, intPhoto];

          const gallery = rawGallery.map((src: string, idx: number) => ({
            src,
            alt: {
              en: `${v.name} - Luxury Umrah Chauffeur (${idx === 0 ? 'Exterior' : 'Interior'})`,
              ar: `${v.translations?.ar?.name || v.name} - نقل فاخر (${idx === 0 ? 'الخارجي' : 'المقصورة'})`,
              ms: `${v.name} (${idx === 0 ? 'Luaran' : 'Dalaman'})`,
              id: `${v.name} (${idx === 0 ? 'Eksterior' : 'Interior'})`,
              ur: `${v.name} (${idx === 0 ? 'بیرونی' : 'اندرونی'})`,
              fr: `${v.name} (${idx === 0 ? 'Extérieur' : 'Intérieur'})`,
              es: `${v.name} (${idx === 0 ? 'Exterior' : 'Interior'})`,
              de: `${v.name} (${idx === 0 ? 'Außen' : 'Innenraum'})`,
              tr: `${v.name} (${idx === 0 ? 'Dış' : 'İç'})`,
              hi: `${v.name} (${idx === 0 ? 'बाहरी' : 'आंतरिक'})`,
            },
            label: {
              en: idx === 0 ? 'Studio Profile' : 'Luxury Cabin',
              ar: idx === 0 ? 'الهيكل الخارجي' : 'المقصورة الملكية',
              ms: idx === 0 ? 'Profil Studio' : 'Kabin Mewah',
              id: idx === 0 ? 'Profil Studio' : 'Kabin Mewah',
              ur: idx === 0 ? 'بیرونی ویو' : 'شاہی کیبن',
              fr: idx === 0 ? 'Profil Studio' : 'Cabine de Luxe',
              es: idx === 0 ? 'Perfil de Estudio' : 'Cabina de Lujo',
              de: idx === 0 ? 'Studio-Profil' : 'Luxus-Kabine',
              tr: idx === 0 ? 'Stüdyo Görünümü' : 'Lüks Kabin',
              hi: idx === 0 ? 'स्टूडियो प्रोफाइल' : 'लक्जरी केबिन',
            },
            type: (idx === 0 ? 'exterior' : 'interior') as 'exterior' | 'interior' | 'detail',
          }));

          const nameTranslations: Record<Locale, string> = {
            en: v.translations?.en?.name || v.name,
            ar: v.translations?.ar?.name || v.name,
            ms: fallback?.name.ms || v.name,
            id: fallback?.name.id || v.name,
            ur: fallback?.name.ur || v.name,
            fr: fallback?.name.fr || v.name,
            es: fallback?.name.es || v.name,
            de: fallback?.name.de || v.name,
            tr: fallback?.name.tr || v.name,
            hi: fallback?.name.hi || v.name,
          };

          const categoryTranslations: Record<Locale, string> = {
            en: v.translations?.en?.category || v.category || 'VIP Transport',
            ar: v.translations?.ar?.category || v.category || 'نقل كبار الشخصيات',
            ms: fallback?.category.ms || v.category || 'VIP Transport',
            id: fallback?.category.id || v.category || 'VIP Transport',
            ur: fallback?.category.ur || v.category || 'VIP Transport',
            fr: fallback?.category.fr || v.category || 'VIP Transport',
            es: fallback?.category.es || v.category || 'VIP Transport',
            de: fallback?.category.de || v.category || 'VIP Transport',
            tr: fallback?.category.tr || v.category || 'VIP Transport',
            hi: fallback?.category.hi || v.category || 'VIP Transport',
          };

          return {
            id: v.id,
            slug: v.id,
            bookingVehicleId: v.id,
            name: nameTranslations,
            category: categoryTranslations,
            passengers: Number(v.seats) || 4,
            luggage: Number(v.bags) || 3,
            startingPriceSAR: fallback?.startingPriceSAR || 200,
            desc: fallback?.desc || {
              en: `Experience refined comfort with our private ${v.name} for your holy journey.`,
              ar: `تمتع بأرقى درجات الراحة والسكينة مع ${v.translations?.ar?.name || v.name} لرحلتكم المباركة.`,
              ms: `Nikmati keselesaan eksklusif dengan ${v.name}.`,
              id: `Nikmati kenyamanan eksklusif dengan ${v.name}.`,
              ur: `اپنی مقدس سفر کے لیے ${v.name} کے ساتھ اعلی ترین آرام۔`,
              fr: `Profitez d'un confort exceptionnel avec notre ${v.name}.`,
              es: `Disfrute de un confort excepcional con nuestro ${v.name}.`,
              de: `Erleben Sie erstklassigen Komfort mit unserem ${v.name}.`,
              tr: `${v.name} ile üstün konforun tadını çıkarın.`,
              hi: `${v.name} के साथ उत्कृष्ट यात्रा का अनुभव करें।`,
            },
            features: fallback?.features || [],
            gallery,
          };
        });

        if (vehicles.length > 0) {
          return vehicles;
        }
      }
    } catch (err) {
      console.warn('Error reading fleet from Supabase, falling back to showcase data:', err);
    }

    return FLEET_SHOWCASE_VEHICLES;
  },
  ['site_fleet_showcase_v1'],
  { tags: ['site_fleet'], revalidate: 60 }
);
