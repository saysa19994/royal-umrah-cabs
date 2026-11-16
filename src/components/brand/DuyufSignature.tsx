import React from 'react';

interface DuyufSignatureProps {
  className?: string;
}

/**
 * Duyuf Alrahman VIP signature mark.
 * An open hospitality arch and a single continuous route line; no car clipart,
 * shield, crown or borrowed religious symbol. Scales cleanly at favicon size.
 * Designed to inherit the surrounding text color in light and dark themes.
 */
export function DuyufSignature({ className = '' }: DuyufSignatureProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 15v21c0 11.9 8.1 19 20 19s20-7.1 20-19V15"
        stroke="currentColor"
        strokeWidth="5.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10c11 1.7 18 10.1 18 21.1 0 8.2-4.4 13.4-10.9 16.2"
        stroke="#4A9FAC"
        strokeWidth="5.3"
        strokeLinecap="round"
      />
      <circle cx="28" cy="47" r="2.6" fill="#4A9FAC" />
    </svg>
  );
}
