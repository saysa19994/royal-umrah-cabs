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
        surface: '#FFFFFF',
        'surface-warm': '#FAF7F2',
        border: '#E2DCD2',
        'border-strong': '#D5CDBF',
        ink: '#211F1B',
        'ink-muted': '#706B62',
        body: '#35322D',
        gold: {
          DEFAULT: '#D8B16A',
          hover: '#C89E50',
          dark: '#B3893C',
          soft: '#FBF5EB',
          line: '#E8D5B0',
        },
        charcoal: {
          DEFAULT: '#171513',
          card: '#1F1C19',
          border: '#2E2A26',
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
        xs: '0 1px 2px rgba(23, 21, 19, 0.04)',
        sm: '0 2px 8px rgba(23, 21, 19, 0.06)',
        md: '0 8px 24px rgba(23, 21, 19, 0.08)',
        lg: '0 16px 40px rgba(23, 21, 19, 0.12)',
        gold: '0 8px 24px rgba(216, 177, 106, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
