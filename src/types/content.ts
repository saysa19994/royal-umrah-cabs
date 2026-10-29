import { Locale } from '@/i18n/config';

export type ContentStatus = 'published' | 'draft' | 'needs_owner_confirmation';

export interface LocalizedStringMap {
  en?: string;
  ar?: string;
  ms?: string;
  id?: string;
  ur?: string;
  fr?: string;
  es?: string;
  de?: string;
  tr?: string;
  hi?: string;
  [key: string]: string | undefined;
}

export interface FaqItem {
  id: string;
  category: 'home' | 'booking' | 'cancellation' | 'ziyarat' | 'vehicles' | 'routes' | 'general';
  question_translations: LocalizedStringMap;
  answer_translations: LocalizedStringMap;
  feature_flag_key?: string | null;
  answer_flag_off_translations?: LocalizedStringMap;
  status: ContentStatus;
  sort_order: number;
  is_operational: boolean;
  last_verified_date: string;
  source?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface MediaItem {
  id: string;
  file_url: string;
  file_name: string;
  file_size?: number;
  mime_type: string;
  category: 'fleet' | 'hubs' | 'ziyarat' | 'general';
  target_id?: string | null;
  alt_translations: LocalizedStringMap;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface FleetImageRecord {
  id: string;
  vehicle_id: string;
  image_type: 'exterior' | 'interior' | 'hero';
  url: string;
  alt_translations: LocalizedStringMap;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CmsPageRecord {
  id?: string;
  page_key: string;
  language: Locale;
  seo_title: string;
  seo_description: string;
  h1: string;
  content_blocks: Record<string, any>;
  status?: ContentStatus;
  updated_at?: string;
}

export interface AdminRouteData {
  id: string;
  origin_city: string;
  destination_city: string;
  title: string;
  origin_code?: string;
  destination_code?: string;
  distance_km?: number;
  estimated_duration_minutes?: number;
  miqat_stop_allowed: boolean;
  is_active: boolean;
  display_order: number;
  rates: {
    camry: number;
    staria: number;
    yukon: number;
    hiace: number;
    coaster: number;
  };
  rates_usd?: {
    camry: number;
    staria: number;
    yukon: number;
    hiace: number;
    coaster: number;
  };
}
