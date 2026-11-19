'use client';

import { useId } from 'react';
import type { Locale } from '@/i18n/config';
import styles from './ConnectedJourneyLines.module.css';

type Props = { title: string; description: string; locale: Locale; routeId: string; enableTaif: boolean; enableRiyadh: boolean };
type NodeKey = 'jeddah' | 'makkah' | 'madinah' | 'taif' | 'riyadh';
const NODES: Record<NodeKey, { x: number; y: number; label: Record<string, string> }> = {
  jeddah: { x: 100, y: 110, label: { ar: 'جدة', en: 'Jeddah', fr: 'Djeddah', tr: 'Cidde', ur: 'جدہ', hi: 'जेद्दा', es: 'Yeda', de: 'Dschidda', id: 'Jeddah', ms: 'Jeddah' } },
  makkah: { x: 330, y: 155, label: { ar: 'مكة', en: 'Makkah', fr: 'La Mecque', tr: 'Mekke', ur: 'مکہ', hi: 'मक्का', es: 'La Meca', de: 'Mekka', id: 'Makkah', ms: 'Makkah' } },
  madinah: { x: 575, y: 80, label: { ar: 'المدينة', en: 'Madinah', fr: 'Médine', tr: 'Medine', ur: 'مدینہ', hi: 'मदीना', es: 'Medina', de: 'Medina', id: 'Madinah', ms: 'Madinah' } },
  taif: { x: 570, y: 240, label: { ar: 'الطائف', en: 'Taif', fr: 'Taïf', tr: 'Taif', ur: 'طائف', hi: 'ताइफ़', es: 'Taif', de: 'Taif', id: 'Taif', ms: 'Taif' } },
  riyadh: { x: 835, y: 155, label: { ar: 'الرياض', en: 'Riyadh', fr: 'Riyad', tr: 'Riyad', ur: 'ریاض', hi: 'रियाद', es: 'Riad', de: 'Riad', id: 'Riyadh', ms: 'Riyadh' } },
};
const EDGES: { from: NodeKey; to: NodeKey; d: string; region?: 'taif' | 'riyadh' }[] = [
  { from: 'jeddah', to: 'makkah', d: 'M 100 110 Q 210 85 330 155' },
  { from: 'jeddah', to: 'madinah', d: 'M 100 110 Q 325 -15 575 80' },
  { from: 'makkah', to: 'madinah', d: 'M 330 155 Q 420 85 575 80' },
  { from: 'makkah', to: 'taif', d: 'M 330 155 Q 435 245 570 240', region: 'taif' },
  { from: 'jeddah', to: 'taif', d: 'M 100 110 Q 280 310 570 240', region: 'taif' },
  { from: 'riyadh', to: 'makkah', d: 'M 835 155 Q 580 335 330 155', region: 'riyadh' },
  { from: 'riyadh', to: 'madinah', d: 'M 835 155 Q 735 40 575 80', region: 'riyadh' },
];

const ROUTE_TO_EDGE: Record<string, string> = {
  'jeddah-airport-to-makkah': 'jeddah:makkah',
  'makkah-to-jeddah-airport': 'jeddah:makkah',
  'jeddah-airport-to-madinah': 'jeddah:madinah',
  'jeddah-to-madinah': 'jeddah:madinah',
  'makkah-to-madinah': 'makkah:madinah',
  'madinah-to-makkah': 'makkah:madinah',
  'makkah-to-taif': 'makkah:taif',
  'taif-to-makkah': 'makkah:taif',
  'jeddah-to-taif': 'jeddah:taif',
  'riyadh-to-makkah': 'riyadh:makkah',
  'riyadh-to-madinah': 'riyadh:madinah',
};

/** Schematic only; routes reflect supported service pairs, not geographical distances. */
export default function ConnectedJourneyLines({ title, description, locale, routeId, enableTaif, enableRiyadh }: Props) {
  const id = 'bronzeRoute' + useId().replace(/:/g, '');
  const visible = (key: NodeKey) => (key !== 'taif' || enableTaif) && (key !== 'riyadh' || enableRiyadh);
  const paths = EDGES.filter(edge => visible(edge.from) && visible(edge.to));
  const currentEdge = ROUTE_TO_EDGE[routeId];
  return (
    <div className={styles.network} role="group" aria-label={title}>
      <svg viewBox="0 0 940 330" preserveAspectRatio="xMidYMid meet" role="img" aria-label={description}>
        <defs><linearGradient id={id} x1="0" x2="1"><stop stopColor="#a78b71" stopOpacity=".18"/><stop offset=".5" stopColor="#e8d5b7" stopOpacity=".9"/><stop offset="1" stopColor="#a78b71" stopOpacity=".18"/></linearGradient></defs>
        {paths.map((edge, index) => <path key={edge.from + edge.to} d={edge.d} className={styles.route} data-active={currentEdge === `${edge.from}:${edge.to}`} stroke={`url(#${id})`} style={{ animationDelay: `${index * .5}s` }}/>)}
        {(Object.entries(NODES) as [NodeKey, typeof NODES[NodeKey]][]).filter(([key]) => visible(key)).map(([key, node]) => (
          <g key={key}><circle cx={node.x} cy={node.y} r="8" fill="#0a0a0a" stroke="#c9b8a0" strokeWidth="2"/><circle cx={node.x} cy={node.y} r="3" fill="#e8d5b7"/><text x={node.x} y={node.y + (key === 'taif' ? 32 : -19)} textAnchor="middle" fill="#e8d5b7" fontSize="16">{node.label[locale] || node.label.en}</text></g>
        ))}
      </svg>
    </div>
  );
}
