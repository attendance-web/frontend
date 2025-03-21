/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)'
          },
          '25%': {
            transform: 'translateX(5px)'
          },
          '50%': {
            transform: 'translateX(-5px)'
          },
          '75%': {
            transform: 'translateX(5px)'
          },
          '100%': {
            transform: 'translateX(0)'
          },
        }
      },
      animation: {
        shake: 'shake 200ms ease',
      }
    },
  },
  plugins: [],
}

