/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#1C2621',
        moss: { DEFAULT: '#2E5E4A', 600: '#244B3B', 50: '#E7EFEA' },
        fern: '#6FA37A',
        mist: '#F2F4F1',
        pollen: '#D9A441',
        rosehip: '#B5484B',
        night: {
          DEFAULT: '#111814',
          surface: '#18221D',
          border: '#27332D',
          muted: '#93A399',
          text: '#E4EAE5',
        },
      },
      keyframes: {
        'page-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'page-in': 'page-in 220ms ease-out both',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
