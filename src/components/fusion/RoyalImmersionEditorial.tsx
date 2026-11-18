'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, CarFront, CalendarCheck2, Handshake, Wallet } from 'lucide-react';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { LOCALE_CONFIG, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { royalEditorial } from '@/i18n/royal-editorial';
import type { PublicCustomerReview } from '@/types/reviews';
import styles from './RoyalImmersionEditorial.module.css';

type Props = { locale: Locale };
type LocalizedProps = Props & { dict: Dictionary };
const FAQ_QUESTIONS = [1, 4, 5, 6, 3, 2, 9, 10, 7] as const;
const faqCabin = APPROVED_5_FLEET.find(vehicle => vehicle.id === 'hyundai-staria')?.interiorImage;

export function RoyalBookingSteps({ locale, dict }: Props & { dict?: Dictionary }) {
  const copy = royalEditorial[locale].process;
  const number = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 });
  const StepIcons = [CarFront, CalendarCheck2, Handshake];

  return (
    <section className={styles.process} aria-labelledby="royal-process-title">
      <div className={styles.processHead}>
        <h2 id="royal-process-title">{copy.title}</h2>
        <p>{copy.lead}</p>
      </div>
      <ol className={styles.processSteps} role="list">
        {copy.steps.map(([title, detail], index) => {
          const StepIcon = StepIcons[index] || CarFront;
          return (
            <li key={title}>
              <span className={styles.processNumber} aria-hidden="true">
                <b>{number.format(index + 1)}</b><StepIcon size={36} strokeWidth={1.35} />
              </span>
              <small className={styles.processStepLabel}>{'STEP ' + number.format(index + 1)}</small>
              <h3>{title}</h3>
              <p>{detail}</p>
            </li>
          );
        })}
      </ol>
      {dict && (
        <div className={styles.processPolicy} role="note">
          <Wallet size={23} strokeWidth={1.5} aria-hidden="true" />
          <span>{dict.booking_card.payOnArrivalNotice}</span>
        </div>
      )}
    </section>
  );
}

