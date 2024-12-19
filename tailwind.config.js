/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily:{
        domine:['Domine','serif'],
      },
      screens:{
        'xs':'480px',
      }
    },
  },
  plugins: [],
}

