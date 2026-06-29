import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#FDFAF6',
          100: '#F8F4EF',
          200: '#F0E8DF',
          300: '#E3D5C7',
          400: '#D1BFB0',
          500: '#B9A48F',
          600: '#9F8A77',
          700: '#84705F',
          800: '#695648',
          900: '#4E3C31',
          950: '#322218',
        },
        'deep-rose': '#9B2335',
        'warm-off-white': '#FDFAF6',
        'surface-dim': '#DCD9D9',
        'surface': '#fcf9f8',
        'on-surface': '#1c1b1b',
        'surface-container-low': '#f6f3f2',
        'surface-container': '#f0eded',
        'surface-container-high': '#eae7e7',
        'surface-container-lowest': '#ffffff',
        'primary': '#7a0520',
        'primary-container': '#9b2335',
        'primary-fixed': '#ffdada',
        'primary-fixed-dim': '#ffb3b5',
        'on-primary': '#ffffff',
        'on-primary-container': '#ffb1b4',
        'secondary': '#5f5e5b',
        'secondary-container': '#e2dfdb',
        'on-surface-variant': '#584142',
        'outline': '#8b7171',
        'outline-variant': '#dfbfbf',
        'tertiary': '#004336',
        'tertiary-fixed': '#a6f1db',
        'on-tertiary-container': '#89d3be',
        'background': '#FDFAF6',
        'cream': '#FDFAF6'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        'headline-lg': ['Playfair Display'],
        'headline-md': ['Playfair Display'],
        'body-md': ['Inter'],
        'body-lg': ['Inter'],
        'label-md': ['Inter'],
        'label-sm': ['Inter']
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px'
      },
      spacing: {
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        'gutter': '16px',
        'margin-mobile': '20px',
        'margin-desktop': '40px',
        'container-max': '1200px'
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.04em', fontWeight: '500' }],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 26, 26, 0.05)',
        'glass': '0 4px 20px rgba(26,26,26,0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
