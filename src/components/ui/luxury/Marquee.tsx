'use client';

import React from 'react';
import { clsx } from 'clsx';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  duration?: number;
  gap?: string;
  [key: string]: unknown;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  duration = 40,
  gap = '1rem',
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      style={{
        '--duration': `${duration}s`,
        '--gap': gap,
      } as React.CSSProperties}
      className={clsx(
        'group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={clsx('flex shrink-0 justify-around [gap:var(--gap)]', {
              'animate-marquee flex-row': !vertical && !reverse,
              'animate-marquee-reverse flex-row': !vertical && reverse,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
