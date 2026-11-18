import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Luggage, Users } from 'lucide-react';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { LOCALE_CONFIG, type Locale } from '@/i18n/config';
import { royalEditorial } from '@/i18n/royal-editorial';
import styles from './RoyalCabinChapter.module.css';

const cabinVehicle = APPROVED_5_FLEET.find(vehicle => vehicle.id === 'hyundai-staria');

export function RoyalCabinChapter({ locale }: { locale: Locale }) {
  const copy = royalEditorial[locale].cabin;
  const Arrow = LOCALE_CONFIG[locale].dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className={styles.chapter} data-home-section="cabin" aria-labelledby="royal-cabin-title">
      <div className={styles.copy}>
        <h2 id="royal-cabin-title">{copy.title}</h2>
        <p>{copy.lead}</p>
        <div className={styles.specs}>
          <span><Users size={18} aria-hidden="true" />{copy.seating}</span>
          <span><Luggage size={18} aria-hidden="true" />{copy.luggage}</span>
        </div>
        <Link href={`/${locale}/fleet`}>{copy.explore}<Arrow size={18} aria-hidden="true" /></Link>
      </div>
      {cabinVehicle && (
        <div className={styles.photo} data-royal-image>
          <Image src={cabinVehicle.interiorImage} alt="" fill sizes="(max-width:800px) 100vw, 58vw" />
          <span>{cabinVehicle.name[locale]}</span>
        </div>
      )}
    </section>
  );
}
