/** @type {import('tailwindcss').Config} */
export default{
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        // "sm-max": { "min": "320px" , "max": "767px" },
      },
    },
  },
  plugins: [
   
  ],
}