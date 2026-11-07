'use client';

import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [styles, setStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const generatedStyles: Array<React.CSSProperties> = [];
    for (let i = 0; i < number; i++) {
      generatedStyles.push({
        top: '-20px',
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${(Math.random() * 1.5 + 0.2).toFixed(2)}s`,
        animationDuration: `${Math.floor(Math.random() * 8 + 4)}s`,
      });
    }
    setStyles(generatedStyles);
  }, [number]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {styles.map((style, idx) => (
        <span
          key={`meteor-${idx}`}
          className={clsx(
            'animate-meteor absolute h-0.5 w-0.5 rounded-full bg-[#E5B14B] shadow-[0_0_0_1px_rgba(214,161,58,0.4)]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[60px] before:h-[1px] before:bg-gradient-to-r before:from-[#D6A13A] before:via-[#E5B14B] before:to-transparent",
            className
          )}
          style={style}
        />
      ))}
    </div>
  );
}
