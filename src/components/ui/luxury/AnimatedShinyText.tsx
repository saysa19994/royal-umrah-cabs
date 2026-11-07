'use client';

import React from 'react';
import { clsx } from 'clsx';

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
        } as React.CSSProperties
      }
      className={clsx(
        'mx-auto max-w-md text-neutral-400/80',
        // Shimmer effect
        'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]',
        // Shimmer gradient
        'bg-gradient-to-r from-transparent via-[#E5B14B] via-50% to-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
