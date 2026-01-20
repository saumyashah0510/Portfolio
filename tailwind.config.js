/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Breaking Bad Palette
        'bb-dark': '#0f1d0f',
        'bb-green': '#448c2b',
        'bb-yellow': '#fbbd08',
        'bb-blue': '#00F0FF', // The Crystal Blue
        
        // The Office Palette
        'office-gray': '#e3e3e3',
        'office-blue': '#2b5f8c',
        
        // Suits Palette
        'suits-black': '#000000',
        'suits-gold': '#c5a059',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'comic': ['Bangers', 'cursive'], // The Spider-Man Font
        'marker': ['Permanent Marker', 'cursive'], // The Graffiti Font
        'typewriter': ['Courier Prime', 'monospace'], // The Office Font
      },
    },
  },
  plugins: [],
}