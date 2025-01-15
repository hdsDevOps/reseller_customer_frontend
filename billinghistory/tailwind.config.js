/** @type {import('tailwindcss').Config} */
export default{
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        // "sm-max": { "min": "320px" , "max": "767px" },
      },
      fontFamily: {
        koulen: ["Koulen", "serif"],
      }
    },
  },
  plugins: [
   
  ],
}