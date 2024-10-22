module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        "sm-max": { "min": "320px" , "max": "767px" },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}