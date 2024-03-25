/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
        colors: {
            'chalk': '#FFFFFC',
            'cinnabar': '#dc4c3c',
            'obsidian': '#211f20',
            'gravel': "#717070",
          },
          backgroundImage: {
            art: "url('./assets/images/Luks.png')",
          },
        fontFamily: {
            'fanwoodText': ['Fanwood Text', 'serif'],
            'inter': ['Inter', 'sans-serif'],
            'notoSerif': ['Noto Serif', 'serif'],
        }
    },
  },
  plugins: [],
}