/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'custom-375': '375px',
        'custom-360': '360px',
        'custom-344': '344px',
      },

      animation: {
        'snowflake-spin': 'snowflake-spin 4s ease-in-out infinite',
      },
      keyframes: {
        'snowflake-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '12%': { transform: 'rotate(20deg)' },
          '25%': { transform: 'rotate(-13deg)' },
          '37%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(0deg)' },
        },
      },
      backgroundImage: {
        'snow-gradient': 'linear-gradient(-45deg, rgba(100, 210, 255, 0.52), #64d2ff)',
      },
      animationDelay: {
        '3': '3000ms',
        '7': '7000ms',
      },
      

    },
  },
 
};
