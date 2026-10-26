import { LocalizedArticleBody } from '../types';
import { MAKKAH_TAIF_CONTENT_EN } from './en';

export const MAKKAH_TAIF_CONTENT_DE: LocalizedArticleBody = {
  ...MAKKAH_TAIF_CONTENT_EN,
  intro: {
    ...MAKKAH_TAIF_CONTENT_EN.intro,
    title: 'Leitfaden für private Transfers von Mekka nach Taif: Al-Hada-Gebirge, Rosenfarmen & Miqat',
  },
};