export function RoyalServiceChapters({ locale, dict }: LocalizedProps) {
  const { services, destinations, chauffeur } = royalEditorial[locale];
  const { airportTitle, airportDesc, intercityTitle, intercityDesc } = dict.services;
  const { ziyaratMakkahDesc, ziyaratMadinahDesc, ziyaratMakkahTitle, ziyaratMadinahTitle } = dict.miqat_ziyarat;
  const airport = services.airport ?? [airportTitle, airportDesc] as const;
  const intercity = services.intercity ?? [intercityTitle, intercityDesc] as const;
  const serviceRows = [
    [...airport, 'services'],
    [...intercity, 'routes'],
    [...services.hotel, 'routes/madinah-airport-to-hotel'],
    [ziyaratMakkahTitle, ziyaratMakkahDesc, 'ziyarat/makkah'],
    [ziyaratMadinahTitle, ziyaratMadinahDesc, 'ziyarat/madinah'],
    [...services.family, 'fleet'],
    [...services.group, 'fleet'],
  ] as const;
  const cityScenes = [
    {
      id: 'makkah',
      title: destinations.makkah,
      text: ziyaratMakkahDesc,
      image: '/assets/homepage-v2/ziyarat-haram.jpg',
    },
    {
      id: 'madinah',
      title: destinations.madinah,
      text: ziyaratMadinahDesc,
      image: '/assets/blueprint/routes/madinah-ziyarat.webp',
    },
  ] as const;
  const Arrow = LOCALE_CONFIG[locale].dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [activeService, setActiveService] = useState(0);
  const serviceImages = [
    '/assets/homepage-v2/chauffeur-welcome.jpg',
    '/assets/blueprint/routes/makkah-madinah.webp',
    '/assets/blueprint/routes/madinah-ziyarat.webp',
    '/assets/homepage-v2/ziyarat-haram.jpg',
    '/assets/blueprint/routes/madinah-ziyarat.webp',
    APPROVED_5_FLEET.find(vehicle => vehicle.id === 'hyundai-staria')?.interiorImage || '/assets/homepage-v2/chauffeur-welcome.jpg',
    APPROVED_5_FLEET.find(vehicle => vehicle.id === 'toyota-hiace')?.exteriorImage || '/assets/blueprint/routes/makkah-madinah.webp',
  ];

  return (
    <>
      <section className={styles.services} id="royal-services" aria-labelledby="royal-services-title">
        <div className={styles.servicesPhoto} data-royal-image>
          <Image key={serviceImages[activeService]} src={serviceImages[activeService]} fill sizes="(max-width:760px) 100vw, 48vw" alt="" />
        </div>
        <div className={styles.servicesBody}>
          <h2 id="royal-services-title">{services.title}</h2>
          <ul className={styles.serviceRows} role="list">
            {serviceRows.map(([title, text, path], index) => (
              <li key={title}>
                <Link
                  className={styles.serviceRow}
                  href={`/${locale}/${path}`}
                  data-active={index === activeService}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                >
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <Arrow className={styles.serviceArrow} size={19} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.ziyarat} id="royal-ziyarat" aria-labelledby="royal-ziyarat-title">
        <div className={styles.ziHead}>
          <h2 id="royal-ziyarat-title">{destinations.title}</h2>
          <p>{destinations.lead}</p>
        </div>
        <div className={styles.ziGrid}>
          {cityScenes.map(scene => (
            <Link href={`/${locale}/ziyarat/${scene.id}`} key={scene.id}>
              <Image src={scene.image} data-royal-image fill sizes="(max-width:760px) 100vw, 50vw" alt="" />
              <span className={styles.ziShade} />
              <div>
                <h3>{scene.title}</h3>
                <p>{scene.text}</p>
                <strong>{destinations.explore}<Arrow size={18} aria-hidden="true" /></strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.chauffeur} aria-labelledby="royal-chauffeur-title">
        <div className={styles.chauffeurPhoto} data-royal-image>
          <Image src="/assets/homepage-v2/chauffeur-welcome.jpg" fill sizes="(max-width:760px) 100vw, 53vw" alt="" />
        </div>
        <div className={styles.chauffeurWords}>
          <h2 id="royal-chauffeur-title">{chauffeur.title}</h2>
          <p>{chauffeur.lead}</p>
          <ul role="list">
            {chauffeur.points.map(point => (
              <li key={point}><Check size={17} aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <Link href={`/${locale}/booking`}>{dict.hero.ctaBook}<Arrow size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}

function RealGuestQuote({ locale, dict }: LocalizedProps) {
  const copy = royalEditorial[locale].reviews;
  const [reviews, setReviews] = useState<PublicCustomerReview[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const review = reviews[selectedIndex];
  const rating = review?.rating;
  const hasRating = typeof rating === 'number' && Number.isFinite(rating) && rating >= 1 && rating <= 5;
  const number = new Intl.NumberFormat(locale);
  const rtl = LOCALE_CONFIG[locale].dir === 'rtl';
  const Prev = rtl ? ArrowRight : ArrowLeft;
  const Next = rtl ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/reviews?limit=6&sort=newest', { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(data => {
        if (controller.signal.aborted || !data?.success || !Array.isArray(data.reviews)) return;
        const published: PublicCustomerReview[] = data.reviews;
        setReviews([
          ...published.filter(item => item.language === locale),
          ...published.filter(item => item.language !== locale),
        ]);
      })
      .catch(() => { /* The service experience remains available when reviews cannot be fetched. */ });

    return () => controller.abort();
  }, [locale]);

  return (
    <section className={styles.reviews} aria-labelledby="royal-reviews-title">
      <div className={styles.reviewHead}>
        <h2 id="royal-reviews-title">{review ? copy.title : copy.experienceTitle}</h2>
      </div>
      <div className={styles.reviewQuote}>
        <div aria-live="polite" aria-atomic="true">
          {review ? (
            <>
              {hasRating && (
                <span className={styles.reviewStars}>
                  <span className={styles.srOnly}>{dict.reviews.ratingLabel} {number.format(rating)} / {number.format(5)}</span>
                  <span aria-hidden="true">{'★'.repeat(Math.round(rating))}</span>
                </span>
              )}
              <blockquote lang={review.language} dir="auto">“{review.comment}”</blockquote>
              <div className={styles.reviewSource}>
                <strong dir="auto">{review.customer_name}</strong>
                {review.is_verified_booking && <span>{dict.reviews.verifiedPilgrim}</span>}
              </div>
            </>
          ) : <p className={styles.reviewEmpty}>{copy.experience}</p>}
        </div>
        <div className={styles.reviewActions}>
          <Link href={`/${locale}/reviews`}>{copy.read}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          {reviews.length > 1 && (
            <div className={styles.reviewControls}>
              <button type="button" aria-label={copy.previous} onClick={() => setSelectedIndex(index => (index - 1 + reviews.length) % reviews.length)}>
                <Prev size={18} aria-hidden="true" />
              </button>
              <button type="button" aria-label={copy.next} onClick={() => setSelectedIndex(index => (index + 1) % reviews.length)}>
                <Next size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function RoyalGuestConfidence({ locale, dict }: LocalizedProps) {
  const [open, setOpen] = useState<number | null>(FAQ_QUESTIONS[0]);
  const { cabin, process } = royalEditorial[locale];

  return (
    <>
      <RealGuestQuote key={locale} locale={locale} dict={dict} />

      <section className={styles.faq} id="royal-faq" aria-labelledby="royal-faq-title">
        <div className={styles.faqIntro}>
          <h2 id="royal-faq-title">{dict.faq.heading}</h2>
          <p>{dict.faq.subtitle}</p>
          {faqCabin && (
            <div className={styles.faqPhoto}>
              <Image src={faqCabin} fill alt="" sizes="(max-width:760px) 100vw, 33vw" />
            </div>
          )}
        </div>
        <div className={styles.faqList}>
          {FAQ_QUESTIONS.map((question) => {
            const selected = open === question;
            const answerId = `royal-faq-answer-${question}`;
            const answer = question === 1
              ? `${process.steps[0][1]} ${process.steps[1][1]}`
              : dict.faq[`a${question}`];

            return (
              <div className={styles.faqItem} key={question}>
                <h3>
                  <button type="button" aria-expanded={selected} aria-controls={answerId} onClick={() => setOpen(selected ? null : question)}>
                    <strong>{dict.faq[`q${question}`]}</strong>
                    <ChevronDown size={19} aria-hidden="true" />
                  </button>
                </h3>
                <div id={answerId} className={styles.faqAnswer} aria-hidden={!selected} data-open={selected}>
                  <div>
                    {question === 6 ? (
                      <p>
                        {cabin.lead}{' '}
                        <Link href={`/${locale}/fleet`} tabIndex={selected ? undefined : -1}>{cabin.explore}</Link>
                      </p>
                    ) : <p>{answer}</p>}
                  </div>
                </div>
              </div>
            );
          })}
          <Link href={`/${locale}/faq`} className={styles.faqMore}>{dict.faq.heading}<ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
