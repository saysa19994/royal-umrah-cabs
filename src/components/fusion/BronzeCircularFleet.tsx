'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './BronzeCircularFleet.module.css';

type Vehicle = { id: string; image: string; name: string; disabled?: boolean };
type Props = { vehicles: Vehicle[]; activeIndex: number; onSelect: (index: number) => void; label: string };

export default function BronzeCircularFleet({ vehicles, activeIndex, onSelect, label }: Props) {
  const start = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const count = vehicles.length;
  const move = (direction: number) => {
    if (!count) return;
    for (let step = 1; step <= count; step++) {
      const next = (activeIndex + direction * step + count * step) % count;
      if (!vehicles[next].disabled) { onSelect(next); return; }
    }
  };
  return (
    <div className={styles.shell} aria-label={label}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.stage}
        onPointerDown={(e) => { start.current = e.clientX; setDragging(true); }}
        onPointerUp={(e) => {
          if (start.current !== null) {
            const distance = e.clientX - start.current;
            if (Math.abs(distance) > 35) move(distance < 0 ? 1 : -1);
          }
          start.current = null; setDragging(false);
        }}
        onPointerCancel={() => { start.current = null; setDragging(false); }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
        }}
        tabIndex={0} role="group">
        {vehicles.map((vehicle, index) => {
          const raw = (index - activeIndex + count) % count;
          const offset = raw > count / 2 ? raw - count : raw;
          const distance = Math.abs(offset);
          return (
            <button type="button" key={vehicle.id} disabled={vehicle.disabled}
              className={styles.vehicle}
              aria-pressed={index === activeIndex}
              aria-label={vehicle.name}
              onClick={() => { if (!dragging) onSelect(index); }}
              style={{
                transform: `translateX(calc(-50% + ${offset * 65}%)) translateY(${distance * 18}px) scale(${Math.max(0.62, 1 - distance * 0.16)}) rotateY(${-offset * 17}deg)`,
                zIndex: count - distance, opacity: distance > 2 ? 0 : 1,
                pointerEvents: distance > 2 ? 'none' : 'auto',
              }}>
              <span className={styles.image}><Image src={vehicle.image} alt="" fill sizes="(max-width: 640px) 70vw, 38vw" /></span>
              <span className={styles.name}>{vehicle.name}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.controls}>
        <button type="button" onClick={() => move(-1)} aria-label="Previous vehicle">‹</button>
        <span>{String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
        <button type="button" onClick={() => move(1)} aria-label="Next vehicle">›</button>
      </div>
    </div>
  );
}
