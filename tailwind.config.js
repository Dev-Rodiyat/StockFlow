/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {
      colors: {
        brown: {
          50: '#fdf7f2',
          100: '#f4eae2',
          200: '#e5d3c4',
          300: '#d1b49b',
          400: '#b78e6e',
          500: '#a2704f',
          600: '#855334',
          700: '#6d4128',
          800: '#5a3621',
          900: '#4b2d1b',
        },
      },
    },
  },
  plugins: [],
}
