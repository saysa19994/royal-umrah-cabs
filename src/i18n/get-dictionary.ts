import type { Locale } from './config';
import en from './dictionaries/en.json';
import ar from './dictionaries/ar.json';
import ms from './dictionaries/ms.json';
import id from './dictionaries/id.json';
import ur from './dictionaries/ur.json';
import fr from './dictionaries/fr.json';
import es from './dictionaries/es.json';
import de from './dictionaries/de.json';
import hi from './dictionaries/hi.json';

const dictionaries: Record<Locale, typeof en> = {
  en,
  ar,
  ms,
  id,
  ur,
  fr,
  es,
  de,
  hi,
};

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
