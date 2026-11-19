import React from 'react';

/** Lightweight architectural mark for the private admin portal. */
export function VipBrandMark({ size = 54, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 84 94" width={size} height={Math.round(size * 1.12)}
      fill="none" aria-hidden="true" className={className}>
      <path d="M12 82V39C12 28 28 20 42 8c14 12 30 20 30 31v43"
        stroke="#DDB978" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M20 79V43c0-8 12-16 22-25 10 9 22 17 22 25v36"
        stroke="#DDB978" strokeWidth="1.25" opacity=".75" />
      <path d="M42 8V2M5 82h74" stroke="#DDB978" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 48l19-8 19 8v19l-19 8-19-8V48Z" fill="#152D39" stroke="#F5E6C7" strokeWidth="1.6"/>
      <path d="M23 49l19 8 19-8M42 57v18" stroke="#DDB978" strokeWidth="1.3"/>
      <path d="M23 53l19 7 19-7" stroke="#DDB978" strokeWidth="3.4"/>
      <path d="M30 58v5M54 58v5" stroke="#F0E5CE" strokeWidth="1.6"/>
    </svg>
  );
}
