import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/components/layout/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

// Ensure DEFAULT_SETTINGS is imported from @/lib/settings
if (!content.includes('DEFAULT_SETTINGS')) {
  content = content.replace(
    "import type { SiteSettings } from '@/lib/settings';",
    "import { type SiteSettings, DEFAULT_SETTINGS } from '@/lib/settings';"
  );
}

// Update announcement display
const targetPromo = `      {Boolean(settings?.promo_banner_enabled) && (
        <div className="bg-[#101827] text-white text-[11px] sm:text-xs font-medium py-1 px-3 text-center tracking-wide">
          <span>{settings?.announcement_translations?.[locale] || settings?.promo_banner_text || ''}</span>
        </div>
      )}`;

const replacementPromo = `      {Boolean(settings?.promo_banner_enabled ?? DEFAULT_SETTINGS.promo_banner_enabled) && (
        <div className="bg-[#101827] text-white text-[11px] sm:text-xs font-medium py-1.5 px-3 text-center tracking-wide border-b border-white/10" dir={locale === 'ar' || locale === 'ur' ? 'rtl' : 'ltr'}>
          <span>{settings?.announcement_translations?.[locale] || DEFAULT_SETTINGS.announcement_translations?.[locale] || settings?.promo_banner_text || DEFAULT_SETTINGS.promo_banner_text}</span>
        </div>
      )}`;

if (content.includes(targetPromo)) {
  content = content.replace(targetPromo, replacementPromo);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Successfully updated Header.tsx announcement banner');
} else {
  console.error('Target promo not found in Header.tsx');
  process.exit(1);
}
