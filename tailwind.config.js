/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verde': {
          DEFAULT: '#39B54A',
          dark: '#2D9A3E',
          light: '#4CC95D',
        },
        'morado': {
          DEFAULT: '#6B4C9A',
          dark: '#553B7D',
          light: '#8462B8',
        },
        'azul': {
          DEFAULT: '#2E3A8C',
          dark: '#1E2660',
          light: '#4A5AAF',
        },
        'naranja': {
          DEFAULT: '#FF9F43',
          dark: '#E68A2E',
          light: '#FFB870',
        }
      },
      fontFamily: {
        'sans': ['Kumbh Sans', 'system-ui', 'sans-serif'],
        'heading': ['Lexend Deca', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
