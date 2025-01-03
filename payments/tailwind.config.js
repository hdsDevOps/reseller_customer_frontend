/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'extra-small': '375px',
        small: '700px',
      }
    },
  },
  plugins: [
    require('daisyui'),

  ],
}
