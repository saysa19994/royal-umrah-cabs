import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/components/layout/Header.tsx';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. Revert to type-only import for SiteSettings
content = content.replace(
  "import { type SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';",
  "import type { SiteSettings } from '@/lib/settings';\nimport { DEFAULT_ANNOUNCEMENT_TRANSLATIONS } from '@/data/announcement';"
);

// 2. Use DEFAULT_ANNOUNCEMENT_TRANSLATIONS
content = content.replace(
  "DEFAULT_SETTINGS.announcement_translations?.[locale] || settings?.promo_banner_text || DEFAULT_SETTINGS.promo_banner_text",
  "DEFAULT_ANNOUNCEMENT_TRANSLATIONS[locale] || settings?.promo_banner_text || DEFAULT_ANNOUNCEMENT_TRANSLATIONS.en"
);

content = content.replace(
  "settings?.promo_banner_enabled ?? DEFAULT_SETTINGS.promo_banner_enabled",
  "settings?.promo_banner_enabled ?? true"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated Header.tsx to use client-safe announcement module');
