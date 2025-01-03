module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        "sm-max": { "min": "320px" , "max": "767px" },
        small: { min: "365px" },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        "plus-jakarta-sans": ["Plus Jakarta Sans", "serif"],
      },
      dropShadow: {
        custom: '0px 4px 4px rgba(0, 0, 0, 0.25)'
      },
      boxShadow: {
        custom: '4px 0px 40x rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}