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
        montserrat: ["Montserrat", 'serif'],
      },
      screens: {
        'xsm-max': { 'min': '320px', 'max': '767px' },
        small: '367px',
        'small-small': '410px',
        'small-2': '500px',
        'small-2-1': '640px',
        'small-3': '700px',
        'md2': '767px',
        'small-medium': '790px',
        extra: '800px',
        medium: '900px',
        big: '1100px',
        'xl-custom': '1270px',
        '2xl': '1536px',
        '2xl-custom': '1550px',
      },
    },
  },
  plugins: [],
};
