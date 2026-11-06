/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Text – very dark warm brown, high contrast on the cream background
        ink: { DEFAULT: '#2A1E12', soft: '#4A3A28' },
        paper: '#FBF5E9',
        cream: '#FFFCF5',
        wax: { 50: '#FDF6E3', 100: '#F8EAC6', 200: '#F1D892', 300: '#E9C76A' },
        honey: {
          300: '#F7C55A',
          400: '#F0B032',
          500: '#E39B12',
          600: '#B87708',
          700: '#8C5A07',
        },
        bark: {
          500: '#9A6A3A',
          600: '#7A4E25',
          700: '#5E3B1B',
          800: '#462C14',
          900: '#2F1D0D',
        },
        meadow: { 50: '#EAF3E8', 600: '#2F6B3A', 700: '#245530' },
        alert: { 50: '#FCEDEA', 600: '#A32A1D' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(70,44,20,.06), 0 6px 20px -8px rgba(70,44,20,.18)',
        lift: '0 2px 4px rgba(70,44,20,.08), 0 16px 32px -12px rgba(70,44,20,.28)',
      },
      maxWidth: { page: '76rem' },
    },
  },
  plugins: [],
};
