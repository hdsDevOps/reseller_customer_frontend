/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', ],
  theme: {
    extend: {
      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
      },
      screens:{
      'xsm-max': {'min':'320px', 'max': '767px'},
      },
    },
  },
  plugins: [require("daisyui")],
}

