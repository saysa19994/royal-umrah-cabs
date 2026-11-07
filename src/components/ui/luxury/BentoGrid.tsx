'use client';

import React from 'react';
import { clsx } from 'clsx';

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-300 shadow-input p-5 bg-[#101725] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(214,161,58,0.4)] justify-between flex flex-col space-y-4 relative overflow-hidden',
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        {icon}
        <div className="font-bold text-[#F6F3ED] mb-2 mt-2 font-display text-lg">
          {title}
        </div>
        <div className="font-normal text-[#AEB7C4] text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
