/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#f8f5f2',
          100: '#efeae5',
          200: '#ddd3cb',
          300: '#c5b6a9',
          400: '#a59688',
          500: '#8f7f72',
          600: '#75675d',
          700: '#5c5149',
          800: '#3d3732',
          900: '#252220',
          950: '#141210',
        },
        /** Taupe do logo Studio A3 (referência ~#9e938a) */
        a3: {
          taupe: '#9e938a',
          'taupe-dark': '#8a8078',
          'taupe-deep': '#7a7068',
        },
      },
      fontFamily: {
        sans: [
          'Montserrat',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 12px 30px -18px rgba(37,34,32,.22)',
        ring: '0 0 0 1px rgba(61,55,50,.1)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

