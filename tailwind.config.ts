import type { Config } from 'tailwindcss';

// Design tokens for Horizon. Colors are intentionally centralized here so a single
// edit re-themes the whole site. Official palette (see docs/SPEC.md §3): amber
// #FFCB5C → orange #F86A43 → crimson #B13848 over deep purple-black #17061D.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#17061d',
          900: '#20102b',
          800: '#2c1a3a',
          700: '#3b2650',
        },
        brand: {
          DEFAULT: '#f86a43',
          50: '#fff7e9',
          100: '#ffedc9',
          200: '#ffdc93',
          300: '#ffcb5c',
          400: '#fb9a4c',
          500: '#f86a43',
          600: '#e14f41',
          700: '#b13848',
          800: '#8e2c40',
          900: '#6d2136',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
