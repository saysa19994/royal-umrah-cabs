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
        bg: '#FDFCFA',
        'bg-alt': '#F3EEE6',
        surface: '#FFFFFF',
        'surface-warm': '#FAF7F2',
        border: '#E8E1D5',
        'border-strong': '#D5C9B5',
        ink: '#1A1A1A',
        'ink-muted': '#68645E',
        body: '#3A3835',
        gold: {
          DEFAULT: '#D9A031',
          hover: '#C79026',
          dark: '#B8821F',
          soft: '#FBF2DF',
          line: '#ECD7AB',
        },
        charcoal: {
          DEFAULT: '#141210',
          card: '#1C1916',
          border: '#2C2723',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#1EBE5D',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'var(--font-amiri)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'var(--font-tajawal)', 'sans-serif'],
        arabic: ['var(--font-tajawal)', 'var(--font-cairo)', 'sans-serif'],
      },
      borderRadius: {
        btn: '8px',
        card: '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(20, 18, 16, 0.04)',
        sm: '0 2px 8px rgba(20, 18, 16, 0.06)',
        md: '0 8px 24px rgba(20, 18, 16, 0.08)',
        lg: '0 16px 40px rgba(20, 18, 16, 0.12)',
        gold: '0 8px 24px rgba(217, 160, 49, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
