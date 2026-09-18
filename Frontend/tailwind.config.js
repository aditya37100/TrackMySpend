/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for toggling
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // ✅ Add this

  ],
 theme: {
    extend: {
      colors: {
        customBlue: '#b28fff',
        customOrange: '#e6a943',
        customDarkBlue: '#242933',
        custom1Blue: '#94afff',
        customLavender: '#b28fff',
        customLightGray: '#ededed',
        customTealLight: '#78b39b',
        customIndigoDark: '#353d63',
        customNearWhite: '#fefeff',
        customBlack: '#121c23',






      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        segoe: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [
     require('flowbite/plugin') // ✅ Add this
  ],
  mode: "jit",
}
