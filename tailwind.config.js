/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens:{
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Poppins", "sans-serif"],
        titleFont: ["Montserrat", "sans-serif"],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfaf6',
          100: '#faf5ed',
          200: '#f5ebd9',
          300: '#f0e1c5',
          400: '#e6d3b0',
          500: '#dcc59b',
        },
        bodyColor: "#00031d",
        lightText: "#c4cfde",
        boxBg: "linear-gradient(145deg, #180416)",
        designColor: "purple",
        primary: {
          light: '#6366f1',
          DEFAULT: '#4f46e5',
          dark: '#4338ca',
        },
        secondary: {
          light: '#a855f7',
          DEFAULT: '#9333ea',
          dark: '#7e22ce',
        },
        dark: {
          DEFAULT: '#1f2937',
          lighter: '#374151',
          darker: '#111827',
        },
      },
      boxShadow: {
        shadowOne: "10px 10px 19px #180416",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};