'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown,
  Clock3, Luggage, MapPin, Pause, Plane, Play, ShieldCheck, Users, Wallet,
} from 'lucide-react';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { useCurrency } from '@/context/CurrencyContext';
import { LOCALE_CONFIG, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { royalHomepageArabic, royalHomepageEnglish } from '@/i18n/royal-homepage-copy';
import { royalHomepageEast } from '@/i18n/royal-homepage-copy-east';
import { royalHomepageWest } from '@/i18n/royal-homepage-copy-west';
import type { TransferRatesMap } from '@/lib/pricing-db';
import { RoyalCabinChapter } from '@/components/royal/RoyalCabinChapter';
import { RoyalMotion } from '@/components/royal/RoyalMotion';
import { RoyalBookingSteps, RoyalGuestConfidence, RoyalServiceChapters } from './RoyalImmersionEditorial';
import { getRoyalHomeRoute, ROYAL_HOME_ROUTES } from './royal-home-routes';
import styles from './SignatureFusionHomepage.module.css';
import BronzeCircularFleet from './BronzeCircularFleet';

type Props = {
  locale: Locale;
  rates: TransferRatesMap;
  dict: Dictionary;
  regions: Record<'taif' | 'riyadh', boolean>;
  policies: { airportWaiting: number; freeCancellation: number };
};

const COPY = { ar: royalHomepageArabic, en: royalHomepageEnglish, ...royalHomepageEast, ...royalHomepageWest };
const FARE_KEYS: Record<string, string> = {
  'toyota-camry': 'camry', 'hyundai-staria': 'staria', 'gmc-yukon-xl': 'yukon',
  'toyota-hiace': 'hiace', 'toyota-coaster': 'coaster',
};

const FILM = '/assets/homepage-v2/hero.mp4';
const MOBILE_FILM = '/assets/homepage-v2/hero-mobile.mp4';
const POSTER = '/assets/homepage-v2/hero-poster.jpg';

function ArrivalFilm({ playLabel, pauseLabel }: { playLabel: string; pauseLabel: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState('');
  const [playing, setPlaying] = useState(false);
  const requestedMotion = useRef<boolean | null>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const small = window.matchMedia('(max-width: 700px)');
    let inView = true;
    const sync = () => {
      const enabled = document.documentElement.dataset.comfortMode !== 'on' && (requestedMotion.current ?? !reduced.matches);
      if (!enabled || !inView || document.hidden) {
        element.pause();
        if (!enabled && reduced.matches) setSource('');
        return;
      }
      const next = small.matches ? MOBILE_FILM : FILM;
      setSource(next);
      if (element.getAttribute('src') === next) void element.play().catch(() => undefined);
    };
    function onPreferenceChange() {
      requestedMotion.current = null;
      sync();
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    observer.observe(element);
    reduced.addEventListener('change', onPreferenceChange);
    small.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    const comfortObserver = new MutationObserver(sync);
    comfortObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-comfort-mode'] });
    sync();
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', onPreferenceChange);
      small.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      comfortObserver.disconnect();
      element.pause();
    };
  }, []);

  function toggleFilm() {
    const element = video.current;
    if (!element) return;
    requestedMotion.current = !playing;
    if (playing) {
      element.pause();
    } else if (source) {
      void element.play().catch(() => undefined);
    } else {
      setSource(window.matchMedia('(max-width: 700px)').matches ? MOBILE_FILM : FILM);
    }
  }

  return (
    <div className={styles.heroVideo} data-royal-hero-film>
      <video
        ref={video}
        src={source || undefined}
        poster={POSTER}
        autoPlay={Boolean(source)}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className={styles.filmControl} onClick={toggleFilm} aria-label={playing ? pauseLabel : playLabel}>
        {playing ? <Pause size={17} aria-hidden /> : <Play size={17} aria-hidden />}
      </button>
    </div>
  );
}

