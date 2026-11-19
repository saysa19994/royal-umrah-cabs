'use client';

import { useId } from 'react';
import styles from './ConnectedJourneyLines.module.css';

type Props = { title: string; description: string };
/** Schematic network, not a geographical map or distance representation. */
export default function ConnectedJourneyLines({ title, description }: Props) {
  const rawId = useId().replace(/:/g, '');
  const gradientId = 'routeBronze' + rawId;
  const paths = [
    'M 110 160 Q 235 65 350 160',
    'M 350 160 Q 470 35 600 160',
    'M 600 160 Q 725 65 850 160',
    'M 350 160 Q 470 275 600 160',
    'M 110 160 Q 470 310 850 160',
  ];
  const nodes = [
    { x: 110, y: 160, en: 'Jeddah', ar: 'جدة' },
    { x: 350, y: 160, en: 'Makkah', ar: 'مكة' },
    { x: 600, y: 160, en: 'Madinah', ar: 'المدينة' },
    { x: 850, y: 160, en: 'Taif / Riyadh', ar: 'الطائف / الرياض' },
  ];
  return (
    <div className={styles.network} role="img" aria-label={description}>
      <div className={styles.heading}><span>{title}</span><small>{description}</small></div>
      <svg viewBox="0 0 960 320" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><linearGradient id={gradientId} x1="0" x2="1"><stop stopColor="#a78b71" stopOpacity=".18"/><stop offset=".5" stopColor="#e8d5b7" stopOpacity=".9"/><stop offset="1" stopColor="#a78b71" stopOpacity=".18"/></linearGradient></defs>
        {paths.map((d, i) => <path key={d} d={d} className={styles.route} stroke={`url(#${gradientId})`} style={{ animationDelay: `${i * .5}s` }}/>)}
        {nodes.map((node) => <g key={node.en}><circle cx={node.x} cy={node.y} r="8" fill="#0a0a0a" stroke="#c9b8a0" strokeWidth="2"/><circle cx={node.x} cy={node.y} r="3" fill="#e8d5b7"/><text x={node.x} y={node.y+34} textAnchor="middle" fill="#e8d5b7" fontSize="17">{node.en}</text></g>)}
      </svg>
    </div>
  );
}
