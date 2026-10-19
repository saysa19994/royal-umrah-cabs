import type { Locale } from './config';
import type enType from './dictionaries/en.json';

export type Dictionary = typeof enType;

const dictionaries: Record<Locale, () => Dictionary> = {
  en: () => require('./dictionaries/en.json'),
  ar: () => require('./dictionaries/ar.json'),
  ms: () => require('./dictionaries/ms.json'),
  id: () => require('./dictionaries/id.json'),
  ur: () => require('./dictionaries/ur.json'),
  fr: () => require('./dictionaries/fr.json'),
  es: () => require('./dictionaries/es.json'),
  de: () => require('./dictionaries/de.json'),
  hi: () => require('./dictionaries/hi.json'),
};

export function getDictionary(locale: Locale): Dictionary {
  const loader = dictionaries[locale] || dictionaries.en;
  return loader();
}
