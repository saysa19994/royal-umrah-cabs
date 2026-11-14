import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ====================================================================
        // DUYUF AL RAHMAN VIP — DUAL-THEME DYNAMIC TOKENS (STAGE 2)
        // ====================================================================
        theme: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent-primary)',
          accentHover: 'var(--accent-hover)',
          accentSoft: 'var(--accent-soft)',
          border: 'var(--border-stone)',
          borderSubtle: 'var(--border-subtle)',
        },

        // ====================================================================
        // DUYUF AL RAHMAN VIP — OFFICIAL MASTER REDESIGN TOKENS (PROMPT 0)
        // ====================================================================
        ivory: {
          DEFAULT: '#F7F5F0',
          50: '#FCFAF7',
          100: '#F7F5F0',
          200: '#EFEBE2',
          300: '#E5E0D6',
        },
        navy: {
          DEFAULT: '#101827',
          secondary: '#243247',
          deep: '#0D1420',
          light: '#1E293B',
          card: '#101827',
          border: '#243247',
          vip: '#101827',
          dark: '#0B101C',
        },
        bronze: {
          DEFAULT: '#A77B3E',
          hover: '#B88B4E',
          dark: '#8E672F',
          light: '#F5EFE6',
          soft: 'rgba(167, 123, 62, 0.12)',
          line: 'rgba(167, 123, 62, 0.28)',
        },
        stone: {
          DEFAULT: '#E5E0D6',
          light: '#F0ECE4',
          border: '#E5E0D6',
          dark: '#D5CEC0',
        },
        slateText: {
          DEFAULT: '#64748B',
          muted: '#64748B',
          dark: '#334155',
          heading: '#101827',
        },

        // Dynamic dual-theme tokens mapped to CSS variables
        bg: 'var(--bg-base)',
        'bg-alt': 'var(--bg-elevated)',
        alabaster: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        'surface-warm': 'var(--bg-elevated)',
        border: 'var(--border-stone)',
        'border-strong': 'var(--accent-primary)',
        ink: 'var(--text-primary)',
        'ink-muted': 'var(--text-secondary)',
        'ink-light': 'var(--text-muted)',
        body: 'var(--text-secondary)',
        mutedText: 'var(--text-muted)',
        whatsappGreen: '#25D366',

        // Compatibility tokens mapped to dynamic theme tokens
        luxury: {
          midnight: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          cardBorder: 'var(--border-stone)',
          gold: 'var(--accent-primary)',
          goldHover: 'var(--accent-hover)',
          goldDark: 'var(--accent-primary)',
          goldLine: 'var(--accent-soft)',
          warmWhite: 'var(--bg-surface)',
          silver: 'var(--text-secondary)',
          emerald: '#188567',
        },

        royal: {
          navy: 'var(--bg-base)',
          deepNavy: 'var(--bg-surface)',
          charcoal: 'var(--bg-elevated)',
          champagne: 'var(--accent-primary)',
          gold: 'var(--accent-primary)',
          ivory: 'var(--bg-base)',
          white: 'var(--bg-surface)',
          textPrimary: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
          border: 'var(--border-stone)',
          success: '#188567',
          warning: '#B7791F',
        },

        gold: {
          DEFAULT: '#A77B3E',
          vip: '#A77B3E',
          softGold: '#B88B4E',
          hover: '#B88B4E',
          dark: '#8E672F',
          soft: 'rgba(167, 123, 62, 0.12)',
          line: 'rgba(167, 123, 62, 0.28)',
        },
        charcoal: {
          DEFAULT: '#1E293B',
          card: '#243247',
          border: '#E5E0D6',
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
