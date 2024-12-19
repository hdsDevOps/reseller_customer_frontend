/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        greenbase: '#12A833',
        graybase: '#8A8A8A',
        redbase: '#E02424',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'xsm-max': { 'min': '320px', 'max': '767px' },
        small: '367px',
        'small-medium': '790px',
        medium: '900px',
        big: '1100px',
      },
    },
  },
  plugins: [require('daisyui')],
};
