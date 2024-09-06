/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm-max": { "min": "320px" , "max": "767px" },
      },
    },
  },
  plugins: [],
}