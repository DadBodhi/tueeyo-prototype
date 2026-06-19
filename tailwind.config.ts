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
        'surface-dim': '#DCD9D9'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 26, 26, 0.05)',
      },
      borderRadius: {
        'sm': '8px',
      }
    },
  },
  plugins: [],
};
export default config;
