'use client';

import { useEffect, useState } from 'react';
import { Accessibility, Check } from 'lucide-react';
import type { Locale } from '@/i18n/config';

const PREF_KEY = 'duyuf_comfort_mode';
const LABELS: Record<Locale, string> = {
  ar: 'عرض أوضح وأسهل',
  en: 'Larger & simpler view',
  ms: 'Paparan lebih besar & mudah',
  id: 'Tampilan lebih besar & sederhana',
  ur: 'بڑا اور آسان منظر',
  fr: 'Affichage plus grand et simplifié',
  es: 'Vista más grande y sencilla',
  de: 'Größere, einfachere Ansicht',
  tr: 'Daha büyük ve sade görünüm',
  hi: 'बड़ा और सरल दृश्य',
};

export function ComfortModeToggle({
  locale,
  fullWidth = false,
}: {
  locale: Locale;
  fullWidth?: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
  const label = LABELS[locale] || LABELS.en;

  useEffect(() => {
    const sync = () => setEnabled(document.documentElement.dataset.comfortMode === 'on');
    sync();
    const storage = (event: StorageEvent) => {
      if (event.key === PREF_KEY) {
        document.documentElement.dataset.comfortMode = event.newValue === 'on' ? 'on' : 'off';
        sync();
      }
    };
    window.addEventListener('storage', storage);
    return () => window.removeEventListener('storage', storage);
  }, []);

  const toggle = () => {
    const next = !enabled;
    document.documentElement.dataset.comfortMode = next ? 'on' : 'off';
    try { window.localStorage.setItem(PREF_KEY, next ? 'on' : 'off'); } catch { /* private mode: current-tab preference still works */ }
    setEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className={\`duyuf-comfort-toggle inline-flex items-center gap-2 min-h-[44px] rounded-full border border-[#c8c2b6] bg-[#fffdf8] px-3 py-2 text-[12px] font-bold text-[#111824] shadow-sm transition-colors hover:bg-[#ece8df] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#967041] \${fullWidth ? 'w-full justify-between' : ''}\`}
    >
      <Accessibility size={19} aria-hidden="true" />
      <span>{label}</span>
      <span aria-hidden="true" className={\`grid size-5 place-items-center rounded-full border \${enabled ? 'border-[#142a3d] bg-[#142a3d] text-white' : 'border-[#b8b2a7]'}\`}>
        {enabled && <Check size={12} strokeWidth={2.5} />}
      </span>
    </button>
  );
}
