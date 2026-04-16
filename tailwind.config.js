/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#f7f7f8',
          100: '#efeff1',
          200: '#d9d9df',
          300: '#bfc0c8',
          400: '#9c9eaa',
          500: '#7b7d89',
          600: '#5e606b',
          700: '#474954',
          800: '#2c2d35',
          900: '#17181d',
          950: '#0c0d10',
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
        soft: '0 12px 30px -18px rgba(0,0,0,.25)',
        ring: '0 0 0 1px rgba(23,24,29,.08)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

