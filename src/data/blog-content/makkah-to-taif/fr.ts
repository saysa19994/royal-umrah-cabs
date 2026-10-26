import { LocalizedArticleBody } from '../types';
import { MAKKAH_TAIF_CONTENT_EN } from './en';

export const MAKKAH_TAIF_CONTENT_FR: LocalizedArticleBody = {
  ...MAKKAH_TAIF_CONTENT_EN,
  intro: {
    ...MAKKAH_TAIF_CONTENT_EN.intro,
    title: 'Guide de Transfert Privé La Mecque - Taïf : Montagne Al Hada, Distilleries de Roses & Miqat',
  },
};