export default function SignatureFusionHomepage({ locale, rates, dict, regions, policies }: Props) {
  const copy = COPY[locale];
  const { dir, dateFormat } = LOCALE_CONFIG[locale];
  const router = useRouter();
  const { currency, convertPrice } = useCurrency();
  const DirectionArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const fleet = APPROVED_5_FLEET;
  const routes = ROYAL_HOME_ROUTES
    .filter((item) => (!item.region || regions[item.region]) && fleet.some((vehicle) => rates[item.id]?.[FARE_KEYS[vehicle.slug]] > 0))
    .map((item) => getRoyalHomeRoute(item, locale));

  const [route, setRoute] = useState(routes[0]?.id || '');
  const [carIndex, setCarIndex] = useState(0);
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [inside, setInside] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [minDate, setMinDate] = useState('');

  const car = fleet[carIndex];
  const journey = routes.find((item) => item.id === route) || routes[0];
  const starts = Array.from(new Map(routes.map((item) => [item.origin, item])).values());
  const availableDestinations = routes.filter((item) => item.origin === journey?.origin);
  const fare = rates[route]?.[FARE_KEYS[car.slug]];
  const validFare = Number.isFinite(fare) && fare > 0;
  const eligible = validFare && guests <= car.passengers;
  const numbers = new Intl.NumberFormat(dateFormat);
  const formattedFare = (value: number) => new Intl.NumberFormat(dateFormat, {
    style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0,
  }).format(convertPrice(value));

  useEffect(() => {
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' });
    setMinDate(today.format(new Date()));
  }, []);

  function chooseVehicle(index: number) {
    setCarIndex(index);
    setInside(false);
  }

  function changeSelection(routeId: string, count: number) {
    setRoute(routeId);
    setGuests(count);
    const routeFare = rates[routeId]?.[FARE_KEYS[car.slug]];
    if (!routeFare || count > car.passengers) {
      const index = fleet.findIndex((vehicle) => rates[routeId]?.[FARE_KEYS[vehicle.slug]] > 0 && vehicle.passengers >= count);
      if (index !== -1) chooseVehicle(index);
    }
  }

  const href = eligible ? `/${locale}/booking?${new URLSearchParams({
    route, vehicle: car.bookingParam, passengers: String(guests), type: 'transfer',
    ...(travelDate ? { date: travelDate } : {}), ...(travelTime ? { time: travelTime } : {}),
  })}` : '';

  function book() {
    if (href) router.push(href);
  }

  const scenes = [
    { title: copy.arrival, description: copy.arrivalDetail, image: '/assets/homepage-v2/hero-poster.jpg' },
    { title: copy.cabin, description: copy.cabinDetail, image: '/assets/images/vehicles/hyundai-staria/interior.webp' },
    { title: copy.destination, description: copy.destinationDetail, image: '/assets/images/routes/makkah-to-madinah.jpg' },
  ];
  const benefits = [
    { Icon: Clock3, text: dict.trust_strip.support247 },
    { Icon: Plane, text: dict.trust_strip.flightTracking },
    { Icon: ShieldCheck, text: dict.trust_strip.fixedPrices },
    { Icon: Wallet, text: dict.trust_strip.payOnArrival },
  ];
  const facts = [
    policies.airportWaiting === 60 ? copy.airportWait : null,
    policies.freeCancellation === 24 ? dict.trust_strip.freeCancellation : null,
    copy.childSeats, copy.miqatStop, copy.concierge,
  ].filter(Boolean);

  return (
    <div className={styles.page} dir={dir} lang={locale} data-signature-fusion="true">
      <RoyalMotion />
      <section className={styles.hero} id="fusion-top" aria-labelledby="royal-hero-title">
        <ArrivalFilm playLabel={copy.playFilm} pauseLabel={copy.pauseFilm} />
        <div className={styles.heroCopy}>
          <span className={styles.heroTag} data-royal-hero-copy>{dict.meta.brand}</span>
          <h1 id="royal-hero-title" data-royal-hero-copy>{copy.heroLine1}{' '}<em>{copy.heroLine2}</em></h1>
          <p data-royal-hero-copy>{copy.heroDescription}</p>
          <div className={styles.heroButtons} data-royal-hero-copy>
            <a className={styles.primary} href="#fusion-book">{copy.heroBook}<DirectionArrow size={18} aria-hidden /></a>
            <a className={styles.underLink} href="#fusion-story">{copy.heroExplore}<ChevronDown size={17} aria-hidden /></a>
          </div>
        </div>
      </section>

      <section className={styles.bookingArea} id="fusion-book" data-booking-form="true" aria-labelledby="fusion-book-title">
        <div className={styles.bookingHead}>
          <h2 id="fusion-book-title">{copy.bookingTitle}</h2>
        </div>
        <div className={styles.bookingDesk}>
          <label className={styles.routeField}>
            <span><MapPin size={16} aria-hidden />{dict.booking_card.pickupLabel}</span>
            <select value={journey?.origin || ''} onChange={(event) => {
              const first = routes.find((item) => item.origin === event.target.value);
              if (first) changeSelection(first.id, guests);
            }}>
              {starts.map((item) => <option key={item.origin} value={item.origin}>{item.pickup}</option>)}
            </select>
          </label>
          <label className={styles.destinationField}>
            <span><MapPin size={16} aria-hidden />{dict.booking_card.dropoffLabel}</span>
            <select value={route} onChange={(event) => changeSelection(event.target.value, guests)}>
              {availableDestinations.map((item) => <option key={item.id} value={item.id}>{item.destination}</option>)}
            </select>
          </label>
          <label><span><CalendarDays size={16} aria-hidden />{dict.booking_card.dateLabel}</span>
            <input type="date" min={minDate || undefined} value={travelDate} onChange={(event) => setTravelDate(event.target.value)} />
          </label>
          <label><span><Clock3 size={16} aria-hidden />{dict.booking_card.timeLabel}</span>
            <input type="time" value={travelTime} onChange={(event) => setTravelTime(event.target.value)} />
          </label>
          <label><span><Users size={16} aria-hidden />{dict.booking_card.passengersLabel}</span>
            <select value={guests} onChange={(event) => changeSelection(route, Number(event.target.value))}>
              {Array.from({ length: Math.max(...fleet.map((vehicle) => vehicle.passengers)) }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>{numbers.format(count)}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.bookingLower}>
          <div className={styles.bookCarList} role="group" aria-label={dict.booking_card.vehicleLabel}>
            {fleet.map((vehicle, index) => (
              <button key={vehicle.id} type="button" aria-pressed={index === carIndex}
                disabled={!(rates[route]?.[FARE_KEYS[vehicle.slug]] > 0) || guests > vehicle.passengers}
                onClick={() => chooseVehicle(index)}>{vehicle.name[locale]}</button>
            ))}
          </div>
          <div className={styles.bookingTotal}>
            <div aria-live="polite">
              <small>{copy.vehicleFare}</small>
              <strong>{eligible ? formattedFare(fare) : '—'}</strong>
              {!eligible && <small className={styles.warn}>{validFare ? copy.overCapacity : copy.unavailable}</small>}
            </div>
            <button type="button" disabled={!href} onClick={book}>{copy.findVehicles}<DirectionArrow size={18} aria-hidden /></button>
          </div>
        </div>
        <p className={styles.bookFine}><Check size={15} aria-hidden />{dict.booking_card.microAllTolls}</p>
      </section>

      <ul className={styles.trustLine} aria-label={copy.promiseTitle}>
        {benefits.map(({ Icon, text }) => <li key={text}><Icon size={18} aria-hidden />{text}</li>)}
      </ul>
      <RoyalBookingSteps locale={locale} />

      <section id="fusion-story" className={styles.story} aria-labelledby="fusion-story-title" data-royal-story>
        <div className={styles.storyIntro}><h2 id="fusion-story-title">{copy.journeyTitle}</h2></div>
        <div className={styles.storyFrame}>
          <div className={styles.storyImage} data-royal-story-frame>
            <Image key={scenes[chapter].image} src={scenes[chapter].image} alt="" fill
              sizes="(max-width:760px) 100vw, 55vw" className={styles.cover} />
          </div>
        </div>
        <div className={styles.storyRail}>
          {scenes.map((scene, index) => (
            <button type="button" key={scene.title} aria-pressed={chapter === index} onClick={() => setChapter(index)}>
              <small>{numbers.format(index + 1)}</small><strong>{scene.title}</strong><ChevronDown size={17} aria-hidden />
              {chapter === index && <span className={styles.sceneDetail}>{scene.description}</span>}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.showroom} id="fusion-fleet" aria-labelledby="fusion-fleet-title">
        <div className={styles.showroomHeading}>
          <h2 id="fusion-fleet-title">{copy.fleetTitle}</h2>
          <Link href={`/${locale}/fleet`}>{dict.nav.fleet}<ArrowUpRight size={17} aria-hidden /></Link>
        </div>
        <div className={styles.showroomLayout}>
          <div style={{ gridColumn: '1 / -1' }}>
            <BronzeCircularFleet
              vehicles={fleet.map((vehicle) => ({
                id: vehicle.id,
                image: vehicle.exteriorImage,
                name: vehicle.name[locale],
                disabled: !(rates[route]?.[FARE_KEYS[vehicle.slug]] > 0) || guests > vehicle.passengers,
              }))}
              activeIndex={carIndex}
              onSelect={chooseVehicle}
              label={dict.nav.fleet}
            />
          </div>
          <div className={styles.carPhoto} data-royal-image>
            <Image key={car.id + String(inside)} src={inside ? car.interiorImage : car.exteriorImage}
              alt={car.name[locale] + ' — ' + (inside ? dict.fleet.viewInterior : dict.fleet.viewExterior)}
              fill sizes="(max-width: 640px) 95vw, (max-width: 900px) 74vw, 66vw"
              className={inside ? styles.carInterior : styles.carExterior} />
            <div className={styles.photoToggle} role="group" aria-label={dict.nav.fleet}>
              <button type="button" aria-pressed={!inside} onClick={() => setInside(false)}>{dict.fleet.viewExterior}</button>
              <button type="button" aria-pressed={inside} onClick={() => setInside(true)}>{dict.fleet.viewInterior}</button>
            </div>
          </div>
          <div className={styles.carDetail}>
            <span className={styles.eyebrow}>{car.categoryBadge[locale]}</span>
            <h3>{car.name[locale]}</h3>
            {car.summary[locale] && <p>{car.summary[locale]}</p>}
            <div className={styles.statLine}>
              <span><Users size={16} aria-hidden />{numbers.format(car.passengers)} {dict.fleet.seatsLabel}</span>
              <span><Luggage size={16} aria-hidden />{numbers.format(car.luggage)} {dict.fleet.bagsLabel}</span>
            </div>
            {journey && <div className={styles.carFare}>
              <small>{copy.vehicleFare}<br />{journey.name}</small>
              <strong>{eligible ? formattedFare(fare) : '—'}</strong>
            </div>}
            <a href="#fusion-book" className={styles.carChoose}>{dict.fleet.bookNowButton}<DirectionArrow size={18} aria-hidden /></a>
            <Link href={`/${locale}/fleet/${car.slug}`} className={styles.detailLink}>{dict.fleet.detailsButton}<ArrowUpRight size={17} aria-hidden /></Link>
          </div>
        </div>
      </section>

      <RoyalCabinChapter locale={locale} />
      {journey && (
        <section className={styles.routeAtlas} id="fusion-routes" aria-labelledby="fusion-routes-title">
          <div className={styles.routesHead}><h2 id="fusion-routes-title">{copy.routeTitle}</h2><p>{copy.routeLead}</p></div>
          <div className={styles.routeCurtain} role="group" aria-label={dict.nav.routes}>
            {routes.filter((item) => item.featured || item.id === route).map((item) => (
              <button key={item.id} type="button" aria-pressed={route === item.id}
                className={styles.routeCurtainPanel}
                onClick={() => changeSelection(item.id, guests)}>
                <Image src={item.image} alt="" fill sizes="(max-width:760px) 90vw, 25vw" className={styles.cover} />
                <span className={styles.curtainShade} aria-hidden="true" />
                <span className={styles.curtainWords}>
                  <small dir="ltr">{item.code}</small>
                  <strong>{item.name}</strong>
                  {route === item.id && <span className={styles.curtainActive}>{copy.routeLead}</span>}
                </span>
                <ArrowUpRight className={styles.curtainArrow} size={21} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className={styles.curtainSummary}>
            <div>
              <span className={styles.eyebrow}>{copy.vehicleFare}</span>
              <h3>{journey.name}</h3>
              <p>{car.name[locale]} <span aria-hidden="true">·</span> {numbers.format(guests)} {dict.fleet.seatsLabel}</p>
            </div>
            <div className={styles.curtainFare} aria-live="polite">
              <strong>{eligible ? formattedFare(fare) : '—'}</strong>
              {!eligible && <small>{validFare ? copy.overCapacity : copy.unavailable}</small>}
            </div>
            <button type="button" disabled={!href} onClick={book} className={styles.routeAction}>
              {dict.routes_explorer.bookRouteCta}<DirectionArrow size={18} aria-hidden />
            </button>
          </div>
          <div className={styles.sectionFoot}><Link href={`/${locale}/routes`}>{dict.nav.routes}<ArrowUpRight size={17} aria-hidden /></Link></div>
        </section>
      )}

      <RoyalServiceChapters locale={locale} dict={dict} />
      <section className={styles.promises} aria-labelledby="royal-policy-title">
        <div className={styles.promiseHead}><h2 id="royal-policy-title">{copy.promiseTitle}</h2></div>
        <ul className={styles.promiseList}>{facts.map((fact) => <li key={fact}><Check size={17} aria-hidden /><p>{fact}</p></li>)}</ul>
      </section>
      <RoyalGuestConfidence locale={locale} dict={dict} />
      <section className={styles.finish} aria-labelledby="royal-close-title">
        <div className={styles.finishImage} data-royal-image>
          <Image src="/assets/images/reference/hero-gmc-saudi.jpg" alt="" fill sizes="(max-width: 760px) 100vw, 57vw" />
        </div>
        <div className={styles.finishCopy}>
          <h2 id="royal-close-title">{copy.closeTitle}</h2>
          <p>{copy.closeDescription}</p>
          <a href="#fusion-book">{copy.heroBook}<DirectionArrow size={19} aria-hidden /></a>
        </div>
      </section>
      <div className={styles.filmstrip} aria-hidden="true" hidden>
        <div className={styles.filmstripTrack}>
          {[
            '/assets/homepage-v2/chauffeur-welcome.jpg',
            '/assets/images/vehicles/hyundai-staria/interior.webp',
            '/assets/images/routes/makkah-to-madinah.jpg',
            '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
            '/assets/homepage-v2/ziyarat-haram.jpg',
            '/assets/images/vehicles/toyota-camry/interior.webp',
          ].map((image, index) => (
            <Image key={image + index} src={image} alt="" width={225} height={124} loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}
