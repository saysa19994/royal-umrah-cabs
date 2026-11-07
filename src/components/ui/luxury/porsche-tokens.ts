/**
 * Porsche Design System Official Architecture & Tokens
 * Adapted for Duyuf Al Rahman VIP Chauffeur Platform
 * @see https://designsystem.porsche.com
 */

export const PORSCHE_LUXURY_TOKENS = {
  // 1. Color Palettes (Obsidian High Contrast & Liquid Gold)
  colors: {
    base: {
      background: '#090D15',
      surface: '#101725',
      surfaceElevated: '#162032',
      surfaceGlass: 'rgba(16, 23, 37, 0.85)',
      contrastHigh: '#FFFFFF',
      contrastMedium: '#AEB7C4',
      contrastLow: 'rgba(255, 255, 255, 0.25)',
    },
    brand: {
      goldPrimary: '#D6A13A',
      goldLight: '#E5B14B',
      goldDark: '#A97B27',
      goldGlow: 'rgba(214, 161, 58, 0.25)',
      goldBorder: 'rgba(214, 161, 58, 0.35)',
    },
    state: {
      success: '#25D366', // WhatsApp & Verified
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },

  // 2. Automotive Spacing Scale (8pt Grid)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  // 3. Motion Curves (Supercar Acceleration Curves)
  motion: {
    acceleration: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    deceleration: 'cubic-bezier(0, 0, 0.2, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    durationFast: '150ms',
    durationMedium: '300ms',
    durationSlow: '500ms',
  },

  // 4. Elevation Shadows
  shadows: {
    card: '0 10px 30px rgba(0, 0, 0, 0.5)',
    cardHover: '0 20px 50px rgba(214, 161, 58, 0.15)',
    modal: '0 25px 60px rgba(0, 0, 0, 0.75)',
    glow: '0 0 25px rgba(214, 161, 58, 0.35)',
  },

  // 5. Border Radii
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    full: '9999px',
  },
} as const;

export type PorscheLuxuryTokens = typeof PORSCHE_LUXURY_TOKENS;
