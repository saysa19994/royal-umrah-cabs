'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { LOCALE_CONFIG } from '@/i18n/config';
import { royalHomepageArabic, royalHomepageEnglish } from '@/i18n/royal-homepage-copy';
import { royalHomepageEast } from '@/i18n/royal-homepage-copy-east';
import { royalHomepageWest } from '@/i18n/royal-homepage-copy-west';
import styles from './BookingJourneyVisual.module.css';

const COPY = {
  ar: royalHomepageArabic, en: royalHomepageEnglish,
  ...royalHomepageEast, ...royalHomepageWest,
};

const STORY_PHOTOS = [
  '/assets/homepage-v2/chauffeur-welcome.jpg',
  '/assets/images/vehicles/hyundai-staria/interior.webp',
  '/assets/homepage-v2/ziyarat-haram.jpg',
] as const;

/**
 * Booking-page editorial arrival triptych. This is deliberately a separate
 * visual introduction from the functional BookingWizard: tab changes never
 * change prices, select vehicles or create reservations.
 */
export function BookingJourneyVisual({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const copy = COPY[locale];
  const stages = [
    { title: copy.arrival, description: copy.arrivalDetail, image: STORY_PHOTOS[0] },
    { title: copy.cabin, description: copy.cabinDetail, image: STORY_PHOTOS[1] },
    { title: copy.destination, description: copy.destinationDetail, image: STORY_PHOTOS[2] },
  ];
  const current = stages[selected];
  const numbers = new Intl.NumberFormat(LOCALE_CONFIG[locale].dateFormat, { minimumIntegerDigits: 2 });
  const DirectionArrow = LOCALE_CONFIG[locale].dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className={styles.visual} data-booking-journey-visual="true" dir={LOCALE_CONFIG[locale].dir}>
      <div className={styles.imageStage}>
        <Image key={current.image} src={current.image} fill priority={selected === 0}
          alt={current.title} sizes="(max-width:767px) 100vw, 56vw" />
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.topline} aria-hidden="true">
          <span>DUYUF AL RAHMAN VIP</span>
          <span>{numbers.format(selected + 1)} / {numbers.format(stages.length)}</span>
        </div>
        <div className={styles.caption} aria-live="polite" aria-atomic="true">
          <span className={styles.chapterNumber}>{numbers.format(selected + 1)}</span>
          <strong>{current.title}</strong>
          <p>{current.description}</p>
        </div>
        <div className={styles.carouselControls} role="group" aria-label={copy.journeyTitle}>
          <button type="button" aria-label={stages[(selected - 1 + stages.length) % stages.length].title}
            onClick={() => setSelected((index) => (index - 1 + stages.length) % stages.length)}>
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label={stages[(selected + 1) % stages.length].title}
            onClick={() => setSelected((index) => (index + 1) % stages.length)}>
            <DirectionArrow size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={styles.stageSelector} role="group" aria-label={copy.journeyTitle}>
        {stages.map((scene, index) => (
          <button type="button" key={scene.image} className={styles.stageTab}
            aria-pressed={selected === index}
            aria-label={scene.title} onClick={() => setSelected(index)}>
            <span>{numbers.format(index + 1)}</span>
            <strong>{scene.title}</strong>
            <span aria-hidden="true" className={styles.stageProgress} />
          </button>
        ))}
      </div>
    </div>
  );
}
