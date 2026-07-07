import type { Config } from 'tailwindcss';

// Design tokens for Horizon. Colors are intentionally centralized here so a single
// edit re-themes the whole site. `brand` is a placeholder palette (a dawn/amber
// "horizon" accent over deep night) until the team confirms official colors.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // <!-- PLACEHOLDER: replace with Horizon's official team colors -->
        night: {
          950: '#070a13',
          900: '#0b1020',
          800: '#111a33',
          700: '#1b2748',
        },
        brand: {
          DEFAULT: '#ff8a3d',
          50: '#fff4ec',
          100: '#ffe4d1',
          200: '#ffc59e',
          300: '#ffa066',
          400: '#ff8a3d',
          500: '#f56b16',
          600: '#d1520c',
          700: '#a63d0e',
          800: '#843313',
          900: '#6c2c13',
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
