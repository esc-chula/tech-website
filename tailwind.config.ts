import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-mono)', ...fontFamily.mono],

        // TECH MONTH
        'ibm-plex-sans-thai': 'var(--font-ibm-plex-sans-thai)',
        'press-start-2p': 'var(--font-press-start-2p)',
        tiny5: 'var(--font-tiny5)',

        // HACKATHON
        ndot47: 'var(--font-ndot47)',
        geistMono: 'var(--font-geist-mono)',
        geistSans: 'var(--font-geist-sans)',
      },
      colors: {
        // SHADCN
        border:
          'color-mix(in srgb, var(--border) calc(<alpha-value> * 100%), transparent)',
        input:
          'color-mix(in srgb, var(--input) calc(<alpha-value> * 100%), transparent)',
        ring: 'color-mix(in srgb, var(--ring) calc(<alpha-value> * 100%), transparent)',
        background:
          'color-mix(in srgb, var(--background) calc(<alpha-value> * 100%), transparent)',
        foreground:
          'color-mix(in srgb, var(--foreground) calc(<alpha-value> * 100%), transparent)',
        primary: {
          DEFAULT:
            'color-mix(in srgb, var(--primary) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--primary-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        secondary: {
          DEFAULT:
            'color-mix(in srgb, var(--secondary) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--secondary-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        destructive: {
          DEFAULT:
            'color-mix(in srgb, var(--destructive) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--destructive-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        muted: {
          DEFAULT:
            'color-mix(in srgb, var(--muted) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--muted-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        accent: {
          DEFAULT:
            'color-mix(in srgb, var(--accent) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--accent-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        popover: {
          DEFAULT:
            'color-mix(in srgb, var(--popover) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--popover-foreground) calc(<alpha-value> * 100%), transparent)',
        },
        card: {
          DEFAULT:
            'color-mix(in srgb, var(--card) calc(<alpha-value> * 100%), transparent)',
          foreground:
            'color-mix(in srgb, var(--card-foreground) calc(<alpha-value> * 100%), transparent)',
        },

        // ESC
        carmine: {
          50: 'color-mix(in srgb, var(--esc-carmine-50) calc(<alpha-value> * 100%), transparent)',
          100: 'color-mix(in srgb, var(--esc-carmine-100) calc(<alpha-value> * 100%), transparent)',
          200: 'color-mix(in srgb, var(--esc-carmine-200) calc(<alpha-value> * 100%), transparent)',
          300: 'color-mix(in srgb, var(--esc-carmine-300) calc(<alpha-value> * 100%), transparent)',
          400: 'color-mix(in srgb, var(--esc-carmine-400) calc(<alpha-value> * 100%), transparent)',
          500: 'color-mix(in srgb, var(--esc-carmine-500) calc(<alpha-value> * 100%), transparent)',
          600: 'color-mix(in srgb, var(--esc-carmine-600) calc(<alpha-value> * 100%), transparent)',
          700: 'color-mix(in srgb, var(--esc-carmine-700) calc(<alpha-value> * 100%), transparent)',
          800: 'color-mix(in srgb, var(--esc-carmine-800) calc(<alpha-value> * 100%), transparent)',
          900: 'color-mix(in srgb, var(--esc-carmine-900) calc(<alpha-value> * 100%), transparent)',
        },

        // TECH MONTH
        techmonth: {
          white: '#F2F0E0',
          green: '#C3E88D',
          magenta: '#C782EA',
          yellow: '#FFEB0A',
          black: '#1C1C1C',
        },

        // HACKATHON
        hackathon: {
          primary: '#FF0909',
        },
      },
      borderRadius: {
        '2xl': 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 2px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'background-gradient':
          'linear-gradient(119.65deg, #FFFFFF 0%, #D2D2D2 108.38%)',
        'background-gradient-prop':
          'radial-gradient(50% 50% at 50% 50%, #982C32 0%, rgba(255, 255, 255, 0) 100%)',

        // HACKATHON
        'hackathon-radial-gradient':
          'radial-gradient(50% 50% at 50% 50%, rgba(255, 9, 9, 0.15) 0%, rgba(255, 9, 9, 0.00) 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
