import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FDFBF7',
        'bg-alt': '#F7F3EB',
        alabaster: '#F8FAFC',
        surface: '#FFFFFF',
        'surface-warm': '#FAF7F2',
        border: '#E2DCD2',
        'border-strong': '#D5CDBF',
        ink: '#1E293B',
        'ink-muted': '#64748B',
        body: '#334155',
        mutedText: '#c9d1e3',
        whatsappGreen: '#25d366',

        // ====================================================================
        // OFFICIAL ROYAL LUXURY DESIGN SYSTEM TOKENS (PHASE 01)
        // ====================================================================
        royal: {
          navy: '#101827',         // Midnight Navy: primary hero & luxury container
          deepNavy: '#111C30',     // Deep Navy: contrast cards & feature strips
          charcoal: '#161B24',     // Charcoal: dark accents & tertiary contrast
          champagne: '#C5A15D',    // Champagne Gold: luxury CTA & primary focus
          gold: '#D7B76C',         // Warm Gold: secondary gold & badge highlights
          ivory: '#F7F5F0',        // Warm Ivory: primary page background & cards
          white: '#FFFFFF',        // Pure White: cards & high-contrast elements
          textPrimary: '#182235',  // Primary Text: high readability dark ink
          textSecondary: '#687386',// Secondary Text: dignified muted caption
          border: '#E8E3DA',       // Border: soft warm hairline border
          success: '#188567',      // Success: dignified emerald indicator
          warning: '#B7791F',      // Warning: warm amber alert
        },

        // Legacy compatibility mappings to avoid breaking existing pages
        navy: {
          DEFAULT: '#101827',
          vip: '#0a1224',
          deep: '#111C30',
          dark: '#060A14',
          light: '#111827',
          card: '#0F172A',
          border: '#1E293B',
        },
        gold: {
          DEFAULT: '#C5A15D',
          vip: '#D7B76C',
          softGold: '#e8c766',
          hover: '#B5904C',
          dark: '#9E7A32',
          soft: '#FBF7ED',
          line: '#E8E3DA',
        },
        charcoal: {
          DEFAULT: '#161B24',
          card: '#111827',
          border: '#1E293B',
        },
        emerald: {
          DEFAULT: '#188567',
          hover: '#136e55',
          dark: '#047857',
          light: '#D1FAE5',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1ebe5d',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'var(--font-cormorant)', 'var(--font-amiri)', 'Georgia', 'serif'],
        serif: ['var(--font-playfair)', 'var(--font-cormorant)', 'var(--font-amiri)', 'Georgia', 'serif'],
        editorial: ['var(--font-playfair)', 'var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'var(--font-inter)', 'var(--font-ibm-plex-arabic)', 'var(--font-tajawal)', 'sans-serif'],
        arabic: ['var(--font-ibm-plex-arabic)', 'var(--font-tajawal)', 'var(--font-cairo)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'var(--font-tajawal)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        urdu: ['var(--font-urdu)', 'var(--font-tajawal)', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'sans-serif'],
      },
      borderRadius: {
        btn: '9999px', // Royal Luxury uses pill-shaped or soft rounded buttons
        'btn-subtle': '10px',
        card: '16px',
        'card-lg': '24px',
        'card-xl': '32px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(16, 24, 39, 0.04)',
        sm: '0 2px 8px rgba(16, 24, 39, 0.06)',
        md: '0 8px 24px rgba(16, 24, 39, 0.08)',
        lg: '0 16px 40px rgba(16, 24, 39, 0.12)',
        royal: '0 10px 30px -5px rgba(16, 24, 39, 0.08)',
        'royal-hover': '0 20px 45px -10px rgba(16, 24, 39, 0.14)',
        'gold-subtle': '0 4px 20px rgba(197, 161, 93, 0.22)',
        'gold-hover': '0 8px 30px rgba(197, 161, 93, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
