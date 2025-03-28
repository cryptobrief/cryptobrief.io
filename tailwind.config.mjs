import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            color: 'inherit',
            a: {
              color: 'var(--primary)',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--primary-dark)',
              },
            },
            h1: {
              color: 'inherit',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '2.5rem',
              lineHeight: '1.2',
              letterSpacing: '-0.5px',
              fontWeight: '700',
            },
            h2: {
              color: 'inherit',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '2rem',
              lineHeight: '1.25',
              letterSpacing: '-0.5px',
              fontWeight: '700',
            },
            h3: {
              color: 'inherit',
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: '1.5rem',
              lineHeight: '1.3',
              letterSpacing: '-0.5px',
              fontWeight: '700',
            },
            p: {
              color: 'inherit',
              fontSize: '1rem',
              lineHeight: '1.75',
              maxWidth: '75ch',
            },
            strong: {
              color: 'inherit',
              fontWeight: '500',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
