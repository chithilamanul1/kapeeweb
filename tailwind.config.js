/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A192F', // Deep Navy (Walkers Tours inspired)
          light: '#112240',
          dark: '#020C1B',
        },
        gold: {
          DEFAULT: '#C5A059', // Elegant Gold
          light: '#D4B982',
          dark: '#A68445',
        },
        emerald: {
          DEFAULT: '#10B981', // WhatsApp / Trust
          light: '#34D399',
          dark: '#059669',
        },
        accent: '#64FFDA', // Subtle teal accent
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
