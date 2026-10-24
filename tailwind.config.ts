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
        navy: {
          DEFAULT: '#0A0F1D',
          vip: '#0a1224',
          deep: '#0f1a33',
          dark: '#060A14',
          light: '#111827',
          card: '#0F172A',
          border: '#1E293B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          vip: '#d4a72c',
          softGold: '#e8c766',
          hover: '#C29D29',
          dark: '#AA7C11',
          soft: '#FBF7ED',
          line: '#EAD7A1',
        },
        charcoal: {
          DEFAULT: '#0A0F1D',
          card: '#111827',
          border: '#1E293B',
        },
        emerald: {
          DEFAULT: '#10B981',
          hover: '#059669',
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
        sans: ['var(--font-inter)', 'var(--font-manrope)', 'var(--font-tajawal)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'var(--font-tajawal)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'var(--font-tajawal)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        urdu: ['var(--font-urdu)', 'var(--font-tajawal)', 'sans-serif'],
        devanagari: ['var(--font-devanagari)', 'sans-serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(10, 15, 29, 0.04)',
        sm: '0 2px 8px rgba(10, 15, 29, 0.06)',
        md: '0 8px 24px rgba(10, 15, 29, 0.08)',
        lg: '0 16px 40px rgba(10, 15, 29, 0.12)',
        gold: '0 8px 24px rgba(212, 175, 55, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
