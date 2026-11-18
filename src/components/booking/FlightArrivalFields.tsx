import { Plane } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { ArrivalAirport } from '@/lib/booking-flight';
import { ARRIVAL_COPY } from './airport-arrival-copy';

export interface FlightArrivalDraft {
  airline: string;
  number: string;
  date: string;
  time: string;
}

interface FlightArrivalFieldsProps {
  airport: ArrivalAirport;
  locale: Locale;
  value: FlightArrivalDraft;
  onChange: (value: FlightArrivalDraft) => void;
}

const FIELD_CLASS = 'min-h-12 w-full min-w-0 rounded-btn border border-border-strong bg-surface px-3 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

export function FlightArrivalFields({ airport, locale, value, onChange }: FlightArrivalFieldsProps) {
  const [heading, note, airportLabel, airlineLabel, flightLabel, dateLabel, timeLabel, , jeddah, madinah] = ARRIVAL_COPY[locale];

  return (
    <fieldset className="grid min-w-0 gap-4 rounded-xl border border-border bg-bg-alt/60 p-4 sm:p-5">
      <legend className="px-2 font-semibold text-ink">{heading}</legend>
      <p className="text-sm leading-relaxed text-ink-muted">{note}</p>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <div className="min-w-0 text-sm">
          <span className="mb-1.5 block font-bold text-ink">{airportLabel}</span>
          <div className={`${FIELD_CLASS} flex items-center gap-2`}>
            <Plane size={16} className="shrink-0 text-gold-dark" aria-hidden="true" />
            <span>{airport === 'JED' ? jeddah : madinah} <bdi>({airport})</bdi></span>
          </div>
        </div>
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-ink">
          {airlineLabel}
          <input className={FIELD_CLASS} autoComplete="off" maxLength={100} value={value.airline}
            onChange={(event) => onChange({ ...value, airline: event.target.value })} />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-ink">
          {flightLabel}
          <input id="flight-input" className={FIELD_CLASS} autoComplete="off" dir="ltr" maxLength={20}
            placeholder="SV 1234" value={value.number}
            onChange={(event) => onChange({ ...value, number: event.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '') })} />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-ink">
          {dateLabel}
          <input type="date" className={FIELD_CLASS} value={value.date}
            onChange={(event) => onChange({ ...value, date: event.target.value })} />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-ink">
          {timeLabel}
          <input type="time" className={FIELD_CLASS} value={value.time}
            onChange={(event) => onChange({ ...value, time: event.target.value })} />
        </label>
      </div>
    </fieldset>
  );
}
