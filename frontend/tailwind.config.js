/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f5fc',
          100: '#e4e9f7',
          200: '#c5d5ed',
          300: '#a0bbe0',
          400: '#6d95ce',
          500: '#5b8ef8',
          600: '#1e56d5',
          700: '#1248b3',
          800: '#0f3a8f',
          900: '#0a2669',
        },
        secondary: {
          50: '#faf8ff',
          100: '#f2edfd',
          200: '#e4d5f9',
          300: '#d1b5f2',
          400: '#a88fe3',
          500: '#8b7ee0',
          600: '#5b4ecf',
          700: '#3d2ca3',
          800: '#2d207a',
          900: '#1f1552',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Helvetica Neue',
          'sans-serif',
        ],
      },
      screens: {
        xs: '480px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.5px' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.3px' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.3px' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.3px' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0px' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.005em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        shimmer: 'shimmer 2s infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
