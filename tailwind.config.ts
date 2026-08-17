import type { Config } from 'tailwindcss';

// Design tokens for Horizon. See docs/UI_GUIDE.md for the reasoning behind each
// scale. Official palette (docs/SPEC.md §3): amber #FFCB5C → orange #F86A43 →
// crimson #B13848 over deep purple-black #17061D.
//
// Both neutral ramps are tinted toward the brand's violet on purpose — a cool
// gray next to this palette reads as a stock template.
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
        // Surfaces, darkest first. 950 is the official brand ground.
        night: {
          950: '#17061d',
          925: '#1c0a24',
          900: '#22102b',
          850: '#2a1735',
          800: '#331e3f',
          700: '#42294f',
          600: '#563863',
        },
        // Text and hairlines on dark. 300 is the body-copy floor.
        haze: {
          50: '#faf6fb',
          100: '#f0e8f2',
          200: '#dccfe0',
          300: '#c2b0c8',
          400: '#a08fa8',
          // 500 was #82708b, which fell to 3.65:1 on the card surface — below
          // AA for the small mono captions it is used for. Lightened until it
          // clears 4.5:1 against night-850, the lightest ground it lands on.
          500: '#93849b',
          600: '#665572',
        },
        // The sunrise. 300/500/700 are the three official stops.
        brand: {
          DEFAULT: '#f86a43',
          50: '#fff8ec',
          100: '#ffeecf',
          200: '#ffdd9c',
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
        // Jost — geometric, same circle-and-arc construction as the logo.
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        // Newsreader — every narrative paragraph on the site.
        prose: ['var(--font-prose)', 'ui-serif', 'Georgia', 'serif'],
        // JetBrains Mono — figures, team numbers, prices, counts.
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // 1.25 ratio. Display sizes fluid so the hero never steps at a breakpoint.
        'display-sm': [
          'clamp(2.25rem, 5vw, 3rem)',
          { lineHeight: '1.08', letterSpacing: '-0.02em' },
        ],
        'display-md': [
          'clamp(2.75rem, 7vw, 4.5rem)',
          { lineHeight: '1.04', letterSpacing: '-0.03em' },
        ],
        'display-lg': [
          'clamp(3.25rem, 10vw, 6.5rem)',
          { lineHeight: '0.98', letterSpacing: '-0.035em' },
        ],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '8px',
        lg: '14px',
        xl: '20px',
        '2xl': '28px',
      },
      boxShadow: {
        // Three elevations. On a dark ground a drop shadow does little, so each
        // one also carries a 1px top highlight to read as a lit edge.
        raised:
          'inset 0 1px 0 rgb(255 255 255 / 0.06), 0 1px 2px rgb(0 0 0 / 0.4)',
        card: 'inset 0 1px 0 rgb(255 255 255 / 0.07), 0 2px 6px rgb(0 0 0 / 0.35), 0 12px 28px -12px rgb(0 0 0 / 0.5)',
        lifted:
          'inset 0 1px 0 rgb(255 255 255 / 0.09), 0 6px 16px rgb(0 0 0 / 0.4), 0 28px 60px -24px rgb(0 0 0 / 0.7)',
        // The single tinted shadow, reserved for the one primary CTA per page.
        ember: '0 8px 24px -8px rgb(248 106 67 / 0.5)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        // Hero entrance, orchestrated once on load.
        rise: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // The sun clearing the horizon line. Slow, only on the hero.
        'sun-rise': {
          '0%': { opacity: '0', transform: 'translateY(48px) scale(0.94)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        // The horizon rule wiping outward from the center.
        'rule-wipe': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'sun-rise': 'sun-rise 1.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'rule-wipe': 'rule-wipe 1.2s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
