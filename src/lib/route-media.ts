/**
 * Route editorial images stored alongside route translations in the existing
 * routes.translations JSONB column. No schema migration or live seed needed.
 *
 * Only public objects in our project's `media/routes/` bucket prefix and
 * checked-in route assets may appear as route imagery.
 */
export const ROUTE_MEDIA_KEY = '__media';

type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function normalizeRoutePhotoUrl(value: unknown): string | null | undefined {
  if (typeof value !== 'string') return undefined;
  const url = value.trim();
  if (!url) return null; // Reset to the verified source-code fallback.

  if (/^\/assets\/images\/routes\/[a-z0-9_.-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(url)) {
    return url;
  }

  try {
    const input = new URL(url);
    // This project has a single controlled Supabase Storage origin. A future
    // project migration can update NEXT_PUBLIC_SUPABASE_URL explicitly.
    const configured = process.env.NEXT_PUBLIC_SUPABASE_URL ||
      'https://skyhpzdeapmttgmvcoeh.supabase.co';
    const allowedHost = new URL(configured).hostname;
    if (input.protocol !== 'https:' || input.hostname !== allowedHost ||
        input.port || input.username || input.password || input.search || input.hash) return undefined;
    if (!/^\/storage\/v1\/object\/public\/media\/routes\/[a-zA-Z0-9%_.\/-]+\.(?:jpg|jpeg|png|webp|avif)$/i.test(input.pathname)) {
      return undefined;
    }
    return input.href;
  } catch {
    return undefined;
  }
}

export function getRoutePhotoFromTranslations(value: unknown): string | null {
  if (!isObject(value) || !isObject(value[ROUTE_MEDIA_KEY])) return null;
  const photo = normalizeRoutePhotoUrl(value[ROUTE_MEDIA_KEY].cover_image_url);
  return typeof photo === 'string' ? photo : null;
}

export function withRoutePhoto(translations: unknown, photo: string | null): JsonObject {
  const base: JsonObject = isObject(translations) ? { ...translations } : {};
  const prev: JsonObject = isObject(base[ROUTE_MEDIA_KEY]) ? { ...base[ROUTE_MEDIA_KEY] } : {};
  return {
    ...base,
    [ROUTE_MEDIA_KEY]: { ...prev, cover_image_url: photo },
  };
}
